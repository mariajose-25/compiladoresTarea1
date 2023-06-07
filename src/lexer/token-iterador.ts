import Token from "./token";


export default class TokenIterador implements IterableIterator<Token> {
  private _tokens: Token[]
  private indice: number
  private _final: boolean = true

  constructor() {
    this._tokens = []
    this.indice = 0
  }

  public agregar(token: Token): Token {
    this._tokens.push(token)
    this._final = false
    return token
  }

  public get final(): boolean {
    return this._final
  }

  public next(): IteratorResult<Token> {
    if (this.indice < this._tokens.length) {
      const token = this._tokens[this.indice]

      this.indice += 1

      return { value: token, done: false }
    }
    else {
      this._final = true
      return { value: undefined, done: true }
    }
  }

  public [Symbol.iterator](): IterableIterator<Token> {
    return this;
  }
}

