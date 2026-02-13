import { Cake, CartItem } from "../page"
import { Plus, Minus, ShoppingCart } from "lucide-react"


interface Props {
  cake: Cake
  cart: CartItem[]
  increaseQty: (cake: Cake) => void
  decreaseQty: (cake: Cake) => void
}

export default function CakeCard({ cake, cart, increaseQty, decreaseQty }: Props) {

  const existing = cart.find(item => item.id === cake.id)

  return (
   <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 flex flex-col h-full">

  <div className="overflow-hidden">
    <img
      src={cake.image}
      className="h-30 w-full object-cover group-hover:scale-110 transition duration-700"
    />
  </div>

  <div className="p-5 flex flex-col flex-1">
    <h2 className="capitalize text-[14px] font-semibold text-gray-800">
      {cake.name}
    </h2>

    <p className="primary-color font-medium mt-1 mb-4">
        <span className="text-[12px]">Rp </span>
        <span className="text-[16px]">
            {cake.price.toLocaleString()}
        </span>
    </p>


    {/* Area Button / Qty */}
    <div className="mt-auto">
      {!existing ? (
        <button
          onClick={() => increaseQty(cake)}
          className="font-semibold text-[14px] w-full btn text-white py-2 rounded-full hover:bg-orange-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Tambah
        </button>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => decreaseQty(cake)}
            className="w-9 h-9 rounded-full border border-primary primary-color hover:bg-orange-100 flex items-center justify-center"
          >
            <Minus size={16} />
          </button>

          <span className="font-semibold text-gray-500">
            {existing.quantity}
          </span>

          <button
            onClick={() => increaseQty(cake)}
            className="w-9 h-9 rounded-full btn text-white hover:bg-orange-700 flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>

  </div>
</div>

  )
}
