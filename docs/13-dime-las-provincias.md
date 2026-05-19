# Especificación funcional — Dime las provincias

## Juego

**Dime las provincias**

## Objetivo

Practicar la lista de provincias que pertenecen a cada comunidad autónoma.

## Flujo

- En cada partida se pregunta por todas las comunidades autónomas con provincias.
- El orden de las comunidades es aleatorio.
- La pregunta tiene la forma: `Dime las provincias de XXX`.
- El usuario escribe una lista libre de provincias.
- Tras responder, se indica cuántas provincias de esa comunidad ha acertado y cuáles faltaban.
- Al terminar, la nota se calcula como:

`provincias acertadas / número total de provincias`

## Corrección flexible

El parser acepta:

- comas;
- punto y coma;
- saltos de línea;
- barras;
- la conjunción `y`;
- espacios sobrantes;
- ausencia de tildes;
- variantes locales incluidas en el catálogo de provincias.

La corrección reconoce nombres de provincia como expresiones dentro del texto completo, por lo que no depende de un único separador obligatorio.

## Estado

Implementado y disponible desde la pantalla inicial.
