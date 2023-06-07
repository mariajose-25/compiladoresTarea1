import Entrada from "./entrada";
import Tarea from "./tarea/tarea"
import TareaFabrica from "./tarea/tarea-fabrica"


const entrada = new Entrada()

const preguntar = async (): Promise<number> => {
  const valor = await entrada.preguntar(
    'Ingresa el numero de la tarea [1, 2] o 0 para salir: ')

  entrada.limpiar()

  return Number(valor)
}


async function main(): Promise<void> {
  try {
    const numeroTarea = await preguntar()

    if ([1, 2].includes(numeroTarea)) {
      const tarea: Tarea = new TareaFabrica().crear(numeroTarea)
      await tarea.ejecutar()
      main()
    }
    else if (numeroTarea === 0) {
      process.exit(0)
    }
    else {
      console.log("Caracter no reconocido")
    }

    main()
  }
  catch (err: any) {
    console.log(err.message)
    process.exit(0)
  }
}

main()

