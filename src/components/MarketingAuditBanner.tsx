import {
  TrendingUp,
  Star,
  ShieldCheck,
  BarChart3,
  Car,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'
import { GlassText } from './GlassText'
import { BRAND_INFO } from '../data/brandConfig'

export function MarketingAuditBanner() {
  return (
    <section id="marketing-insights" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl glass-panel p-8 sm:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.1] pb-8 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Auditoría Real • {BRAND_INFO.name} (San Diego, Carabobo)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <GlassText variant="crystal">POTENCIAL DE CRECIMIENTO LOCAL</GlassText>
            </h2>
            <p className="text-neutral-300 text-sm mt-2 max-w-2xl">
              Diagnóstico basado en el perfil real de Google Business en{' '}
              <strong className="text-white">Av. Paseo Tulipán</strong>: calificación de élite con enorme margen para multiplicar tráfico orgánico y ventas por Drive-Through y WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-400/25">
              <span className="text-3xl sm:text-4xl font-black text-amber-300 flex items-center justify-end gap-1.5 font-mono leading-none">
                <span>{BRAND_INFO.rating}</span>
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </span>
              <span className="text-[10px] font-mono text-amber-200/80 uppercase tracking-widest block mt-1.5">
                Google Rating Real
              </span>
            </div>
          </div>
        </div>

        {/* 4 Real Diagnostic Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Real Rating vs Review Volume Opportunity */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 hover:border-amber-400/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Reputación Google</span>
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-1.5">
              <span>{BRAND_INFO.rating}</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-normal text-neutral-400">
                ({BRAND_INFO.reviewCount} reseñas)
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Calidad casi perfecta. Con QR en empaques y seguimiento WhatsApp se proyecta escalar a <strong className="text-amber-300">150+ reseñas</strong> en 90 días.
            </p>
          </div>

          {/* Card 2: Real Price Tier & Ticket Engineering */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 hover:border-amber-400/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Rango de Ticket</span>
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {BRAND_INFO.priceRange}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Personalizador web con extras en USD enteros (Queso Gratinado, Doble Carne, Papas y Combos) + cálculo BCV automático para elevar el ticket promedio un <strong className="text-emerald-300">+28%</strong>.
            </p>
          </div>

          {/* Card 3: Drive-Through + Delivery Advantage */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 hover:border-amber-400/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Ventaja Omnicanal</span>
              <Car className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">3 Canales</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong className="text-white">Dine-in, Drive-Through y Delivery</strong> desde las 7:30 AM. Pedidos pre-armados por WhatsApp eliminan colas en horas pico.
            </p>
          </div>

          {/* Card 4: Local SEO San Diego Carabobo */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 hover:border-amber-400/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>SEO Local Carabobo</span>
              <TrendingUp className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">San Diego</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Posicionamiento estratégico en <strong className="text-white">Av. Paseo Tulipán</strong> para dominar búsquedas de &ldquo;shawarma en San Diego&rdquo; y Valencia.
            </p>
          </div>
        </div>

        {/* Bottom Direct Maps CTA */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{BRAND_INFO.address}</span>
          </div>
          <a
            href={BRAND_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-mono font-semibold"
          >
            <span>Abrir en Google Maps</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
