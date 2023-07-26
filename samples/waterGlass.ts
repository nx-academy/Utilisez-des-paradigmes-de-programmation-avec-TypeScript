interface Drinkable {
  drink(): void;
}

interface Fillable {
  fill(): void;
}

class WaterGlass {
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
}

