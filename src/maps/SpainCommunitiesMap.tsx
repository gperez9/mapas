import { useEffect, useMemo, useRef, useState } from "react";
import { autonomousCommunities } from "../data/autonomousCommunities";
import mapMarkup from "./svg/communities-map.svg?raw";

type SpainCommunitiesMapProps = {
  assignments?: Record<string, string | null>;
  placementPositions?: Record<
    string,
    { left: number | string; top: number | string } | null
  >;
  draggedCommunityId?: string | null;
  selectedCommunityId?: string | null;
  resultStates?: Record<string, "correct" | "incorrect" | undefined>;
  visibleLabels?: Record<string, string | undefined>;
  onHoverRegion?: (regionId: string | null) => void;
  onActivateRegion?: (regionId: string) => void;
  onDropRegion?: (
    regionId: string,
    communityId: string,
    placement: { left: number; top: number },
  ) => void;
  onClearRegion?: (regionId: string) => void;
  onSelectRegion?: (
    regionId: string,
    placement: { left: number; top: number },
  ) => void;
};

type LabelPosition = {
  regionId: string;
  left: number | string;
  top: number | string;
};

type PlacedLabel = LabelPosition & {
  text: string;
};

export function getRegionAtPoint(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
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

  if (directRegion) {
    return directRegion;
  }

  if (!svg) {
    return null;
  }

  const rect = svg.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 920;
  const y = ((clientY - rect.top) / rect.height) * 790;

  if (x >= 20 && x <= 370 && y >= 625 && y <= 775) {
    return "canarias";
  }

  const nearestAnchor = autonomousCommunities
    .map((community) => ({
      id: community.id,
      distance: Math.hypot(
        community.labelAnchor.x - x,
        community.labelAnchor.y - y,
      ),
      dropRadius: community.dropRadius ?? 42,
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearestAnchor && nearestAnchor.distance <= nearestAnchor.dropRadius
    ? nearestAnchor.id
    : null;
}

export function getRelativePlacement(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
) {
  if (!svg) {
    return { left: 0, top: 0 };
  }

  const rect = svg.getBoundingClientRect();
  return {
    left: clientX - rect.left,
    top: clientY - rect.top,
  };
}

export function SpainCommunitiesMap({
  assignments = {},
  placementPositions = {},
  draggedCommunityId = null,
  selectedCommunityId = null,
  resultStates = {},
  visibleLabels = {},
  onHoverRegion,
  onActivateRegion,
  onDropRegion,
  onClearRegion,
  onSelectRegion,
}: SpainCommunitiesMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [fallbackLabelPositions, setFallbackLabelPositions] = useState<LabelPosition[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const svg = container?.querySelector("svg");
    if (!container || !svg) {
      return;
    }

    const updateLabels = () => {
      const svgRect = svg.getBoundingClientRect();
      const nextPositions = autonomousCommunities.map((community) => ({
        regionId: community.id,
        left: (community.labelAnchor.x / 920) * svgRect.width,
        top: (community.labelAnchor.y / 790) * svgRect.height,
      }));

      setFallbackLabelPositions(nextPositions);
    };

    updateLabels();
    const observer = new ResizeObserver(updateLabels);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const svg = container?.querySelector("svg");
    if (!svg) {
      return;
    }

    svg.querySelectorAll("[data-region-id]").forEach((region) => {
      const regionId = region.getAttribute("data-region-id");
      region.classList.toggle("is-targeted", regionId === hoveredRegionId);
      region.classList.toggle("is-filled", Boolean(regionId && assignments[regionId]));
      region.classList.toggle("is-correct", resultStates[regionId ?? ""] === "correct");
      region.classList.toggle("is-incorrect", resultStates[regionId ?? ""] === "incorrect");
    });
  }, [assignments, hoveredRegionId, resultStates]);

  const labels = useMemo<PlacedLabel[]>(
    () =>
      fallbackLabelPositions
        .map((position) => {
          const assignedCommunityId = assignments[position.regionId];
          const community = autonomousCommunities.find(
            (item) => item.id === assignedCommunityId,
          );
          const explicitLabel = visibleLabels[position.regionId];
          return community
            ? {
                ...(placementPositions[position.regionId] ?? position),
                regionId: position.regionId,
                text: community.preferredDisplayName,
              }
            : explicitLabel
              ? {
                  ...(placementPositions[position.regionId] ?? position),
                  regionId: position.regionId,
                  text: explicitLabel,
                }
            : null;
        })
        .filter((label): label is PlacedLabel => Boolean(label)),
    [assignments, fallbackLabelPositions, placementPositions, visibleLabels],
  );

  function getRegionIdFromPoint(clientX: number, clientY: number) {
    const container = containerRef.current;
    const svg = container?.querySelector("svg") ?? null;
    return getRegionAtPoint(clientX, clientY, svg);
  }

  return (
    <div
      className={`communities-map ${resultStates ? "result-map" : "interactive-map"}`}
      ref={containerRef}
      onPointerMove={(event) => {
        const regionId = getRegionIdFromPoint(event.clientX, event.clientY);
        if (draggedCommunityId) {
          setHoveredRegionId(regionId);
        }
        onHoverRegion?.(regionId);
      }}
      onPointerUp={(event) => {
        if (!draggedCommunityId) {
          return;
        }
        const regionId = getRegionIdFromPoint(event.clientX, event.clientY);
        if (regionId) {
          onDropRegion?.(
            regionId,
            draggedCommunityId,
            getRelativePlacement(
              event.clientX,
              event.clientY,
              containerRef.current?.querySelector("svg") ?? null,
            ),
          );
        }
        setHoveredRegionId(null);
      }}
      onPointerLeave={() => {
        setHoveredRegionId(null);
        onHoverRegion?.(null);
      }}
      onClick={(event) => {
        const regionId = getRegionIdFromPoint(event.clientX, event.clientY);
        if (!selectedCommunityId) {
          if (regionId) {
            onActivateRegion?.(regionId);
          }
          return;
        }
        if (regionId) {
          onSelectRegion?.(
            regionId,
            getRelativePlacement(
              event.clientX,
              event.clientY,
              containerRef.current?.querySelector("svg") ?? null,
            ),
          );
        }
      }}
      aria-label="Mapa interactivo de comunidades autónomas"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: resultStates && Object.keys(resultStates).length > 0
            ? mapMarkup.replace(/<title id="title">.*?<\/title>/, "")
            : mapMarkup,
        }}
      />
      {labels.map((label) => (
        <button
          className="placed-label"
          key={label.regionId}
          style={{ left: label.left, top: label.top }}
          type="button"
          onClick={() => onClearRegion?.(label.regionId)}
          title="Pulsa para retirar esta respuesta"
          aria-label={`Retirar ${label.text}`}
        >
          {label.text}
        </button>
      ))}
    </div>
  );
}
