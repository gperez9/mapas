import { useMemo, useRef, useState } from "react";
import { autonomousCommunities } from "../data/autonomousCommunities";
import { provinces } from "../data/provinces";
import mapMarkup from "./svg/provinces-map.svg?raw";

type ResultState = "correct" | "incorrect";

export const communityFillColors: Record<string, string> = {
  andalucia: "#bfe7c5",
  aragon: "#f6d7a8",
  asturias: "#cfe0fb",
  canarias: "#f7d4e3",
  cantabria: "#d9e8bb",
  "castilla-la-mancha": "#f5e7aa",
  "castilla-y-leon": "#d7d1f1",
  cataluna: "#f7c4b7",
  "comunidad-valenciana": "#c5eadf",
  extremadura: "#d7ebc7",
  galicia: "#c7ddf7",
  "islas-baleares": "#f5d5c9",
  "la-rioja": "#ead4f6",
  madrid: "#f7dcc2",
  murcia: "#cbe5f7",
  navarra: "#f0d0d7",
  "pais-vasco": "#cfe6d7",
};

type SpainProvincesMapProps = {
  assignments?: Record<string, string | null>;
  placementPositions?: Record<string, { left: number; top: number } | null>;
  draggedProvinceId?: string | null;
  selectedProvinceId?: string | null;
  activeCommunityId?: string | null;
  resultStates?: Record<string, ResultState>;
  onDropRegion?: (
    regionId: string,
    provinceId: string,
    placement: { left: number; top: number },
  ) => void;
  onClearRegion?: (regionId: string) => void;
  onSelectRegion?: (regionId: string, placement: { left: number; top: number }) => void;
  onHoverRegion?: (regionId: string | null) => void;
  onActivateRegion?: (regionId: string) => void;
};

export function getProvinceAtPoint(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
  activeCommunityId?: string | null,
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

  if (directRegion) return directRegion;
  if (!svg) return null;

  const rect = svg.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 920;
  const y = ((clientY - rect.top) / rect.height) * 790;

  if (x >= 18 && x <= 368 && y >= 635 && y <= 775) {
    const nearestCanary = provinces
      .filter((province) =>
        ["las-palmas", "santa-cruz-de-tenerife"].includes(province.id),
      )
      .map((province) => ({
        id: province.id,
        distance: Math.hypot(province.labelAnchor.x - x, province.labelAnchor.y - y),
      }))
      .sort((a, b) => a.distance - b.distance)[0];
    return nearestCanary?.id ?? null;
  }

  const nearest = provinces
    .map((province) => ({
      id: province.id,
      distance: Math.hypot(province.labelAnchor.x - x, province.labelAnchor.y - y),
      dropRadius: province.dropRadius ?? 24,
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearest && nearest.distance <= nearest.dropRadius ? nearest.id : null;
}

export function getProvinceInActiveCommunityAtPoint(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
  activeCommunityId: string | null,
) {
  const directMatch = getProvinceAtPoint(clientX, clientY, svg, activeCommunityId);
  if (directMatch) return directMatch;
  if (!svg || !activeCommunityId) return null;

  const rect = svg.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 920;
  const y = ((clientY - rect.top) / rect.height) * 790;
  const nearestInCommunity = provinces
    .filter((province) => province.communityId === activeCommunityId)
    .map((province) => ({
      id: province.id,
      distance: Math.hypot(province.labelAnchor.x - x, province.labelAnchor.y - y),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearestInCommunity && nearestInCommunity.distance <= 58
    ? nearestInCommunity.id
    : null;
}

export function getProvinceRelativePlacement(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
) {
  if (!svg) return { left: 0, top: 0 };
  const rect = svg.getBoundingClientRect();
  return { left: clientX - rect.left, top: clientY - rect.top };
}

export function SpainProvincesMap({
  assignments = {},
  placementPositions = {},
  draggedProvinceId = null,
  selectedProvinceId = null,
  activeCommunityId = null,
  resultStates,
  onDropRegion,
  onClearRegion,
  onSelectRegion,
  onHoverRegion,
  onActivateRegion,
}: SpainProvincesMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  const labels = useMemo(
    () =>
      provinces
        .map((province) => {
          const assignedProvinceId = assignments[province.id];
          const assignedProvince = provinces.find((item) => item.id === assignedProvinceId);
          const placement = placementPositions[province.id];
          return assignedProvince && placement
            ? {
                regionId: province.id,
                text: assignedProvince.preferredDisplayName,
                placement,
              }
            : null;
        })
        .filter(Boolean),
    [assignments, placementPositions],
  );
  const hoveredProvince = provinces.find((province) => province.id === hoveredRegionId);
  const derivedActiveCommunityId =
    draggedProvinceId && hoveredProvince ? hoveredProvince.communityId : null;
  const activeCommunity = autonomousCommunities.find(
    (community) => community.id === (activeCommunityId ?? derivedActiveCommunityId),
  );

  return (
    <div
      className={`provinces-map ${resultStates ? "result-map" : "interactive-map"}`}
      ref={containerRef}
      onPointerMove={(event) => {
        if (!draggedProvinceId) return;
        const svg = containerRef.current?.querySelector("svg") ?? null;
        const regionId = getProvinceAtPoint(event.clientX, event.clientY, svg);
        setHoveredRegionId(regionId);
        onHoverRegion?.(regionId);
      }}
      onPointerUp={(event) => {
        if (!draggedProvinceId) return;
        const svg = containerRef.current?.querySelector("svg") ?? null;
        const regionId = getProvinceInActiveCommunityAtPoint(
          event.clientX,
          event.clientY,
          svg,
          activeCommunity?.id ?? null,
        );
        if (regionId) {
          onDropRegion?.(
            regionId,
            draggedProvinceId,
            getProvinceRelativePlacement(event.clientX, event.clientY, svg),
          );
        }
        setHoveredRegionId(null);
      }}
      onClick={(event) => {
        const svg = containerRef.current?.querySelector("svg") ?? null;
        const regionId = getProvinceAtPoint(event.clientX, event.clientY, svg);
        if (!selectedProvinceId) {
          if (regionId && !resultStates) onActivateRegion?.(regionId);
          return;
        }
        if (regionId) {
          onSelectRegion?.(
            regionId,
            getProvinceRelativePlacement(event.clientX, event.clientY, svg),
          );
        }
      }}
      onMouseLeave={() => {
        setHoveredRegionId(null);
        onHoverRegion?.(null);
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: mapMarkup }}
        onClick={(event) => {
          if (!resultStates) return;
          const target = event.target;
          if (!(target instanceof SVGElement)) return;
          const regionId = target.getAttribute("data-region-id");
          if (regionId) onActivateRegion?.(regionId);
        }}
        onMouseOver={(event) => {
          if (!resultStates) return;
          const target = event.target;
          if (!(target instanceof SVGElement)) return;
          const regionId = target.getAttribute("data-region-id");
          onHoverRegion?.(regionId);
        }}
      />
      {resultStates && (
        <style>
          {Object.entries(resultStates)
            .map(
              ([regionId, state]) =>
                `.provinces-map .regions path[data-region-id="${regionId}"] { fill: ${
                  state === "correct" ? "#9fd7aa" : "#efabab"
                }; }`,
            )
            .join("\n")}
        </style>
      )}
      {!resultStates && (
        <style>
          {provinces
            .map(
              (province) =>
                `.provinces-map .regions path[data-region-id="${province.id}"] { fill: ${
                  communityFillColors[province.communityId] ?? "#9dd8f5"
                }; }`,
            )
            .join("\n")}
          {activeCommunity &&
            provinces
              .filter((province) => province.communityId === activeCommunity.id)
              .map(
                (province) =>
                  `.provinces-map .regions path[data-region-id="${province.id}"] {
                    transform: scale(1.28);
                    transform-origin: ${activeCommunity.labelAnchor.x}px ${activeCommunity.labelAnchor.y}px;
                    stroke-width: 1.8;
                    filter: drop-shadow(0 0 3px rgba(32, 48, 64, 0.22));
                  }`,
              )
              .join("\n")}
        </style>
      )}
      {labels.map((label) => (
        <button
          className="placed-label province-placed-label"
          key={label!.regionId}
          style={{ left: label!.placement.left, top: label!.placement.top }}
          type="button"
          onClick={() => onClearRegion?.(label!.regionId)}
        >
          {label!.text}
        </button>
      ))}
    </div>
  );
}
