import { useMemo, useRef } from "react";
import { communityCapitals } from "../data/communityCapitals";
import { communityFillColors } from "./SpainProvincesMap";
import { provinces } from "../data/provinces";
import mapMarkup from "./svg/provinces-map.svg?raw";

type SpainCapitalsMapProps = {
  assignments?: Record<string, string | null>;
  draggedCapitalId?: string | null;
  selectedCapitalId?: string | null;
  onDropCapital?: (targetCommunityId: string, capitalCommunityId: string) => void;
  onClearTarget?: (targetCommunityId: string) => void;
};

function svgPointFromClient(clientX: number, clientY: number, svg: SVGSVGElement | null) {
  if (!svg) return null;
  const rect = svg.getBoundingClientRect();
  return {
    x: ((clientX - rect.left) / rect.width) * 920,
    y: ((clientY - rect.top) / rect.height) * 790,
  };
}

export function getCapitalTargetAtPoint(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
) {
  const point = svgPointFromClient(clientX, clientY, svg);
  if (!point) return null;

  const nearest = communityCapitals
    .map((capital) => ({
      communityId: capital.communityId,
      distance: Math.hypot(capital.mapAnchor.x - point.x, capital.mapAnchor.y - point.y),
      dropRadius: capital.dropRadius ?? 38,
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearest && nearest.distance <= nearest.dropRadius ? nearest.communityId : null;
}

export function SpainCapitalsMap({
  assignments = {},
  draggedCapitalId = null,
  selectedCapitalId = null,
  onDropCapital,
  onClearTarget,
}: SpainCapitalsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const labels = useMemo(
    () =>
      communityCapitals
        .map((targetCapital) => {
          const assignedCapitalId = assignments[targetCapital.communityId];
          const assignedCapital = communityCapitals.find(
            (capital) => capital.communityId === assignedCapitalId,
          );
          return assignedCapital
            ? {
                targetCommunityId: targetCapital.communityId,
                text: assignedCapital.displayAnswer,
                anchor: targetCapital.mapAnchor,
              }
            : null;
        })
        .filter(Boolean),
    [assignments],
  );

  return (
    <div
      className="provinces-map capitals-map interactive-map"
      ref={containerRef}
      onPointerUp={(event) => {
        if (!draggedCapitalId) return;
        const svg = containerRef.current?.querySelector("svg") ?? null;
        const targetCommunityId = getCapitalTargetAtPoint(event.clientX, event.clientY, svg);
        if (targetCommunityId) onDropCapital?.(targetCommunityId, draggedCapitalId);
      }}
      onClick={(event) => {
        if (!selectedCapitalId) return;
        const svg = containerRef.current?.querySelector("svg") ?? null;
        const targetCommunityId = getCapitalTargetAtPoint(event.clientX, event.clientY, svg);
        if (targetCommunityId) onDropCapital?.(targetCommunityId, selectedCapitalId);
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: mapMarkup }} />
      <style>
        {provinces
          .map(
            (province) =>
              `.capitals-map .regions path[data-region-id="${province.id}"] { fill: ${
                communityFillColors[province.communityId] ?? "#9dd8f5"
              }; }`,
          )
          .join("\n")}
      </style>
      <div className="capital-marker-layer" aria-hidden="true">
        {communityCapitals.map((capital) => (
          <span
            className={`capital-target-marker ${
              selectedCapitalId || draggedCapitalId ? "is-active" : ""
            }`}
            key={capital.communityId}
            style={{
              left: `${(capital.mapAnchor.x / 920) * 100}%`,
              top: `${(capital.mapAnchor.y / 790) * 100}%`,
            }}
          />
        ))}
      </div>
      {labels.map((label) => (
        <button
          className="placed-label capital-placed-label"
          key={label!.targetCommunityId}
          style={{
            left: `${(label!.anchor.x / 920) * 100}%`,
            top: `${(label!.anchor.y / 790) * 100}%`,
          }}
          type="button"
          onClick={() => onClearTarget?.(label!.targetCommunityId)}
        >
          {label!.text}
        </button>
      ))}
    </div>
  );
}
