export type Product = {
  id: number
  category: string
  description: string
  image: string
  price: number
  rating: Rate
  title: string
  amount: number
}

export type Rate = {
  rate: number
  count: number
}
