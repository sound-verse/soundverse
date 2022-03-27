export const useServiceFees = () => {
  const calculateServiceFees = (price: number) => {
    return price * 1.025
  }
  return { calculateServiceFees }
}
