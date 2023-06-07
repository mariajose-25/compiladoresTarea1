import * as readline from "readline"

export default class Entrada {
  private _lector: any

  constructor() {
    this._lector = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
      this._lector.question(pregunta, (respuesta: string) => {
        return resolve(respuesta.trim())
      })
    })
  }

  limpiar(): void {
    this._lector.on('data', () => {
      null
    })

  }
}
