export const getSingleProduct = async (id: number, amount: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  const data = await response.json()
  return { ...data, amount }
}
