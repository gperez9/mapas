import { useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { IsolatedCommunityMap } from "../../maps/IsolatedCommunityMap";
import { isCorrectWrittenAnswer } from "../shared/answerMatching";
import { buildGameResult } from "../shared/scoring";
import type { GameResult, RegionAnswer } from "../shared/types";

type RecognizeCommunityGameProps = {
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

export function RecognizeCommunityGame({ onFinish, onExit }: RecognizeCommunityGameProps) {
  const [questions] = useState(() => shuffle(autonomousCommunities));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    kind: "correct" | "incorrect";
    text: string;
  } | null>(null);
  const [answers, setAnswers] = useState<RegionAnswer[]>([]);

  const currentCommunity = questions[currentIndex];
  const answered = Boolean(feedback);
  const correctCount = useMemo(
    () => answers.filter((item) => item.isCorrect).length,
    [answers],
  );

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answered) return;

    if (!answer.trim()) {
      setFeedback({ kind: "incorrect", text: "Escribe una respuesta." });
      return;
    }

    const isCorrect = isCorrectWrittenAnswer(answer, currentCommunity, autonomousCommunities);
    const nextAnswer: RegionAnswer = {
      regionId: currentCommunity.id,
      regionName: currentCommunity.preferredDisplayName,
      givenAnswer: answer.trim(),
      expectedAnswer: currentCommunity.preferredDisplayName,
      isCorrect,
    };
    setAnswers((current) => [...current, nextAnswer]);
    setFeedback({
      kind: isCorrect ? "correct" : "incorrect",
      text: isCorrect
        ? "¡Correcto!"
        : `No es correcto. Era ${currentCommunity.preferredDisplayName}.`,
    });
  }

  function goNext() {
    const nextAnswers = answers;
    if (currentIndex + 1 >= questions.length) {
      onFinish(buildGameResult("communities", "Reconoce la Comunidad", nextAnswers));
      return;
    }
    setCurrentIndex((current) => current + 1);
    setAnswer("");
    setFeedback(null);
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Comunidades autónomas</p>
        <h1>Reconoce la Comunidad</h1>
        <p className="lede">
          Mira la silueta aislada de cada comunidad autónoma y escribe su nombre.
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

      <section className="panel quiz-panel recognize-panel">
        <IsolatedCommunityMap communityId={currentCommunity.id} />

        <form className="quiz-form" onSubmit={submitAnswer}>
          <input
            aria-label="Nombre de la comunidad autónoma"
            autoFocus
            disabled={answered}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Escribe la comunidad autónoma"
            type="text"
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
            <button type="button" onClick={goNext}>
              {currentIndex + 1 >= questions.length ? "Ver resultados" : "Siguiente"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
