import React from 'react'
import { COLORS } from '../constants/colors'

interface HeaderProps {
  relogio: string
}

export const Header: React.FC<HeaderProps> = ({ relogio }) => {
  return (
    <div style={styles.header}>
      <div style={styles.logoContainer}>
        <span style={styles.logoVitae}>VITAE</span>
        <span style={styles.logoCenter}>Center</span>
        <div style={styles.linhaDecorativa} />
        <span style={styles.logoSub}>CLÍNICA MÉDICA E ODONTOLÓGICA</span>
      </div>

      <div style={styles.relogioContainer}>
        <span style={styles.relogioText}>{relogio}</span>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: COLORS.white,
    borderBottom: `4px solid ${COLORS.primary}`,
    boxSizing: 'border-box',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoVitae: {
    fontSize: 38,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 5,
    lineHeight: '38px',
  },
  logoCenter: {
    fontSize: 22,
    color: COLORS.secondary,
    fontStyle: 'italic',
    marginTop: -5,
  },
  logoSub: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linhaDecorativa: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
    marginTop: 2,
    marginBottom: 2,
  },
  relogioContainer: {
    backgroundColor: COLORS.lightGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  relogioText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.black,
  },
}