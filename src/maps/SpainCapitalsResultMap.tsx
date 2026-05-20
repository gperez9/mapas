import { useMemo, useState } from "react";
import { communityCapitals } from "../data/communityCapitals";
import { provinces } from "../data/provinces";
import type { RegionAnswer } from "../games/shared/types";
import mapMarkup from "./svg/provinces-map.svg?raw";
import { communityFillColors } from "./SpainProvincesMap";

type SpainCapitalsResultMapProps = {
  answers: RegionAnswer[];
};

export function SpainCapitalsResultMap({ answers }: SpainCapitalsResultMapProps) {
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);
  const activeAnswer = useMemo(
    () => answers.find((answer) => answer.regionId === activeRegionId),
    [activeRegionId, answers],
  );
  const activeCapital = communityCapitals.find(
    (capital) => capital.communityId === activeRegionId,
  );

  return (
    <div className="result-map-wrapper capital-result-map-wrapper">
      <div className="provinces-map result-map capital-result-map">
        <div dangerouslySetInnerHTML={{ __html: mapMarkup }} />
        <style>
          {provinces
            .map(
              (province) =>
                `.capital-result-map .regions path[data-region-id="${province.id}"] { fill: ${
                  communityFillColors[province.communityId] ?? "#9dd8f5"
                }; }`,
            )
            .join("\n")}
        </style>
      </div>

      <div className="capital-result-layer">
        {communityCapitals.map((capital) => {
          const answer = answers.find((item) => item.regionId === capital.communityId);
          const stateClass = answer?.isCorrect ? "correct" : "incorrect";
          return (
            <button
              aria-label={`${capital.displayAnswer}: ${answer?.isCorrect ? "correcta" : "incorrecta"}`}
              className={`capital-result-point ${stateClass}`}
              key={capital.communityId}
              onBlur={() => setActiveRegionId(null)}
              onClick={() => setActiveRegionId(capital.communityId)}
              onFocus={() => setActiveRegionId(capital.communityId)}
              onMouseEnter={() => setActiveRegionId(capital.communityId)}
              onMouseLeave={() => setActiveRegionId(null)}
              style={{
                left: `${(capital.mapAnchor.x / 920) * 100}%`,
                top: `${(capital.mapAnchor.y / 790) * 100}%`,
              }}
              type="button"
            >
              <span className="capital-result-dot" aria-hidden="true" />
              <span className="capital-result-label">{capital.displayAnswer}</span>
            </button>
          );
        })}
      </div>

      {activeAnswer && !activeAnswer.isCorrect && (
        <aside
          className="result-map-tooltip"
          style={{
            left: `${((activeCapital?.mapAnchor.x ?? 460) / 920) * 100}%`,
            top: `${((activeCapital?.mapAnchor.y ?? 395) / 790) * 100}%`,
          }}
        >
          <strong>{activeAnswer.regionName}</strong>
          <span>
            Pusiste {activeAnswer.givenAnswer ?? "sin respuesta"}; lo correcto es {activeAnswer.expectedAnswer}.
          </span>
        </aside>
      )}
    </div>
  );
}
