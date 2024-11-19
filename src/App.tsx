import { useState } from 'react'
import { AddToCart } from './components/AddToCart'
import { ShoppingCart } from './components/ShoppingCart'
import { Product } from './type'
import { Toaster } from 'sonner'

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const localData = localStorage.getItem('products')
    return localData ? JSON.parse(localData) : []
  })
  const [date, setDate] = useState<undefined | Date>(undefined)

  const addProduct = (newProduct: Product) => {
    if (!date) {
      const newDate = new Date()
      setDate(newDate)
    }
    setProducts((products) => [...products, newProduct])
    localStorage.setItem('products', JSON.stringify(products))
  }

  const increaseAmount = (productId: number, amountToIncrease: number) => {
    const newProductList = products.map((product) => {
      return product.id === productId
        ? { ...product, amount: product.amount + amountToIncrease }
        : product
    })
    setProducts(newProductList)
    localStorage.setItem('products', JSON.stringify(products))
  }

  const decreaseAmount = (productId: number, amountToIncrease: number) => {
    const newProductList = products.map((product) => {
      return product.id === productId
        ? {
            ...product,
            amount: product.amount - amountToIncrease
          }
        : product
    })
    setProducts(newProductList)
    localStorage.setItem('products', JSON.stringify(products))
  }

  const removeProduct = (productId: number) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId)
    )

    if (products.length === 0) {
      setDate(undefined)
    }
    localStorage.setItem('products', JSON.stringify(products))
  }

  console.log(products)

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <AddToCart
        products={products}
        addProduct={addProduct}
        increaseAmount={increaseAmount}
      />
      <Toaster />
      {products.length > 0 ? (
        <ShoppingCart
          products={products}
          date={date}
          removeProduct={removeProduct}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />
      ) : (
        <p className="min-h-[400px]">Agrega un producto a la cesta</p>
      )}
    </div>
  )
}

export default App
