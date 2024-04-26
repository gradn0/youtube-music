export function shuffleClone<T> (arr: T[]) {
  const b = structuredClone(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [b[i], b[r]] = [b[r], b[i]]; 
  }
  return b;
}