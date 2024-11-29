import Chart from 'react-apexcharts';
import { SLICED_TERMS_LABEL } from '@libs/constant/admin';

type ChartPerTermProps = {
  type: 'bar' | 'line';
  title: string;
  id: string;
  seriesData: number[];
  seriesName: string;
};

const ChartPerTerm = ({ seriesData, title, id, type, seriesName }: Readonly<ChartPerTermProps>) => {
  return (
    <Chart
      options={{
        title: {
          text: title,
        },
        chart: {
          id,
        },
        xaxis: {
          categories: SLICED_TERMS_LABEL,
        },
      }}
      series={[{ name: seriesName, data: seriesData.slice(0, -1) }]}
      type={type}
    />
  );
};

export default ChartPerTerm;
