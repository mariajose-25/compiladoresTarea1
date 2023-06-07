import EstrategiaComponenteLexico from "./estrategia-componente-lexico"


class RLlave extends EstrategiaComponenteLexico {
  private static instancia: RLlave

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new RLlave()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.obtenerCaracterActual() === "}") {
      this.agregarCaracterALexema()

      return true
    }

    return false
  }
}


export default RLlave.obtenerInstancia()

