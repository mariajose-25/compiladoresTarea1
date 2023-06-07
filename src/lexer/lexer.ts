import ComponenteLexicoEnum from "./componente-lexico.enum";
import LexemaError from "./lexema-error";
import coma from "./estrategia/coma";
import dosPuntos from "./estrategia/dos-puntos";
import EstrategiaComponenteLexico from "./estrategia/estrategia-componente-lexico";
import lCorchete from "./estrategia/l-corchete";
import lLlave from "./estrategia/l-llave";
import literalCadena from "./estrategia/literal-cadena";
import literalNum from "./estrategia/literal-num";
import prFalse from "./estrategia/pr-false";
import prNull from "./estrategia/pr-null";
import prTrue from "./estrategia/pr-true";
import rCorchete from "./estrategia/r-corchete";
import rLlave from "./estrategia/r-llave";
import lector from "./lector";
import Posicion from "./posicion";
import TokenIterador from "./token-iterador";
import Token from "./token";

export default class Lexer {
  private _tokens: TokenIterador = new TokenIterador()
  private _contenido: string = ""
  public _errores: number = 0

  constructor() { }

  private get posicion(): Posicion {
    return lector.posicion
  }

  public get tokens(): TokenIterador {
    return this._tokens
  }

  public reiniciar(): boolean {
    this._tokens = new TokenIterador()
    this._contenido = ""
    lector.reiniciar()

    return true
  }

  public numeroDeErrores(): number {
    return this._errores
  }

  public imprimirReporteError(): string {
    if (this.numeroDeErrores() === 1) {
      return `Se encontro ${this.numeroDeErrores()} error semantico`
    }

    return `Se encontraron ${this.numeroDeErrores()} errores semanticos`
  }

  public analizar(): TokenIterador {
    try {
      if (this.esFinDeContenido() === true) {
        return this.tokens
      }
      else if (this.esEspacioEnBlanco() === true) {
        this.agregarCaracterAContenido()
      }
      else if (this.esSaltoDeLinea() === true) {
        this.agregarCaracterAContenido()
      }
      else if (lLlave.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.L_LLAVE, lLlave)
      }
      else if (rLlave.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.R_LLAVE, rLlave)
      }
      else if (lCorchete.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.L_CORCHETE, lCorchete)
      }
      else if (rCorchete.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.R_CORCHETE, rCorchete)
      }
      else if (coma.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.COMA, coma)
      }
      else if (dosPuntos.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.DOS_PUNTOS, dosPuntos)
      }
      else if (prTrue.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.PR_TRUE, prTrue)
      }
      else if (prFalse.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.PR_FALSE, prFalse)
      }
      else if (prNull.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.PR_NULL, prNull)
      }
      else if (literalCadena.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.LITERAL_CADENA, literalCadena)
      }
      else if (literalNum.analizar() === true) {
        this.agregarToken(ComponenteLexicoEnum.LITERAL_NUM, literalNum)
      }
      else {
        throw new LexemaError(this.obtenerCaracterActual(), this.posicion)
      }
    }
    catch (err) {
      if (err instanceof LexemaError) {
        this.agregarTokenError(err.lexema, err.posicion)
        this._errores += 1
      }
    }

    this.avanzar()
    return this.analizar()
  }

  private agregarToken(
    tipo: ComponenteLexicoEnum,
    estrategia: EstrategiaComponenteLexico
  ): Token {
    const token = new Token(tipo, estrategia.lexema, estrategia.posicion)
    this.tokens.agregar(token)

    this.agregarTokenAContenido(token)

    return token
  }

  private agregarTokenError(lexema: string, posicion: Posicion): Token {
    const token = new Token(ComponenteLexicoEnum.ERROR, lexema, posicion)
    this.tokens.agregar(token)

    this.agregarTokenAContenido(token)

    return token
  }

  private agregarTokenAContenido(token: Token): string {
    const ultimoCaracter = this._contenido.charAt(this._contenido.length - 1)

    if (this._contenido.length > 0 && /\s|\n/.test(ultimoCaracter) === false) {
      this._contenido = this._contenido + " "
    }

    this._contenido = this._contenido + token.obtenerFamilia()

    return this._contenido
  }

  private agregarCaracterAContenido(): string {
    this._contenido = this._contenido + this.obtenerCaracterActual()
    return this._contenido
  }

  private esFinDeContenido(): boolean {
    return lector.esFinDeContenido()
  }

  private avanzar(): boolean {
    return lector.avanzar()
  }

  private esEspacioEnBlanco(): boolean {
    return lector.esEspacioEnBlanco()
  }

  private esSaltoDeLinea(): boolean {
    return lector.esSaltoDeLinea()
  }

  private obtenerCaracterActual(): string {
    return lector.obtenerCaracterActual()
  }

  public imprimir(): string {
    return this._contenido
  }
}

