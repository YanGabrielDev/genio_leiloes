export const parseCurrencyToNumber = (value: string): number => {
  const num = Number(value.replace(/\D/g, '')) / 100
  return isNaN(num) ? 0 : num
}

export const formatCurrency = (value: string): string => {
  const num = parseCurrencyToNumber(value)
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
