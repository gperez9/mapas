import { useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { provinces } from "../../data/provinces";
import { buildGameResult } from "../shared/scoring";
import type { GameResult } from "../shared/types";

type ProvinceSortGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

function provinceCountForCommunity(communityId: string) {
  return provinces.filter((province) => province.communityId === communityId).length;
}

export function ProvinceSortGame({ onFinish, onExit }: ProvinceSortGameProps) {
  const [assignments, setAssignments] = useState<Record<string, string | null>>(
    Object.fromEntries(provinces.map((province) => [province.id, null])),
  );
  const [draggedProvinceId, setDraggedProvinceId] = useState<string | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [targetCommunityId, setTargetCommunityId] = useState<string | null>(null);

  const placedCount = Object.values(assignments).filter(Boolean).length;
  const availableProvinces = useMemo(
    () => provinces.filter((province) => !assignments[province.id]),
    [assignments],
  );

  function assignProvince(provinceId: string, communityId: string) {
    setAssignments((current) => ({ ...current, [provinceId]: communityId }));
    setSelectedProvinceId(null);
    setDraggedProvinceId(null);
    setTargetCommunityId(null);
  }

  function clearProvince(provinceId: string) {
    setAssignments((current) => ({ ...current, [provinceId]: null }));
  }

  function reviewAnswers() {
    const missing = provinces.length - placedCount;
    if (
      missing > 0 &&
      !window.confirm(`Todavía faltan ${missing} provincias por colocar. ¿Quieres revisar igualmente?`)
    ) {
      return;
    }

    onFinish(
      buildGameResult(
        "none",
        "Clasifica provincias por comunidad",
        provinces.map((province) => {
          const assignedCommunity = autonomousCommunities.find(
            (community) => community.id === assignments[province.id],
          );
          const expectedCommunity = autonomousCommunities.find(
            (community) => community.id === province.communityId,
          );
          return {
            regionId: province.id,
            regionName: province.preferredDisplayName,
            givenAnswer: assignedCommunity?.preferredDisplayName ?? null,
            expectedAnswer: expectedCommunity?.preferredDisplayName ?? province.communityId,
            isCorrect: assignments[province.id] === province.communityId,
          };
        }),
      ),
    );
  }

  return (
    <main className="app-shell game-shell sort-game">
      <section className="hero-card game-hero">
        <p className="eyebrow">Provincias</p>
        <h1>Clasifica provincias por comunidad</h1>
        <p className="lede">Arrastra cada provincia a su comunidad autónoma.</p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>{placedCount} de {provinces.length} provincias colocadas</strong>
          <span>En móvil, toca una provincia y después toca la comunidad destino.</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>Salir</button>
          <button type="button" onClick={reviewAnswers}>Revisar respuestas</button>
        </div>
      </section>

      <section className="sort-layout">
        <article className="panel sort-tray-panel">
          <h2>Provincias disponibles</h2>
          <div className="sort-province-tray">
            {availableProvinces.map((province) => (
              <button
                className={`province-chip ${selectedProvinceId === province.id ? "is-selected" : ""}`}
                draggable
                key={province.id}
                type="button"
                onClick={() =>
                  setSelectedProvinceId((current) => current === province.id ? null : province.id)
                }
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", province.id);
                  setDraggedProvinceId(province.id);
                }}
                onDragEnd={() => {
                  setDraggedProvinceId(null);
                  setTargetCommunityId(null);
                }}
              >
                {province.preferredDisplayName}
              </button>
            ))}
          </div>
        </article>

        <section className="sort-community-grid" aria-label="Comunidades autónomas">
          {autonomousCommunities.map((community) => {
            const assignedProvinceIds = provinces
              .filter((province) => assignments[province.id] === community.id)
              .map((province) => province.id);
            const expectedCount = provinceCountForCommunity(community.id);
            const isTargeted = targetCommunityId === community.id;
            return (
              <article
                className={`community-drop-box ${isTargeted ? "is-targeted" : ""} ${selectedProvinceId ? "has-selection" : ""}`}
                key={community.id}
                onClick={() => {
                  if (selectedProvinceId) assignProvince(selectedProvinceId, community.id);
                }}
                onDragEnter={() => setTargetCommunityId(community.id)}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => setTargetCommunityId(null)}
                onDrop={(event) => {
                  event.preventDefault();
                  const provinceId = event.dataTransfer.getData("text/plain") || draggedProvinceId;
                  if (provinceId) assignProvince(provinceId, community.id);
                }}
              >
                <header>
                  <h3>{community.preferredDisplayName}</h3>
                  <span>{assignedProvinceIds.length}/{expectedCount}</span>
                </header>
                <div className="community-chip-list">
                  {assignedProvinceIds.map((provinceId) => {
                    const province = provinces.find((item) => item.id === provinceId);
                    return province ? (
                      <button
                        className="province-chip placed-sort-chip"
                        key={province.id}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearProvince(province.id);
                        }}
                      >
                        {province.preferredDisplayName}
                      </button>
                    ) : null;
                  })}
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
