import { BarChart } from '@mui/x-charts/BarChart';

export interface StarsBarChartDatum {
  label: string;
  stars: number;
  [key: string]: string | number;
}

interface StarsBarChartProps {
  data: StarsBarChartDatum[];
  height?: number;
}

export function StarsBarChart({ data, height = 300 }: StarsBarChartProps) {
  return (
    <BarChart
      height={height}
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
      series={[{ dataKey: 'stars', label: 'Stars' }]}
      slotProps={{ tooltip: { container: document.body } }}
    />
  );
}
