import EstrategiaComponenteLexico from "./estrategia-componente-lexico"


class LLlave extends EstrategiaComponenteLexico {
  private static instancia: LLlave

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new LLlave()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.obtenerCaracterActual() === "{") {
      this.agregarCaracterALexema()

      return true
    }

    return false
  }
}


export default LLlave.obtenerInstancia()

