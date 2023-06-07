import Lexer from "../lexer/lexer";
import DescendenteRecursivo from "./estrategia/descendente-recursivo";
import EstrategiaParser from "./estrategia/estrategia-parser";

export default class Parser {
  private _resultado: boolean = true

  public analizar(lexer: Lexer): boolean {
    if (lexer.numeroDeErrores() > 0) {
      throw new Error(lexer.imprimirReporteError())
    }

    const estrategia: EstrategiaParser = new DescendenteRecursivo(lexer)
    this._resultado = estrategia.analizar()
    return this._resultado
  }

  public resultadoAnalisis(): string {
    return this._resultado === true ? "SINTAXIS CORRECTA" : "SINTAXIS INCORRECTA"
  }
}


