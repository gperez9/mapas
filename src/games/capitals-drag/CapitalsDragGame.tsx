import { useEffect, useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { communityCapitals } from "../../data/communityCapitals";
import { getCapitalTargetAtPoint, SpainCapitalsMap } from "../../maps/SpainCapitalsMap";
import { buildGameResult } from "../shared/scoring";
import type { GameResult } from "../shared/types";

type CapitalsDragGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

export function CapitalsDragGame({ onFinish, onExit }: CapitalsDragGameProps) {
  const [assignments, setAssignments] = useState<Record<string, string | null>>(
    Object.fromEntries(communityCapitals.map((capital) => [capital.communityId, null])),
  );
  const [draggedCapitalId, setDraggedCapitalId] = useState<string | null>(null);
  const [selectedCapitalId, setSelectedCapitalId] = useState<string | null>(null);
  const [pointerPosition, setPointerPosition] = useState<{ x: number; y: number } | null>(null);

  const placedCount = Object.values(assignments).filter(Boolean).length;
  const availableCapitals = useMemo(
    () => communityCapitals.filter((capital) => !Object.values(assignments).includes(capital.communityId)),
    [assignments],
  );
  const draggedCapital = communityCapitals.find((capital) => capital.communityId === draggedCapitalId);

  useEffect(() => {
    if (!draggedCapitalId) return;
    const currentDraggedCapitalId = draggedCapitalId;

    function handlePointerMove(event: PointerEvent) {
      setPointerPosition({ x: event.clientX, y: event.clientY });
    }

    function handlePointerUp(event: PointerEvent) {
      const svg = document.querySelector(".capitals-map svg");
      const targetCommunityId = getCapitalTargetAtPoint(
        event.clientX,
        event.clientY,
        svg instanceof SVGSVGElement ? svg : null,
      );
      if (targetCommunityId) assignCapital(targetCommunityId, currentDraggedCapitalId);
      setDraggedCapitalId(null);
      setPointerPosition(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [draggedCapitalId]);

  function assignCapital(targetCommunityId: string, capitalCommunityId: string) {
    setAssignments((current) => {
      const next = { ...current };
      const previousTarget = Object.entries(next).find(([, value]) => value === capitalCommunityId)?.[0];
      if (previousTarget) next[previousTarget] = null;
      next[targetCommunityId] = capitalCommunityId;
      return next;
    });
    setSelectedCapitalId(null);
  }

  function clearTarget(targetCommunityId: string) {
    setAssignments((current) => ({ ...current, [targetCommunityId]: null }));
  }

  function reviewAnswers() {
    const missing = communityCapitals.length - placedCount;
    if (
      missing > 0 &&
      !window.confirm(`Todavía faltan ${missing} capitales por colocar. ¿Quieres revisar igualmente?`)
    ) {
      return;
    }

    onFinish(
      buildGameResult(
        "capitals",
        "Arrastra la capital",
        communityCapitals.map((targetCapital) => {
          const community = autonomousCommunities.find((item) => item.id === targetCapital.communityId);
          const assignedCapitalId = assignments[targetCapital.communityId];
          const assignedCapital = communityCapitals.find((item) => item.communityId === assignedCapitalId);
          return {
            regionId: targetCapital.communityId,
            regionName: community?.preferredDisplayName ?? targetCapital.communityId,
            givenAnswer: assignedCapital?.displayAnswer ?? null,
            expectedAnswer: targetCapital.displayAnswer,
            isCorrect: assignedCapitalId === targetCapital.communityId,
          };
        }),
      ),
    );
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Capitales</p>
        <h1>Arrastra la capital</h1>
        <p className="lede">
          Arrastra cada capital hasta su punto en el mapa. Las comunidades tienen colores distintos para orientarte.
        </p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>{placedCount} de {communityCapitals.length} colocadas</strong>
          <span>En móvil, también puedes tocar una capital y después tocar su punto en el mapa.</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>Salir</button>
          <button type="button" onClick={reviewAnswers}>Revisar respuestas</button>
        </div>
      </section>

      <section className="game-layout provinces-layout">
        <article className="panel map-panel">
          <SpainCapitalsMap
            assignments={assignments}
            draggedCapitalId={draggedCapitalId}
            selectedCapitalId={selectedCapitalId}
            onDropCapital={assignCapital}
            onClearTarget={clearTarget}
          />
        </article>
        <article className="panel tray-panel">
          <h2>Capitales disponibles</h2>
          <div className="label-tray province-label-tray">
            {availableCapitals.map((capital) => (
              <button
                className={`draggable-label ${selectedCapitalId === capital.communityId ? "is-selected" : ""}`}
                key={capital.communityId}
                type="button"
                onClick={() =>
                  setSelectedCapitalId((current) => current === capital.communityId ? null : capital.communityId)
                }
                onPointerDown={(event) => {
                  setDraggedCapitalId(capital.communityId);
                  setPointerPosition({ x: event.clientX, y: event.clientY });
                }}
              >
                {capital.displayAnswer}
              </button>
            ))}
          </div>
          {availableCapitals.length === 0 && <p className="tray-complete">Todas las capitales están colocadas.</p>}
        </article>
      </section>

      {draggedCapital && pointerPosition && (
        <div className="floating-label" style={{ left: pointerPosition.x, top: pointerPosition.y }}>
          {draggedCapital.displayAnswer}
        </div>
      )}
    </main>
  );
}
