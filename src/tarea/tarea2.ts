import lector from "../lexer/lector";
import Lexer from "../lexer/lexer";
import Parser from "../parser/parser";
import Tarea from "./tarea";

export default class Tarea2 implements Tarea {
  async ejecutar(): Promise<void> {
    await lector.leerContenido(process.argv[2])

    const lexer = new Lexer()
    lexer.reiniciar()
    lexer.analizar()

    const parser = new Parser()
    parser.analizar(lexer)
    console.log(parser.resultadoAnalisis())
  }
}

