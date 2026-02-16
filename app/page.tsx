"use client"

import { useState, useEffect } from "react"
import CakeCard from "./components/CakeCard"
import Cart from "./components/Cart"
import Carousel from "./components/Carousel"
import { LogIn } from "lucide-react"
import "./styles.css"

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
  // Hardcoded admin credentials
  const adminUser = { username: "admin", password: "admindpmama" }

  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Login states
  const [loggedIn, setLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const cakeList: Cake[] = [
    { id: 1, name: "nastar semprit - 500g", price: 80000, image: "img/nastarSemprit.png" },
    { id: 2, name: "nastar jambu - 500g", price: 82500, image: "img/nastarJambu.png" },
    { id: 3, name: "nastar keju - 500g", price: 85000, image: "img/nastarKeju.png" },
    { id: 4, name: "nastar keranjang - 500g", price: 82500, image: "img/keranjang.png" },
    { id: 5, name: "black nastar - 500g", price: 85000, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgs80fucX8YrRIIfpY6RztHqpBesAuZre0zO09pXMP97qMrednqPRQIGJO4neyViW0pW59wUF_TdXxohdgcHtQzuNYcaUQA-ZPV-Nj1GnSagqdpQ9G-c2R06CHKUVDIUKKgvUiiid1COf5A/w1200-h630-p-k-no-nu/Resep+Membuat+Kue+Kering+Black+Nastar+Manggis+Yang+Lezat.jpg" },
    { id: 6, name: "nastar rainbow - 500g", price: 82500, image: "img/nastarRainbow.png" },
    { id: 7, name: "nastar cincin - 500g", price: 82500, image: "img/cincin.png" },
    { id: 8, name: "putri salju - 500g", price: 82500, image: "https://i.pinimg.com/1200x/ff/23/05/ff230589488c2de895d4e190f6501519.jpg" },
    { id: 9, name: "kastengel - 500g", price: 85000, image: "https://i.pinimg.com/736x/1a/7b/43/1a7b43f413902f15d8acdcb4080167f9.jpg" },
    { id: 10, name: "kacang hati - 500g", price: 82500, image: "https://i.pinimg.com/1200x/54/3d/7d/543d7dffa0cfdb3aaa5b6e4812ef6e4e.jpg" },
    { id: 11, name: "sagu keju - 500g", price: 77500, image: "img/kueSagu.png" },
    { id: 12, name: "coklat mete - 500g", price: 85000, image: "img/coklatMete.jpg" },
    { id: 13, name: "stik keju - 1kg", price: 90000, image: "img/stikKeju.jpg" },
    { id: 14, name: "kue bawang - 1kg", price: 90000, image: "https://i.pinimg.com/1200x/e3/22/06/e32206b1ebbc475527e822638541d1cf.jpg" },
    { id: 15, name: "telur gabus - 1kg", price: 105000, image: "img/kueGabus.png" },
    { id: 16, name: "biji ketapang - 500g", price: 55000, image: "https://i.pinimg.com/736x/f4/91/e5/f491e58dcb05bced16feda037fad03c9.jpg" },
    { id: 17, name: "kacang umpet pedas - 500g", price: 45000, image: "https://i.pinimg.com/1200x/d1/82/4d/d1824da486a99bbf878097bcd50f861d.jpg" },
    { id: 18, name: "kacang umpet coklat - 500g", price: 45000, image: "https://i.pinimg.com/736x/cf/53/9e/cf539edbb8aa21beb88dd8c49e930030.jpg" }
  ]

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
        item.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item
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
        item.id === cake.id ? { ...item, quantity: item.quantity - 1 } : item
      ))
    }
  }

  const handleLogin = () => {
    if (username === adminUser.username && password === adminUser.password) {
      setLoggedIn(true)
      window.open(
        "https://docs.google.com/spreadsheets/d/1SY-9u7YXVpwnXiHEQgyY9paBdbn8-PtyaKbTLe86Yuk",
        "_blank"
      )

    } else {
      alert("Username atau password salah!")
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className="px-6 md:px-12 py-3 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-50">
        <img src="img/dpmama2.svg" alt="dapoer mama" className="dpmama-logo"/>
        
        {loggedIn ? (
          <span
          className="text-gray-700 font-semibold cursor-pointer hover:text-orange-500"
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/1SY-9u7YXVpwnXiHEQgyY9paBdbn8-PtyaKbTLe86Yuk",
              "_blank"
            )
          }
        >
          Admin
        </span>
        ) : (
          <div className="relative">
          <button
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            onClick={() => setShowLogin(!showLogin)}
          >
            <LogIn className="w-5 h-5" />
            <span className="hidden sm:inline">Admin</span> {/* teks hanya muncul di layar >= sm */}
          </button>

            {showLogin && (
            <div className="fixed inset-0 flex items-center justify-center  z-50">
              {/* overlay */}
              <div 
                className="absolute inset-0 bg-black opacity-40" 
                onClick={() => setShowLogin(false)}
              ></div>

              {/* modal */}
              <div className="relative bg-white rounded-xl shadow-xl p-8 w-80 max-w-sm z-50">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Admin Login</h2>
                
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  className="px-3 py-2 mb-3 w-full border border-gray-300 text-gray-700 placeholder:text-gray-500 p-3 rounded-xl transition-all focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()} // enter di password langsung login
                />
                
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 mb-3 w-full border border-gray-300 text-gray-700 placeholder:text-gray-500 p-3 rounded-xl transition-all focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()} // enter di username juga bisa
                />

                <button
                  onClick={handleLogin}
                  className="bg-primary text-white px-4 py-2 w-full rounded-xl hover:bg-orange-600 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          </div>
        )}
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
