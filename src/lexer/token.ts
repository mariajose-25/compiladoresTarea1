import ComponenteLexicoEnum from "./componente-lexico.enum"
import Posicion from "./posicion"


export default class Token {
  public componenteLexico: ComponenteLexicoEnum
  public lexema: string
  public posicion: Posicion

  constructor(
    componenteLexico: ComponenteLexicoEnum,
    lexema: string,
    posicion: Posicion
  ) {
    this.componenteLexico = componenteLexico
    this.lexema = lexema
    this.posicion = posicion
  }

  public obtenerFamilia(): ComponenteLexicoEnum {
    return this.componenteLexico
  }

  public imprimirPosicion(): string {
    return this.posicion.imprimir()
  }

  public imprimir(): string {
    const familia = `Familia: ${this.componenteLexico}`
    const lexema = `lexema: ${this.lexema}`

    return [familia, this.posicion.imprimir(), lexema].join(", ")
  }
}

