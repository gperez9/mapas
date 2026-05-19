import { useMemo, useState } from "react";
import { provinces, type Province } from "../../data/provinces";
import { IsolatedProvinceMap } from "../../maps/IsolatedProvinceMap";
import { normalizeAnswer } from "../shared/answerMatching";
import { buildGameResult } from "../shared/scoring";
import type { GameResult, RegionAnswer } from "../shared/types";

type RecognizeProvinceGameProps = {
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

function isCorrectProvinceAnswer(input: string, expectedProvince: Province) {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) return false;
  return expectedProvince.acceptedNames.map(normalizeAnswer).some((alias) =>
    alias === normalizedInput || damerauLevenshtein(normalizedInput, alias) <= allowedDistance(alias.length),
  );
}

export function RecognizeProvinceGame({ onFinish, onExit }: RecognizeProvinceGameProps) {
  const [questions] = useState(() => shuffle(provinces).slice(0, TOTAL_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ kind: "correct" | "incorrect"; text: string } | null>(null);
  const [answers, setAnswers] = useState<RegionAnswer[]>([]);

  const currentProvince = questions[currentIndex];
  const answered = answers.some((item) => item.regionId === currentProvince.id);
  const correctCount = useMemo(() => answers.filter((item) => item.isCorrect).length, [answers]);

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answered) return;
    if (!answer.trim()) {
      setFeedback({ kind: "incorrect", text: "Escribe una respuesta." });
      return;
    }
    const isCorrect = isCorrectProvinceAnswer(answer, currentProvince);
    const nextAnswer: RegionAnswer = {
      regionId: currentProvince.id,
      regionName: currentProvince.preferredDisplayName,
      givenAnswer: answer.trim(),
      expectedAnswer: currentProvince.preferredDisplayName,
      isCorrect,
    };
    setAnswers((current) => [...current, nextAnswer]);
    setFeedback({
      kind: isCorrect ? "correct" : "incorrect",
      text: isCorrect ? "¡Correcto!" : `No es correcto. Era ${currentProvince.preferredDisplayName}.`,
    });
  }

  function goNext() {
    if (currentIndex + 1 >= questions.length) {
      onFinish(buildGameResult("provinces", "Reconoce la Provincia", answers));
      return;
    }
    setCurrentIndex((current) => current + 1);
    setAnswer("");
    setFeedback(null);
  }

  return (
    <main className="app-shell game-shell">
      <section className="hero-card game-hero">
        <p className="eyebrow">Provincias</p>
        <h1>Reconoce la Provincia</h1>
        <p className="lede">Mira la silueta aislada de cada provincia y escribe su nombre.</p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>Pregunta {currentIndex + 1} de {questions.length}</strong>
          <span>Aciertos: {correctCount}</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>Salir</button>
        </div>
      </section>

      <section className="panel quiz-panel recognize-panel">
        <IsolatedProvinceMap provinceId={currentProvince.id} />
        <form className="quiz-form" onSubmit={submitAnswer}>
          <input
            aria-label="Nombre de la provincia"
            autoFocus
            disabled={answered}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Escribe la provincia"
            type="text"
            value={answer}
          />
          <button disabled={answered} type="submit">Responder</button>
        </form>
        {feedback && <div className={`quiz-feedback ${feedback.kind}`} aria-live="polite">{feedback.text}</div>}
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
