import {
  Flame,
  MapPin,
  Phone,
  Clock,
  Car,
  Utensils,
  Bike,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react'
import { BRAND_INFO } from '../data/brandConfig'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer
      id="ubicacion"
      className="bg-[#0c0806] border-t border-amber-100/10 text-neutral-400 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/35 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              {BRAND_INFO.shortName}{' '}
              <span className="text-amber-400">Shawarmas y +</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-400">
            Shawarmas artesanales, combos y desayunos en San Diego, Carabobo. Sabor real al carbón con atención en salón, Auto-Servicio y Delivery.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] border border-amber-100/10 text-[10px] font-mono text-neutral-300">
              <Utensils className="w-3 h-3 text-amber-400" /> Dine-in
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] border border-amber-100/10 text-[10px] font-mono text-neutral-300">
              <Car className="w-3 h-3 text-amber-400" /> Drive-Through
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] border border-amber-100/10 text-[10px] font-mono text-neutral-300">
              <Bike className="w-3 h-3 text-amber-400" /> Delivery
            </span>
          </div>
        </div>

        {/* Hours */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Horarios & Pagos
          </h4>
          <ul className="text-xs space-y-2 font-mono text-neutral-400">
            <li className="flex items-center gap-2 text-neutral-200">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{BRAND_INFO.hoursSummary}</span>
            </li>
            <li>Consumo promedio: {BRAND_INFO.priceRangeDetail}</li>
            <li className="text-amber-300/90">Pago Móvil (BCV) · Efectivo · Zelle</li>
          </ul>
        </div>

        {/* Real Location */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Ubicación & Contacto
          </h4>
          <div className="text-xs space-y-2.5">
            <a
              href={BRAND_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-white transition-colors group"
            >
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {BRAND_INFO.address}
                <ArrowUpRight className="w-3 h-3 inline ml-1 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-300 transition-colors font-mono"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{BRAND_INFO.phoneDisplay} (WhatsApp)</span>
            </a>
          </div>
        </div>

        {/* Direct Customer Order Action */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Pedidos Directos
          </h4>
          <p className="text-xs leading-relaxed">
            Haz tu pedido por adelantado y retira sin cola en nuestro{' '}
            <strong className="text-white">Drive-Through</strong> de Av. Paseo Tulipán o pídelo por Delivery.
          </p>
          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Escribir al WhatsApp</span>
          </a>
          <div className="text-[11px] font-mono text-neutral-500 pt-2">
            © {CURRENT_YEAR} {BRAND_INFO.name} · San Diego, Carabobo.
          </div>
        </div>
      </div>
    </footer>
  )
}
