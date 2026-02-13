"use client"
import { useState, useEffect } from "react"
import CakeCard from "./components/CakeCard"
import Cart from "./components/Cart"
import "./styles.css"
import Carousel from "./components/Carousel"



export interface Cake {
  id: number
  name: string
  price: number
  image: string
}

export interface CartItem extends Cake {
  quantity: number
}

export default function Home() {

  const cakeList: Cake[] = [
    { id: 1, name: "nastar semprit - 500g", price: 80000, image: "https://picsum.photos/600/400?random=11" },
  { id: 2, name: "nastar jambu - 500g", price: 82500, image: "https://picsum.photos/600/400?random=12" },
  { id: 3, name: "nastar keju - 500g", price: 85000, image: "https://picsum.photos/600/400?random=13" },
  { id: 4, name: "nastar keranjang - 500g", price: 82500, image: "https://picsum.photos/600/400?random=14" },
  { id: 5, name: "black nastar - 500g", price: 85000, image: "https://picsum.photos/600/400?random=15" },
  { id: 6, name: "nastar rainbow - 500g", price: 82500, image: "https://picsum.photos/600/400?random=16" },
  { id: 7, name: "nastar cincin - 500g", price: 82500, image: "https://picsum.photos/600/400?random=17" },
  { id: 8, name: "putri salju - 500g", price: 82500, image: "https://picsum.photos/600/400?random=18" },
  { id: 9, name: "kastengel - 500g", price: 85000, image: "https://picsum.photos/600/400?random=19" },
  { id: 10, name: "kacang hati - 500g", price: 82500, image: "https://picsum.photos/600/400?random=20" },
  { id: 11, name: "sagu keju - 500g", price: 77500, image: "https://picsum.photos/600/400?random=21" },
  { id: 12, name: "coklat mete - 500g", price: 85000, image: "https://picsum.photos/600/400?random=22" },
  { id: 13, name: "stik keju - 1kg", price: 90000, image: "https://picsum.photos/600/400?random=23" },
  { id: 14, name: "kue bawang - 1kg", price: 90000, image: "https://picsum.photos/600/400?random=24" },
  { id: 15, name: "telur gabus - 1kg", price: 105000, image: "https://picsum.photos/600/400?random=25" },
  { id: 16, name: "biji ketapang - 500g", price: 55000, image: "https://picsum.photos/600/400?random=26" },
  { id: 17, name: "kacang umpet manis - 500g", price: 45000, image: "https://picsum.photos/600/400?random=27" },
  { id: 18, name: "kacang umpet pedas - 500g", price: 45000, image: "https://picsum.photos/600/400?random=27" },
  { id: 19, name: "kacang umpet coklat - 500g", price: 45000, image: "https://picsum.photos/600/400?random=27" },
  ]

  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = sessionStorage.getItem("cart")
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, mounted])

  if (!mounted) return null

  const increaseQty = (cake: Cake) => {
    const existing = cart.find(item => item.id === cake.id)

    if (existing) {
      setCart(cart.map(item =>
        item.id === cake.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...cake, quantity: 1 }])
    }
  }

  const decreaseQty = (cake: Cake) => {
    const existing = cart.find(item => item.id === cake.id)
    if (!existing) return

    if (existing.quantity === 1) {
      setCart(cart.filter(item => item.id !== cake.id))
    } else {
      setCart(cart.map(item =>
        item.id === cake.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="px-6 md:px-12 py-3 border-b border-gray-200 flex items-center bg-white sticky top-0 z-50">
        <img src="img/dpmama2.svg" alt="dapoer mama" className="dpmama-logo"/>
      </nav>


      {/* CAROUSEL */}
      <Carousel />


      {/* CONTENT */}
      <div className="px-4 md:px-12 py-12">

        <div className="flex flex-col lg:flex-row gap-12">

          {/* GRID */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8">
            {cakeList.map(cake => (
              <CakeCard
                key={cake.id}
                cake={cake}
                cart={cart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
              />
            ))}
          </div>

          <div className="lg:w-96">
            <Cart
              cart={cart}
              setCart={setCart}
              cakeList={cakeList}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          </div>

        </div>

      </div>
      <footer className="border-t border-gray-200 mt-12">
        <div className="text-center text-sm text-gray-500 py-6">
          © {new Date().getFullYear()} Dapoer Mama. All rights reserved.
        </div>
      </footer>

    </div>
    
  )
}
