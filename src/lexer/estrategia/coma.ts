import EstrategiaComponenteLexico from "./estrategia-componente-lexico";


class Coma extends EstrategiaComponenteLexico {
  private static instancia: Coma

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new Coma()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()

    if (this.obtenerCaracterActual() === ",") {
      this.agregarCaracterALexema()
      return true
    }

    return false
  }
}


export default Coma.obtenerInstancia()

