import { merge } from 'src/service/merge/merge';

describe('merge', () => {
  it('merges 3 sorted arrays into one ascending array', () => {
    const c1 = [10, 3, 1];
    const c2 = [0, 2, 6];
    const c3 = [4, 7, 9];

    const result = merge(c1, c2, c3);
    expect(result).toEqual([0, 1, 2, 3, 4, 6, 7, 9, 10]);
  });

  it('handles empty arrays', () => {
    expect(merge([], [], [])).toEqual([]);
    expect(merge([6, 4], [], [])).toEqual([4, 6]);
    expect(merge([], [1, 5], [])).toEqual([1, 5]);
  });

  it('handles duplicates', () => {
    expect(merge([6, 6, 3], [3, 6], [])).toEqual([3, 3, 6, 6, 6]);
  });
});
