const formatPrice = (rawPrice: string): string => {
  let temp = ''
  let formattedPrice = ''
  const priceParts = []

  for (let i = rawPrice.length; i > 0; i--) {
    temp = rawPrice[i - 1] + temp
    if (temp.length === 3) {
      priceParts.push(temp)
      temp = ''
    }
  }
  priceParts.push(temp)

  for (let i = priceParts.length; i > 0; i--) {
    formattedPrice = formattedPrice + priceParts[i - 1]
    if (i !== 1) {
      formattedPrice = formattedPrice + '.'
    }
  }

  return formattedPrice
}

export default formatPrice
