import EstrategiaComponenteLexico from "./estrategia-componente-lexico";


class PRFalse extends EstrategiaComponenteLexico {
  private static instancia: PRFalse

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new PRFalse()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()
    const regla = "FALSE"

    return regla.split("").every(caracterActual => {
      if (this.obtenerCaracterActual().toUpperCase() === caracterActual) {
        this.agregarCaracterALexema()

        if (caracterActual !== regla.charAt(regla.length - 1)) {
          this.avanzar()
        }

        return true
      }

      return false
    })
  }
}


export default PRFalse.obtenerInstancia()

