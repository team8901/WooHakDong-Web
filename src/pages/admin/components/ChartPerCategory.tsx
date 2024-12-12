import Chart from 'react-apexcharts';

type ChartPerCategoryProps = {
  type: 'bar' | 'line';
  title: string;
  id: string;
  seriesData: number[];
  seriesName: string;
  xaxisCategories: string[];
};

const ChartPerCategory = ({
  seriesData,
  title,
  id,
  type,
  seriesName,
  xaxisCategories,
}: Readonly<ChartPerCategoryProps>) => {
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
          categories: xaxisCategories,
        },
      }}
      series={[
        {
          name: seriesName,
          data: seriesData,
        },
      ]}
      type={type}
    />
  );
};

export default ChartPerCategory;
