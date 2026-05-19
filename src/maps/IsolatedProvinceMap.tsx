import { provinces } from "../data/provinces";
import mapMarkup from "./svg/provinces-map.svg?raw";

const specialProvinceViewBoxes: Record<string, string> = {
  "las-palmas": "185 640 160 95",
  "santa-cruz-de-tenerife": "55 660 140 90",
  "islas-baleares-provincia": "690 330 190 120",
  "madrid-provincia": "330 250 100 90",
  "la-rioja-provincia": "420 150 100 70",
  "cantabria-provincia": "305 95 130 70",
  "guipuzcoa": "445 95 80 60",
  "vizcaya": "390 90 90 65",
  "alava": "400 120 100 70",
};

type IsolatedProvinceMapProps = {
  provinceId: string;
};

function viewBoxForProvince(provinceId: string) {
  const province = provinces.find((item) => item.id === provinceId);
  if (!province) return "0 0 920 790";
  if (specialProvinceViewBoxes[provinceId]) return specialProvinceViewBoxes[provinceId];
  const width = province.dropRadius && province.dropRadius > 70 ? 180 : 130;
  const height = province.dropRadius && province.dropRadius > 70 ? 110 : 95;
  return `${province.labelAnchor.x - width / 2} ${province.labelAnchor.y - height / 2} ${width} ${height}`;
}

export function IsolatedProvinceMap({ provinceId }: IsolatedProvinceMapProps) {
  const province = provinces.find((item) => item.id === provinceId);
  const viewBox = viewBoxForProvince(provinceId);
  const markup = mapMarkup
    .replace('viewBox="0 0 920 790"', `viewBox="${viewBox}"`)
    .replace(/<title id="title">.*?<\/title>/, "")
    .replace(/<desc id="desc">.*?<\/desc>/, "");

  return (
    <div className="isolated-community-map isolated-province-map" aria-label="Provincia aislada">
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <style>
        {`.isolated-province-map .map-inset { display: none; }
          .isolated-province-map .regions path {
            fill: transparent;
            stroke: transparent;
            pointer-events: none;
          }
          .isolated-province-map .regions path[data-region-id="${provinceId}"] {
            fill: #9dd8f5;
            stroke: #203040;
            stroke-width: 2;
            filter: drop-shadow(0 4px 0 rgba(32, 48, 64, 0.16));
          }`}
      </style>
      <span className="sr-only">{province?.preferredDisplayName}</span>
    </div>
  );
}
