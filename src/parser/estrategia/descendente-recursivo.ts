import ComponenteLexicoEnum from "../../lexer/componente-lexico.enum"
import Lexer from "../../lexer/lexer"
import EstrategiaParser from "./estrategia-parser"


interface Conjunto {
  json: ComponenteLexicoEnum[],
  element: ComponenteLexicoEnum[],
  array: ComponenteLexicoEnum[],
  arrayPrima: ComponenteLexicoEnum[],
  elementList: ComponenteLexicoEnum[],
  elementListPrima: ComponenteLexicoEnum[],
  object: ComponenteLexicoEnum[],
  objectPrima: ComponenteLexicoEnum[],
  attributeList: ComponenteLexicoEnum[],
  attributeListPrima: ComponenteLexicoEnum[],
  attribute: ComponenteLexicoEnum[],
  attributeName: ComponenteLexicoEnum[],
  attributeValue: ComponenteLexicoEnum[],
}


const conjuntoPrimero: Conjunto = {
  json: [ComponenteLexicoEnum.L_LLAVE, ComponenteLexicoEnum.L_CORCHETE],
  element: [ComponenteLexicoEnum.L_LLAVE, ComponenteLexicoEnum.L_CORCHETE],
  array: [ComponenteLexicoEnum.L_CORCHETE],
  arrayPrima: [
    ComponenteLexicoEnum.L_LLAVE,
    ComponenteLexicoEnum.L_CORCHETE,
    ComponenteLexicoEnum.R_CORCHETE
  ],
  elementList: [ComponenteLexicoEnum.L_LLAVE, ComponenteLexicoEnum.L_CORCHETE],
  elementListPrima: [ComponenteLexicoEnum.COMA, ComponenteLexicoEnum.EMPTY],
  object: [ComponenteLexicoEnum.L_LLAVE],
  objectPrima: [
    ComponenteLexicoEnum.LITERAL_CADENA,
    ComponenteLexicoEnum.R_LLAVE
  ],
  attributeList: [ComponenteLexicoEnum.LITERAL_CADENA],
  attributeListPrima: [ComponenteLexicoEnum.COMA, ComponenteLexicoEnum.EMPTY],
  attribute: [ComponenteLexicoEnum.LITERAL_CADENA],
  attributeName: [ComponenteLexicoEnum.LITERAL_CADENA],
  attributeValue: [
    ComponenteLexicoEnum.L_LLAVE,
    ComponenteLexicoEnum.L_CORCHETE,
    ComponenteLexicoEnum.LITERAL_CADENA,
    ComponenteLexicoEnum.LITERAL_NUM,
    ComponenteLexicoEnum.PR_TRUE,
    ComponenteLexicoEnum.PR_FALSE,
    ComponenteLexicoEnum.PR_NULL
  ],
}

const conjuntoSiguiente: Conjunto = {
  json: [ComponenteLexicoEnum.EOF],
  element: [
    ComponenteLexicoEnum.EOF,
    ComponenteLexicoEnum.COMA,
    ComponenteLexicoEnum.R_LLAVE,
    ComponenteLexicoEnum.R_CORCHETE
  ],
  array: [
    ComponenteLexicoEnum.EOF,
    ComponenteLexicoEnum.COMA,
    ComponenteLexicoEnum.R_LLAVE,
    ComponenteLexicoEnum.R_CORCHETE
  ],
  arrayPrima: [
    ComponenteLexicoEnum.EOF,
    ComponenteLexicoEnum.COMA,
    ComponenteLexicoEnum.R_LLAVE,
    ComponenteLexicoEnum.R_CORCHETE
  ],
  elementList: [ComponenteLexicoEnum.R_CORCHETE],
  elementListPrima: [ComponenteLexicoEnum.R_CORCHETE],
  object: [
    ComponenteLexicoEnum.EOF,
    ComponenteLexicoEnum.COMA,
    ComponenteLexicoEnum.R_LLAVE,
    ComponenteLexicoEnum.R_CORCHETE
  ],
  objectPrima: [
    ComponenteLexicoEnum.EOF,
    ComponenteLexicoEnum.COMA,
    ComponenteLexicoEnum.R_LLAVE,
    ComponenteLexicoEnum.R_CORCHETE
  ],
  attributeList: [ComponenteLexicoEnum.R_LLAVE],
  attributeListPrima: [ComponenteLexicoEnum.R_LLAVE],
  attribute: [ComponenteLexicoEnum.COMA, ComponenteLexicoEnum.R_LLAVE],
  attributeName: [ComponenteLexicoEnum.DOS_PUNTOS],
  attributeValue: [
    ComponenteLexicoEnum.COMA,
    ComponenteLexicoEnum.R_LLAVE,
  ]
}

interface Conjuntos {
  primero: Conjunto,
  siguiente: Conjunto
}

const conjuntos: Conjuntos = {
  primero: conjuntoPrimero,
  siguiente: conjuntoSiguiente
}


export default class DescendenteRecursivo extends EstrategiaParser {
  constructor(lexer: Lexer) { super(lexer) }

  public analizar(): boolean {
    try {
      this.json(conjuntos.siguiente.json)
      return this.resultado
    }
    catch (err) {
      return false
    }
  }

  private verificarTokenActual(
    conjuntoPrimero: ComponenteLexicoEnum[],
    conjuntoSiguiente: ComponenteLexicoEnum[]
  ): boolean {
    if (this.esFinContenido() === true && conjuntoPrimero.includes(ComponenteLexicoEnum.EOF) === true) {
      return true
    }
    else if (conjuntoPrimero.includes(this.tokenActual.obtenerFamilia()) === false) {
      if (conjuntoPrimero.includes(ComponenteLexicoEnum.EMPTY) === false) {
        this.error(conjuntoPrimero)
        this.escanear([...conjuntoPrimero, ...conjuntoSiguiente])
      }
    }

    return true
  }

  private escanear(conjunto: ComponenteLexicoEnum[]): void {
    this.siguienteToken()
    const tokenActual = this.tokenActual.obtenerFamilia()
    if ([...conjunto, ComponenteLexicoEnum.EOF].includes(tokenActual) === true) {
      return
    }

    return this.escanear(conjunto)
  }

  public json(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.json,
      conjuntoSiguiente
    )
    this.element(conjuntos.siguiente.element)
    this.verificarTokenActual(
      conjuntoSiguiente,
      conjuntos.primero.json
    )

    return true
  }

  public element(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.element,
      conjuntoSiguiente
    )

    switch (this.tokenActual.obtenerFamilia()) {
      case (ComponenteLexicoEnum.L_LLAVE):
        this.object(conjuntos.siguiente.object)
        break

      case (ComponenteLexicoEnum.L_CORCHETE):
        this.array(conjuntos.siguiente.array)
        break
    }
    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.element)

    return true
  }

  public object(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.object,
      conjuntoSiguiente
    )

    this.verificar(ComponenteLexicoEnum.L_LLAVE)
    this.objectPrima(conjuntos.siguiente.objectPrima)

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.object)
    return true
  }

  public array(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.array,
      conjuntoSiguiente
    )

    this.verificar(ComponenteLexicoEnum.L_CORCHETE)
    this.arrayPrima(conjuntos.siguiente.arrayPrima)

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.array)
    return true
  }

  public objectPrima(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.objectPrima,
      conjuntoSiguiente
    )

    switch (this.tokenActual.obtenerFamilia()) {
      case (ComponenteLexicoEnum.LITERAL_CADENA):
        this.attributeList(conjuntos.siguiente.attributeList)
        this.verificar(ComponenteLexicoEnum.R_LLAVE)
        break

      case (ComponenteLexicoEnum.R_LLAVE):
        this.verificar(ComponenteLexicoEnum.R_LLAVE)
        break
    }

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.objectPrima)
    return true
  }

  public arrayPrima(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.arrayPrima,
      conjuntoSiguiente
    )

    switch (this.tokenActual.obtenerFamilia()) {
      case (ComponenteLexicoEnum.L_LLAVE):
      case (ComponenteLexicoEnum.L_CORCHETE):
        this.elementList(conjuntos.siguiente.elementList)
        this.verificar(ComponenteLexicoEnum.R_CORCHETE)
        break

      case (ComponenteLexicoEnum.R_CORCHETE):
        this.verificar(ComponenteLexicoEnum.R_CORCHETE)
        break
    }

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.arrayPrima)
    return true
  }

  public attributeList(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.attributeList,
      conjuntoSiguiente
    )

    this.attribute(conjuntos.siguiente.attribute)
    this.attributeListPrima(conjuntos.siguiente.attributeListPrima)

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.attributeList)
    return true
  }

  public elementList(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.elementList,
      conjuntoSiguiente
    )

    this.element(conjuntos.siguiente.element)
    this.elementListPrima(conjuntos.siguiente.elementListPrima)

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.elementList)
    return true
  }

  public attribute(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.attribute,
      conjuntoSiguiente
    )

    this.attributeName(conjuntos.siguiente.attributeName)
    this.verificar(ComponenteLexicoEnum.DOS_PUNTOS)
    this.attributeValue(conjuntos.siguiente.attributeValue)

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.attribute)
    return true
  }

  public attributeListPrima(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.attributeListPrima,
      conjuntoSiguiente
    )

    switch (this.tokenActual.obtenerFamilia()) {
      case (ComponenteLexicoEnum.COMA):
        this.verificar(ComponenteLexicoEnum.COMA)
        this.attribute(conjuntos.siguiente.attribute)
        this.attributeListPrima(conjuntoSiguiente)
        break
    }

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.attributeListPrima)
    return true
  }

  public elementListPrima(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.elementListPrima,
      conjuntoSiguiente
    )

    switch (this.tokenActual.obtenerFamilia()) {
      case (ComponenteLexicoEnum.COMA):
        this.verificar(ComponenteLexicoEnum.COMA)
        this.element(conjuntos.siguiente.element)
        this.elementListPrima(conjuntos.siguiente.elementListPrima)
        break
    }

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.elementListPrima)
    return true
  }

  public attributeName(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.attributeName,
      conjuntoSiguiente
    )

    this.verificar(ComponenteLexicoEnum.LITERAL_CADENA)

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.attributeName)
    return true
  }

  public attributeValue(conjuntoSiguiente: ComponenteLexicoEnum[]): boolean {
    this.verificarTokenActual(
      conjuntos.primero.attributeValue,
      conjuntoSiguiente
    )

    switch (this.tokenActual.obtenerFamilia()) {
      case (ComponenteLexicoEnum.L_LLAVE):
      case (ComponenteLexicoEnum.L_CORCHETE):
        this.element(conjuntos.siguiente.element)
        break

      case (ComponenteLexicoEnum.LITERAL_CADENA):
        this.verificar(ComponenteLexicoEnum.LITERAL_CADENA)
        break

      case (ComponenteLexicoEnum.LITERAL_NUM):
        this.verificar(ComponenteLexicoEnum.LITERAL_NUM)
        break

      case (ComponenteLexicoEnum.PR_TRUE):
        this.verificar(ComponenteLexicoEnum.PR_TRUE)
        break

      case (ComponenteLexicoEnum.PR_FALSE):
        this.verificar(ComponenteLexicoEnum.PR_FALSE)
        break

      case (ComponenteLexicoEnum.PR_NULL):
        this.verificar(ComponenteLexicoEnum.PR_NULL)
        break
    }

    this.verificarTokenActual(conjuntoSiguiente, conjuntos.primero.attributeValue)
    return true
  }
}


