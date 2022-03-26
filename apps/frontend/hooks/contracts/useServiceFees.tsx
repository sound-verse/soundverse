export const useServiceFees = () => {
  const calculateServiceFees = (price: number) => {
    return price * 0.025
  }
  return { calculateServiceFees }
}
