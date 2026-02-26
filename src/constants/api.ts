import type { ApiConfig } from '../types'

export const API_CONFIG: ApiConfig = {
  baseUrl:
    'https://webclin-vitae-api-ecb2dra0c3cffvfp.brazilsouth-01.azurewebsites.net/api/painel-senha',
  endpoints: {
    chamarSenha: '/lista-senha-chamada',
  },
}
