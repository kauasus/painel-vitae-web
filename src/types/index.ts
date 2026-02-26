export interface Senha {
  Cod_Senha_Atendimento: number
  Tipo_Senha: string
  Num_Sequencial: number
  Dsc_Localizacao: string
  nom_paciente: string
  timestamp?: number
}

export interface FilaSenhas {
  atual: Senha | null
  anteriores: Senha[]
}

export interface ApiConfig {
  baseUrl: string
  endpoints: {
    chamarSenha: string
  }
}
