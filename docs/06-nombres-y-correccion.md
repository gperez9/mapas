# Especificación transversal — Nombres aceptados y corrección

## Objetivo

Definir una única política de corrección para todos los juegos de escritura de la aplicación, tanto de comunidades autónomas como de provincias.

La finalidad es equilibrar dos necesidades:

- ser lo bastante tolerantes para no frustrar a niños y niñas de unos 10 años;
- mantener la precisión suficiente para que una respuesta incorrecta no se marque como válida.

## Alcance

Esta especificación aplica a:

- juego de escribir CCAA;
- juego de escribir provincias;
- cualquier futuro juego que requiera comparar texto libre escrito por el usuario.

No aplica a:

- juegos de arrastrar nombres;
- puzzles.

## Principios de corrección

1. **El idioma de referencia de la interfaz es el castellano.**
2. **Se aceptan también las denominaciones locales en lenguas cooficiales cuando existan.**
3. **No se penalizan diferencias de mayúsculas, minúsculas ni tildes.**
4. **Se aceptan pequeñas faltas ortográficas.**
5. **La tolerancia nunca debe convertir una respuesta claramente de otra región en válida.**
6. **La corrección debe ser explicable y consistente entre juegos.**

## Modelo de datos recomendado

```ts
type RegionAnswerSpec = {
  id: string;
  canonicalName: string;
  acceptedNames: string[];
  preferredDisplayName: string;
};
```

### Significado de cada campo

| Campo | Uso |
|---|---|
| `id` | Identificador estable interno |
| `canonicalName` | Nombre de referencia principal |
| `acceptedNames` | Variantes que se aceptan explícitamente |
| `preferredDisplayName` | Nombre que se muestra en resultados y UI |

## Política de nombres

### 1. Nombre mostrado por defecto

La interfaz mostrará por defecto un nombre habitual, corto y comprensible en castellano, aunque exista una denominación oficial más larga.

Ejemplos:

- `País Vasco`
- `Comunidad Valenciana`
- `Islas Baleares`
- `Asturias`
- `Madrid`

### 2. Variantes aceptadas

Se aceptarán:

- nombres en castellano;
- denominaciones locales cooficiales;
- variantes oficiales ampliamente reconocidas;
- formas sin artículos cuando sea razonable y no genere ambigüedad.

Ejemplos:

| Región | Variantes aceptadas |
|---|---|
| País Vasco | `País Vasco`, `Pais Vasco`, `Euskadi` |
| Comunidad Valenciana | `Comunidad Valenciana`, `Comunitat Valenciana` |
| Islas Baleares | `Islas Baleares`, `Illes Balears` |
| Galicia | `Galicia`, `Galiza` solo si se decide aceptarla expresamente |

### 3. Criterio para nuevas variantes

Una variante debe añadirse a `acceptedNames` cuando cumpla al menos una de estas condiciones:

- es una denominación oficial;
- es una denominación cooficial;
- es una variante muy común que el producto quiera considerar pedagógicamente válida.

No deben añadirse automáticamente:

- abreviaturas no pedagógicas;
- motes;
- formas coloquiales raras;
- errores ortográficos, porque estos se gestionan mediante tolerancia, no como alias.

## Pipeline de corrección

La corrección debe seguir siempre el mismo orden:

```text
1. Normalización
2. Coincidencia exacta contra alias aceptados
3. Coincidencia tolerante por distancia
4. Rechazo
```

## 1. Normalización

Antes de comparar, tanto la respuesta del usuario como las variantes aceptadas se transforman con las mismas reglas.

### Reglas

- convertir a minúsculas;
- eliminar tildes y diacríticos;
- recortar espacios al inicio y al final;
- reducir múltiples espacios internos a uno;
- tratar guiones y apóstrofes de forma consistente;
- opcionalmente eliminar artículos iniciales solo cuando esa regla se haya validado como segura para una región concreta.

### Ejemplos

| Entrada | Normalizada |
|---|---|
| `Andalucía` | `andalucia` |
| ` PAÍS   VASCO ` | `pais vasco` |
| `Castilla-La Mancha` | `castilla la mancha` |

## 2. Coincidencia exacta contra alias aceptados

Si la respuesta normalizada coincide exactamente con cualquier alias normalizado de la región esperada, la respuesta es correcta.

### Ejemplos correctos

- `andalucia` para `Andalucía`;
- `euskadi` para `País Vasco`;
- `illes balears` para `Islas Baleares`.

## 3. Coincidencia tolerante por distancia

Si no hay coincidencia exacta, se aplica tolerancia ortográfica.

### Recomendación inicial

Usar una distancia de edición tipo Levenshtein o Damerau-Levenshtein, con umbral proporcional a la longitud del alias candidato.

### Umbral propuesto

| Longitud del nombre normalizado | Errores permitidos |
|---|---|
| 1–4 caracteres | 0 |
| 5–7 caracteres | 1 |
| 8–12 caracteres | 2 |
| 13 o más caracteres | 3 |

### Reglas complementarias

- usar siempre el alias válido más cercano como referencia;
- preferir Damerau-Levenshtein si se quiere contar transposiciones como un único error;
- no aplicar tolerancia si la respuesta coincide mejor con otra región distinta que con la esperada;
- si varias regiones quedan empatadas y cercanas, la respuesta debe considerarse incorrecta.

## 4. Rechazo

La respuesta se considera incorrecta cuando:

- no coincide con ningún alias aceptado;
- supera el umbral de tolerancia;
- o resulta ambigua respecto a más de una región.

## Reglas de ambigüedad

Este punto es importante para no aceptar respuestas incorrectas por exceso de flexibilidad.

### Una respuesta no debe marcarse como correcta si:

- encaja igual de bien con dos regiones distintas;
- es más cercana a otra región que a la esperada;
- el texto es demasiado corto para distinguir de forma fiable.

### Ejemplos

- `madrid` no debe aceptarse como `murcia`;
- una abreviatura de tres letras no debería aceptarse salvo que figure explícitamente como alias;
- si una falta aproxima mucho dos provincias distintas, debe prevalecer la prudencia.

## Política para nombres compuestos

Los nombres compuestos deben tratarse con especial cuidado.

### Recomendaciones

- normalizar guiones y espacios;
- aceptar pequeñas faltas en una de las palabras;
- no aceptar que falten palabras esenciales salvo alias explícito;
- definir alias concretos cuando exista una forma breve oficial o común.

### Ejemplos

| Entrada | Resultado esperado |
|---|---|
| `castilla la mancha` | válida para `Castilla-La Mancha` |
| `castilla mancha` | decidir explícitamente si se acepta; por defecto, no |
| `comunitat valenciana` | válida para `Comunidad Valenciana` |
| `comunidad valencia` | probablemente incorrecta si no se define alias |

## Política para provincias con nombres bilingües o cooficiales

Debe elaborarse un catálogo explícito de variantes por provincia antes de implementar el juego de escritura de provincias.

### Ejemplos previsibles

| Provincia | Variantes potenciales |
|---|---|
| A Coruña | `A Coruña`, `La Coruña` |
| Ourense | `Ourense`, `Orense` |
| Araba/Álava | `Álava`, `Araba` |
| Gipuzkoa | `Guipúzcoa`, `Gipuzkoa` |
| Bizkaia | `Vizcaya`, `Bizkaia` |
| Lleida | `Lérida`, `Lleida` |
| Girona | `Gerona`, `Girona` |

La lista definitiva debe revisarse con criterio lingüístico antes de cerrar el dataset.

## Feedback al usuario

La corrección se muestra solo al final de la partida.

Para cada error, el sistema debe enseñar:

- respuesta introducida por el usuario;
- respuesta correcta preferida;
- opcionalmente, la variante aceptada más cercana si resulta útil para depuración interna, pero no hace falta mostrarla al usuario.

## Casos de prueba obligatorios

La implementación deberá incluir tests para:

### Normalización

- mayúsculas/minúsculas;
- tildes;
- espacios duplicados;
- guiones.

### Alias

- castellano frente a lengua cooficial;
- variantes oficiales.

### Tolerancia

- una falta leve válida;
- varias faltas leves válidas en nombres largos;
- respuesta demasiado alejada inválida;
- respuesta corta sin tolerancia.

### Ambigüedad

- dos regiones con distancias similares;
- respuesta más cercana a una región distinta de la esperada;
- alias que podrían solaparse.

## Recomendaciones de implementación

### Funciones sugeridas

```ts
normalizeAnswer(input: string): string
getNormalizedAliases(region: RegionAnswerSpec): string[]
matchAnswer(input: string, expectedRegionId: string): MatchResult
```

### Resultado sugerido

```ts
type MatchResult =
  | { status: "correct"; matchedAlias: string; method: "exact" | "fuzzy" }
  | { status: "incorrect"; reason: "no-match" | "ambiguous" | "closer-to-other-region" };
```

## Decisiones abiertas para cerrar antes de implementar provincias escritas

1. Catálogo definitivo de variantes aceptadas por provincia.
2. Si se aceptarán formas abreviadas muy extendidas.
3. Si algunas formas no oficiales pero frecuentes deben considerarse válidas por razones pedagógicas.
4. Si se aceptará `Galiza` para `Galicia` y casos similares no estrictamente cooficiales.

## Decisión recomendada para la primera implementación

Para la primera versión del motor:

1. normalización estricta;
2. alias explícitos;
3. tolerancia moderada con umbrales por longitud;
4. rechazo en caso de ambigüedad.

Es preferible empezar algo conservadores y relajar reglas después con ejemplos reales de uso que empezar demasiado permisivos y enseñar como correctas respuestas dudosas.
