# Backlog de producto

## Épica A — Base de la aplicación

### A1. Menú principal

Como usuario, quiero ver los juegos disponibles al entrar para poder elegir qué practicar.

**Criterios de aceptación**

- Se muestran los juegos disponibles.
- Los juegos se agrupan por nivel de dificultad: fácil y difícil.
- Los juegos aún no implementados pueden aparecer como “Próximamente” o quedar ocultos.
- La interfaz funciona en escritorio, tablet y móvil.

### A2. Navegación común

Como usuario, quiero poder volver al inicio después de terminar un juego para elegir otro.

**Criterios de aceptación**

- Todos los juegos terminan en una pantalla de resultado.
- Desde el resultado se puede volver al menú principal.
- No se conserva estado de partidas previas.

### A3. Sistema visual infantil

Como usuario infantil, quiero una interfaz clara y agradable para entender qué hacer sin leer demasiado.

**Criterios de aceptación**

- Botones grandes.
- Colores vivos y coherentes.
- Instrucciones breves.
- Elementos interactivos fáciles de pulsar con el dedo.

## Épica B — Datos geográficos y corrección

### B1. Catálogo de CCAA

Como sistema, necesito una fuente estructurada de comunidades autónomas y alias válidos para corregir respuestas.

**Debe incluir**

- nombre principal en castellano;
- denominaciones locales válidas;
- alias aceptados.

### B2. Catálogo de provincias

Como sistema, necesito una fuente estructurada de provincias y alias válidos para corregir respuestas.

### B3. Normalización de respuestas

Como sistema, quiero comparar respuestas ignorando diferencias irrelevantes para no penalizar errores menores.

**Debe aceptar**

- mayúsculas/minúsculas;
- tildes;
- variantes cooficiales;
- faltas pequeñas.

### B4. Cálculo de puntuación

Como usuario, quiero recibir una nota de 0 a 10 basada en mis aciertos.

**Regla**

- `nota = aciertos / total * 10`

### B5. Informe de resultados

Como usuario, quiero ver qué fallé y cuál era la respuesta correcta para aprender.

**Criterios de aceptación**

- resumen de aciertos y nota;
- listado de errores;
- opción de ver todas las respuestas.

## Épica C — Juegos de CCAA

### C1. Arrastrar nombres a CCAA

Como usuario, quiero arrastrar nombres sobre el mapa para practicar la ubicación de las comunidades autónomas.

### C2. Escribir nombres de CCAA

Como usuario, quiero escribir el nombre de cada comunidad directamente sobre el mapa.

**Notas de diseño**

- inputs visibles sobre las regiones o próximos a ellas;
- tratamiento especial posible para regiones pequeñas.

## Épica D — Juegos de provincias

### D1. Arrastrar nombres a provincias

Como usuario, quiero arrastrar nombres al mapa para practicar las provincias.

### D2. Escribir nombres de provincias

Como usuario, quiero responder con una lista asociada a un mapa numerado para que sea cómodo incluso en pantallas pequeñas.

**Notas de diseño**

- cada provincia lleva un número;
- debajo o al lado aparece una lista numerada de campos;
- en móvil, la lista irá previsiblemente debajo del mapa.

## Épica E — Puzzles

### E1. Puzzle de CCAA

Como usuario, quiero colocar las piezas de las comunidades autónomas en su posición correcta.

### E2. Puzzle de provincias

Como usuario, quiero colocar las piezas de las provincias en su posición correcta.

**Decisiones para la primera versión**

- piezas sin rotación;
- encaje con tolerancia generosa;
- feedback visual al colocar correctamente;
- zoom/pan en móvil si hace falta.

## Épica F — Calidad y compatibilidad

### F1. Responsive

- escritorio;
- tablet;
- móvil.

### F2. Interacción táctil

- drag & drop usable con dedo;
- sin depender solo de hover;
- áreas táctiles suficientemente grandes.

### F3. Accesibilidad básica

- contraste suficiente;
- botones etiquetados;
- feedback no dependiente solo del color;
- navegación razonable por teclado en escritorio.

### F4. Pruebas de contenido

- nombres correctos;
- alias correctos;
- puntuaciones correctas;
- casos límite de tolerancia ortográfica.
