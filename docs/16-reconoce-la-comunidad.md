# Especificación funcional — Reconoce la Comunidad

## Juego

**Reconoce la Comunidad**

## Objetivo

Practicar el reconocimiento visual de cada comunidad autónoma a partir de su silueta aislada, sin el contexto del mapa completo.

## Flujo

- En cada partida aparecen las 17 comunidades autónomas.
- El orden es aleatorio.
- En cada pregunta se muestra una comunidad aislada y centrada.
- El usuario escribe su nombre.
- Se muestra feedback inmediato.
- Al final se usa la pantalla común de resultados con mapa de comunidades.

## Corrección

Se reutiliza la corrección tolerante de comunidades:

- admite tildes omitidas;
- admite pequeñas erratas;
- admite variantes cooficiales previstas, como `Euskadi` o `Catalunya`.

## Decisiones visuales

- Se ocultan todas las demás comunidades.
- Cada CCAA tiene un recorte aproximado para que la silueta no quede demasiado pequeña.
- Canarias se muestra en su recuadro insular.

## Estado

Implementado y disponible desde la pantalla inicial.

## Riesgos abiertos

- Ajustar manualmente algún recorte si una silueta aparece demasiado grande, pequeña o cortada.
