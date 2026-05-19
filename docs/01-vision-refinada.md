# Visión refinada del producto

## Objetivo

Crear una aplicación web sencilla, estática y desplegable gratuitamente en GitHub Pages para que niños y niñas de unos 10 años practiquen el mapa político de España mediante juegos.

## Público objetivo

- Niños y niñas de aproximadamente 10 años.
- Uso educativo y de práctica autónoma.
- Experiencia pensada para ordenador, tablet y móvil.

## Principios de producto

- Interfaz lúdica e infantil.
- Instrucciones breves y claras.
- Interacción táctil cuidada.
- Sin login ni persistencia de resultados.
- Feedback al final de cada partida, no durante el juego.
- Corrección orientada al aprendizaje, no al castigo.

## Juegos previstos

1. Mapa mudo de CCAA: arrastrar nombres a su ubicación.
2. Mapa mudo de CCAA: escribir nombres.
3. Mapa mudo de provincias: arrastrar nombres a su ubicación.
4. Mapa mudo de provincias: escribir nombres.
5. Puzzle digital de CCAA.
6. Puzzle digital de provincias.

## Decisiones ya tomadas

| Área | Decisión |
|---|---|
| Plataformas | Ordenador, tablet y móvil |
| Corrección en escritura | Alta tolerancia; se aceptan pequeñas faltas |
| Feedback | Solo al final, señalando errores y respuesta correcta |
| Puntuación | `aciertos / total * 10` |
| Estilo visual | Lúdico / infantil |
| Idioma por defecto | Castellano |
| Respuestas aceptadas | Castellano + denominaciones locales cooficiales cuando existan |
| Entrega | Por fases |
| Escritura de CCAA | Respuesta directamente sobre el mapa |
| Escritura de provincias | Mapa numerado + lista de campos |
| Resultado final | Resumen, errores visibles y opción de ver todas las respuestas |

## Viabilidad

Todos los requisitos planteados son compatibles con una aplicación estática:

- navegación entre pantallas;
- arrastrar y soltar;
- inputs de texto;
- puntuación;
- puzzles interactivos;
- revisión de respuestas.

El puzzle no requiere backend. La dificultad está en la calidad de la interacción, especialmente en móvil y en el puzzle de provincias.

## Riesgos principales

### 1. Corrección flexible en juegos de escritura

Debe equilibrar:

- tolerancia suficiente para no frustrar;
- precisión suficiente para no aceptar respuestas erróneas.

La solución prevista combina:

- alias explícitos;
- normalización de texto;
- tolerancia ortográfica moderada.

### 2. Provincias en móvil

El número de regiones y el tamaño de algunas provincias hacen necesario cuidar:

- zoom;
- legibilidad;
- áreas táctiles;
- disposición de formularios.

### 3. Puzzle de provincias

Es viable, pero será probablemente el modo más costoso de pulir por:

- cantidad de piezas;
- piezas pequeñas;
- ergonomía táctil.

## MVP recomendado

Primera versión pública recomendada:

1. CCAA arrastrar nombres.
2. CCAA escribir nombres.
3. Provincias arrastrar nombres.
4. Sistema completo de resultados.

Los puzzles pueden entrar en fases posteriores una vez validada la base técnica y de UX.

