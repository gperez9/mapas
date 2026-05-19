import { useMemo, useState } from "react";
import { provinces } from "../data/provinces";
import type { RegionAnswer } from "../games/shared/types";
import { SpainProvincesMap } from "./SpainProvincesMap";

type SpainProvincesResultMapProps = {
  answers: RegionAnswer[];
};

export function SpainProvincesResultMap({
  answers,
}: SpainProvincesResultMapProps) {
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);
  const resultStates: Record<string, "correct" | "incorrect"> = Object.fromEntries(
    answers.map((answer) => [
      answer.regionId,
      answer.isCorrect ? "correct" : "incorrect",
    ]),
  ) as Record<string, "correct" | "incorrect">;
  const activeAnswer = useMemo(
    () => answers.find((answer) => answer.regionId === activeRegionId),
    [activeRegionId, answers],
  );
  const activeProvince = provinces.find((province) => province.id === activeRegionId);

  return (
    <div className="result-map-wrapper">
      <SpainProvincesMap
        resultStates={resultStates}
        onHoverRegion={setActiveRegionId}
        onActivateRegion={setActiveRegionId}
      />
      <div className="result-label-layer" aria-hidden="true">
        {provinces.map((province) => (
          <span
            className="result-map-label result-province-label"
            key={province.id}
            style={{
              left: `${(province.labelAnchor.x / 920) * 100}%`,
              top: `${(province.labelAnchor.y / 790) * 100}%`,
            }}
          >
            {province.preferredDisplayName}
          </span>
        ))}
      </div>
      {activeAnswer && !activeAnswer.isCorrect && (
        <aside
          className="result-map-tooltip"
          style={{
            left: `${((activeProvince?.labelAnchor.x ?? 460) / 920) * 100}%`,
            top: `${((activeProvince?.labelAnchor.y ?? 395) / 790) * 100}%`,
          }}
        >
          <strong>{activeAnswer.regionName}</strong>
          <span>
            Pusiste {activeAnswer.givenAnswer ?? "sin respuesta"}; lo correcto es{" "}
            {activeAnswer.expectedAnswer}.
          </span>
        </aside>
      )}
    </div>
  );
}
