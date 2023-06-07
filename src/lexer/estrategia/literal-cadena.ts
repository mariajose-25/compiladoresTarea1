import LexemaError from "../lexema-error";
import EstrategiaComponenteLexico from "./estrategia-componente-lexico";


class LiteralCadena extends EstrategiaComponenteLexico {
  private static instancia: LiteralCadena

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new LiteralCadena()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.obtenerCaracterActual() === '"') {
      this.agregarCaracterALexema()
      this.avanzar()

      while (this.obtenerCaracterActual() !== '"') {
        if (this.esSaltoDeLinea() || this.esFinDeContenido()) {
          this.retroceder()
          throw new LexemaError(this.lexema, this.posicion)
        }
        else {
          this.agregarCaracterALexema()
          this.avanzar()
        }
      }
      this.agregarCaracterALexema()

      return true
    }

    return false
  }
}


export default LiteralCadena.obtenerInstancia()

