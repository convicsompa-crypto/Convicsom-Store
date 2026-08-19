export interface Store {
  id: string
  city: string
  address: string
  cep: string
  phone?: string
  whatsapp?: string
}

/** Endereços e contatos reais das 3 unidades da Convicsom no Sul de Minas. */
export const stores: Store[] = [
  {
    id: 'pouso-alegre',
    city: 'Pouso Alegre',
    address: 'Rua Nazareto, 125 — Bairro de Fátima, Pouso Alegre (MG)',
    cep: '37554-172',
  },
  {
    id: 'itajuba',
    city: 'Itajubá',
    address: 'Rua Major Belo Lisboa, 313 — Centro, Itajubá (MG)',
    cep: '37500-016',
    phone: '(35) 3621-3333',
  },
  {
    id: 'sao-lourenco',
    city: 'São Lourenço',
    address: 'Shopping Antônio Dutra — Rua Dr. Olavo Gomes Pinto, 160, Loja 15, Centro, São Lourenço (MG)',
    cep: '37470-000',
    phone: '(35) 3331-3166',
    whatsapp: '(35) 99764-7398',
  },
]
