export default class Posicion {
  public linea: number
  public columna: number
  private _lineaOriginal: number
  private _columnaOriginal: number

  constructor(linea: number = 0, columna: number = 0) {
    this.linea = linea
    this.columna = columna
    this._lineaOriginal = linea
    this._columnaOriginal = columna
  }

  public reiniciar(): boolean {
    this.linea = this._lineaOriginal
    this.columna = this._columnaOriginal
    return true
  }

  public avanzarLinea(): number {
    return this.linea++
  }

  public retrocederLinea(): number {
    if (this.linea <= 0) {
      return 0
    }

    return this.linea--
  }

  public avanzarColumna(): number {
    return this.columna++
  }

  public retrocederColumna(): number {
    if (this.columna <= 0) {
      return 0
    }

    return this.columna--
  }

  public imprimir(): string {
    const linea = `linea: ${this.linea + 1}`
    const columna = `columna: ${this.columna + 1}`

    return [linea, columna].join(", ")
  }
}

