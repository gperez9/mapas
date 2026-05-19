import { useMemo, useRef } from "react";
import { autonomousCommunities } from "../data/autonomousCommunities";
import { provinces } from "../data/provinces";
import mapMarkup from "./svg/provinces-map.svg?raw";
import { getLoupeProvinceAtPoint } from "./CommunityLoupe";

type CommunityProvincePickerProps = {
  communityId: string;
  writtenAnswers: Record<string, string>;
  onPickProvince: (provinceId: string) => void;
  onCancel: () => void;
};

export function CommunityProvincePicker({
  communityId,
  writtenAnswers,
  onPickProvince,
  onCancel,
}: CommunityProvincePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const community = autonomousCommunities.find((item) => item.id === communityId);
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
  const pickerMarkup = useMemo(
    () => mapMarkup.replace('viewBox="0 0 920 790"', `viewBox="${viewBox}"`),
    [viewBox],
  );
  const labels = communityProvinces
    .map((province) => {
      const writtenAnswer = writtenAnswers[province.id];
      return writtenAnswer
        ? {
            regionId: province.id,
            text: writtenAnswer,
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
          <span>Selecciona la provincia que quieres nombrar.</span>
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
          if (regionId) onPickProvince(regionId);
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: pickerMarkup }} />
        <div className="community-loupe-label-layer" aria-hidden="true">
          {labels.map((label) => (
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
