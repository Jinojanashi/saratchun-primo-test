export function merge(
  collection1: number[],
  collection2: number[],
  collection3: number[],
): number[] {
  const a = reverse(collection1);
  const b = collection2;
  const c = collection3;

  const result: number[] = [];
  let i = 0,
    j = 0,
    k = 0;

  while (i < a.length || j < b.length || k < c.length) {
    const candidates: { val: number; from: 'a' | 'b' | 'c' }[] = [];

    if (i < a.length) candidates.push({ val: a[i], from: 'a' });
    if (j < b.length) candidates.push({ val: b[j], from: 'b' });
    if (k < c.length) candidates.push({ val: c[k], from: 'c' });

    let min = candidates[0];
    for (let n = 1; n < candidates.length; n++) {
      if (candidates[n].val < min.val) {
        min = candidates[n];
      }
    }

    result.push(min.val);
    if (min.from === 'a') i++;
    else if (min.from === 'b') j++;
    else if (min.from === 'c') k++;
  }

  return result;
}

function reverse(arr: number[]): number[] {
  const result: number[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}
