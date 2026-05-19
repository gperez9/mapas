# Mapas SVG

El archivo `communities-map.svg` se generó a partir de geometrías oficiales del Instituto Geográfico Nacional (IGN), usando el servicio de unidades administrativas.

El proceso de generación está reproducido en:

- `scripts/build_communities_map.py`

## Decisiones de preparación

- Se han mantenido solo las 17 comunidades autónomas.
- Ceuta, Melilla y los territorios no asociados se han excluido de esta primera versión.
- Canarias se representa en un recuadro para mejorar la legibilidad del mapa del juego.
- Los `id` de los `<path>` coinciden con los identificadores internos de `src/data/autonomousCommunities.ts`.

## Uso previsto

Este SVG es la base del primer juego:

- cada región puede convertirse en objetivo de drag & drop;
- los `data-region-id` permiten conectar geometría y datos;
- la misma fuente servirá más adelante para derivar piezas del puzzle de CCAA.
