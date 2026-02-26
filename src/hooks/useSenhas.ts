import { useState, useEffect, useCallback } from 'react'
import type { Senha } from '../types'
import { API_CONFIG } from '../constants/api'

export const useSenhas = (andar: string | null) => {
  const [senhaAtual, setSenhaAtual] = useState<Senha | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [novaSenhaChamada, setNovaSenhaChamada] = useState(false)

  const fetchSenhas = useCallback(async () => {
    if (!andar) {
      setLoading(false)
      return null
    }
    setLoading(true)
    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.chamarSenha}?codSetor=${encodeURIComponent(andar)}`,
      )
      if (response.status === 200) {
        const data: Senha = await response.json()
        if (data.Cod_Senha_Atendimento) {
          setSenhaAtual(data)
          setNovaSenhaChamada(true)
        }
        setError(null)
      }
      return null
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      console.error('Erro ao buscar senhas:', err)
    } finally {
      setLoading(false)
    }
  }, [andar])

  const resetNovaSenha = useCallback(() => {
    setNovaSenhaChamada(false)
  }, [])

  useEffect(() => {
    if (!andar) return

    fetchSenhas()
    const interval = setInterval(fetchSenhas, 7000)
    return () => clearInterval(interval)
  }, [fetchSenhas, andar])

  return {
    senhaAtual,
    loading,
    error,
    novaSenhaChamada,
    resetNovaSenha,
    refetch: fetchSenhas,
  }
}
