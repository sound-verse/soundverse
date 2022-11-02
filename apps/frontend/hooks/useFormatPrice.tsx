
export function formatPrice(price: any) {
    return price.toLocaleString('en-US', {
      maximumFractionDigits: 3,
    })
  }
  