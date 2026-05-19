export type RegionAnswer = {
  regionId: string;
  regionName: string;
  givenAnswer: string | null;
  expectedAnswer: string;
  isCorrect: boolean;
};

export type GameResult = {
  mapKind: "communities" | "provinces" | "none";
  title: string;
  correctAnswers: number;
  totalAnswers: number;
  score: number;
  answers: RegionAnswer[];
};
