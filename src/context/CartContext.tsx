import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export interface CartItem {
  /** Chave única da linha: produto + variação selecionada */
  key: string
  productId: string
  name: string
  price: number
  imageGradient: string
  variantLabel?: string
  quantity: number
}

export interface AddItemInput {
  productId: string
  name: string
  price: number
  imageGradient: string
  variantLabel?: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (input: AddItemInput, quantity?: number) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (input: AddItemInput, quantity = 1) => {
    const key = `${input.productId}::${input.variantLabel ?? ''}`
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { ...input, key, quantity }]
    })
  }

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(key)
      return
    }
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity } : i)))
  }

  const clear = () => setItems([])

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    isOpen,
    openDrawer: () => setIsOpen(true),
    closeDrawer: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de um CartProvider')
  return ctx
}
