# Especificación funcional — Iteración 2

## Juego

**Escribe las comunidades autónomas**

## Objetivo

Añadir el primer juego de texto libre reutilizando el mapa y el sistema de resultados ya construidos.

## Alcance incluido

- pantalla de juego propia;
- campos de texto directamente sobre el mapa;
- corrección tolerante;
- aceptación de alias cooficiales definidos en el catálogo de CCAA;
- feedback solo al final;
- reutilización del mapa final de resultados.

## Reglas de corrección implementadas

- normalización de mayúsculas/minúsculas;
- eliminación de tildes;
- normalización de guiones y espacios;
- alias explícitos;
- tolerancia ortográfica moderada mediante distancia Damerau-Levenshtein;
- rechazo cuando otra región es más cercana o existe ambigüedad.

## Estado actual

Implementado:

- segundo juego disponible desde la pantalla inicial;
- inputs sobre el mapa;
- motor compartido de corrección escrita;
- integración con puntuación y revisión final existentes.
- reutilización del mismo estilo cartográfico base que el juego de arrastrar.

## Pendiente de pulido

- comprobar ergonomía de inputs en pantallas pequeñas;
- revisar si algunas regiones pequeñas necesitan tratamiento visual especial;
- sustituir confirmación nativa por modal propio si se decide hacerlo de forma transversal.
