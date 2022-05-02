export function stangToBathString(amount: number) {
  const sign = amount < 0
  if (sign) amount = -amount

  const whole = Math.floor(amount / 100)
  const partial = String(amount % 100).padStart(2, '0')

  return `${sign ? '-' : ''}${whole}.${partial}`
}
