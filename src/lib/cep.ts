export interface CepAddress {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
}

interface ViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

/**
 * Busca endereço por CEP via ViaCEP (viacep.com.br), serviço público que
 * consulta a base de CEPs dos Correios. Retorna `null` quando o CEP é
 * inválido ou não é encontrado.
 */
export async function lookupCep(rawCep: string): Promise<CepAddress | null> {
  const digits = rawCep.replace(/\D/g, '')
  if (digits.length !== 8) return null

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
  if (!response.ok) throw new Error('Falha ao consultar o CEP')

  const data: ViaCepResponse = await response.json()
  if (data.erro) return null

  return {
    cep: digits,
    street: data.logradouro ?? '',
    neighborhood: data.bairro ?? '',
    city: data.localidade ?? '',
    state: data.uf ?? '',
  }
}

export function formatCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}
