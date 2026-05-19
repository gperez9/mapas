# Especificación funcional — Iteración 4

## Juego

**Escribe las provincias**

## Objetivo

Completar el juego académico de escritura de provincias, evitando la dificultad de precisión del mapa provincial mediante la misma estrategia de ampliación usada en el juego de arrastrar provincias.

## Flujo

- El usuario pincha una zona del mapa provincial.
- Se abre una vista ampliada de la comunidad autónoma correspondiente.
- El usuario selecciona la provincia exacta dentro de esa vista ampliada.
- Se muestra un cuadro de texto para escribir el nombre de la provincia seleccionada.
- El nombre escrito queda visible sobre el mapa principal.
- La corrección se realiza al final.

## Corrección

Cada provincia cuenta como una unidad:

`provincias correctas / 50`

Se aceptan:

- nombres en castellano;
- variantes locales incluidas en el catálogo;
- ausencia de tildes;
- pequeñas erratas con tolerancia ortográfica.

## Estado

Implementado como primera versión funcional y disponible desde la pantalla inicial.

## Riesgos abiertos

- Revisar si el cuadro de escritura debe aparecer integrado en la vista ampliada en lugar de como diálogo independiente.
- Pulir el tamaño de etiquetas escritas en el mapa principal.
- Validar la experiencia táctil en iPad/móvil.
