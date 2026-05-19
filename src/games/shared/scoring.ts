import type { GameResult, RegionAnswer } from "./types";

export function buildGameResult(
  mapKind: GameResult["mapKind"],
  title: string,
  answers: RegionAnswer[],
): GameResult {
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  const totalAnswers = answers.length;

  return {
    mapKind,
    title,
    correctAnswers,
    totalAnswers,
    score: Number(((correctAnswers / totalAnswers) * 10).toFixed(1)),
    answers,
  };
}
