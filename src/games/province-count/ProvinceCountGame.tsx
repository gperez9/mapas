import { useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { provinces } from "../../data/provinces";
import { buildGameResult } from "../shared/scoring";
import type { GameResult, RegionAnswer } from "../shared/types";

type ProvinceCountGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function provinceCountForCommunity(communityId: string) {
  return provinces.filter((province) => province.communityId === communityId).length;
}

const communitiesWithProvinces = autonomousCommunities.filter(
  (community) => provinceCountForCommunity(community.id) > 0,
);

export function ProvinceCountGame({ onFinish, onExit }: ProvinceCountGameProps) {
  const [questions] = useState(() => shuffle(communitiesWithProvinces));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    kind: "correct" | "incorrect";
    text: string;
  } | null>(null);
  const [answers, setAnswers] = useState<RegionAnswer[]>([]);

  const currentCommunity = questions[currentIndex];
  const expectedCount = provinceCountForCommunity(currentCommunity.id);
  const answered = Boolean(feedback);
  const correctCount = useMemo(
    () => answers.filter((item) => item.isCorrect).length,
    [answers],
  );

  function goNext(nextAnswers: RegionAnswer[]) {
    if (currentIndex + 1 >= questions.length) {
      onFinish(buildGameResult("none", "Cuántas Provincias", nextAnswers));
      return;
    }
    setCurrentIndex((current) => current + 1);
    setAnswer("");
    setFeedback(null);
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answered) return;

    const normalizedAnswer = Number(answer);
    if (!Number.isInteger(normalizedAnswer) || normalizedAnswer < 0) {
      setFeedback({
        kind: "incorrect",
        text: "Escribe un número entero.",
      });
      return;
    }

    const isCorrect = normalizedAnswer === expectedCount;
    const nextAnswer: RegionAnswer = {
      regionId: currentCommunity.id,
      regionName: currentCommunity.preferredDisplayName,
      givenAnswer: String(normalizedAnswer),
      expectedAnswer: String(expectedCount),
      isCorrect,
    };
    const nextAnswers = [...answers, nextAnswer];
    setAnswers(nextAnswers);
    setFeedback({
      kind: isCorrect ? "correct" : "incorrect",
      text: isCorrect
        ? "¡Correcto!"
        : `No es correcto. ${currentCommunity.preferredDisplayName} tiene ${expectedCount} ${
            expectedCount === 1 ? "provincia" : "provincias"
          }.`,
    });
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Comunidades autónomas</p>
        <h1>Cuántas Provincias</h1>
        <p className="lede">
          Responde cuántas provincias tiene cada comunidad autónoma. Salen las {communitiesWithProvinces.length}, en orden aleatorio.
        </p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>
            Pregunta {currentIndex + 1} de {questions.length}
          </strong>
          <span>Aciertos: {correctCount}</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>
            Salir
          </button>
        </div>
      </section>

      <section className="panel quiz-panel">
        <p className="quiz-question">
          ¿Cuántas provincias tiene <strong>{currentCommunity.preferredDisplayName}</strong>?
        </p>

        <form className="quiz-form" onSubmit={submitAnswer}>
          <input
            aria-label="Número de provincias"
            disabled={answered}
            inputMode="numeric"
            min="0"
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Escribe un número"
            type="number"
            value={answer}
          />
          <button disabled={answered} type="submit">
            Responder
          </button>
        </form>

        {feedback && (
          <div className={`quiz-feedback ${feedback.kind}`} aria-live="polite">
            {feedback.text}
          </div>
        )}

        <div className="action-row quiz-actions">
          {answered && (
            <button type="button" onClick={() => goNext(answers)}>
              {currentIndex + 1 >= questions.length ? "Ver resultados" : "Siguiente"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
