import type { StarsBarChartDatum } from './StarsBarChart';

export function toStarsChartData(
  ids: string[],
  statsById: Record<string, { stars: number }>,
): StarsBarChartDatum[] {
  return ids.filter((id) => statsById[id]).map((id) => ({ label: id, stars: statsById[id].stars }));
}