import EstrategiaComponenteLexico from "./estrategia-componente-lexico"


class PRNull extends EstrategiaComponenteLexico {
  private static instancia: PRNull

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new PRNull()
    }

    return this.instancia
  }
  public analizar(): boolean {
    this.reiniciar()
    const regla = "NULL"

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


export default PRNull.obtenerInstancia()

