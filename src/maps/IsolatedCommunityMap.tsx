import { autonomousCommunities } from "../data/autonomousCommunities";
import mapMarkup from "./svg/communities-map.svg?raw";

const isolatedCommunityViewBoxes: Record<string, string> = {
  andalucia: "120 440 410 210",
  aragon: "470 170 230 230",
  asturias: "145 120 210 85",
  canarias: "35 635 310 125",
  cantabria: "300 120 135 75",
  "castilla-la-mancha": "280 285 330 260",
  "castilla-y-leon": "150 150 390 250",
  cataluna: "620 170 230 180",
  "comunidad-valenciana": "520 300 150 230",
  extremadura: "145 315 180 230",
  galicia: "40 120 175 135",
  madrid: "320 295 115 95",
  murcia: "480 455 115 105",
  navarra: "455 150 140 110",
  "pais-vasco": "390 145 130 85",
  "la-rioja": "410 205 115 65",
  "islas-baleares": "690 330 190 120",
};

type IsolatedCommunityMapProps = {
  communityId: string;
};

export function IsolatedCommunityMap({ communityId }: IsolatedCommunityMapProps) {
  const community = autonomousCommunities.find((item) => item.id === communityId);
  const viewBox = isolatedCommunityViewBoxes[communityId] ?? "0 0 920 790";
  const markup = mapMarkup
    .replace('viewBox="0 0 920 790"', `viewBox="${viewBox}"`)
    .replace(/<title id="title">.*?<\/title>/, "")
    .replace(/<desc id="desc">.*?<\/desc>/, "");

  return (
    <div className="isolated-community-map" aria-label="Comunidad autónoma aislada">
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <style>
        {`.isolated-community-map .map-inset { display: none; }
          .isolated-community-map .regions path {
            fill: transparent;
            stroke: transparent;
            pointer-events: none;
          }
          .isolated-community-map .regions path[data-region-id="${communityId}"] {
            fill: #9dd8f5;
            stroke: #203040;
            stroke-width: 2.4;
            filter: drop-shadow(0 4px 0 rgba(32, 48, 64, 0.16));
          }`}
      </style>
      <span className="sr-only">{community?.preferredDisplayName}</span>
    </div>
  );
}
