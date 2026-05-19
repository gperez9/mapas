import { useMemo, useState } from "react";
import { autonomousCommunities } from "../../data/autonomousCommunities";
import { provinces, type Province } from "../../data/provinces";
import { normalizeAnswer } from "../shared/answerMatching";
import { buildGameResult } from "../shared/scoring";
import type { GameResult, RegionAnswer } from "../shared/types";

type ProvinceListGameProps = {
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

function normalizedAliases(province: Province) {
  return province.acceptedNames
    .map(normalizeAnswer)
    .sort((a, b) => b.length - a.length);
}

function containsAlias(normalizedInput: string, alias: string) {
  const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|\\s)${escapedAlias}(?=\\s|$)`).test(normalizedInput);
}

function normalizeProvinceListInput(input: string) {
  return ` ${normalizeAnswer(input)
    .replace(/[.,;:()/\\|]+/g, " ")
    .replace(/\by\b/g, " ")
    .replace(/\be\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

function evaluateProvinceList(input: string, expectedProvinces: Province[]) {
  const normalizedInput = normalizeProvinceListInput(input);
  return expectedProvinces.map((province): RegionAnswer => {
    const isCorrect = normalizedAliases(province).some((alias) =>
      containsAlias(normalizedInput, alias),
    );
    return {
      regionId: province.id,
      regionName: province.preferredDisplayName,
      givenAnswer: isCorrect ? province.preferredDisplayName : null,
      expectedAnswer: province.preferredDisplayName,
      isCorrect,
    };
  });
}

const communitiesWithProvinces = autonomousCommunities.filter((community) =>
  provinces.some((province) => province.communityId === community.id),
);

export function ProvinceListGame({ onFinish, onExit }: ProvinceListGameProps) {
  const [questions] = useState(() => shuffle(communitiesWithProvinces));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    correct: number;
    total: number;
    missing: string[];
  } | null>(null);
  const [answers, setAnswers] = useState<RegionAnswer[]>([]);

  const currentCommunity = questions[currentIndex];
  const expectedProvinces = useMemo(
    () => provinces.filter((province) => province.communityId === currentCommunity.id),
    [currentCommunity.id],
  );
  const answered = Boolean(feedback);
  const correctCount = useMemo(
    () => answers.filter((item) => item.isCorrect).length,
    [answers],
  );

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answered) return;

    if (!answer.trim()) {
      setFeedback({
        correct: 0,
        total: expectedProvinces.length,
        missing: expectedProvinces.map((province) => province.preferredDisplayName),
      });
      return;
    }

    const questionAnswers = evaluateProvinceList(answer, expectedProvinces);
    const nextAnswers = [...answers, ...questionAnswers];
    const correct = questionAnswers.filter((item) => item.isCorrect).length;
    setAnswers(nextAnswers);
    setFeedback({
      correct,
      total: expectedProvinces.length,
      missing: questionAnswers
        .filter((item) => !item.isCorrect)
        .map((item) => item.expectedAnswer),
    });
  }

  function goNext() {
    if (currentIndex + 1 >= questions.length) {
      onFinish(buildGameResult("none", "Dime las provincias", answers));
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
        <h1>Dime las provincias</h1>
        <p className="lede">
          Escribe las provincias de cada comunidad. Puedes separarlas con comas, espacios, saltos de línea o “y”.
        </p>
      </section>

      <section className="game-toolbar">
        <div className="progress-copy">
          <strong>
            Pregunta {currentIndex + 1} de {questions.length}
          </strong>
          <span>Aciertos acumulados: {correctCount} de {provinces.length}</span>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" type="button" onClick={onExit}>
            Salir
          </button>
        </div>
      </section>

      <section className="panel quiz-panel">
        <p className="quiz-question">
          Dime las provincias de <strong>{currentCommunity.preferredDisplayName}</strong>.
        </p>
        <p className="small-note">
          Tiene {expectedProvinces.length} {expectedProvinces.length === 1 ? "provincia" : "provincias"}.
        </p>

        <form className="quiz-form" onSubmit={submitAnswer}>
          <textarea
            aria-label="Provincias de la comunidad"
            className="quiz-textarea"
            disabled={answered}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Ejemplo: Lugo, Orense, Pontevedra y La Coruña"
            rows={5}
            value={answer}
          />
          <button disabled={answered} type="submit">
            Responder
          </button>
        </form>

        {feedback && (
          <div
            className={`quiz-feedback ${feedback.correct === feedback.total ? "correct" : "incorrect"}`}
            aria-live="polite"
          >
            <strong>{feedback.correct} de {feedback.total} correctas.</strong>
            {feedback.missing.length > 0 && (
              <span> Faltaban: {feedback.missing.join(", ")}.</span>
            )}
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
