import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

export const DodoPromoVideo: React.FC<{
  title?: string
  subtitle?: string
}> = ({
  title = 'EL DODO SHAWARMAS Y +',
  subtitle = 'Av. Paseo Tulipán, San Diego • Dine-in • Drive-Through • Delivery',
}) => {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  const titleSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 120,
      mass: 0.8,
    },
  })

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const glowPulse = interpolate(Math.sin(frame / 6), [-1, 1], [0.75, 1.25])

  const badgeTranslateY = interpolate(frame, [22, 42], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const badgeOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#110c09',
        color: '#faf6f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background radial ember glow */}
      <div
        style={{
          position: 'absolute',
          width: width * 0.9,
          height: height * 0.9,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(230, 57, 46, ${0.26 * glowPulse}) 0%, rgba(245, 158, 11, 0.12) 48%, transparent 74%)`,
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle architectural concentric ring */}
      <div
        style={{
          position: 'absolute',
          width: 680,
          height: 680,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none',
        }}
      />

      {/* Bespoke Vector Glass Crest (Zero System Emojis) */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity,
          marginBottom: 36,
          width: 128,
          height: 128,
          borderRadius: 32,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
          boxShadow:
            'inset 0 2px 2px rgba(255,255,255,0.3), 0 20px 50px rgba(230,57,46,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="68"
          height="68"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#dodoFlameGrad)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="dodoFlameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      </div>

      {/* Main Title with Crystalline Glass Specular */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          margin: 0,
          transform: `scale(${titleSpring})`,
          opacity,
          textAlign: 'center',
          background:
            'linear-gradient(180deg, #fffdf9 0%, #fde68a 58%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.9))',
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 26,
          color: '#e5c07b',
          margin: '20px 0 0',
          maxWidth: '82%',
          textAlign: 'center',
          opacity,
          lineHeight: 1.4,
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        {subtitle}
      </p>

      {/* Animated Vector Feature Pills */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          marginTop: 48,
          opacity: badgeOpacity,
          transform: `translateY(${badgeTranslateY}px)`,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 26px',
            borderRadius: 9999,
            backgroundColor: 'rgba(230, 57, 46, 0.16)',
            border: '1px solid rgba(230, 57, 46, 0.45)',
            fontSize: 20,
            fontWeight: 700,
            color: '#fca5a5',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Carne &amp; Pollo al Trompo
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 26px',
            borderRadius: 9999,
            backgroundColor: 'rgba(245, 158, 11, 0.16)',
            border: '1px solid rgba(245, 158, 11, 0.45)',
            fontSize: 20,
            fontWeight: 700,
            color: '#fde68a',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          Salsa de Ajo Casera
        </span>
      </div>
    </AbsoluteFill>
  )
}
