import { useState } from 'react'
import { getSingleProduct } from '../utils/getSingleProduct'
import { Product } from '../type'
import { productAlreadyExists } from '../utils/productAlreadyExists'
import { toast } from 'sonner'

type AddToCardProps = {
  products: Product[]
  addProduct: (product: Product) => void
  increaseAmount: (idProduct: number, amount: number) => void
}

export const AddToCart = ({
  products,
  addProduct,
  increaseAmount
}: AddToCardProps) => {
  const [amount, setAmount] = useState<number>(0)
  const [idProduct, setIdProduct] = useState<number | undefined>(undefined)

  return (
    <section>
      <h1 className="text-6xl underline decoration-wavy font-black pb-12 text-center">
        Lista de la compra
      </h1>
      <div className="flex gap-4 pt-4">
        <div className="flex gap-x-2">
          <input
            type="number"
            value={amount}
            min={0}
            onChange={(event) => {
              setAmount(Number(event.target.value))
            }}
            className="border-4  focus:outline-none shadow-[4px_4px_0_-0_rgba(0,0,0,1)] w-[80px] text-xl font-semibold p-4 border-black "
          ></input>
          <input
            placeholder="ID del producto"
            value={idProduct}
            onChange={(event) => {
              setIdProduct(Number(event.target.value))
            }}
            className="border-4  focus:outline-none text-xl shadow-[4px_4px_0_-0_rgba(0,0,0,1)] font-semibold py-4 px-10 border-black "
          ></input>
        </div>
        <button
          onClick={() => {
            if (!idProduct) return
            if (amount === 0) {
              toast(
                <div className="rounded-none p-4 font-bold w-full h-full bg-[#C4A1FF] border-2 shadow-[4px_4px_0_-0_rgba(0,0,0,1)] border-black">
                  No puedes agregar una cantidad vacia
                </div>
              )
              return
            }
            getSingleProduct(idProduct, amount).then((product) =>
              productAlreadyExists(idProduct, products)
                ? increaseAmount(idProduct, amount)
                : addProduct(product)
            )
          }}
          className="border-4  focus:outline-none bg-[#60A5FA] active:translate-x-[2px] active:shadow-none active:translate-y-[2px] hover:-translate-x-[2px] hover:-translate-y-[2px] text-xl hover:shadow-[6px_6px_0_-0_rgba(0,0,0,1)] shadow-[4px_4px_0_-0_rgba(0,0,0,1)] text-white font-semibold py-4 px-10 border-black transition duration-150 ease-in-out"
        >
          Agregar
        </button>
      </div>
    </section>
  )
}
