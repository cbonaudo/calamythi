export function rollDice(sides) {
  return Math.floor(Math.random() * (sides - 1 + 1) + 1)
}
