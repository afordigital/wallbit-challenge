import { useState } from 'react'
import { Product } from '../type'
import { formatDate } from '../utils/formatDate'
import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react'

type ShoppingCartProps = {
  products: Product[]
  date: undefined | Date
  removeProduct: (producId: number) => void
  increaseAmount: (productId: number, amount: number) => void
  decreaseAmount: (productId: number, amount: number) => void
}

const ITEMS_PER_PAGE = 4
export const ShoppingCart = ({
  products,
  date,
  removeProduct,
  increaseAmount,
  decreaseAmount
}: ShoppingCartProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = products.length / 5

  return (
    <div className="max-w-5xl min-w-[1016px] min-h-[450px] mx-auto">
      {!date && (
        <p className="pb-4 font-semibold first-letter:uppercase">
          {formatDate(date!)}
        </p>
      )}
      <ul className="flex border-4 shadow-[8px_8px_0_-0_rgba(0,0,0,1)] border-black flex-col">
        <li className="grid min-h-[75px] grid-cols-7">
          <p className="flex items-center justify-center text-xl font-bold text-center border-2 border-black tabular-nums">
            Cantidad
          </p>
          <p className="flex items-center justify-center col-span-2 text-xl font-bold text-center border-2 border-black tabular-nums">
            Producto
          </p>
          <p className="flex items-center justify-center text-xl font-bold text-center border-2 border-black tabular-nums">
            Unidad
          </p>
          <p className="flex items-center justify-center text-xl font-bold text-center border-2 border-black tabular-nums">
            Total
          </p>
          <p className="flex items-center justify-center text-xl font-bold text-center border-2 border-black tabular-nums">
            Imagen
          </p>
          <p className="flex items-center justify-center text-xl font-bold text-center border-2 border-black tabular-nums"></p>
        </li>
        {products
          .filter((product, index) => {
            if (
              index >= ITEMS_PER_PAGE * currentPage &&
              index < ITEMS_PER_PAGE * currentPage + ITEMS_PER_PAGE
            ) {
              return product
            }
          })
          .map((product) => (
            <li key={product.id} className="grid min-h-[75px] grid-cols-7">
              <div className="font-bold gap-2 text-xl border-2 tabular-nums flex bg-[#C4A1FF] justify-center items-center border-black text-center">
                <button
                  onClick={() => {
                    if (product.amount === 1) {
                      removeProduct(product.id)
                    } else {
                      decreaseAmount(product.id, 1)
                    }
                  }}
                  className="bg-transparent hover:bg-[#b284ef]"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <p className="text-2xl">{product.amount}</p>
                <button
                  onClick={() => {
                    increaseAmount(product.id, 1)
                  }}
                  className="bg-transparent hover:bg-[#b284ef]"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
              <p className="border-2 flex justify-center items-center px-4 text-center font-semibold col-span-2 border-black bg-[#FBBC17]">
                {product.title}
              </p>
              <p className="font-bold text-xl border-2 tabular-nums bg-[#4ADE80] flex justify-center items-center border-black text-center">
                ${product.price.toFixed(2)}
              </p>
              <p className="font-bold text-xl border-2 tabular-nums bg-[#4ADE80] flex justify-center items-center border-black text-center">
                ${(product.price * product.amount).toFixed(2)}
              </p>
              <div className="flex items-center justify-center text-center border-2 border-black">
                <img src={product.image} alt={product.title} width={36} />
              </div>
              <button
                onClick={() => {
                  removeProduct(product.id)
                }}
                className="border-2 hover:bg-[#e26868] bg-[#EF4444] flex justify-center items-center flex items-center justify-center border-black text-center"
              >
                <X></X>
              </button>
            </li>
          ))}
      </ul>
      <div className="flex items-center justify-end w-full gap-3 pt-6">
        <button
          onClick={() => {
            if (currentPage > 0) {
              setCurrentPage((currentPage) => currentPage - 1)
            }
          }}
          className="p-2 border-2 bg-[#60A5FA] transition duration-150 ease-in-out border-black shadow-[4px_4px_0_-0_rgba(0,0,0,1)] focus:outline-none bg-[#60A5FA] active:translate-x-[2px] active:shadow-none active:translate-y-[2px] hover:-translate-x-[2px] hover:-translate-y-[2px] text-xl hover:shadow-[6px_6px_0_-0_rgba(0,0,0,1)]"
        >
          <ChevronLeft />
        </button>
        {<p className="text-xl font-bold">{currentPage + 1}</p>}
        <button
          onClick={() => {
            if (currentPage < totalPages - 1) {
              setCurrentPage((currentPage) => currentPage + 1)
            }
          }}
          className="p-2 border-2 bg-[#60A5FA] transition duration-150 ease-in-out border-black shadow-[4px_4px_0_-0_rgba(0,0,0,1)] focus:outline-none bg-[#60A5FA] active:translate-x-[2px] active:shadow-none active:translate-y-[2px] hover:-translate-x-[2px] hover:-translate-y-[2px] text-xl hover:shadow-[6px_6px_0_-0_rgba(0,0,0,1)]"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
