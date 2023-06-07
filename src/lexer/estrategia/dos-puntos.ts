import EstrategiaComponenteLexico from "./estrategia-componente-lexico"


class DosPuntos extends EstrategiaComponenteLexico {
  private static instancia: DosPuntos

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new DosPuntos()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.obtenerCaracterActual() === ":") {
      this.agregarCaracterALexema()

      return true
    }

    return false
  }
}


export default DosPuntos.obtenerInstancia()

