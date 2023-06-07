import lector from "../lexer/lector";
import Lexer from "../lexer/lexer";
import Tarea from "./tarea";


export default class Tarea1 implements Tarea {
  public async ejecutar(): Promise<void> {
    await lector.leerContenido(process.argv[2])

    const lexer = new Lexer()
    lexer.reiniciar()
    lexer.analizar()

    console.log(lexer.imprimir())
  }
}

