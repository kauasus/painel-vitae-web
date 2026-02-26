import React from 'react'
import { COLORS } from '../constants/colors'
// Tipos
interface Senha {
  nom_paciente?: string
  Tipo_Senha: string
  Num_Sequencial: number
  Dsc_Localizacao: string
}

interface SenhaAtualProps {
  senha: Senha | null
}


export const SenhaAtual: React.FC<SenhaAtualProps> = ({ senha }) => {
  const gradientStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
    borderRadius: 25,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 10px 30px rgba(0,0,0,0.3)',
    padding: '20px',
  }

  if (!senha) {
    return (
      <div style={styles.container}>
        <div style={gradientStyle}>
          <p style={styles.aguardando}>Aguardando próxima senha...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={gradientStyle}>
        {senha.nom_paciente ? (
          <p style={styles.paciente}>{senha.nom_paciente}</p>
        ) : (
          <p style={styles.numero}>
            {senha.Tipo_Senha}
            {senha.Num_Sequencial.toString().padStart(4, '0')}
          </p>
        )}
        <div style={styles.infoContainer}>
          <div style={styles.infoBox}>
            <span style={styles.infoLabel}>LOCAL</span>
            <span style={styles.infoValue}>{senha.Dsc_Localizacao}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
  numero: {
    fontSize: 280,
    fontWeight: 900,
    color: COLORS.white,
    marginTop: 25,
    marginBottom: -95,
    lineHeight: 1,
  },
  paciente: {
    fontSize: 90,
    textAlign: 'center',
    fontWeight: 900,
    color: COLORS.white,
    marginTop: 25,
    marginBottom: -105,
    lineHeight: 1.1,
  },
  infoContainer: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    padding: 25,
    marginTop: 100,
    width: '100%',
    boxSizing: 'border-box',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 40,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 88,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  aguardando: {
    fontSize: 36,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
}