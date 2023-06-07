import EstrategiaComponenteLexico from "./estrategia-componente-lexico"


class LCorchete extends EstrategiaComponenteLexico {
  private static instancia: LCorchete

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new LCorchete()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.obtenerCaracterActual() === "[") {
      this.agregarCaracterALexema()

      return true
    }

    return false
  }
}


export default LCorchete.obtenerInstancia()

