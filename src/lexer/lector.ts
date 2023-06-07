import { readFile } from "fs"
import { promisify } from "util"
import Posicion from "./posicion"

export class LectorSingleton {
  private static instancia: LectorSingleton
  private _contenido: string = ""
  private _posicion: Posicion = new Posicion()

  private constructor() { }

  public async leerContenido(ruta: string): Promise<string> {
    try {
      const readFileAsync = promisify(readFile)
      this._contenido = await readFileAsync(ruta, "utf8")
      this.reiniciar()
      return this._contenido
    }
    catch (err) {
      throw new Error("No se pudo leer el archivo")
    }

  }

  public static obtenerInstancia(): LectorSingleton {
    if (this.instancia === undefined) {
      this.instancia = new LectorSingleton()
    }

    return this.instancia
  }

  public get contenido(): string {
    return this._contenido
  }

  public get posicion(): Posicion {
    return this._posicion
  }

  private get columnaActual(): number {
    return this._posicion.columna
  }

  public reiniciar(): boolean {
    this._posicion.reiniciar()
    return true
  }

  public obtenerCaracterActual(): string {
    return this.contenido[this._posicion.columna]
  }

  public avanzar(): boolean {
    if (this.esFinDeContenido() === true) {
      return false
    }

    this.avanzarColumna()

    if (this.esSaltoDeLinea() === true) {
      this.avanzarLinea()
    }

    return true
  }

  public retroceder(): boolean {
    if (this.esInicioDeContenido() === true) {
      return false
    }

    this.retrocederColumna()

    if (this.esSaltoDeLinea() === true) {
      this.retrocederLinea()
    }

    return true
  }

  private esInicioDeContenido(): boolean {
    return this.posicion.columna === 0 && this.posicion.linea === 0
  }

  public esFinDeContenido(): boolean {
    return this.columnaActual >= this.contenido.length
  }

  private avanzarColumna(): boolean {
    this._posicion.avanzarColumna()
    return true
  }

  private retrocederColumna(): boolean {
    this._posicion.retrocederColumna()
    return true
  }

  public esSaltoDeLinea(): boolean {
    return this.obtenerCaracterActual() === "\n"
  }

  private avanzarLinea(): boolean {
    this._posicion.avanzarLinea()
    return true
  }

  private retrocederLinea(): boolean {
    this._posicion.retrocederLinea()
    return true
  }

  public esEspacioEnBlanco(): boolean {
    return this.obtenerCaracterActual() === " "
  }
}


export default LectorSingleton.obtenerInstancia()

