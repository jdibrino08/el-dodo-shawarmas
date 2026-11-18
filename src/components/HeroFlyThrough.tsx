import { motion } from 'motion/react'
import {
  Star,
  ArrowUpRight,
  MessageCircle,
  Car,
  Utensils,
  Bike,
  Clock,
  Flame,
} from 'lucide-react'
import { GlassText } from './GlassText'
import { BRAND_INFO } from '../data/brandConfig'

export function HeroFlyThrough() {
  return (
    <section id="inicio" className="relative bg-[#110c09]">
      {/* Tight, High-Conversion Full-Bleed Culinary Hero (1 natural scroll to menu on 4G mobile!) */}
      <div className="relative min-h-[88vh] w-full overflow-hidden flex flex-col justify-end">
        {/* Authentic Close-Up Shawarma Photography (NO BBQ ribs, NO noisy café!) */}
        <div
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1600&q=80)',
          }}
          className="absolute inset-0 bg-cover bg-center brightness-[0.82] contrast-[1.06] saturate-[1.12]"
        />

        {/* Warm Ember-Charcoal Directional Scrim (Appetite Warmth + Razor Legibility) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#110c09] via-[#110c09]/55 to-[#110c09]/25" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#110c09]/92 via-[#110c09]/45 to-transparent" />

        {/* Editorial Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-12 sm:pb-16 pt-28"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Primary Left Culinary Lockup (Strictly 4 clean elements) */}
            <div className="max-w-2xl space-y-5">
              <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{BRAND_INFO.shortAddress} · Desde las 7:30 AM</span>
              </p>

              <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-[-0.03em] leading-[0.96] uppercase">
                <GlassText variant="crystal" className="block">
                  AUTÉNTICO
                </GlassText>
                <GlassText variant="amber" className="block mt-1">
                  SHAWARMA AL TROMPO.
                </GlassText>
              </h1>

              <p className="text-base sm:text-lg text-amber-50/85 font-normal leading-relaxed max-w-xl">
                Pan saj caliente recién tostado, carne y pollo jugoso al trompo y nuestra salsa de ajo cremosa en{' '}
                <strong className="text-white font-semibold">{BRAND_INFO.name}</strong>.
              </p>

              {/* CAVA / GDK High-Appetite Conversion CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-sm tracking-wide active:scale-95 transition-all"
                >
                  <span>Ver Menú y Precios</span>
                </a>
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a120d]/70 backdrop-blur-xl border border-amber-100/25 text-white font-semibold text-sm hover:bg-white/[0.14] active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Quiet Verified Rating Card */}
            <div className="lg:flex flex-col items-end">
              <a
                href={BRAND_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block glass-panel px-5 py-4 rounded-2xl hover:border-amber-300/35 transition-colors group"
              >
                <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{BRAND_INFO.rating} en Google</span>
                  <span className="text-neutral-300 font-normal">
                    ({BRAND_INFO.reviewCount} reseñas)
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs font-mono text-amber-100/80 mt-1.5">
                  Ticket {BRAND_INFO.priceRange} · Pago Móvil / Efectivo / Zelle
                </p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Warm Culinary Trust & Service Strip (Drive-Through, Delivery, Dine-in, Hours) */}
      <div className="border-y border-amber-100/10 bg-[#1a120d]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Drive-Through ($0)</strong>
              <span className="text-neutral-400">Retira sin bajar del carro</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Bike className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Delivery San Diego</strong>
              <span className="text-neutral-400">Tulipán, El Morro y más</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Comer en el Local</strong>
              <span className="text-neutral-400">2006 Av. Paseo Tulipán</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Abierto 7:30 AM</strong>
              <span className="text-neutral-400">Desayunos, almuerzos y cena</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
