import LexemaError from "../lexema-error";
import EstrategiaComponenteLexico from "./estrategia-componente-lexico";


class LiteralNum extends EstrategiaComponenteLexico {
  private static instancia: LiteralNum

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new LiteralNum()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.esDigito() === true) {
      while (this.esDigito() === true) {
        this.agregarCaracterALexema()
        this.avanzar()
      }

      if (this.obtenerCaracterActual() === ".") {
        this.agregarCaracterALexema()
        this.avanzar()

        if (this.esDigito() === true) {
          while (this.esDigito() === true) {
            this.agregarCaracterALexema()
            this.avanzar()
          }
        }
        else {
          this.retroceder()
          throw new LexemaError(this.lexema, this.posicion)
        }
      }

      if (this.esExponente() === true) {
        this.agregarCaracterALexema()
        this.avanzar()

        if (this.esSigno() === true) {
          this.agregarCaracterALexema()
          this.avanzar()
        }

        if (this.esDigito() === true) {
          while (this.esDigito() === true) {
            this.agregarCaracterALexema()
            this.avanzar()
          }
        }
        else {
          this.retroceder()
          throw new LexemaError(this.lexema, this.posicion)
        }
      }

      this.retroceder()
      return true
    }

    return false
  }

  private esDigito(): boolean {
    return /\d/.test(this.obtenerCaracterActual())
  }

  private esExponente(): boolean {
    return this.obtenerCaracterActual().toUpperCase() === "E"
  }

  private esSigno(): boolean {
    return ["+", "-"].includes(this.obtenerCaracterActual())
  }
}


export default LiteralNum.obtenerInstancia()

