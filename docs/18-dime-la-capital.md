# Especificación funcional — Dime la capital

## Juego

**Dime la capital**

## Objetivo

Practicar las capitales de las comunidades autónomas mediante preguntas directas de respuesta escrita.

## Flujo

- En cada partida aparecen las 17 comunidades autónomas.
- El orden es aleatorio.
- En cada pregunta se muestra una comunidad autónoma.
- El usuario escribe la capital correspondiente.
- Se muestra feedback inmediato.
- Al final se usa la pantalla común de resultados sin mapa.

## Corrección

La respuesta escrita se evalúa con tolerancia ortográfica:

- se ignoran mayúsculas, minúsculas y tildes;
- se aceptan pequeñas erratas;
- se admiten variantes locales o nombres de uso común cuando procede.

## Casos especiales

- **Canarias**: se muestra como capitalidad compartida: Las Palmas de Gran Canaria o Santa Cruz de Tenerife. Se acepta cualquiera de las dos, o ambas.
- **Islas Baleares**: se acepta `Palma` y también `Palma de Mallorca`.
- **Comunidad Valenciana**: se acepta `Valencia` y `València`.
- **Navarra**: se acepta `Pamplona` e `Iruña`.
- **País Vasco**: se acepta `Vitoria-Gasteiz`, `Vitoria` y `Gasteiz`.
- **Castilla y León**: se usa `Valladolid` como capital/sede de referencia para el juego.

## Puntuación

- Cada comunidad autónoma cuenta como una pregunta.
- Cada respuesta correcta suma un acierto.
- La nota final es `aciertos / 17`, expresada sobre 10.

## Nivel

Fácil.

## Estado

Implementado y disponible desde la pantalla inicial.
