export function formatSecondsTominutes(seconds: number) {
  const minute = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsMod = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minute}:${secondsMod}`;
}
