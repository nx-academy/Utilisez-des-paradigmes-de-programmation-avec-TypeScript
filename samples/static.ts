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

class CarFactory {
    private static availableModels: string[] = ["Twingo", "Clio", "Megane"]

    public static isModelAvailable(model: string): boolean {
        return this.availableModels.includes(model)
    }

    public static createCar(brand: string, model: string, serialNumber: string): Car | null {
        if (!this.isModelAvailable(model)) {
            console.log(`Model ${model} is not available`)
            return null
        }

        const manufacturingSecret = `secret-${model}-${serialNumber}`
        return new Car(brand, serialNumber, manufacturingSecret, model)
    }
}

if (CarFactory.isModelAvailable('Clio')) {
    const myNewCar = CarFactory.createCar('Renault', 'Clio', "65B879")
    myNewCar?.displayBrand()
    myNewCar?.displayModel()
}
