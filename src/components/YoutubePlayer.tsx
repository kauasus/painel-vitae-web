import React, { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  videoId: string
  isVisible: boolean
}

export const YouTubePlayer: React.FC<VideoPlayerProps> = ({ isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Vídeo continua rodando mesmo quando invisível
  }, [isVisible])

  return (
    <div
      style={{
        ...styles.container,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >        
      <video
        ref={videoRef}
        src="/video-painel.mp4"
        style={styles.video}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    transition: 'opacity 0.3s ease',
    display: 'flex',
    alignItems: 'center'
  },
  video: {
    width: '100%',        
    objectFit: 'cover',
    backgroundColor: '#000',
  },
}
