class Vehicule {
    public brand: string
    protected serialNumber: string
    private manufacturingSecret: string

    constructor(brand: string, serialNumber: string, manufacturingSecret: string) {
        this.brand = brand
        this.serialNumber = serialNumber
        this.manufacturingSecret = manufacturingSecret
    }

    public displayBrand(): void {
        console.log(`The brand of the car is ${this.brand}`)
    }

    protected getSerialNumber(): string {
        return this.serialNumber
    }

    private retrieveManufacturingSecret(): void {
        console.log(`The manufacturing secret is ${this.manufacturingSecret}`)
    }
}

class Car extends Vehicule {
    public model: string

    constructor(brand: string, serialNumber: string, manufacturingSecret: string, model: string) {
        super(brand, serialNumber, serialNumber)
        this.model = model
    }

    public displayModel(): void {
        console.log(`This car is a ${this.model} model`)
    }

    public displaySerialNumber(): void {
        console.log(`The serial number of this car is ${this.getSerialNumber()}`)
    }

    public getManufacturingSecret(): void {
        // Accès non autorisé car secretDeFabrication est privé dans la classe parent
        // this.retrieveManufacturingSecret()
    }
}

const myCar = new Car("Renault", "65B876", "My secret", "Clio")

// Accessible car public
myCar.displayBrand()

// Accessible car public
myCar.displayModel()

// Inaccessible car privé
// myCar.retrieveManufacturingSecret()

// Inaccessible car privé
// console.log(myCar.manufacturingSecret)

// Inaccessible car protegé
// console.log(myCar.serialNumber)

// Par contre, je peux accéder à mon serialNumber car à cette méthode puisque c'est une classe héritée
myCar.displaySerialNumber()

// Accessible car public
console.log(myCar.brand)



