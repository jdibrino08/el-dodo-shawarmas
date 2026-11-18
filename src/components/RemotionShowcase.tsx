import { useState } from 'react'
import { Player } from '@remotion/player'
import { DodoPromoVideo } from '../remotion/DodoPromoVideo'
import { Video, Sparkles, Download, Layers, CheckCircle2 } from 'lucide-react'
import { GlassText } from './GlassText'

export function RemotionShowcase() {
  const [exportNote, setExportNote] = useState(false)

  return (
    <section id="video-promo" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl glass-panel p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              <span>Propuesta Audiovisual • Motor Remotion Reels</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              <GlassText variant="crystal">SPOTS AUTOMATIZADOS PARA REELS</GlassText>
            </h2>

            <p className="text-amber-50/80 text-sm sm:text-base leading-relaxed">
              Como parte de la propuesta para el dueño de <strong>El Dodo Shawarmas y +</strong>, podemos generar videos promocionales para Instagram Reels y TikTok actualizando combos y precios en segundos.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-amber-400/15 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-neutral-300">
                  <strong className="text-white block font-semibold">
                    Animación de Marca Consistente:
                  </strong>
                  Videos a 30fps con identidad propia sin pagar edición manual cada semana.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-orange-500/15 border border-orange-500/35 flex items-center justify-center text-orange-300 shrink-0 mt-0.5">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-neutral-300">
                  <strong className="text-white block font-semibold">
                    Listo para Exportación MP4 (1080×1920 y 1080×1080):
                  </strong>
                  Cargado con code-splitting (<code className="text-amber-300 font-mono">React.lazy</code>) para no afectar la velocidad de los comensales.
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                onClick={() => setExportNote(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-extrabold transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Ver Comando de Exportación MP4</span>
              </button>

              {exportNote && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-xs text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    Pipeline listo para renderizar en local:{' '}
                    <code className="font-mono text-white">
                      npx remotion render DodoPromoVideo out/dodo-reel.mp4
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Embedded Player */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden border border-amber-100/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black">
              <Player
                component={DodoPromoVideo}
                durationInFrames={120}
                compositionWidth={1080}
                compositionHeight={1080}
                fps={30}
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                }}
                controls
                autoPlay
                loop
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
