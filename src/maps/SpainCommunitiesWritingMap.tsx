import { autonomousCommunities } from "../data/autonomousCommunities";
import mapMarkup from "./svg/communities-map.svg?raw";

type SpainCommunitiesWritingMapProps = {
  answers: Record<string, string>;
  onChange: (answers: Record<string, string>) => void;
};

export function SpainCommunitiesWritingMap({
  answers,
  onChange,
}: SpainCommunitiesWritingMapProps) {
  return (
    <div className="communities-map writing-map">
      <div dangerouslySetInnerHTML={{ __html: mapMarkup.replace(/<title id="title">.*?<\/title>/, "") }} />
      <div className="writing-input-layer">
        {autonomousCommunities.map((community) => (
          <label
            className="writing-label"
            key={community.id}
            style={{
              left: `${(community.labelAnchor.x / 920) * 100}%`,
              top: `${(community.labelAnchor.y / 790) * 100}%`,
            }}
          >
            <span className="sr-only">{community.preferredDisplayName}</span>
            <input
              value={answers[community.id]}
              onChange={(event) =>
                onChange({
                  ...answers,
                  [community.id]: event.target.value,
                })
              }
              placeholder="Escribe aquí"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
