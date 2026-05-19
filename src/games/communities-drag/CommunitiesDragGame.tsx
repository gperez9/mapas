import { useEffect, useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import {
  getRegionAtPoint,
  getRelativePlacement,
  SpainCommunitiesMap,
} from "../../maps/SpainCommunitiesMap";
import { buildGameResult } from "../shared/scoring";
import type { GameResult } from "../shared/types";

type Assignments = Record<string, string | null>;
type PlacementPositions = Record<string, { left: number; top: number } | null>;

type CommunitiesDragGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

export function CommunitiesDragGame({
  onFinish,
  onExit,
}: CommunitiesDragGameProps) {
  const [assignments, setAssignments] = useState<Assignments>(() =>
    Object.fromEntries(autonomousCommunities.map((community) => [community.id, null])),
  );
  const [placementPositions, setPlacementPositions] = useState<PlacementPositions>(() =>
    Object.fromEntries(autonomousCommunities.map((community) => [community.id, null])),
  );
  const [draggedCommunityId, setDraggedCommunityId] = useState<string | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [pointerPosition, setPointerPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const draggedCommunity = autonomousCommunities.find(
    (community) => community.id === draggedCommunityId,
  );

  const placedCount = Object.values(assignments).filter(Boolean).length;

  const availableCommunities = useMemo(
    () =>
      autonomousCommunities.filter(
        (community) => !Object.values(assignments).includes(community.id),
      ),
    [assignments],
  );

  useEffect(() => {
    if (!draggedCommunityId) {
      return;
    }

    function handlePointerUp(event: PointerEvent) {
      const svg = document.querySelector<SVGSVGElement>(".communities-map svg");
      const regionId = getRegionAtPoint(event.clientX, event.clientY, svg);

      if (regionId && draggedCommunityId) {
        assignCommunity(
          regionId,
          draggedCommunityId,
          getRelativePlacement(event.clientX, event.clientY, svg),
        );
      }

      setDraggedCommunityId(null);
      setPointerPosition(null);
    }

    function handlePointerMove(event: PointerEvent) {
      setPointerPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [draggedCommunityId]);

  function assignCommunity(
    regionId: string,
    communityId: string,
    placement?: { left: number; top: number },
  ) {
    setAssignments((current) => {
      const next = { ...current };
      const previousRegion = Object.entries(next).find(
        ([, assignedCommunityId]) => assignedCommunityId === communityId,
      )?.[0];

      if (previousRegion) {
        next[previousRegion] = null;
      }

      next[regionId] = communityId;
      return next;
    });
    setPlacementPositions((current) => {
      const next = { ...current };
      const previousRegion = Object.entries(assignments).find(
        ([, assignedCommunityId]) => assignedCommunityId === communityId,
      )?.[0];

      if (previousRegion) {
        next[previousRegion] = null;
      }

      if (placement) {
        next[regionId] = placement;
      }

      return next;
    });
    setSelectedCommunityId(null);
  }

  function clearRegion(regionId: string) {
    setAssignments((current) => ({ ...current, [regionId]: null }));
    setPlacementPositions((current) => ({ ...current, [regionId]: null }));
  }

  function resetGame() {
    setAssignments(
      Object.fromEntries(autonomousCommunities.map((community) => [community.id, null])),
    );
    setPlacementPositions(
      Object.fromEntries(autonomousCommunities.map((community) => [community.id, null])),
    );
  }

  function reviewAnswers() {
    const missingAnswers = autonomousCommunities.length - placedCount;
    if (
      missingAnswers > 0 &&
      !window.confirm(
        `Todavía faltan ${missingAnswers} comunidades por colocar. ¿Quieres revisar igualmente?`,
      )
    ) {
      return;
    }

    onFinish(
      buildGameResult(
        "communities",
        "Arrastra las comunidades autónomas",
        autonomousCommunities.map((region) => {
          const assignedCommunityId = assignments[region.id];
          const assignedCommunity = autonomousCommunities.find(
            (community) => community.id === assignedCommunityId,
          );

          return {
            regionId: region.id,
            regionName: region.preferredDisplayName,
            givenAnswer: assignedCommunity?.preferredDisplayName ?? null,
            expectedAnswer: region.preferredDisplayName,
            isCorrect: assignedCommunityId === region.id,
          };
        }),
      ),
    );
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Comunidades autónomas</p>
        <h1>Coloca cada comunidad en su sitio</h1>
        <p className="lede">
          Arrastra los nombres hasta el mapa. Cuando termines, pulsa Revisar.
        </p>
      </section>

      <section className="game-toolbar" aria-label="Progreso de la partida">
        <div className="progress-copy">
          <strong>
            {placedCount} de {autonomousCommunities.length} colocadas
          </strong>
          <span>
            {placedCount === autonomousCommunities.length
              ? "¡Ya puedes revisar!"
              : "Puedes mover o retirar una etiqueta antes de revisar."}
          </span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>
            Salir
          </button>
          <button className="secondary-button" type="button" onClick={resetGame}>
            Reiniciar
          </button>
          <button type="button" onClick={reviewAnswers}>
            Revisar respuestas
          </button>
        </div>
      </section>

      <section className="game-layout">
        <article className="panel map-panel">
          {draggedCommunity ? (
            <p className="drag-hint">
              Estás moviendo: <strong>{draggedCommunity.preferredDisplayName}</strong>
            </p>
          ) : selectedCommunityId ? (
            <p className="drag-hint">
              Etiqueta seleccionada:{" "}
              <strong>
                {
                  autonomousCommunities.find(
                    (community) => community.id === selectedCommunityId,
                  )?.preferredDisplayName
                }
              </strong>
              . Ahora toca una región del mapa.
            </p>
          ) : (
            <p className="drag-hint muted">
              Consejo: también puedes tocar una etiqueta y luego tocar una región.
            </p>
          )}
          <SpainCommunitiesMap
            assignments={assignments}
            placementPositions={placementPositions}
            draggedCommunityId={draggedCommunityId}
            selectedCommunityId={selectedCommunityId}
            onDropRegion={assignCommunity}
            onClearRegion={clearRegion}
            onSelectRegion={(regionId, placement) => {
              if (selectedCommunityId) {
                assignCommunity(regionId, selectedCommunityId, placement);
              }
            }}
          />
        </article>

        <article className="panel tray-panel">
          <h2>Nombres disponibles</h2>
          <p>
            Arrastra una etiqueta hasta el mapa. Las comunidades colocadas
            desaparecerán de esta bandeja.
          </p>
          <div className="label-tray">
            {availableCommunities.map((community) => (
              <button
                className={`draggable-label ${
                  draggedCommunityId === community.id ? "is-dragging" : ""
                } ${selectedCommunityId === community.id ? "is-selected" : ""}`}
                key={community.id}
                type="button"
                onClick={() =>
                  setSelectedCommunityId((current) =>
                    current === community.id ? null : community.id,
                  )
                }
                onPointerDown={(event) => {
                  setDraggedCommunityId(community.id);
                  setPointerPosition({ x: event.clientX, y: event.clientY });
                }}
              >
                {community.preferredDisplayName}
              </button>
            ))}
          </div>
          {availableCommunities.length === 0 && (
            <p className="tray-complete">¡Todas colocadas!</p>
          )}
        </article>
      </section>

      {draggedCommunity && pointerPosition && (
        <div
          className="floating-label"
          style={{ left: pointerPosition.x, top: pointerPosition.y }}
          aria-hidden="true"
        >
          {draggedCommunity.preferredDisplayName}
        </div>
      )}
    </main>
  );
}
