import EstrategiaComponenteLexico from "./estrategia-componente-lexico"


class RCorchete extends EstrategiaComponenteLexico {
  private static instancia: RCorchete

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new RCorchete()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.obtenerCaracterActual() === "]") {
      this.agregarCaracterALexema()

      return true
    }

    return false
  }
}


export default RCorchete.obtenerInstancia()

