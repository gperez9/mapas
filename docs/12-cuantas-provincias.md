# Especificación funcional — Cuántas Provincias

## Juego

**Cuántas Provincias**

## Objetivo

Practicar cuántas provincias tiene cada comunidad autónoma.

## Flujo

- En cada partida se pregunta por todas las comunidades autónomas.
- El orden de las comunidades es aleatorio.
- La pregunta tiene la forma: `¿Cuántas provincias tiene XXX?`
- La respuesta es numérica.
- Tras responder, se muestra feedback inmediato.
- Al terminar, se muestra el resultado integrado con la pantalla común.

## Datos

El número correcto no se guarda en una tabla separada. Se calcula contando las provincias de `src/data/provinces.ts` que pertenecen a cada `communityId`.

## Estado

Implementado y disponible desde la pantalla inicial.
