class SecondWaterGlass {
  material: string
  quantity: number
  size: number[]
  substance: string

  constructor(quantity: number, substance: string) {
    this.material = 'glass'
    this.quantity = quantity
    this.size = [120, 30]
    this.substance = substance
  }

  drink(quantity: number): void {
    this.quantity -= quantity
  }

  fill(quantity: number, substance: string): void {
    this.quantity = quantity
    this.substance = substance
  }
}

const firstWaterGlass = new SecondWaterGlass(100, 'water')
const secondWaterGlass = new SecondWaterGlass(100, 'water')
const thirdWaterGlass = new SecondWaterGlass(100, 'water')

firstWaterGlass.drink(20)

secondWaterGlass.fill(60, 'soda')

console.log(firstWaterGlass)
console.log(secondWaterGlass)
console.log(thirdWaterGlass)

