export const useServiceFees = () => {
  const calculateServiceFees = (price: number) => {
    return price * 1.035
  }
  return { calculateServiceFees }
}
