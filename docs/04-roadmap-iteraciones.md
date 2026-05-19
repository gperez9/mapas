# Roadmap de implementaciÃ³n

## IteraciÃ³n 0 â€” PreparaciÃ³n

**Objetivo**  
Dejar el proyecto listo para crecer.

**Tareas**

- crear el proyecto;
- configurar despliegue estÃ¡tico;
- definir estilos base;
- obtener e integrar mapas SVG;
- crear datasets iniciales;
- fijar convenciones de nombres y estructura.

**Resultado**

- app vacÃ­a pero navegable;
- mapas cargados;
- base tÃ©cnica estable.

## IteraciÃ³n 1 â€” Vertical slice completo

**Juego**

- CCAA arrastrar nombres.

**Incluye**

- menÃº principal;
- entrada al juego;
- drag & drop responsive;
- validaciÃ³n;
- puntuaciÃ³n;
- resultado con errores;
- vuelta al menÃº.

**Objetivo**

Validar la arquitectura completa de extremo a extremo.

**Estado**

- en implementaciÃ³n;
- ya dispone de flujo completo, estado de partida, puntuaciÃ³n y pantalla de resultados.

## IteraciÃ³n 2 â€” Escritura de CCAA

**Incluye**

- inputs sobre el mapa;
- alias cooficiales;
- tolerancia ortogrÃ¡fica;
- revisiÃ³n final.

**Objetivo**

Validar el componente pedagÃ³gico mÃ¡s delicado: la correcciÃ³n flexible.

**Estado**

- en implementaciÃ³n;
- ya dispone de juego propio, inputs sobre mapa y motor compartido de correcciÃ³n escrita.

## IteraciÃ³n 3 â€” Provincias arrastrando nombres

**Incluye**

- mapa de provincias;
- nombres arrastrables;
- ajustes de densidad;
- experiencia mÃ³vil.

**Objetivo**

Resolver la complejidad visual del mapa provincial.

**Estado**

- en implementaciÃ³n;
- ya dispone de catÃ¡logo, mapa SVG provincial, primera versiÃ³n jugable,
  soporte tÃ¡ctil y pantalla de resultados propia.

## IteraciÃ³n 4 â€” Provincias escribiendo nombres

**Incluye**

- mapa numerado;
- lista de campos;
- revisiÃ³n final;
- comportamiento responsive especÃ­fico.

**Objetivo**

Completar los cuatro juegos acadÃ©micos principales.

**Estado**

- implementado como primera versiÃ³n funcional;
- usa selecciÃ³n de CCAA en el mapa principal, vista ampliada para seleccionar provincia exacta y escritura posterior del nombre.

## Juego adicional â€” Adivina la Comunidad

**Incluye**

- preguntas aleatorias por provincia;
- respuesta escrita o mediante selector;
- correcciÃ³n tolerante con alias;
- feedback inmediato;
- resultado final integrado.

**Objetivo**

Reutilizar el prototipo existente de asociaciÃ³n provincia â†’ comunidad autÃ³noma como juego breve de prÃ¡ctica.

**Estado**

- implementado como juego disponible desde la pantalla inicial.

## Juego adicional â€” CuÃ¡ntas Provincias

**Incluye**

- una pregunta por cada comunidad autÃ³noma;
- orden aleatorio;
- respuesta numÃ©rica;
- feedback inmediato;
- resultado final integrado.

**Objetivo**

Practicar la relaciÃ³n comunidad autÃ³noma â†’ nÃºmero de provincias.

**Estado**

- implementado como juego disponible desde la pantalla inicial.

## Juego adicional â€” Dime las provincias

**Incluye**

- una pregunta por comunidad autÃ³noma;
- respuesta escrita libre;
- parser flexible para listas de provincias;
- correcciÃ³n por provincia acertada;
- nota calculada sobre el total de provincias.

**Objetivo**

Practicar la evocaciÃ³n activa de las provincias de cada comunidad autÃ³noma.

**Estado**

- implementado como juego disponible desde la pantalla inicial.

## Juego adicional â€” Clasifica provincias

**Incluye**

- tarjetas de provincias;
- cajas de comunidades autÃ³nomas;
- arrastre y alternativa tÃ¡ctil por selecciÃ³n;
- contadores por comunidad;
- correcciÃ³n final por provincia.

**Objetivo**

Practicar la asociaciÃ³n provincia â†’ comunidad autÃ³noma de forma visual y manipulativa.

**Estado**

- implementado como juego disponible desde la pantalla inicial.

## Juego adicional â€” Reconoce la Comunidad

**Incluye**

- siluetas aisladas de cada comunidad autÃ³noma;
- orden aleatorio;
- respuesta escrita;
- correcciÃ³n tolerante;
- resultado final con mapa de comunidades.

**Objetivo**

Practicar el reconocimiento visual de las comunidades autÃ³nomas sin el apoyo del mapa completo.

**Estado**

- implementado como juego disponible desde la pantalla inicial.

## IteraciÃ³n 5 â€” Puzzle de CCAA

**Incluye**

- piezas SVG;
- arrastre tÃ¡ctil;
- snap;
- feedback visual;
- puntuaciÃ³n.

**Objetivo**

Introducir el primer juego de manipulaciÃ³n espacial.

## IteraciÃ³n 6 â€” Puzzle de provincias

**Incluye**

- piezas provinciales;
- zoom/pan si es necesario;
- mejoras de interacciÃ³n;
- calibraciÃ³n fina en mÃ³vil.

**Objetivo**

Completar la visiÃ³n inicial.

## IteraciÃ³n 7 â€” Pulido

**Incluye**

- animaciones;
- mensajes mÃ¡s cuidados;
- accesibilidad;
- pruebas cruzadas;
- revisiÃ³n de datos;
- refinamiento visual infantil.

## MVP recomendado

Primera versiÃ³n pÃºblica recomendada:

1. CCAA arrastrar nombres.
2. CCAA escribir nombres.
3. Provincias arrastrar nombres.
4. Sistema completo de resultados.

## DefiniciÃ³n de terminado para cada juego

Un juego no se considera terminado hasta que:

- funciona en escritorio, tablet y mÃ³vil;
- puede completarse sin bloqueos;
- corrige correctamente;
- calcula bien la nota;
- muestra errores y respuestas correctas al final;
- permite volver al menÃº;
- soporta los alias previstos cuando aplique;
- ha sido probado con ratÃ³n y tÃ¡ctil.

