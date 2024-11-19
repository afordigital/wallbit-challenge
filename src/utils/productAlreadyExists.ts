import { Product } from '../type'

export const productAlreadyExists = (
  productId: Product['id'],
  products: Product[]
) => {
  return products.some((product: Product) => product.id === productId)
}
