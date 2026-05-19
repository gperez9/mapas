# Especificación funcional — Clasifica provincias

## Juego

**Clasifica provincias por comunidad**

## Objetivo

Asociar cada provincia con su comunidad autónoma mediante una dinámica visual de clasificación.

## Flujo

- Se muestran las provincias como tarjetas.
- Se muestran las 17 comunidades autónomas como cajas.
- El usuario arrastra cada provincia a la caja de su comunidad.
- En móvil/tablet también puede tocar una provincia y después tocar una comunidad.
- Cada caja muestra un contador `colocadas / total esperado`.
- El usuario puede devolver una provincia a la bandeja tocando su chip colocado.
- La corrección se realiza al final.

## Corrección

Cada provincia cuenta como una unidad:

`provincias correctamente clasificadas / 50`

Si una provincia se coloca en una comunidad incorrecta, aparece como error en la pantalla final indicando la comunidad puesta y la correcta.

## Decisiones visuales

- Se usan cajas y chips, no líneas, para evitar cruces visuales.
- Todas las comunidades están visibles en escritorio mediante un grid responsive.
- La bandeja de provincias es desplazable para reducir altura.

## Estado

Implementado y disponible desde la pantalla inicial.
