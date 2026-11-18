import { useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { HeroFlyThrough } from './components/HeroFlyThrough'
import { MenuSection } from './components/MenuSection'
import { ShawarmaCustomizer } from './components/ShawarmaCustomizer'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { useBcvRate } from './hooks/useBcvRate'
import type { MenuItem } from './data/menuData'

export function App() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const bcv = useBcvRate()

  const handleAddToCart = (customizedItem: any) => {
    setCartItems((prev) => [...prev, customizedItem])
    setIsCartOpen(true)
  }

  const handleQuickAdd = (item: MenuItem) => {
    const defaultCustomized = {
      ...item,
      cartId: `${item.id}-${Date.now()}`,
      bread: 'Pan Saj Tostado',
      spiceLevel: item.spicyLevel,
      selectedExtras: [],
      unitPrice: item.price,
      totalPrice: item.price,
      quantity: 1,
    }
    setCartItems((prev) => [...prev, defaultCustomized])
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta
            if (newQty <= 0) return null
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            }
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId))
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#110c09] text-amber-50 selection:bg-amber-500/30 selection:text-white">
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <main>
          <HeroFlyThrough bcvRate={bcv.rate} />
          <MenuSection
            onSelectShawarma={(item) => setSelectedItem(item)}
            onQuickAdd={handleQuickAdd}
            bcv={bcv}
          />
        </main>

        <Footer />

        <ShawarmaCustomizer
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
          bcvRate={bcv.rate}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          bcv={bcv}
        />
      </div>
    </SmoothScroll>
  )
}

export default App
