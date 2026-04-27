import React, { useState, useEffect, useCallback } from "react";
import { SenhaAtual } from "./components/SenhaAtual";
import { Historico } from "./components/Historico";
import { YouTubePlayer } from "./components/YoutubePlayer";
import { useSenhas } from "./hooks/useSenhas";
import { COLORS } from "./constants/colors";
import type { Senha } from "./types";

const YOUTUBE_VIDEO_ID = "ORPyOp_WFpU";
const TEMPO_EXIBICAO_SENHA = 7000;
const TEMPO_EXTRA_ESPERA = 1000;
const LOCAL_STORAGE_ANDAR_KEY = "painel_vitae_andar";

export default function App() {
  const [mostrarPainel, setMostrarPainel] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [historico, setHistorico] = useState<Senha[]>([]);
  const [andarInput, setAndarInput] = useState("");
  const [andarSelecionado, setAndarSelecionado] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_ANDAR_KEY),
  );

  const { senhaAtual, novaSenhaChamada, resetNovaSenha } =
    useSenhas(andarSelecionado);

  const salvarAndar = useCallback(() => {
    const valor = andarInput.trim();
    if (!valor) return;
    localStorage.setItem(LOCAL_STORAGE_ANDAR_KEY, valor);
    setAndarSelecionado(valor);
  }, [andarInput]);

  // Atualizar histórico
  useEffect(() => {
    if (senhaAtual) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistorico((prev) => {
        const jaExiste = prev.some(
          (s) => s.Cod_Senha_Atendimento === senhaAtual.Cod_Senha_Atendimento,
        );
        if (jaExiste) return prev;
        return [senhaAtual, ...prev].slice(0, 10);
      });
    }
  }, [senhaAtual]);

  const speak = useCallback((frase: string) => {
    const audio = new Audio("/sound.mp3");
    audio.play().catch((e) => console.log("Erro ao tocar som:", e));

    const responsiveVoice = (
      window as unknown as {
        responsiveVoice?: {
          speak: (
            text: string,
            voice?: string,
            parameters?: { rate?: number },
          ) => void;
        };
      }
    ).responsiveVoice;
    responsiveVoice?.speak(frase, "Brazilian Portuguese Female", { rate: 1 });
  }, []);

  useEffect(() => {
    if (novaSenhaChamada && senhaAtual) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMostrarPainel(true);
      setOpacity(1);

      const textoParaFalar = senhaAtual.nom_paciente
        ? `${senhaAtual.nom_paciente}, ${senhaAtual.Dsc_Localizacao}`
        : `Senha ${senhaAtual.Num_Sequencial}, favor comparecer ao ${senhaAtual.Dsc_Localizacao}`;

      speak(textoParaFalar);

      const timeout = setTimeout(() => {
        setTimeout(() => {
          setOpacity(0);
          setTimeout(() => {
            setMostrarPainel(false);
            resetNovaSenha();
          }, 500);
        }, TEMPO_EXTRA_ESPERA);
      }, TEMPO_EXIBICAO_SENHA);

      return () => clearTimeout(timeout);
    }
  }, [novaSenhaChamada, senhaAtual, resetNovaSenha, speak]);

  return (
    <div style={styles.container}>
      {!andarSelecionado ? (
        <div style={styles.setupContainer}>
          <div style={styles.setupCard}>
            <h1 style={styles.setupTitle}>Painel Vitae Center</h1>
            <p style={styles.setupText}>
              Digite o andar para acessar o sistema
            </p>
            <input
              style={styles.setupInput}
              type="text"
              value={andarInput}
              onChange={(e) => setAndarInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") salvarAndar();
              }}
              placeholder="Ex: 8"
            />
            <button style={styles.setupButton} onClick={salvarAndar}>
              Entrar
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.content}>
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

          <div style={styles.historicoContainer}>
            <Historico senhas={historico} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  setupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  setupCard: {
    backgroundColor: "#fff",
    borderRadius: "25px",
    padding: "40px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
  },
  setupTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  setupText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  setupInput: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "2px solid #ddd",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  setupButton: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    padding: "20px",
    gap: "20px",
    boxSizing: "border-box",
  },
  senhaBox: {
    flex: 0.7,
    backgroundColor: "#000",
    borderRadius: "25px",
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  painelInterno: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: "opacity 0.5s ease-in-out",
    zIndex: 10,
  },
  historicoContainer: {
    flex: 0.3,
    display: "flex",
    flexDirection: "column",
  },
};
