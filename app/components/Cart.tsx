"use client"
import { CartItem, Cake } from "../page"
import { useState } from "react"
import { Check, Plus, Minus, ShoppingCart } from "lucide-react"
import Swal from "sweetalert2"

interface Props {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  cakeList: Cake[]
  increaseQty: (cake: Cake) => void
  decreaseQty: (cake: Cake) => void
}

export default function Cart({
  cart,
  setCart,
  cakeList,
  increaseQty,
  decreaseQty
}: Props) {

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = async () => {
    if (!name || !phone) {
      Swal.fire({
        icon: "warning",
        title: "Form belum lengkap",
        text: "Harap isi nama dan nomor telepon."
      })
      return
    }

    // Modal waiting
    Swal.fire({
      title: "Mohon tunggu...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const orderData: Record<string, any> = {
      name,
      phone,
      total
    }

    cakeList.forEach(cake => {
      const found = cart.find(item => item.id === cake.id)
      orderData[cake.name] = found ? found.quantity : 0
    })

    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      })

      Swal.fire({
        icon: "success",
        title: "Pesanan berhasil!",
        timer: 2000,
        showConfirmButton: false
      })

      setCart([])
      sessionStorage.removeItem("cart")
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal memproses pesanan",
        text: "Terjadi kesalahan saat mengirim data."
      })
    }
  }


  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">

    <h2 className="cart-ttl text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
    <ShoppingCart size={22} className="font-semibold primary-color" />
    Keranjang Belanja
    </h2>
    <hr className="my-6"/>
    <div className="mt-6 space-y-3">
      <input
        placeholder="Masukan nama kamu"
        className="w-full border border-gray-300 text-gray-700 placeholder:text-gray-500 p-3 rounded-xl transition-all focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input
        placeholder="Masukan nomor hp kamu"
        className="w-full border border-gray-300 text-gray-700 placeholder:text-gray-500 p-3 rounded-xl transition-all focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <hr className="my-6"/>
        {cart.length === 0 && (
        <div className="font-light flex flex-col items-center text-center gap-2 text-gray-300">
            <ShoppingCart size={40} strokeWidth={1} />
            Keranjang Kosong
        </div>
        
        )}


      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center">

            <div>
              <p className="font-normal text-gray-800">{item.name}</p>
              <p className="primary-color font-medium">
                <span className="primary-color text-[12px]">Rp </span>
                        <span className="text-[16px]">
                        {item.price.toLocaleString()}
                </span>
              </p>                
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => decreaseQty(item)}
                    className="w-8 h-8 rounded-full border border-primary primary-color hover:bg-orange-100 flex items-center justify-center"
                >
                    <Minus size={14} />
                </button>

                <span className="text-gray-500">{item.quantity}</span>

                <button
                    onClick={() => increaseQty(item)}
                    className="w-8 h-8 rounded-full bg-primary text-white hover:bg-orange-700 flex items-center justify-center"
                >
                    <Plus size={14} />
                </button>
            </div>


          </div>
        ))}
      </div>

      <hr className="my-6"/>

        <h3 className="flex justify-between font-semibold text-lg text-gray-800">
            <span>Total:</span>
            <p className="primary-color font-semibold">
                <span className="primary-color text-[16px]">Rp </span>
                        <span className="text-[20px]">
                        {total.toLocaleString()}
                </span>
              </p>  
        </h3>

      <div className="mt-8 space-y-3">   
        <button onClick={handleSubmit} className="w-full btn text-white py-3 rounded-full hover:bg-orange-700 transition font-semibold flex items-center justify-center gap-2" >
        <Check size={18} />
        Pesan
        </button>
      </div>

    </div>
  )
}
