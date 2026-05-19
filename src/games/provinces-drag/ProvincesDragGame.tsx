import { useEffect, useMemo, useState } from "react";
import { provinces } from "../../data/provinces";
import { CommunityLoupe } from "../../maps/CommunityLoupe";
import { getProvinceAtPoint, SpainProvincesMap } from "../../maps/SpainProvincesMap";
import { buildGameResult } from "../shared/scoring";
import type { GameResult } from "../shared/types";

type ProvincesDragGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

export function ProvincesDragGame({ onFinish, onExit }: ProvincesDragGameProps) {
  const [assignments, setAssignments] = useState<Record<string, string | null>>(
    Object.fromEntries(provinces.map((province) => [province.id, null])),
  );
  const [placementPositions, setPlacementPositions] = useState<
    Record<string, { left: number; top: number } | null>
  >(Object.fromEntries(provinces.map((province) => [province.id, null])));
  const [draggedProvinceId, setDraggedProvinceId] = useState<string | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [pointerPosition, setPointerPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [activeCommunityId, setActiveCommunityId] = useState<string | null>(null);
  const [pendingPlacement, setPendingPlacement] = useState<{
    provinceId: string;
    communityId: string;
  } | null>(null);

  const placedCount = Object.values(assignments).filter(Boolean).length;
  const availableProvinces = useMemo(
    () => provinces.filter((province) => !Object.values(assignments).includes(province.id)),
    [assignments],
  );
  const draggedProvince = provinces.find((province) => province.id === draggedProvinceId);

  useEffect(() => {
    if (!draggedProvinceId) return;
    const currentDraggedProvinceId = draggedProvinceId;

    function handlePointerMove(event: PointerEvent) {
      setPointerPosition({ x: event.clientX, y: event.clientY });
      const svg = document.querySelector(".provinces-map svg");
      const regionId = getProvinceAtPoint(
        event.clientX,
        event.clientY,
        svg instanceof SVGSVGElement ? svg : null,
      );
      const province = provinces.find((item) => item.id === regionId);
      setActiveCommunityId(province?.communityId ?? null);
    }

    function handlePointerUp(event: PointerEvent) {
      const svg = document.querySelector(".provinces-map svg");
      const regionId = getProvinceAtPoint(
        event.clientX,
        event.clientY,
        svg instanceof SVGSVGElement ? svg : null,
      );
      openCommunityRefinement(activeCommunityId, regionId, currentDraggedProvinceId);
      setDraggedProvinceId(null);
      setPointerPosition(null);
      setActiveCommunityId(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [activeCommunityId, draggedProvinceId]);

  function openCommunityRefinement(
    preferredCommunityId: string | null,
    regionId: string | null,
    provinceId: string,
  ) {
    const provinceUnderPointer = provinces.find((item) => item.id === regionId);
    const communityId = preferredCommunityId ?? provinceUnderPointer?.communityId;
    if (!communityId) return;
    setPendingPlacement({
      provinceId,
      communityId,
    });
  }

  function assignProvince(
    regionId: string,
    provinceId: string,
    _placement: { left: number; top: number },
  ) {
    setAssignments((current) => {
      const next = { ...current };
      const previousRegion = Object.entries(next).find(([, value]) => value === provinceId)?.[0];
      if (previousRegion) next[previousRegion] = null;
      next[regionId] = provinceId;
      return next;
    });

    const svg = document.querySelector(".provinces-map svg");
    const province = provinces.find((item) => item.id === regionId);
    if (province && svg instanceof SVGSVGElement) {
      const rect = svg.getBoundingClientRect();
      setPlacementPositions((current) => ({
        ...current,
        [regionId]: {
          left: (province.labelAnchor.x / 920) * rect.width,
          top: (province.labelAnchor.y / 790) * rect.height,
        },
      }));
    }
    setSelectedProvinceId(null);
  }

  function assignProvinceToCanonicalMapPosition(regionId: string, provinceId: string) {
    assignProvince(regionId, provinceId, { left: 0, top: 0 });
  }

  function clearRegion(regionId: string) {
    setAssignments((current) => ({ ...current, [regionId]: null }));
    setPlacementPositions((current) => ({ ...current, [regionId]: null }));
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
        "provinces",
        "Arrastra las provincias",
        provinces.map((province) => {
          const assignedProvinceId = assignments[province.id];
          const assignedProvince = provinces.find((item) => item.id === assignedProvinceId);
          return {
            regionId: province.id,
            regionName: province.preferredDisplayName,
            givenAnswer: assignedProvince?.preferredDisplayName ?? null,
            expectedAnswer: province.preferredDisplayName,
            isCorrect: assignedProvinceId === province.id,
          };
        }),
      ),
    );
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Provincias</p>
        <h1>Coloca cada provincia en su sitio</h1>
        <p className="lede">
          Arrastra un nombre hasta la comunidad aproximada y después elige la provincia exacta en el mapa ampliado.
        </p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>{placedCount} de {provinces.length} colocadas</strong>
          <span>En móvil, también puedes tocar una etiqueta y luego tocar una comunidad.</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>Salir</button>
          <button type="button" onClick={reviewAnswers}>Revisar respuestas</button>
        </div>
      </section>

      <section className="game-layout provinces-layout">
        <article className="panel map-panel">
          <SpainProvincesMap
            assignments={assignments}
            placementPositions={placementPositions}
            draggedProvinceId={draggedProvinceId}
            selectedProvinceId={selectedProvinceId}
            onDropRegion={(regionId, provinceId) => {
              openCommunityRefinement(activeCommunityId, regionId, provinceId);
            }}
            onClearRegion={clearRegion}
            onSelectRegion={(regionId) => {
              if (selectedProvinceId) {
                openCommunityRefinement(activeCommunityId, regionId, selectedProvinceId);
              }
            }}
            activeCommunityId={activeCommunityId}
          />
        </article>
        <article className="panel tray-panel">
          <h2>Nombres disponibles</h2>
          <div className="label-tray province-label-tray">
            {availableProvinces.map((province) => (
              <button
                className={`draggable-label ${selectedProvinceId === province.id ? "is-selected" : ""}`}
                key={province.id}
                type="button"
                onClick={() =>
                  setSelectedProvinceId((current) =>
                    current === province.id ? null : province.id,
                  )
                }
                onPointerDown={(event) => {
                  setDraggedProvinceId(province.id);
                  setPointerPosition({ x: event.clientX, y: event.clientY });
                }}
              >
                {province.preferredDisplayName}
              </button>
            ))}
          </div>
        </article>
      </section>

      {pendingPlacement && (
        <CommunityLoupe
          communityId={pendingPlacement.communityId}
          provinceIdToPlace={pendingPlacement.provinceId}
          assignments={assignments}
          onDropRegion={(regionId, provinceId) => {
            assignProvinceToCanonicalMapPosition(regionId, provinceId);
            setPendingPlacement(null);
          }}
          onCancel={() => setPendingPlacement(null)}
        />
      )}

      {draggedProvince && pointerPosition && (
        <div className="floating-label" style={{ left: pointerPosition.x, top: pointerPosition.y }}>
          {draggedProvince.preferredDisplayName}
        </div>
      )}
    </main>
  );
}
