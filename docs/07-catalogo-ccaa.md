# Catálogo de comunidades autónomas

## Objetivo

Definir el catálogo inicial de comunidades autónomas que usará la aplicación para:

- mostrar etiquetas en los juegos;
- corregir respuestas escritas;
- mantener una política coherente entre UX y rigor lingüístico.

## Criterio de diseño

La aplicación mostrará por defecto **nombres cortos y familiares en castellano**, adecuados para niños y niñas de unos 10 años.

Al mismo tiempo, el sistema aceptará:

- la denominación mostrada;
- denominaciones oficiales más largas cuando existan;
- variantes locales en lenguas cooficiales;
- algunas variantes ampliamente reconocibles y pedagógicamente razonables.

Esto permite que la interfaz sea simple sin empobrecer la corrección.

## Fuentes de referencia

Para fijar el catálogo se han tomado como referencia:

- la relación oficial de comunidades y ciudades autónomas publicada por la Administración General del Estado;
- la relación de códigos de comunidades autónomas del INE;
- estatutos de autonomía y normativa publicada en el BOE para casos con denominaciones cooficiales o especialmente relevantes, como `Euskadi o País Vasco`, `Comunitat Valenciana` e `Illes Balears`.  

La documentación oficial enumera, entre otras, `Balears, Illes`, `Comunitat Valenciana` y `País Vasco`; el Estatuto del País Vasco reconoce expresamente la denominación `Euskadi o País Vasco`, el de la Comunitat Valenciana fija `Comunitat Valenciana`, y el de Illes Balears establece esa denominación para la comunidad autónoma.

## Catálogo propuesto

| ID | Nombre visible por defecto | Alias aceptados |
|---|---|---|
| `andalucia` | Andalucía | Andalucía |
| `aragon` | Aragón | Aragón |
| `asturias` | Asturias | Asturias, Principado de Asturias |
| `islas-baleares` | Islas Baleares | Islas Baleares, Illes Balears |
| `canarias` | Canarias | Canarias |
| `cantabria` | Cantabria | Cantabria |
| `castilla-la-mancha` | Castilla-La Mancha | Castilla-La Mancha |
| `castilla-y-leon` | Castilla y León | Castilla y León |
| `cataluna` | Cataluña | Cataluña, Catalunya |
| `comunidad-valenciana` | Comunidad Valenciana | Comunidad Valenciana, Comunitat Valenciana |
| `extremadura` | Extremadura | Extremadura |
| `galicia` | Galicia | Galicia |
| `madrid` | Madrid | Madrid, Comunidad de Madrid |
| `murcia` | Murcia | Murcia, Región de Murcia |
| `navarra` | Navarra | Navarra, Comunidad Foral de Navarra |
| `pais-vasco` | País Vasco | País Vasco, Euskadi |
| `la-rioja` | La Rioja | La Rioja |

## Decisiones deliberadas

### 1. Nombres visibles cortos

Se mostrarán:

- `Asturias` en lugar de `Principado de Asturias`;
- `Madrid` en lugar de `Comunidad de Madrid`;
- `Murcia` en lugar de `Región de Murcia`;
- `Navarra` en lugar de `Comunidad Foral de Navarra`.

La razón es de UX: para niños y niñas, la etiqueta corta es más natural y reduce ruido visual. Las formas largas seguirán siendo válidas en juegos de escritura.

### 2. Variantes cooficiales incluidas

Se aceptan explícitamente:

- `Illes Balears`;
- `Catalunya`;
- `Comunitat Valenciana`;
- `Euskadi`.

### 3. Variantes no incluidas por ahora

No se incluyen de momento:

- `Galiza` para `Galicia`;
- `Asturies` para `Asturias`;
- otras variantes no oficiales o cuyo estatus pedagógico no se haya decidido expresamente.

La razón es mantener el catálogo inicial ligado a denominaciones oficiales o claramente cooficiales.

### 4. Navarra

Por ahora se aceptan:

- `Navarra`;
- `Comunidad Foral de Navarra`.

No se añade todavía `Nafarroa`, porque conviene revisar esa decisión junto con el catálogo provincial y con el criterio exacto que queramos aplicar a territorios donde una lengua cooficial no cubre todo el territorio autonómico.

## Representación recomendada en datos

```ts
export const autonomousCommunities = [
  {
    id: "andalucia",
    preferredDisplayName: "Andalucía",
    acceptedNames: ["Andalucía"],
  },
  {
    id: "asturias",
    preferredDisplayName: "Asturias",
    acceptedNames: ["Asturias", "Principado de Asturias"],
  },
  {
    id: "islas-baleares",
    preferredDisplayName: "Islas Baleares",
    acceptedNames: ["Islas Baleares", "Illes Balears"],
  },
  {
    id: "pais-vasco",
    preferredDisplayName: "País Vasco",
    acceptedNames: ["País Vasco", "Euskadi"],
  },
];
```

## Relación con la Iteración 1

En el juego de arrastrar nombres de CCAA:

- se mostrarán los `preferredDisplayName`;
- no hará falta usar los alias durante la partida;
- el catálogo ya quedará preparado para reutilizarse en la Iteración 2.

## Casos de prueba mínimos para CCAA

### Coincidencias exactas tras normalizar

- `andalucia` -> Andalucía
- `illes balears` -> Islas Baleares
- `catalunya` -> Cataluña
- `euskadi` -> País Vasco

### Alias largos aceptados

- `principado de asturias` -> Asturias
- `comunidad de madrid` -> Madrid
- `region de murcia` -> Murcia
- `comunidad foral de navarra` -> Navarra

### Variantes no aceptadas por ahora

- `galiza` -> incorrecta
- `asturies` -> incorrecta
- `nafarroa` -> pendiente de decisión

## Decisiones abiertas

1. Si se incorporará `Nafarroa` como alias aceptado para Navarra.
2. Si se aceptarán variantes no oficiales pero frecuentes por razones pedagógicas.
3. Si la pantalla de resultados debe mostrar siempre el nombre visible corto o, en algunos casos, el oficial largo.

## Recomendación actual

Para la primera implementación:

- usar este catálogo tal como está;
- mostrar siempre el nombre visible corto;
- revisar el caso de Navarra antes de implementar el juego de escritura de provincias.
