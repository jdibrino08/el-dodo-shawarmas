import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Plus,
  Flame,
  Clock,
  Crown,
  Zap,
  Coffee,
  Award,
  Sparkles,
  LayoutGrid,
  Package,
  RefreshCw,
} from 'lucide-react'
import { MENU_ITEMS } from '../data/menuData'
import type { BadgeIconType, MenuItem } from '../data/menuData'
import { GlassText } from './GlassText'
import { formatRateDisplay, formatVes } from '../hooks/useBcvRate'
import type { BcvRateState } from '../hooks/useBcvRate'

interface MenuSectionProps {
  onSelectShawarma: (item: MenuItem) => void
  onQuickAdd: (item: MenuItem) => void
  bcv: BcvRateState
}

function BadgeIcon({ type }: { type?: BadgeIconType }) {
  const cls = 'w-3.5 h-3.5 text-amber-400 shrink-0'
  switch (type) {
    case 'crown':
      return <Crown className={cls} />
    case 'flame':
      return <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
    case 'zap':
      return <Zap className={cls} />
    case 'coffee':
      return <Coffee className="w-3.5 h-3.5 text-amber-300 shrink-0" />
    case 'award':
      return <Award className={cls} />
    case 'sparkles':
      return <Sparkles className={cls} />
    default:
      return null
  }
}

export function MenuSection({ onSelectShawarma, onQuickAdd, bcv }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [showBs, setShowBs] = useState<boolean>(false)

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory)

  const categories = [
    { id: 'all', label: 'Todo el Menú', icon: LayoutGrid },
    { id: 'shawarmas', label: 'Shawarmas', icon: Flame },
    { id: 'combos', label: 'Combos', icon: Package },
    { id: 'desayunos', label: 'Mañanas (7:30 AM)', icon: Coffee },
  ]

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Clean Culinary Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-amber-400">
          <Flame className="w-3.5 h-3.5" />
          <span>Recién Salidos del Trompo • Av. Paseo Tulipán</span>
        </p>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase">
          <GlassText variant="crystal">NUESTRO MENÚ</GlassText>
        </h2>
        <p className="text-amber-50/75 text-sm sm:text-base leading-relaxed">
          Preparados al momento con carne jugosa, pan saj crujiente y nuestra crema de ajo artesanal. Elige tu favorito o ármalo a tu gusto.
        </p>

        {/* Filter Pills + Discreet Currency Switch */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((tab) => {
            const Icon = tab.icon
            const isActive = activeCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-[#1a120d] text-amber-50/80 hover:text-white hover:bg-[#261a13] border border-amber-100/12'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-neutral-950' : 'text-amber-400'
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            )
          })}

          {/* Discreet USD / Bs. toggle integrated seamlessly */}
          {bcv.rate && (
            <button
              onClick={() => setShowBs((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[11px] font-mono bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-amber-200 border border-amber-100/10 transition-colors"
              title="Alternar visualización de precios en Bolívares (tasa BCV)"
            >
              <span className={!showBs ? 'text-white font-bold' : ''}>USD</span>
              <span className="text-neutral-600">/</span>
              <span className={showBs ? 'text-amber-300 font-bold' : ''}>Bs.</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <AnimatePresence>
          {filteredItems.map((item) => {
            const vesPrice = formatVes(item.price, bcv.rate)
            return (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                className="group relative rounded-3xl bg-[#1a120d]/90 border border-amber-100/10 hover:border-amber-400/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_44px_rgba(0,0,0,0.65)] hover:-translate-y-1"
              >
                <div>
                  {/* Unobstructed Food Photo with ONLY the clean price badge */}
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#110c09]/85 via-transparent to-transparent" />

                    {item.badge && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#110c09]/80 backdrop-blur-md border border-amber-200/20 text-amber-300">
                        <BadgeIcon type={item.badgeIcon} />
                        <span>{item.badge}</span>
                      </span>
                    )}

                    <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-amber-400 text-neutral-950 font-mono font-extrabold text-base shadow-lg">
                      {showBs && vesPrice ? vesPrice : `$${item.price}`}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs font-mono text-amber-400/90 mt-1 mb-2">
                    {item.tagline}
                    {showBs && (
                      <span className="text-neutral-400 ml-2">(${item.price} USD)</span>
                    )}
                  </p>
                  <p className="text-xs text-amber-50/75 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Craveable Flavor Credentials */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-mono text-amber-100/80">
                    <span className="inline-flex items-center gap-1 bg-white/[0.05] px-2.5 py-1 rounded-md border border-amber-100/10">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.prepTime}</span>
                    </span>
                    <span className="bg-white/[0.05] px-2.5 py-1 rounded-md border border-amber-100/10">
                      {item.flavorNotes[0]}
                    </span>
                    <span className="bg-white/[0.05] px-2.5 py-1 rounded-md border border-amber-100/10">
                      {item.flavorNotes[1]}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-5 border-t border-amber-100/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectShawarma(item)}
                    className="flex-1 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-amber-100/15 text-xs font-semibold text-white transition-colors"
                  >
                    Personalizar
                  </button>
                  <button
                    onClick={() => onQuickAdd(item)}
                    aria-label={`Agregar ${item.name} al pedido`}
                    className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Whisper-quiet BCV reference footer line (zero visual clutter) */}
      {bcv.rate && (
        <div className="mt-10 flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500">
          <span>
            Pagos en Bolívares calculados automáticamente a tasa BCV ({formatRateDisplay(bcv.rate)})
          </span>
          <button
            onClick={() => void bcv.refresh()}
            disabled={bcv.isRefreshing}
            aria-label="Actualizar tasa BCV"
            className="text-neutral-500 hover:text-amber-300 transition-colors disabled:opacity-40"
          >
            <RefreshCw className={`w-3 h-3 ${bcv.isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      )}
    </section>
  )
}
