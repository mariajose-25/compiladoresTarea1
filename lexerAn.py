import json

# Definición de patrones para cada tipo de token
patrones = [
    (r'\{', 'L_LLAVE'),
    (r'\}', 'R_LLAVE'),
    (r'\[', 'L_CORCHETE'),
    (r'\]', 'R_CORCHETE'),
    (r'\,', 'COMA'),
    (r'\:', 'DOS_PUNTOS'),
    (r'\"(\\.|[^\\"])*\"', 'STRING'),
    (r'true|false', 'PR_BOOLEAN'),
    (r'null', 'PR_NULL'),
    (r'-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?', 'NUMBER'),
]

# Función que implementa el analizador léxico
def analizador_lexico(linea):
    tokens = []
    while linea:
        # Ignorar espacios en blanco
        if linea[0] == ' ':
            linea = linea[1:]
            continue

        # Encontrar el primer patrón que coincida con la línea
        encontrado = False
        for patron in patrones:
            resultado = re.match(patron[0], linea)
            if resultado:
                tokens.append((resultado.group(0), patron[1]))
                linea = linea[len(resultado.group(0)):]
                encontrado = True
                break

        # Si no se encontró ningún patrón, hay un carácter no válido
        if not encontrado:
            # Imprimir mensaje de error y continuar con la siguiente línea
            print("Error léxico: carácter no válido en la línea", linea)
            return []

    return tokens

# Leer el archivo JSON
with open("entrada.json") as archivo:
    # Cargar el JSON en un objeto Python
    objeto = json.load(archivo)

    # Generar los tokens
    def generar_tokens(objeto):
        if isinstance(objeto, dict):
            yield 'L_LLAVE', None
            for clave, valor in objeto.items():
                yield 'STRING', clave
                yield 'DOS_PUNTOS', None
                yield from generar_tokens(valor)
                yield 'COMA', None
            yield 'R_LLAVE', None
        elif isinstance(objeto, list):
            yield 'L_CORCHETE', None
            for valor in objeto:
                yield from generar_tokens(valor)
                yield 'COMA', None
            yield 'R_CORCHETE', None
        elif isinstance(objeto, bool):
            yield 'PR_BOOLEAN', str(objeto).lower()
        elif isinstance(objeto, (int, float)):
            yield 'NUMBER', str(objeto)
        elif objeto is None:
            yield 'PR_NULL', None
        elif isinstance(objeto, str):
            yield 'STRING', objeto
        else:
            raise ValueError("Tipo de objeto no soportado: {}".format(type(objeto).__name__))

    # Imprimir los tokens
    for token in generar_tokens(objeto):
        print(token[0], end=" ")
        if token[1] is not None:
            print(token[1], end="")
        print()

