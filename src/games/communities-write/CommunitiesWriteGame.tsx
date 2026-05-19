import { useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { SpainCommunitiesWritingMap } from "../../maps/SpainCommunitiesWritingMap";
import { isCorrectWrittenAnswer } from "../shared/answerMatching";
import { buildGameResult } from "../shared/scoring";
import type { GameResult } from "../shared/types";

type CommunitiesWriteGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

export function CommunitiesWriteGame({
  onFinish,
  onExit,
}: CommunitiesWriteGameProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(autonomousCommunities.map((community) => [community.id, ""])),
  );

  const answeredCount = Object.values(answers).filter((answer) => answer.trim()).length;

  function reviewAnswers() {
    const missingAnswers = autonomousCommunities.length - answeredCount;
    if (
      missingAnswers > 0 &&
      !window.confirm(
        `Todavía faltan ${missingAnswers} comunidades por responder. ¿Quieres revisar igualmente?`,
      )
    ) {
      return;
    }

    onFinish(
      buildGameResult(
        "communities",
        "Escribe las comunidades autónomas",
        autonomousCommunities.map((community) => ({
          regionId: community.id,
          regionName: community.preferredDisplayName,
          givenAnswer: answers[community.id].trim() || null,
          expectedAnswer: community.preferredDisplayName,
          isCorrect: isCorrectWrittenAnswer(
            answers[community.id],
            community,
            autonomousCommunities,
          ),
        })),
      ),
    );
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Comunidades autónomas</p>
        <h1>Escribe cada comunidad</h1>
        <p className="lede">
          Escribe el nombre de cada comunidad directamente sobre el mapa.
        </p>
      </section>

      <section className="game-toolbar" aria-label="Progreso de la partida">
        <div className="progress-copy">
          <strong>
            {answeredCount} de {autonomousCommunities.length} respondidas
          </strong>
          <span>No hace falta acertar tildes ni mayúsculas.</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>
            Salir
          </button>
          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              setAnswers(
                Object.fromEntries(
                  autonomousCommunities.map((community) => [community.id, ""]),
                ),
              )
            }
          >
            Reiniciar
          </button>
          <button type="button" onClick={reviewAnswers}>
            Revisar respuestas
          </button>
        </div>
      </section>

      <section className="panel writing-panel">
        <SpainCommunitiesWritingMap answers={answers} onChange={setAnswers} />
      </section>
    </main>
  );
}
