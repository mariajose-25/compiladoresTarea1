import Tarea from "./tarea";
import Tarea1 from "./tarea1";
import Tarea2 from "./tarea2";


export default class TareaFabrica {
  crear(numero: number): Tarea {
    switch (numero) {
      case (1):
        return new Tarea1()
      case (2):
        return new Tarea2()
      default:
        throw new Error("No existe ese numero de tarea")
    }
  }
}

