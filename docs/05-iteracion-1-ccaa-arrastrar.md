# Especificación funcional — Iteración 1

## Juego

**Arrastra las comunidades autónomas**

## Objetivo de la iteración

Construir la primera versión completa y jugable de la aplicación, cubriendo el flujo entero:

```text
Inicio -> Juego -> Resultado -> Inicio
```

Esta iteración debe validar:

- arquitectura base;
- mapa SVG interactivo;
- experiencia de arrastrar y soltar con ratón y táctil;
- cálculo de nota;
- patrón de revisión final;
- tono visual infantil.

## Alcance incluido

- pantalla de inicio sencilla;
- un único juego disponible;
- mapa mudo de España por CCAA;
- lista de nombres arrastrables;
- colocación de una respuesta por comunidad;
- recolocación antes de terminar;
- corrección solo al final;
- nota de 0 a 10;
- revisión de errores con respuesta correcta;
- opción de ver todas las respuestas;
- botón para volver al inicio;
- opción de repetir partida;
- diseño responsive para escritorio, tablet y móvil.

## Fuera de alcance

- juegos de provincias;
- juegos de escritura;
- puzzles;
- persistencia de resultados;
- usuarios/login;
- temporizador;
- pistas;
- sonidos;
- rankings;
- animaciones complejas.

## Público objetivo

Niños y niñas de unos 10 años.

## Pantalla de inicio

### Contenido

- título de la aplicación;
- subtítulo breve;
- tarjeta o botón principal:
  - `Arrastra las comunidades autónomas`;
- juegos futuros:
  - ocultos o marcados como `Próximamente`.

### Criterios de aceptación

- se entiende qué juego se puede iniciar;
- el botón principal es visible y fácil de pulsar en móvil;
- no hay elementos no funcionales que generen confusión.

## Pantalla de juego

### Objetivo del usuario

Colocar cada nombre de comunidad autónoma en la región correcta del mapa.

### Layout recomendado

#### Escritorio / tablet horizontal

- izquierda: mapa;
- derecha: lista de etiquetas arrastrables.

#### Móvil / tablet vertical

- arriba: mapa;
- abajo: bandeja o rejilla de nombres.

### Elementos de la pantalla

- título:
  - `Coloca cada comunidad en su sitio`;
- instrucción:
  - `Arrastra los nombres hasta el mapa. Cuando termines, pulsa Revisar.`;
- indicador de progreso:
  - `0 de 17 colocadas`;
- mapa mudo de CCAA;
- etiquetas con nombres;
- botón principal:
  - `Revisar respuestas`;
- botón secundario:
  - `Reiniciar`.

## Comportamiento del juego

### Estado inicial

- mapa vacío;
- 17 etiquetas disponibles;
- progreso `0 de 17`.

### Decisión de contenido

En la primera iteración se usarán **solo las 17 comunidades autónomas**.  
Ceuta y Melilla se tratarán más adelante como una decisión explícita de contenido.

### Arrastrar una etiqueta

Cuando el usuario arrastra un nombre:

- la etiqueta sigue al puntero o dedo;
- las regiones pueden resaltarse al pasar por encima;
- al soltar sobre una región válida, la respuesta queda asignada.

### Si la región ya tenía respuesta

- la nueva respuesta sustituye a la anterior;
- la etiqueta anterior vuelve a la bandeja;
- ninguna etiqueta puede estar asignada a dos regiones a la vez.

### Recolocar o retirar

Antes de revisar:

- una etiqueta colocada puede moverse a otra región;
- una etiqueta colocada puede devolverse a la bandeja;
- el progreso se actualiza en tiempo real.

### Feedback durante la partida

No se mostrará si una respuesta es correcta o incorrecta antes del final.

### Finalización

Se permitirá revisar aunque falten respuestas, pero con confirmación previa:

> Todavía faltan X comunidades por colocar. ¿Quieres revisar igualmente?

## Corrección y puntuación

### Corrección

Para cada región:

- respuesta correcta: acierto;
- respuesta incorrecta o vacía: error.

### Fórmula

```text
nota = aciertos / total * 10
```

### Presentación recomendada

- nota con un decimal:
  - `8,2 / 10`;
- resumen:
  - `14 de 17 correctas`.

## Pantalla de resultado

### Contenido principal

- mensaje de cierre;
- nota;
- resumen de aciertos.
- mapa final de España con:
  - CCAA acertadas en verde;
  - CCAA falladas o sin respuesta en rojo.
  - nombre visible de cada CCAA;
  - explicación contextual del error al pasar por encima o al tocar una región fallada.
  - tooltip contextual sobre la propia región, sin leyenda genérica del SVG ni panel adicional inferior.

### Errores visibles por defecto

Por cada error:

- región;
- respuesta dada;
- respuesta correcta.

### Todas las respuestas

Debe existir una opción:

- `Ver todas las respuestas`.

Al desplegarla, se mostrará el listado completo.

### Acciones

- `Volver al inicio`;
- `Repetir juego`.

## Datos necesarios

```ts
type AutonomousCommunity = {
  id: string;
  name: string;
  svgRegionId: string;
};
```

## Lista inicial de CCAA

- Andalucía
- Aragón
- Asturias
- Islas Baleares
- Canarias
- Cantabria
- Castilla-La Mancha
- Castilla y León
- Cataluña
- Comunidad Valenciana
- Extremadura
- Galicia
- Madrid
- Murcia
- Navarra
- País Vasco
- La Rioja

Los nombres visibles siguen la política definida en [07-catalogo-ccaa.md](./07-catalogo-ccaa.md): etiquetas cortas y familiares para la interfaz, manteniendo alias oficiales y cooficiales para juegos de escritura.

## Diseño responsive

### Escritorio

- mapa grande a la izquierda;
- etiquetas a la derecha.

### Tablet

- dos columnas si el ancho lo permite;
- apilado vertical si no.

### Móvil

- mapa arriba;
- nombres debajo;
- etiquetas grandes;
- considerar zoom del mapa si hace falta.

## Estados de interfaz

1. Sin empezar.
2. En progreso.
3. Completo.
4. Revisión con faltantes.
5. Resultado.

## Criterios de aceptación

La iteración se considera terminada cuando:

1. Desde la pantalla inicial se puede iniciar el juego.
2. Se muestran las 17 CCAA como etiquetas.
3. El usuario puede arrastrarlas y soltarlas sobre el mapa con ratón y táctil.
4. Una etiqueta puede recolocarse antes de terminar.
5. El juego calcula correctamente aciertos, total y nota.
6. El resultado muestra nota, número de aciertos, errores con respuesta correcta y opción de ver todas las respuestas.
7. Se puede volver al inicio y repetir la partida.
8. La experiencia es usable en escritorio, tablet y móvil.
9. La interfaz mantiene un estilo lúdico e infantil.
10. La app puede desplegarse como sitio estático.

## Riesgos específicos

### 1. Drag & drop táctil

**Mitigación**

- usar eventos de puntero o una solución compatible con touch;
- probar desde el principio en móvil.

### 2. Tamaño de algunas regiones

**Mitigación**

- targets amplios;
- resaltado visual;
- tolerancia razonable al soltar.

### 3. Calidad del mapa SVG

**Mitigación**

- seleccionar pronto una fuente vectorial limpia;
- normalizar IDs de regiones;
- tratar el mapa como activo central del proyecto.

## Entregables

### Producto

- versión web jugable del primer juego;
- pantalla de inicio;
- pantalla de resultado con errores visibles y todas las respuestas desplegables.

### Código

- estructura base del proyecto;
- mapa SVG de CCAA;
- dataset de CCAA;
- motor de puntuación;
- componentes compartidos:
  - layout de juego;
  - resultado;
  - progreso;
  - botones;
  - tarjetas.

## Estado de implementación

Implementado:

- flujo `inicio -> juego -> resultado`;
- estado de partida para las 17 CCAA;
- cálculo de puntuación;
- recolocación y retirada de etiquetas;
- confirmación al revisar con respuestas pendientes;
- resultado con errores visibles y vista de todas las respuestas.
- mapa final de resultados con aciertos en verde y errores en rojo.
- ronda inicial de pulido UX:
  - mensajes de apoyo durante el juego;
  - estado visible de arrastre;
  - bandeja más clara en móvil;
  - controles y etiquetas ajustados para pantallas pequeñas.
- segunda ronda de UX:
  - etiqueta flotante visible durante el arrastre;
  - interacción alternativa `tocar etiqueta -> tocar región`;
  - etiquetas colocadas en el punto donde el usuario las suelta;
  - zonas de caída más generosas alrededor de regiones pequeñas.
- ajustes posteriores tras prueba manual:
  - mayor tolerancia de caída para Islas Baleares;
  - recuadro de Canarias ampliado para contener todas las islas visibles;
  - cualquier punto del recuadro de Canarias se considera una colocación válida;
  - mapa peninsular compactado verticalmente y Canarias reposicionada para mejorar la composición.
- corrección táctil:
  - la suelta global reutiliza la misma detección tolerante del mapa para funcionar correctamente en iPad.
- corrección del mapa de resultados:
  - nombres de las CCAA posicionados con coordenadas relativas estables sobre el mapa.
  - recalibración de esas coordenadas tras compactar verticalmente la península.
  - separación de la capa de etiquetas del resultado respecto a la lógica de etiquetas del juego.
  - recalculado de anclajes desde la geometría actual del SVG tras detectar desalineación visual en prueba real.

Decisión técnica aplicada:

- el arrastre se ha implementado con eventos de puntero para mantener compatibilidad con ratón y pantallas táctiles sin depender del drag & drop nativo del navegador.

### Documentación

- README breve de ejecución y despliegue;
- actualización de esta documentación viva si cambian decisiones.
