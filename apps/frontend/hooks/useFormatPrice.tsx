export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    maximumFractionDigits: 3,
  })
}
