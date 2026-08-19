export interface Store {
  id: string
  city: string
  address: string
}

export const stores: Store[] = [
  {
    id: 'pouso-alegre',
    city: 'Pouso Alegre',
    address: 'Av. Padre José Nogueira Salles, 480 — Centro, Pouso Alegre (MG)',
  },
  {
    id: 'itajuba',
    city: 'Itajubá',
    address: 'Av. Dr. Antônio Salles, 250 — Centro, Itajubá (MG)',
  },
  {
    id: 'sao-lourenco',
    city: 'São Lourenço',
    address: 'Av. Dom Pedro II, 120 — Centro, São Lourenço (MG)',
  },
]
