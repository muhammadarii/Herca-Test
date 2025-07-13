export function getKomisiPersen(omzet: number): number {
  if (omzet < 100_000_000) return 0;
  if (omzet < 200_000_000) return 2.5;
  if (omzet < 500_000_000) return 5;
  return 10;
}
