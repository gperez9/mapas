import type { AutonomousCommunity } from "../../data/autonomousCommunities";

export function normalizeAnswer(input: string) {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[-'’]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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
        matrix[row][col] = Math.min(
          matrix[row][col],
          matrix[row - 2][col - 2] + cost,
        );
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

export function isCorrectWrittenAnswer(
  input: string,
  expectedRegion: AutonomousCommunity,
  allRegions: AutonomousCommunity[],
) {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) {
    return false;
  }

  const aliases = expectedRegion.acceptedNames.map(normalizeAnswer);
  if (aliases.includes(normalizedInput)) {
    return true;
  }

  const allCandidates = allRegions.flatMap((region) =>
    region.acceptedNames.map((alias) => ({
      regionId: region.id,
      alias: normalizeAnswer(alias),
      distance: damerauLevenshtein(normalizedInput, normalizeAnswer(alias)),
    })),
  );

  const nearest = [...allCandidates].sort((a, b) => a.distance - b.distance);
  const best = nearest[0];
  const secondBest = nearest[1];

  if (!best || best.regionId !== expectedRegion.id) {
    return false;
  }

  if (secondBest && secondBest.distance === best.distance) {
    return false;
  }

  return best.distance <= allowedDistance(best.alias.length);
}
