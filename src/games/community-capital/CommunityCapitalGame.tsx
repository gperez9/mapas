import { useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { communityCapitals, type CommunityCapital } from "../../data/communityCapitals";
import { normalizeAnswer } from "../shared/answerMatching";
import { buildGameResult } from "../shared/scoring";
import type { GameResult, RegionAnswer } from "../shared/types";

type CommunityCapitalGameProps = {
  onFinish: (result: GameResult) => void;
  onExit: () => void;
};

type CapitalQuestion = CommunityCapital & {
  communityName: string;
};

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function damerauLevenshtein(a: string, b: string) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => row === 0 ? col : col === 0 ? row : 0),
  );

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );

      if (row > 1 && col > 1 && a[row - 1] === b[col - 2] && a[row - 2] === b[col - 1]) {
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

function isCorrectCapitalAnswer(input: string, expectedAnswers: string[]) {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) return false;

  return expectedAnswers.map(normalizeAnswer).some((alias) =>
    normalizedInput === alias || damerauLevenshtein(normalizedInput, alias) <= allowedDistance(alias.length),
  );
}

const questions: CapitalQuestion[] = communityCapitals.map((capital) => {
  const community = autonomousCommunities.find((item) => item.id === capital.communityId);
  return {
    ...capital,
    communityName: community?.preferredDisplayName ?? capital.communityId,
  };
});

export function CommunityCapitalGame({ onFinish, onExit }: CommunityCapitalGameProps) {
  const [gameQuestions] = useState(() => shuffle(questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ kind: "correct" | "incorrect"; text: string } | null>(null);
  const [answers, setAnswers] = useState<RegionAnswer[]>([]);

  const currentQuestion = gameQuestions[currentIndex];
  const answered = answers.some((item) => item.regionId === currentQuestion.communityId);
  const correctCount = useMemo(() => answers.filter((item) => item.isCorrect).length, [answers]);

  function goNext() {
    if (currentIndex + 1 >= gameQuestions.length) {
      onFinish(buildGameResult("none", "Dime la capital", answers));
      return;
    }

    setCurrentIndex((current) => current + 1);
    setAnswer("");
    setFeedback(null);
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answered) return;

    if (!answer.trim()) {
      setFeedback({ kind: "incorrect", text: "Escribe una respuesta." });
      return;
    }

    const isCorrect = isCorrectCapitalAnswer(answer, currentQuestion.acceptedAnswers);
    const nextAnswer: RegionAnswer = {
      regionId: currentQuestion.communityId,
      regionName: currentQuestion.communityName,
      givenAnswer: answer.trim(),
      expectedAnswer: currentQuestion.displayAnswer,
      isCorrect,
    };
    setAnswers((current) => [...current, nextAnswer]);
    setFeedback({
      kind: isCorrect ? "correct" : "incorrect",
      text: isCorrect ? "¡Correcto!" : `No es correcto. La capital es ${currentQuestion.displayAnswer}.`,
    });
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Comunidades autónomas</p>
        <h1>Dime la capital</h1>
        <p className="lede">Escribe la capital de cada comunidad autónoma. Salen las 17, en orden aleatorio.</p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>Pregunta {currentIndex + 1} de {gameQuestions.length}</strong>
          <span>Aciertos: {correctCount}</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>Salir</button>
        </div>
      </section>

      <section className="panel quiz-panel">
        <p className="quiz-question">
          ¿Cuál es la capital de <strong>{currentQuestion.communityName}</strong>?
        </p>

        <form className="quiz-form" onSubmit={submitAnswer}>
          <input
            aria-label="Capital de la comunidad autónoma"
            autoFocus
            disabled={answered}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Escribe la capital"
            type="text"
            value={answer}
          />
          <button disabled={answered} type="submit">Responder</button>
        </form>

        {feedback && <div className={`quiz-feedback ${feedback.kind}`} aria-live="polite">{feedback.text}</div>}

        <div className="action-row quiz-actions">
          {answered && (
            <button type="button" onClick={goNext}>
              {currentIndex + 1 >= gameQuestions.length ? "Ver resultados" : "Siguiente"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
