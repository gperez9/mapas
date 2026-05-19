# Arquitectura técnica propuesta

## Stack recomendado

- React
- TypeScript
- Vite
- SVG interactivo para mapas
- Librería ligera o implementación propia para gestos/drag compatible con móvil

La aplicación seguirá siendo completamente estática y apta para GitHub Pages.

## Motivo de la elección

Aunque HTML/CSS/JavaScript plano sería suficiente técnicamente, React + TypeScript ofrece ventajas claras para este producto:

- reutilización entre juegos;
- menos duplicación;
- gestión de estado más clara;
- mayor mantenibilidad;
- tipado útil para datasets geográficos y reglas compartidas.

## Estructura de carpetas propuesta

```text
src/
  app/
    App.tsx
    routes.tsx

  data/
    autonomousCommunities.ts
    provinces.ts

  maps/
    SpainCommunitiesMap.tsx
    SpainProvincesMap.tsx
    svg/

  games/
    shared/
      GameLayout.tsx
      ResultScreen.tsx
      scoring.ts
      answerMatching.ts
      types.ts

    communities-drag/
    communities-write/
    provinces-drag/
    provinces-write/
    communities-puzzle/
    provinces-puzzle/

  components/
    Button.tsx
    Card.tsx
    ProgressBar.tsx
    ErrorReview.tsx

  styles/
    tokens.css
    global.css
```

## Modelo de datos base

```ts
type Region = {
  id: string;
  canonicalName: string;
  acceptedNames: string[];
  mapId: string;
};
```

Ejemplo:

```ts
{
  id: "pais-vasco",
  canonicalName: "País Vasco",
  acceptedNames: ["País Vasco", "Pais Vasco", "Euskadi"],
  mapId: "ES-PV"
}
```

## Módulos funcionales

| Módulo | Responsabilidad |
|---|---|
| `geo-data` | CCAA, provincias, alias y equivalencias |
| `maps` | SVG y regiones interactivas |
| `scoring` | cálculo de nota y resumen |
| `answer-matching` | normalización y tolerancia ortográfica |
| `game-engine` | estado común de cada partida |
| `games/*` | reglas específicas de cada modo |
| `ui` | componentes visuales compartidos |

## Motor de corrección

### 1. Normalización

- pasar a minúsculas;
- eliminar tildes;
- limpiar espacios duplicados;
- homogeneizar puntuación irrelevante.

### 2. Alias válidos

- comparar contra variantes aceptadas explícitamente.

### 3. Tolerancia ortográfica

- aplicar una métrica de distancia de edición con umbral bajo;
- hacer el umbral proporcional a la longitud;
- ser más permisivo en nombres largos que en cortos.

Ejemplos:

- `andalucia` debe equivaler a `Andalucía`;
- `andaluzia` probablemente debe aceptarse;
- `madrid` no debe aceptarse como `murcia`.

## Diseño por tipo de juego

### Juegos de arrastrar

- panel o bandeja de nombres;
- regiones objetivo;
- respuestas recolocables antes de revisar;
- corrección solo al final.

### Juegos de escritura

- CCAA: input sobre o junto a cada región;
- provincias: mapa numerado + lista de campos.

### Puzzles

- piezas SVG individuales;
- posiciones objetivo conocidas;
- estados de pieza:
  - sin colocar;
  - arrastrando;
  - colocada;
- encaje mediante snap.

## Pantalla de resultados compartida

```text
Resultado
- Nota: 8,2 / 10
- Aciertos: 14 de 17

Errores
- Tu respuesta: "Navara"
  Correcta: "Navarra"

[Ver todas las respuestas]
[Volver al inicio]
```

## Consideraciones responsive

### Escritorio

- mapa grande a la izquierda;
- controles y etiquetas a la derecha.

### Tablet

- mantener dos columnas si el ancho lo permite;
- apilar verticalmente cuando no sea cómodo.

### Móvil

- priorizar áreas táctiles grandes;
- mapas arriba, controles debajo;
- prever zoom/pan cuando la densidad lo exija.

## Riesgos técnicos

1. Drag & drop táctil.
2. Complejidad visual del mapa provincial.
3. Calibración del matching tolerante.
4. Puzzle de provincias en pantallas pequeñas.

