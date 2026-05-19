import { useMemo, useRef } from "react";
import { autonomousCommunities } from "../data/autonomousCommunities";
import { provinces } from "../data/provinces";
import mapMarkup from "./svg/provinces-map.svg?raw";

type CommunityLoupeProps = {
  communityId: string;
  provinceIdToPlace: string;
  assignments: Record<string, string | null>;
  onDropRegion: (
    regionId: string,
    provinceId: string,
    placement: { left: number; top: number },
  ) => void;
  onCancel: () => void;
};

export function getLoupeProvinceAtPoint(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
  communityId: string,
) {
  const directRegion =
    document
      .elementsFromPoint(clientX, clientY)
      .find(
        (element): element is SVGElement =>
          element instanceof SVGElement &&
          Boolean(element.getAttribute("data-region-id")),
      )
      ?.getAttribute("data-region-id") ?? null;
  const directProvince = provinces.find((province) => province.id === directRegion);
  if (directProvince?.communityId === communityId) return directProvince.id;
  if (!svg) return null;

  const rect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  const x = viewBox.x + ((clientX - rect.left) / rect.width) * viewBox.width;
  const y = viewBox.y + ((clientY - rect.top) / rect.height) * viewBox.height;
  const nearest = provinces
    .filter((province) => province.communityId === communityId)
    .map((province) => ({
      id: province.id,
      distance: Math.hypot(province.labelAnchor.x - x, province.labelAnchor.y - y),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearest && nearest.distance <= 72 ? nearest.id : null;
}

function getCanonicalLoupePlacement(regionId: string, svg: SVGSVGElement | null) {
  const province = provinces.find((item) => item.id === regionId);
  if (!province || !svg) return { left: 0, top: 0 };
  const rect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  return {
    left: ((province.labelAnchor.x - viewBox.x) / viewBox.width) * rect.width,
    top: ((province.labelAnchor.y - viewBox.y) / viewBox.height) * rect.height,
  };
}

export function CommunityLoupe({
  communityId,
  provinceIdToPlace,
  assignments,
  onDropRegion,
  onCancel,
}: CommunityLoupeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const community = autonomousCommunities.find((item) => item.id === communityId);
  const provinceToPlace = provinces.find((province) => province.id === provinceIdToPlace);
  const communityProvinces = provinces.filter((province) => province.communityId === communityId);
  const viewBox = useMemo(() => {
    const xs = communityProvinces.map((province) => province.labelAnchor.x);
    const ys = communityProvinces.map((province) => province.labelAnchor.y);
    const minX = Math.min(...xs) - 55;
    const maxX = Math.max(...xs) + 55;
    const minY = Math.min(...ys) - 45;
    const maxY = Math.max(...ys) + 45;
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  }, [communityProvinces]);
  const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = viewBox.split(" ").map(Number);
  const loupeMarkup = useMemo(
    () => mapMarkup.replace('viewBox="0 0 920 790"', `viewBox="${viewBox}"`),
    [viewBox],
  );
  const placedLabels = communityProvinces
    .map((province) => {
      const assignedProvinceId = assignments[province.id];
      const assignedProvince = provinces.find((item) => item.id === assignedProvinceId);
      return assignedProvince
        ? {
            regionId: province.id,
            text: assignedProvince.preferredDisplayName,
            left: ((province.labelAnchor.x - viewBoxX) / viewBoxWidth) * 100,
            top: ((province.labelAnchor.y - viewBoxY) / viewBoxHeight) * 100,
          }
        : null;
    })
    .filter(Boolean);

  return (
    <aside className="community-loupe" ref={containerRef}>
      <div className="community-loupe-heading">
        <div>
          <strong>{community?.preferredDisplayName}</strong>
          <span>
            Colocando {provinceToPlace?.preferredDisplayName}. Elige la provincia exacta.
          </span>
        </div>
        <button className="secondary-button loupe-close-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
      <div
        className="community-loupe-map"
        onClick={(event) => {
          const svg = containerRef.current?.querySelector("svg") ?? null;
          const regionId = getLoupeProvinceAtPoint(
            event.clientX,
            event.clientY,
            svg,
            communityId,
          );
          if (regionId) {
            onDropRegion(regionId, provinceIdToPlace, getCanonicalLoupePlacement(regionId, svg));
          }
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: loupeMarkup }} />
        <div className="community-loupe-label-layer" aria-hidden="true">
          {placedLabels.map((label) => (
            <span
              className="community-loupe-label"
              key={label!.regionId}
              style={{ left: `${label!.left}%`, top: `${label!.top}%` }}
            >
              {label!.text}
            </span>
          ))}
        </div>
      </div>
      <style>
        {`.community-loupe .regions path {
            fill: #e8eef3;
            stroke: #203040;
            stroke-width: 1.2;
            opacity: 0.12;
          }
          ${communityProvinces
            .map(
              (province) =>
                `.community-loupe .regions path[data-region-id="${province.id}"] {
                  fill: #9dd8f5;
                  opacity: 1;
                }`,
            )
            .join("\n")}`}
      </style>
    </aside>
  );
}
