import ComponenteLexicoEnum from "../../lexer/componente-lexico.enum"
import Lexer from "../../lexer/lexer"
import Token from "../../lexer/token"
import TokenIterador from "../../lexer/token-iterador"


export default abstract class EstrategiaParser {
  protected resultado: boolean = true
  protected tokens: TokenIterador
  protected tokenActual: Token

  constructor(lexer: Lexer) {
    lexer.reiniciar()
    this.tokens = lexer.analizar()
    this.tokenActual = this.tokens.next().value
  }

  protected error(conjunto: ComponenteLexicoEnum[]): void {
    this.resultado = false
    let mensaje = "Error sintactico, se obtuvo: "
    mensaje += this.tokenActual.lexema + " "
    mensaje += "se esperaban los siguientes componentes: "
    mensaje += conjunto.join(", ")

    console.log(mensaje)
  }

  protected verificar(componente: ComponenteLexicoEnum): boolean {
    if (this.tokenActual.obtenerFamilia() === componente) {
      this.siguienteToken()
      return true
    }
    else {
      this.error([componente])
      return true
    }
  }

  protected siguienteToken(): Token {
    const token = this.tokens.next()

    if (token.done === true) {
      return this.tokenActual
    }

    this.tokenActual = token.value
    return this.tokenActual
  }

  protected esFinContenido(): boolean {
    return this.tokens.final
  }

  abstract analizar(): boolean
}



