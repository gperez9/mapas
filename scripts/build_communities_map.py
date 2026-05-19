from __future__ import annotations

import json
import math
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src" / "maps" / "svg" / "communities-map.svg"
IGN_URL = (
    "https://api-features.ign.es/collections/administrativeunit/items"
    "?f=json&limit=25&filter="
    + urllib.parse.quote("nationallevelname = 'Comunidad autónoma'")
)

NAME_TO_ID = {
    "andalucia": "andalucia",
    "aragon": "aragon",
    "principado de asturias": "asturias",
    "illes balears": "islas-baleares",
    "canarias": "canarias",
    "cantabria": "cantabria",
    "castilla y leon": "castilla-y-leon",
    "castilla-la mancha": "castilla-la-mancha",
    "cataluna/catalunya": "cataluna",
    "comunitat valenciana": "comunidad-valenciana",
    "extremadura": "extremadura",
    "galicia": "galicia",
    "comunidad de madrid": "madrid",
    "region de murcia": "murcia",
    "comunidad foral de navarra": "navarra",
    "pais vasco/euskadi": "pais-vasco",
    "la rioja": "la-rioja",
}


def normalize(value: str) -> str:
    return "".join(
        char
        for char in unicodedata.normalize("NFKD", value)
        if not unicodedata.combining(char)
    ).lower()


def perpendicular_distance(
    point: tuple[float, float],
    start: tuple[float, float],
    end: tuple[float, float],
) -> float:
    if start == end:
        return math.dist(point, start)

    (x, y), (x1, y1), (x2, y2) = point, start, end
    return abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / math.hypot(
        x2 - x1, y2 - y1
    )


def simplify_ring(
    points: list[list[float]],
    epsilon: float,
) -> list[list[float]]:
    if len(points) < 3:
        return points

    distance_max = 0.0
    split_index = 0

    for index in range(1, len(points) - 1):
        distance = perpendicular_distance(
            (points[index][0], points[index][1]),
            (points[0][0], points[0][1]),
            (points[-1][0], points[-1][1]),
        )
        if distance > distance_max:
            distance_max = distance
            split_index = index

    if distance_max > epsilon:
        left = simplify_ring(points[: split_index + 1], epsilon)
        right = simplify_ring(points[split_index:], epsilon)
        return left[:-1] + right

    return [points[0], points[-1]]


def load_features() -> list[dict]:
    with urllib.request.urlopen(IGN_URL, timeout=300) as response:
        payload = json.loads(response.read().decode("utf-8"))

    features = [
        feature
        for feature in payload["features"]
        if normalize(feature["properties"]["nameunit"]) in NAME_TO_ID
    ]

    if len(features) != 17:
        raise RuntimeError(f"Se esperaban 17 CCAA y se recibieron {len(features)}")

    return features


def build_svg(features: list[dict]) -> str:
    mainland_points: list[list[float]] = []
    for feature in features:
        if NAME_TO_ID[normalize(feature["properties"]["nameunit"])] == "canarias":
            continue
        for polygon in feature["geometry"]["coordinates"]:
            for ring in polygon:
                mainland_points.extend(ring)

    min_x = min(x for x, _ in mainland_points)
    max_x = max(x for x, _ in mainland_points)
    min_y = min(y for _, y in mainland_points)
    max_y = max(y for _, y in mainland_points)

    width, height = 920, 680
    padding = 30
    scale = min(
        (width - 2 * padding) / (max_x - min_x),
        (height - 2 * padding) / (max_y - min_y),
    )

    def transform_mainland(x: float, y: float) -> tuple[float, float]:
        return padding + (x - min_x) * scale, height - padding - (y - min_y) * scale

    def transform_canaries(x: float, y: float) -> tuple[float, float]:
        return 70 + (x + 18.5) * 55, 620 - (y - 27.5) * 55

    path_rows: list[str] = []
    for feature in features:
        raw_name = feature["properties"]["nameunit"]
        region_id = NAME_TO_ID[normalize(raw_name)]
        epsilon = 0.01 if region_id in {"islas-baleares", "canarias"} else 0.015
        subpaths: list[str] = []

        for polygon in feature["geometry"]["coordinates"]:
            for ring in polygon:
                simplified = simplify_ring(ring, epsilon)
                transformed = [
                    transform_canaries(x, y)
                    if region_id == "canarias"
                    else transform_mainland(x, y)
                    for x, y in simplified
                ]
                points = " L".join(f"{x:.1f},{y:.1f}" for x, y in transformed)
                subpaths.append(f"M{points} Z")

        path_rows.append(
            f'  <path id="{region_id}" data-region-id="{region_id}" d="{" ".join(subpaths)}" />'
        )

    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 680" '
        'role="img" aria-labelledby="title desc">\n'
        '  <title id="title">Mapa de comunidades autónomas de España</title>\n'
        '  <desc id="desc">Mapa mudo de las 17 comunidades autónomas de España. '
        "Canarias aparece en un recuadro inferior izquierdo.</desc>\n"
        '  <rect x="28" y="500" width="255" height="145" rx="18" class="map-inset" />\n'
        '  <text x="42" y="523" class="map-label">Canarias</text>\n'
        '  <g class="regions">\n'
        + "\n".join(path_rows)
        + "\n  </g>\n</svg>\n"
    )


def main() -> None:
    features = load_features()
    OUTPUT.write_text(build_svg(features), encoding="utf-8")
    print(f"SVG generado en {OUTPUT}")


if __name__ == "__main__":
    main()
