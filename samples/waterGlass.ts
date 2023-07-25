interface Drinkable {
  drink(): void;
}

interface Fillable {
  fill(): void;
}

class WaterGlass implements Drinkable, Fillable {
  quantity: number
  size: number[]
  substance: string

  constructor(quantity: number, substance: string) {
    this.quantity = quantity
    this.size = [120, 30]
    this.substance = substance
  }

  drink(): void {
  }
 
  fill(): void {
  }
}

