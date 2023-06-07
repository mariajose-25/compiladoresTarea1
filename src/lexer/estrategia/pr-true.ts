import EstrategiaComponenteLexico from "./estrategia-componente-lexico"


class PRTrue extends EstrategiaComponenteLexico {
  private static instancia: PRTrue

  private constructor() { super() }

  public static obtenerInstancia() {
    if (this.instancia === undefined) {
      this.instancia = new PRTrue()
    }

    return this.instancia
  }

  public analizar(): boolean {
    this.reiniciar()
    const regla = "TRUE"

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


export default PRTrue.obtenerInstancia()

