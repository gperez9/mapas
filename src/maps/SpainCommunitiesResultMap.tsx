import { useMemo, useState } from "react";
import { autonomousCommunities } from "../data/autonomousCommunities";
import type { RegionAnswer } from "../games/shared/types";
import { SpainCommunitiesMap } from "./SpainCommunitiesMap";

type SpainCommunitiesResultMapProps = {
  answers: RegionAnswer[];
};

export function SpainCommunitiesResultMap({
  answers,
}: SpainCommunitiesResultMapProps) {
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
  const activeCommunity = autonomousCommunities.find(
    (community) => community.id === activeRegionId,
  );

  return (
    <div className="result-map-wrapper">
      <SpainCommunitiesMap
        resultStates={resultStates}
        onHoverRegion={setActiveRegionId}
        onActivateRegion={setActiveRegionId}
      />
      <div className="result-label-layer" aria-hidden="true">
        {autonomousCommunities.map((community) => (
          <span
            className="result-map-label"
            key={community.id}
            style={{
              left: `${(community.labelAnchor.x / 920) * 100}%`,
              top: `${(community.labelAnchor.y / 790) * 100}%`,
            }}
          >
            {community.preferredDisplayName}
          </span>
        ))}
      </div>
      {activeAnswer && !activeAnswer.isCorrect && (
        <aside
          className="result-map-tooltip"
          style={{
            left: `${((activeCommunity?.labelAnchor.x ?? 460) / 920) * 100}%`,
            top: `${((activeCommunity?.labelAnchor.y ?? 395) / 790) * 100}%`,
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
