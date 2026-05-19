# Especificación funcional — Arrastra la capital

## Juego

**Arrastra la capital**

## Objetivo

Practicar la localización aproximada de las capitales autonómicas en el mapa de España.

## Flujo

- Se muestran las capitales de las 17 comunidades autónomas como etiquetas arrastrables.
- El usuario arrastra cada capital hasta su punto en el mapa.
- En dispositivos táctiles también puede tocar una etiqueta y después tocar el punto del mapa.
- Las comunidades autónomas aparecen diferenciadas con colores suaves, reutilizando el criterio visual del mapa de provincias.
- El usuario puede retirar una capital ya colocada pulsando sobre su etiqueta en el mapa.
- Al revisar, se muestra la pantalla común de resultados.

## Mapa

- Se usa el SVG provincial para mantener fronteras interiores y colores por CCAA.
- Cada capital tiene un punto de destino visible.
- La corrección se hace por cercanía al punto de destino, no por provincia completa.
- Canarias usa un radio de tolerancia mayor por su representación en recuadro insular.

## Puntuación

- Cada comunidad autónoma cuenta como una opción.
- Cada capital colocada en su punto correcto suma un acierto.
- La nota final es `aciertos / 17`, expresada sobre 10.

## Nivel

Fácil.

## Estado

Implementado y disponible desde la pantalla inicial.

## Riesgos abiertos

- Las coordenadas iniciales se recalibraron usando como referencia los puntos internos de las provincias capitalinas del SVG provincial.
- Revisar si conviene representar Canarias con dos puntos separados o mantener un único punto de capitalidad compartida para simplificar el juego.
