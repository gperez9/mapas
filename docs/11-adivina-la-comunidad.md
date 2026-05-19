# Especificación funcional — Adivina la Comunidad

## Juego

**Adivina la Comunidad**

## Origen

Adaptado desde el prototipo HTML ubicado en:

`C:\Repositories\Personal\Provincias\Provincias.git`

El prototipo original planteaba preguntas del tipo:

> ¿A qué comunidad autónoma pertenece la provincia X?

## Implementación actual

Implementado dentro de la arquitectura React/Vite del proyecto principal:

- 20 preguntas aleatorias por partida;
- pregunta basada en una provincia;
- respuesta por escritura libre o selector;
- aceptación tolerante de nombres escritos usando el motor compartido de corrección;
- alias cooficiales ya definidos en el catálogo de comunidades;
- feedback inmediato tras cada respuesta;
- resultado final integrado con el sistema común de puntuación.

## Decisiones

- Se reutiliza el catálogo local de `src/data/provinces.ts` y `src/data/autonomousCommunities.ts`.
- No se duplica la lista de provincias del prototipo original.
- El resultado final se muestra como lista de preguntas, sin mapa específico, porque una partida puede contener varias preguntas de la misma comunidad y no representa un estado territorial completo.

## Riesgos abiertos

- Valorar si el feedback debe ser inmediato o solo al final para mantener coherencia con otros juegos.
- Revisar si 20 preguntas es la duración ideal para público infantil.
