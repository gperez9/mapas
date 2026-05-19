import { useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { provinces } from "../../data/provinces";
import { isCorrectWrittenAnswer } from "../shared/answerMatching";
import { buildGameResult } from "../shared/scoring";
import type { GameResult, RegionAnswer } from "../shared/types";

type GuessCommunityGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

const TOTAL_QUESTIONS = 20;

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export function GuessCommunityGame({ onFinish, onExit }: GuessCommunityGameProps) {
  const [questions] = useState(() => shuffle(provinces).slice(0, TOTAL_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const [feedback, setFeedback] = useState<{
    kind: "correct" | "incorrect";
    text: string;
  } | null>(null);
  const [answers, setAnswers] = useState<RegionAnswer[]>([]);

  const currentProvince = questions[currentIndex];
  const expectedCommunity = autonomousCommunities.find(
    (community) => community.id === currentProvince.communityId,
  );
  const selectedCommunity = autonomousCommunities.find(
    (community) => community.id === selectedCommunityId,
  );
  const answered = Boolean(feedback);
  const correctCount = useMemo(
    () => answers.filter((answer) => answer.isCorrect).length,
    [answers],
  );

  function goNext(nextAnswers: RegionAnswer[]) {
    if (currentIndex + 1 >= questions.length) {
      onFinish(buildGameResult("none", "Adivina la comunidad", nextAnswers));
      return;
    }
    setCurrentIndex((current) => current + 1);
    setTypedAnswer("");
    setSelectedCommunityId("");
    setFeedback(null);
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!expectedCommunity || answered) return;

    const trimmedTypedAnswer = typedAnswer.trim();
    if (!trimmedTypedAnswer && !selectedCommunityId) {
      setFeedback({
        kind: "incorrect",
        text: "Escribe una respuesta o elige una comunidad.",
      });
      return;
    }

    const givenAnswer = trimmedTypedAnswer || selectedCommunity?.preferredDisplayName || "";
    const isCorrect = trimmedTypedAnswer
      ? isCorrectWrittenAnswer(trimmedTypedAnswer, expectedCommunity, autonomousCommunities)
      : selectedCommunityId === expectedCommunity.id;
    const nextAnswer: RegionAnswer = {
      regionId: currentProvince.id,
      regionName: currentProvince.preferredDisplayName,
      givenAnswer,
      expectedAnswer: expectedCommunity.preferredDisplayName,
      isCorrect,
    };
    const nextAnswers = [...answers, nextAnswer];
    setAnswers(nextAnswers);
    setFeedback({
      kind: isCorrect ? "correct" : "incorrect",
      text: isCorrect
        ? "¡Correcto!"
        : `No es correcto. La respuesta correcta es ${expectedCommunity.preferredDisplayName}.`,
    });
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Provincias</p>
        <h1>Adivina la Comunidad</h1>
        <p className="lede">
          Dada una provincia, escribe o elige a qué comunidad autónoma pertenece.
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
          ¿A qué comunidad autónoma pertenece{" "}
          <strong>{currentProvince.preferredDisplayName}</strong>?
        </p>

        <form className="quiz-form" onSubmit={submitAnswer}>
          <input
            aria-label="Respuesta escrita"
            disabled={answered}
            onChange={(event) => setTypedAnswer(event.target.value)}
            placeholder="Escribe la comunidad autónoma"
            type="text"
            value={typedAnswer}
          />
          <span className="answer-separator">o</span>
          <select
            aria-label="Respuesta elegida"
            disabled={answered}
            onChange={(event) => setSelectedCommunityId(event.target.value)}
            value={selectedCommunityId}
          >
            <option value="">Elige una comunidad autónoma</option>
            {autonomousCommunities.map((community) => (
              <option key={community.id} value={community.id}>
                {community.preferredDisplayName}
              </option>
            ))}
          </select>
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
