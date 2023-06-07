import lector from "../lector"
import Posicion from "../posicion"

export default abstract class EstrategiaComponenteLexico {
  public _lexema: string = ""
  public _posicion: Posicion = new Posicion()

  public constructor() { }

  public get lexema(): string {
    return this._lexema
  }

  public get posicion(): Posicion {
    return this._posicion
  }

  public reiniciar(): boolean {
    this.restaurarLexema()
    this.establecerPosicion()

    return true
  }

  private restaurarLexema(): string {
    this._lexema = ""
    return this.lexema
  }

  private establecerPosicion(): Posicion {
    const posicion = lector.posicion
    this._posicion = new Posicion(posicion.linea, posicion.columna)

    return this._posicion
  }

  public abstract analizar(): boolean

  public avanzar(): boolean {
    return lector.avanzar()
  }

  public retroceder(): boolean {
    return lector.retroceder()
  }

  public obtenerCaracterActual(): string {
    return lector.obtenerCaracterActual()
  }

  public agregarCaracterALexema(): string {
    this._lexema = this._lexema + this.obtenerCaracterActual()
    return this.lexema
  }

  public esSaltoDeLinea(): boolean {
    return lector.esSaltoDeLinea()
  }

  public esFinDeContenido(): boolean {
    return lector.esFinDeContenido()
  }
}

