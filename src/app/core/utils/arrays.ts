/**
 * Shuffles an array into a random order
 * @param array
 */
export function shuffle(array: any[]) {
  for (let max = array.length - 1; max > 0; max--) {
    const j = Math.floor(Math.random() * (max + 1));
    [array[max], array[j]] = [array[j], array[max]];
  }

  return array;
}
