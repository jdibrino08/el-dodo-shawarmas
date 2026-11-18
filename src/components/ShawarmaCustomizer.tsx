import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Check, Flame, Plus, Minus } from 'lucide-react'
import type { MenuItem } from '../data/menuData'
import { formatVes } from '../hooks/useBcvRate'

interface ShawarmaCustomizerProps {
  item: MenuItem | null
  onClose: () => void
  onAddToCart: (customizedItem: any) => void
  bcvRate: number | null
}

const EXTRAS = [
  { id: 'queso-fundido', name: 'Extra Queso Gratinado', price: 2 },
  { id: 'doble-carne', name: 'Doble Porción de Carne / Pollo', price: 3 },
  { id: 'papas-dentro', name: 'Papas Crujientes Adentro', price: 1 },
  { id: 'extra-ajo', name: 'Salsa de Ajo Toum Extra', price: 1 },
  { id: 'bebida', name: 'Agregar Refresco Frío', price: 2 },
]

function ShawarmaCustomizerDialog({
  item,
  onClose,
  onAddToCart,
  bcvRate,
}: {
  item: MenuItem
  onClose: () => void
  onAddToCart: (customizedItem: any) => void
  bcvRate: number | null
}) {
  const [bread, setBread] = useState<'Pan Saj Tostado' | 'Pan Árabe Suave' | 'En Plato / Bowl'>(
    'Pan Saj Tostado'
  )
  const [spiceLevel, setSpiceLevel] = useState<number>(item.spicyLevel)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const extra = EXTRAS.find((e) => e.id === id)
    return sum + (extra?.price || 0)
  }, 0)

  const finalUnitPrice = item.price + extrasTotal
  const finalTotalPrice = finalUnitPrice * quantity

  const handleConfirm = () => {
    const extraNames = selectedExtras
      .map((id) => EXTRAS.find((e) => e.id === id)?.name)
      .filter(Boolean)

    onAddToCart({
      ...item,
      cartId: `${item.id}-${Date.now()}`,
      bread,
      spiceLevel,
      selectedExtras: extraNames,
      unitPrice: finalUnitPrice,
      totalPrice: finalTotalPrice,
      quantity,
    })
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl bg-[#1a120d] border border-amber-100/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 my-8"
      >
        {/* Header Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a120d] via-transparent to-black/45" />
          <button
            onClick={onClose}
            aria-label="Cerrar personalizador"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-neutral-950 uppercase">
              {item.category}
            </span>
            <h3 id="customizer-title" className="text-2xl font-black text-white mt-1">
              {item.name}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-6 max-h-[58vh] overflow-y-auto">
          {/* Step 1: Base */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300/90 mb-3">
              1. Elige cómo lo prefieres
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {(
                [
                  { id: 'Pan Saj Tostado', sub: 'Crujiente y fino' },
                  { id: 'Pan Árabe Suave', sub: 'Tradicional' },
                  { id: 'En Plato / Bowl', sub: 'Sin pan' },
                ] as const
              ).map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBread(b.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    bread === b.id
                      ? 'border-amber-400 bg-amber-400/15 text-white'
                      : 'border-amber-100/10 bg-white/[0.02] text-neutral-400 hover:border-amber-100/25'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{b.id}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{b.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Extras (Whole USD) */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300/90 mb-3">
              2. Agrégale Extras (USD enteros)
            </p>
            <div className="space-y-2">
              {EXTRAS.map((extra) => {
                const isSelected = selectedExtras.includes(extra.id)
                return (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400/12 text-white'
                        : 'border-amber-100/10 bg-white/[0.02] text-neutral-300 hover:border-amber-100/25'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected
                            ? 'bg-amber-400 border-amber-400 text-neutral-950'
                            : 'border-neutral-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{extra.name}</span>
                    </div>
                    <span className="font-mono text-amber-300 font-bold">
                      +${extra.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 3: Spice Level */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300/90 mb-3">
              3. Nivel de Picante
            </p>
            <div className="flex gap-2.5">
              {[
                { level: 1, label: 'Sin Picante', desc: 'Solo Salsa de Ajo' },
                { level: 2, label: 'Medio', desc: 'Toque de Picante' },
                { level: 3, label: 'Picante Dodo', desc: 'Fuego Intenso' },
              ].map((s) => (
                <button
                  key={s.level}
                  onClick={() => setSpiceLevel(s.level)}
                  className={`flex-1 p-3 rounded-2xl border text-center transition-all ${
                    spiceLevel === s.level
                      ? 'border-orange-500 bg-orange-500/15 text-white'
                      : 'border-amber-100/10 bg-white/[0.02] text-neutral-400 hover:border-amber-100/25'
                  }`}
                >
                  <div className="flex justify-center gap-0.5 mb-1">
                    {Array.from({ length: s.level }).map((_, i) => (
                      <Flame key={i} className="w-3.5 h-3.5 text-orange-400" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-white">{s.label}</div>
                  <div className="text-[10px] text-neutral-400">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with quantity & add CTA */}
        <div className="p-5 sm:p-6 bg-[#110c09] border-t border-amber-100/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-white/[0.06] border border-amber-100/15 rounded-full px-3.5 py-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Restar cantidad"
              className="text-neutral-300 hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-sm text-white w-5 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Sumar cantidad"
              className="text-neutral-300 hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-sm flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <span>Agregar al Pedido</span>
            <span className="text-right leading-tight">
              <span className="font-mono text-base font-black block">
                ${finalTotalPrice}
              </span>
              {formatVes(finalTotalPrice, bcvRate) && (
                <span className="font-mono text-[10px] font-bold text-neutral-800 block">
                  {formatVes(finalTotalPrice, bcvRate)}
                </span>
              )}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function ShawarmaCustomizer({
  item,
  onClose,
  onAddToCart,
  bcvRate,
}: ShawarmaCustomizerProps) {
  return (
    <AnimatePresence>
      {item && (
        <ShawarmaCustomizerDialog
          key={item.id}
          item={item}
          onClose={onClose}
          onAddToCart={onAddToCart}
          bcvRate={bcvRate}
        />
      )}
    </AnimatePresence>
  )
}
