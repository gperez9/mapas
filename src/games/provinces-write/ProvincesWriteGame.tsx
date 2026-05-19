import { useMemo, useState } from "react";
import { provinces, type Province } from "../../data/provinces";
import { CommunityProvincePicker } from "../../maps/CommunityProvincePicker";
import { SpainProvincesMap } from "../../maps/SpainProvincesMap";
import { normalizeAnswer } from "../shared/answerMatching";
import { buildGameResult } from "../shared/scoring";
import type { GameResult } from "../shared/types";

type ProvincesWriteGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

function damerauLevenshtein(a: string, b: string) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) =>
      row === 0 ? col : col === 0 ? row : 0,
    ),
  );

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
      if (
        row > 1 &&
        col > 1 &&
        a[row - 1] === b[col - 2] &&
        a[row - 2] === b[col - 1]
      ) {
        matrix[row][col] = Math.min(matrix[row][col], matrix[row - 2][col - 2] + cost);
      }
    }
  }

  return matrix[a.length][b.length];
}

function allowedDistance(length: number) {
  if (length <= 4) return 0;
  if (length <= 7) return 1;
  if (length <= 12) return 2;
  return 3;
}

function isCorrectProvinceName(input: string, expectedProvince: Province) {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) return false;
  return expectedProvince.acceptedNames
    .map(normalizeAnswer)
    .some((alias) =>
      alias === normalizedInput ||
      damerauLevenshtein(normalizedInput, alias) <= allowedDistance(alias.length),
    );
}

export function ProvincesWriteGame({ onFinish, onExit }: ProvincesWriteGameProps) {
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [activeCommunityId, setActiveCommunityId] = useState<string | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const answeredCount = Object.keys(writtenAnswers).length;
  const selectedProvince = provinces.find((province) => province.id === selectedProvinceId);
  const mainMapLabels = useMemo(
    () =>
      provinces
        .map((province) => {
          const text = writtenAnswers[province.id];
          return text
            ? {
                id: province.id,
                text,
                left: (province.labelAnchor.x / 920) * 100,
                top: (province.labelAnchor.y / 790) * 100,
              }
            : null;
        })
        .filter(Boolean),
    [writtenAnswers],
  );

  function openCommunityFromProvince(regionId: string) {
    const province = provinces.find((item) => item.id === regionId);
    if (province) setActiveCommunityId(province.communityId);
  }

  function submitProvinceName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProvinceId || !currentAnswer.trim()) return;
    setWrittenAnswers((current) => ({
      ...current,
      [selectedProvinceId]: currentAnswer.trim(),
    }));
    setSelectedProvinceId(null);
    setCurrentAnswer("");
  }

  function reviewAnswers() {
    const missing = provinces.length - answeredCount;
    if (
      missing > 0 &&
      !window.confirm(`Todavía faltan ${missing} provincias por escribir. ¿Quieres revisar igualmente?`)
    ) {
      return;
    }

    onFinish(
      buildGameResult(
        "provinces",
        "Escribe las provincias",
        provinces.map((province) => {
          const givenAnswer = writtenAnswers[province.id] ?? null;
          return {
            regionId: province.id,
            regionName: province.preferredDisplayName,
            givenAnswer,
            expectedAnswer: province.preferredDisplayName,
            isCorrect: givenAnswer ? isCorrectProvinceName(givenAnswer, province) : false,
          };
        }),
      ),
    );
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Provincias</p>
        <h1>Escribe las provincias</h1>
        <p className="lede">
          Pincha una zona del mapa, selecciona la provincia en el mapa ampliado y escribe su nombre.
        </p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>{answeredCount} de {provinces.length} escritas</strong>
          <span>El mapa ampliado ayuda a seleccionar provincias pequeñas.</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>Salir</button>
          <button type="button" onClick={reviewAnswers}>Revisar respuestas</button>
        </div>
      </section>

      <section className="panel writing-panel provinces-writing-panel">
        <div className="province-write-map-wrapper">
          <SpainProvincesMap
            activeCommunityId={activeCommunityId}
            onActivateRegion={openCommunityFromProvince}
          />
          <div className="province-write-label-layer" aria-hidden="true">
            {mainMapLabels.map((label) => (
              <span
                className="province-write-label"
                key={label!.id}
                style={{ left: `${label!.left}%`, top: `${label!.top}%` }}
              >
                {label!.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {activeCommunityId && (
        <CommunityProvincePicker
          communityId={activeCommunityId}
          writtenAnswers={writtenAnswers}
          onPickProvince={(provinceId) => {
            setSelectedProvinceId(provinceId);
            setCurrentAnswer(writtenAnswers[provinceId] ?? "");
            setActiveCommunityId(null);
          }}
          onCancel={() => setActiveCommunityId(null)}
        />
      )}

      {selectedProvince && (
        <aside className="province-name-dialog">
          <form className="quiz-form" onSubmit={submitProvinceName}>
            <label>
              <strong>Escribe el nombre de la provincia seleccionada</strong>
              <input
                autoFocus
                onChange={(event) => setCurrentAnswer(event.target.value)}
                placeholder="Nombre de la provincia"
                type="text"
                value={currentAnswer}
              />
            </label>
            <div className="toolbar-actions">
              <button type="submit">Guardar</button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setSelectedProvinceId(null);
                  setCurrentAnswer("");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </aside>
      )}
    </main>
  );
}
