# Iteración 0 técnica

## Objetivo

Preparar una base ejecutable y extensible sobre la que construir la primera iteración funcional.

## Entregado

- scaffold de aplicación con React, TypeScript y Vite;
- estructura inicial de carpetas;
- estilos base con tono lúdico;
- dataset de las 17 comunidades autónomas;
- mapa SVG de comunidades autónomas con identificadores estables por región;
- script reproducible para regenerar el mapa desde el servicio oficial del IGN;
- documentación de uso del SVG;
- README raíz del proyecto.

## Verificación realizada

- instalación de dependencias completada;
- compilación de producción ejecutada correctamente con `npm run build`;
- servidor local levantado correctamente y respondiendo por HTTP.

## Decisiones técnicas tomadas

### Stack

- React
- TypeScript
- Vite

### Mapa

- fuente geográfica: servicio oficial de unidades administrativas del IGN;
- alcance inicial: 17 comunidades autónomas;
- exclusiones en esta fase:
  - Ceuta;
  - Melilla;
  - territorios no asociados;
- Canarias se muestra en recuadro para ganar legibilidad.

### Contrato entre datos y mapa

Cada comunidad tiene:

- `id`
- `preferredDisplayName`
- `acceptedNames`
- `svgRegionId`

Y cada región del SVG expone:

- `id`
- `data-region-id`

Esto permite conectar el dataset con el mapa sin lógica ad hoc.

## Pendiente para la Iteración 1

- convertir el mapa en superficie de juego;
- implementar drag & drop;
- construir pantalla inicial, partida y resultado.

## Riesgos reducidos por esta iteración

- ya existe un activo cartográfico central;
- la relación entre regiones y datos queda fijada;
- el proyecto tiene estructura suficiente para crecer sin rehacer cimientos.
