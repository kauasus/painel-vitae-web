import React, { useState, useEffect, useCallback } from 'react'
import { SenhaAtual } from './components/SenhaAtual'
import { Historico } from './components/Historico'
import { YouTubePlayer } from './components/YoutubePlayer'
import { useSenhas } from './hooks/useSenhas'
import { COLORS } from './constants/colors'
import type { Senha } from './types'

const YOUTUBE_VIDEO_ID = 'ORPyOp_WFpU'
const TEMPO_EXIBICAO_SENHA = 7000 
const TEMPO_EXTRA_ESPERA = 1000 

export default function App() {
  
  const [mostrarPainel, setMostrarPainel] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [historico, setHistorico] = useState<Senha[]>([])
  
  const { senhaAtual, novaSenhaChamada, resetNovaSenha } = useSenhas('8')

  // Atualizar histórico
  useEffect(() => {
    if (senhaAtual) {
      setHistorico((prev) => {
        const jaExiste = prev.some(
          (s) => s.Cod_Senha_Atendimento === senhaAtual.Cod_Senha_Atendimento,
        )
        if (jaExiste) return prev
        return [senhaAtual, ...prev].slice(0, 10)
      })
    }
  }, [senhaAtual])

  // Função de voz (Equivalente ao expo-speech)
  const speak = useCallback((frase: string) => {
    // Som de alerta (HTML5 Audio)
    const audio = new Audio('/sound.mp3')
    audio.play().catch(e => console.log("Erro ao tocar som:", e))

    // Web Speech API
    const utterance = new SpeechSynthesisUtterance(frase)
   
    utterance.lang = 'pt-BR'
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }, [])

  // Lógica de exibição da nova senha
  useEffect(() => {
    if (novaSenhaChamada && senhaAtual) {
      setMostrarPainel(true)
      setOpacity(1)

      const textoParaFalar = senhaAtual.nom_paciente
        ? `${senhaAtual.nom_paciente}, ${senhaAtual.Dsc_Localizacao}`
        : `Senha ${senhaAtual.Num_Sequencial}, favor comparecer ao ${senhaAtual.Dsc_Localizacao}`
      
      speak(textoParaFalar)

      const timeout = setTimeout(() => {
        setTimeout(() => {
          setOpacity(0)
          // Espera a transição de fade out terminar (500ms)
          setTimeout(() => {
            setMostrarPainel(false)
            resetNovaSenha()
          }, 500)
        }, TEMPO_EXTRA_ESPERA)
      }, TEMPO_EXIBICAO_SENHA)

      return () => clearTimeout(timeout)
    }
  }, [novaSenhaChamada, senhaAtual, resetNovaSenha, speak])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Área do Vídeo + Senha */}
        <div style={styles.senhaBox}>
          <YouTubePlayer
            videoId={YOUTUBE_VIDEO_ID}
            isVisible={!mostrarPainel}
          />

          {mostrarPainel && (
            <div style={{ ...styles.painelInterno, opacity: opacity }}>
              <SenhaAtual senha={senhaAtual} />
            </div>
          )}
        </div>

        {/* Histórico lateral */}
        <div style={styles.historicoContainer}>
          <Historico senhas={historico} />
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    padding: '20px',
    gap: '20px',
    boxSizing: 'border-box',
  },
  senhaBox: {
    flex: 0.7,
    backgroundColor: '#000',
    borderRadius: '25px',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  painelInterno: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'opacity 0.5s ease-in-out',
    zIndex: 10,
  },
  historicoContainer: {
    flex: 0.3,
    display: 'flex',
    flexDirection: 'column',
  }
}