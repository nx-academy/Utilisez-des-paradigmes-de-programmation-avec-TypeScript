interface Recordable {
  handleRecording(): void;
}

class Microphone implements Recordable {
  buildingMaterial: string[]
  isRecording: boolean
  recordingLevel: number
  size: number

  constructor(recordingLevel: number) {
    this.buildingMaterial = ["metal", "plastic"]
    this.isRecording = false
    this.recordingLevel = recordingLevel
    this.size = 100
  }

  handleRecording() {
    // Fait quelque chose
  }
}

const myMicrophone = new Microphone(50)

