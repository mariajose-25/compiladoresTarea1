import Posicion from "./posicion";

export default class LexemaError extends Error {
  public lexema: string
  public posicion: Posicion

  constructor(lexema: string, posicion: Posicion) {
    super(lexema)
    this.lexema = lexema
    this.posicion = posicion

    Object.setPrototypeOf(this, LexemaError.prototype)
  }

  getErrorMessage() {
    return 'Lexema desconocido: ' + this.message;
  }
}
