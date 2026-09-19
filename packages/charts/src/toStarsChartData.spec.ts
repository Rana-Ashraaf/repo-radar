import { toStarsChartData } from './toStarsChartData';

describe('toStarsChartData', () => {
  it('maps tracked ids with known stats to chart data points', () => {
    const result = toStarsChartData(
      ['facebook/react', 'vuejs/vue'],
      {
        'facebook/react': { stars: 200000 },
        'vuejs/vue': { stars: 46000 },
      },
    );

    expect(result).toEqual([
      { label: 'facebook/react', stars: 200000 },
      { label: 'vuejs/vue', stars: 46000 },
    ]);
  });

  it('skips ids whose stats have not loaded yet', () => {
    const result = toStarsChartData(['facebook/react', 'vuejs/vue'], {
      'facebook/react': { stars: 200000 },
    });

    expect(result).toEqual([{ label: 'facebook/react', stars: 200000 }]);
  });

  it('returns an empty array when nothing is tracked', () => {
    expect(toStarsChartData([], {})).toEqual([]);
  });
});
