import React from 'react'
import type { Senha } from '../types'
import { COLORS } from '../constants/colors'

interface HistoricoProps {
  senhas: Senha[]
}

export const Historico: React.FC<HistoricoProps> = ({ senhas }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.label}>ÚLTIMAS CHAMADAS</h1>
      <div style={styles.scrollView}>
        {senhas.map((senha) => (
          <div key={senha.Cod_Senha_Atendimento} style={styles.card}>
            <span style={styles.numero}>
              {senha.nom_paciente
                ? senha.nom_paciente.slice(0, 20)
                : senha.Tipo_Senha + senha.Num_Sequencial.toString().padStart(4, '0')}
            </span>
            <span style={styles.numero}>{senha.Dsc_Localizacao}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    height: '100%',
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollView: {
    overflowY: 'auto',
    flex: 1,
    scrollbarWidth: 'none', // Firefox
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderLeft: `8px solid ${COLORS.primary}`,
    boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
  },
  numero: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
}