# EspecificaciÃ³n funcional â€” IteraciÃ³n 3

## Juego

**Arrastra las provincias**

## Objetivo

Extender el patrÃ³n de arrastrar nombres al mapa provincial y resolver la mayor densidad visual del contenido.

## Estado actual

Implementado:

- catÃ¡logo inicial de 50 provincias;
- mapa SVG provincial;
- juego disponible desde la pantalla inicial;
- drag & drop con alternativa por toques;
- bandeja desplazable para manejar el mayor nÃºmero de etiquetas;
- compatibilidad tÃ¡ctil reforzada para iPad/tablet;
- fondos provinciales suavemente diferenciados por comunidad autÃ³noma para ofrecer una pista visual;
- ampliaciÃ³n contextual reforzada de la comunidad autÃ³noma bajo el puntero durante el arrastre;
- tolerancia de soltado ampliada dentro de la comunidad autÃ³noma activa para reducir la exigencia de precisiÃ³n milimÃ©trica;
- lupa contextual flotante junto al puntero para realizar la colocaciÃ³n fina en un mapa ampliado sin obligar a cruzar otras comunidades;

- las colocaciones hechas desde la lupa se trasladan a una posiciÃ³n canÃ³nica dentro de la provincia en el mapa principal.
- en el juego provincial, todas las etiquetas se colocan siempre en posiciones canÃ³nicas; el gesto solo decide la provincia elegida, no la coordenada final.
- pantalla de resultados propia con provincias coloreadas segÃºn acierto/error y nombres visibles sobre el mapa.

## Riesgos abiertos

- la densidad del mapa provincial exigirÃ¡ bastante mÃ¡s ajuste fino que el mapa autonÃ³mico;
- en mÃ³vil, probablemente harÃ¡ falta introducir zoom o una estrategia adicional de navegaciÃ³n;
- la densidad del mapa provincial seguirÃ¡ exigiendo ajustes finos de legibilidad, especialmente en etiquetas pequeÃ±as y en pantallas mÃ³viles.
- la vista ampliada muestra los nombres ya asignados dentro de esa comunidad autónoma para mantener el contexto.
