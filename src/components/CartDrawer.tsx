import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLenis } from 'lenis/react'
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Car,
  Bike,
  Utensils,
  RefreshCw,
} from 'lucide-react'
import { BRAND_INFO } from '../data/brandConfig'
import { formatRateDisplay, formatVes } from '../hooks/useBcvRate'
import type { BcvRateState } from '../hooks/useBcvRate'

interface CartItem {
  cartId: string
  name: string
  bread: string
  spiceLevel: number
  selectedExtras: string[]
  unitPrice: number
  totalPrice: number
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (cartId: string, delta: number) => void
  onRemoveItem: (cartId: string) => void
  bcv: BcvRateState
}

type OrderMode = 'drive-through' | 'delivery' | 'dine-in'
type PaymentMethod = 'pago-movil' | 'efectivo' | 'zelle'

const SAN_DIEGO_ZONES = [
  'Tulipán / Paseo Tulipán',
  'El Morro I y II',
  'San Diego Pueblo',
  'La Esmeralda',
  'Yuma / Valle Verde',
  'Otra zona de San Diego',
]

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  bcv,
}: CartDrawerProps) {
  const [orderMode, setOrderMode] = useState<OrderMode>('drive-through')
  const [zone, setZone] = useState<string>(SAN_DIEGO_ZONES[0])
  const [carNote, setCarNote] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pago-movil')
  const [cashBill, setCashBill] = useState<string>('Pago exacto')
  const lenis = useLenis()

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
    return () => {
      lenis?.start()
    }
  }, [isOpen, lenis])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const deliveryFee = items.length > 0 && orderMode === 'delivery' ? 2 : 0
  const grandTotal = subtotal + deliveryFee
  const grandTotalVes = formatVes(grandTotal, bcv.rate)

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return

    const spiceLabels: Record<number, string> = {
      1: 'Sin picante',
      2: 'Picante medio',
      3: 'Picante intenso',
    }

    const orderLines = items
      .map((i, idx) => {
        const spiceTxt = spiceLabels[i.spiceLevel] || 'Sin picante'
        const extrasLine =
          i.selectedExtras && i.selectedExtras.length > 0
            ? `\n   • Extras: ${i.selectedExtras.join(', ')}`
            : ''
        return `${idx + 1}. *${i.quantity}x ${i.name}* — *$${i.totalPrice}*\n   • Base: ${i.bread} | ${spiceTxt}${extrasLine}`
      })
      .join('\n')

    const deliveryDetails =
      orderMode === 'drive-through'
        ? `Auto-Servicio (Drive-Through) — $0${carNote.trim() ? `\n• Vehículo: ${carNote.trim()}` : ''}`
        : orderMode === 'delivery'
          ? `Delivery San Diego — $2\n• Zona: ${zone}`
          : 'Comer en el Local (Av. Paseo Tulipán)'

    const paymentDetails =
      paymentMethod === 'pago-movil'
        ? `Pago Móvil (Tasa BCV: ${formatRateDisplay(bcv.rate)})`
        : paymentMethod === 'zelle'
          ? 'Zelle'
          : `Efectivo USD (${cashBill})`

    const vesSummaryLine = grandTotalVes
      ? `\n*Total en Bs. (BCV):* ${grandTotalVes}`
      : ''

    const rawMessage = [
      `*NUEVO PEDIDO — ${BRAND_INFO.name.toUpperCase()}*`,
      `────────────────────`,
      `*DETALLE DEL PEDIDO:*`,
      orderLines,
      `────────────────────`,
      `*ENTREGA:*`,
      `• ${deliveryDetails}`,
      ``,
      `*PAGO:*`,
      `• ${paymentDetails}`,
      `────────────────────`,
      `*Subtotal:* $${subtotal}`,
      `*Envío:* ${deliveryFee === 0 ? 'Gratis ($0)' : `$${deliveryFee}`}`,
      `*TOTAL USD:* $${grandTotal} USD${vesSummaryLine}`,
      ``,
      `Por favor confirmar recepción y tiempo estimado. ¡Gracias!`,
    ].join('\n')

    const message = encodeURIComponent(rawMessage)

    window.open(
      `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${message}`,
      '_blank'
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              data-lenis-prevent
              className="w-screen max-w-md h-full bg-[#16100c] border-l border-amber-100/12 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-amber-100/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 id="cart-drawer-title" className="text-lg font-extrabold text-white">
                    Tu Pedido — San Diego
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Cerrar carrito"
                  className="w-8 h-8 rounded-full bg-white/[0.06] text-neutral-300 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body (Native wheel/trackpad/touch unlocked from Lenis) */}
              <div
                data-lenis-prevent
                className="p-5 overflow-y-auto overscroll-contain touch-pan-y flex-1 min-h-0 space-y-5"
              >
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-amber-100/15 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-7 h-7 text-amber-400" />
                    </div>
                    <p className="text-sm text-neutral-300 font-medium">
                      Tu pedido está vacío. Agrega un shawarma o combo para ordenar en segundos.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.cartId}
                          className="p-4 rounded-2xl bg-white/[0.04] border border-amber-100/10 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-bold text-white">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-amber-300/90 font-mono mt-0.5">
                                {item.bread}
                                {item.selectedExtras?.length > 0 &&
                                  ` · +${item.selectedExtras.join(', ')}`}
                              </p>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.cartId)}
                              aria-label={`Quitar ${item.name}`}
                              className="text-neutral-500 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                            <div className="flex items-center gap-2 bg-white/[0.05] rounded-full px-2.5 py-1">
                              <button
                                onClick={() => onUpdateQuantity(item.cartId, -1)}
                                aria-label="Disminuir cantidad"
                                className="text-neutral-300 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs text-white font-bold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.cartId, 1)}
                                aria-label="Aumentar cantidad"
                                className="text-neutral-300 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-mono text-sm font-bold text-amber-300">
                              ${item.totalPrice}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Venezuelan Channel Selector: Drive-Through / Delivery / Dine-in */}
                    <div className="space-y-2.5 pt-2 border-t border-amber-100/10">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                        1. Modalidad de Entrega
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { id: 'drive-through', label: 'Drive-Thru', sub: '$0', icon: Car },
                            { id: 'delivery', label: 'Delivery', sub: '+$2', icon: Bike },
                            { id: 'dine-in', label: 'En Local', sub: '$0', icon: Utensils },
                          ] as const
                        ).map((m) => {
                          const Icon = m.icon
                          const active = orderMode === m.id
                          return (
                            <button
                              key={m.id}
                              onClick={() => setOrderMode(m.id)}
                              className={`p-2.5 rounded-xl border text-center transition-all ${
                                active
                                  ? 'border-amber-400 bg-amber-400/15 text-white'
                                  : 'border-amber-100/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                              }`}
                            >
                              <Icon className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                              <span className="block text-[11px] font-bold">{m.label}</span>
                              <span className="block text-[10px] font-mono text-amber-200/80">
                                {m.sub}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      {orderMode === 'drive-through' && (
                        <input
                          type="text"
                          value={carNote}
                          onChange={(e) => setCarNote(e.target.value)}
                          placeholder="Ej: Corolla gris (opcional para entrega rápida)"
                          className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-amber-100/15 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                        />
                      )}

                      {orderMode === 'delivery' && (
                        <select
                          value={zone}
                          onChange={(e) => setZone(e.target.value)}
                          aria-label="Zona de Delivery en San Diego"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#221812] border border-amber-100/15 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          {SAN_DIEGO_ZONES.map((z) => (
                            <option key={z} value={z}>
                              {z}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Venezuelan Payment Method Selector (Pago Móvil / Efectivo + Vuelto / Zelle) */}
                    <div className="space-y-2.5 pt-2 border-t border-amber-100/10">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                        2. Método de Pago
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { id: 'pago-movil', label: 'Pago Móvil' },
                            { id: 'efectivo', label: 'Efectivo USD' },
                            { id: 'zelle', label: 'Zelle' },
                          ] as const
                        ).map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setPaymentMethod(p.id)}
                            className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition-all ${
                              paymentMethod === p.id
                                ? 'border-amber-400 bg-amber-400/15 text-white'
                                : 'border-amber-100/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>

                      {paymentMethod === 'efectivo' && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['Pago exacto', 'Vuelto de $10', 'Vuelto de $20'].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setCashBill(opt)}
                              className={`px-3 py-1 rounded-full text-[10px] font-mono border transition-colors ${
                                cashBill === opt
                                  ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                                  : 'bg-white/[0.04] text-neutral-300 border-amber-100/15'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Checkout Footer */}
              {items.length > 0 && (
                <div className="p-5 bg-[#110c09] border-t border-amber-100/12 space-y-4 shrink-0">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>
                        {orderMode === 'delivery'
                          ? 'Delivery San Diego'
                          : orderMode === 'drive-through'
                            ? 'Retiro Drive-Through'
                            : 'Consumo en Local'}
                      </span>
                      <span className="font-mono text-white">
                        {deliveryFee === 0 ? 'Gratis ($0)' : `$${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-amber-100/10">
                      <span>Total USD</span>
                      <span className="font-mono text-base text-amber-300">
                        ${grandTotal} USD
                      </span>
                    </div>

                    {grandTotalVes && (
                      <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <span>Ref. BCV ({formatRateDisplay(bcv.rate)})</span>
                          <button
                            onClick={() => void bcv.refresh()}
                            disabled={bcv.isRefreshing}
                            aria-label="Actualizar tasa BCV"
                            className="text-neutral-500 hover:text-amber-300 disabled:opacity-50"
                          >
                            <RefreshCw
                              className={`w-3 h-3 ${bcv.isRefreshing ? 'animate-spin' : ''}`}
                            />
                          </button>
                        </div>
                        <span
                          className={
                            paymentMethod === 'pago-movil'
                              ? 'text-amber-200 font-bold text-xs'
                              : 'text-neutral-300'
                          }
                        >
                          {grandTotalVes}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <span>Enviar Pedido por WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
