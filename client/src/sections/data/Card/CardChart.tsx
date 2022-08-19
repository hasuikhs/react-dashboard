// chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  annotationPlugin
);

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

function CardChart({ data, serverInfo }: { data: any, serverInfo: any }) {

  const labels: string[] = data.map((item : any) => item.regDt);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false
      },
      annotation: {
        annotations: [{
          value: 80,
          type: 'line' as const,
          mode: 'horizontal',
          scaleID: 'y',
          borderColor: '#E57373'
        }]
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        min: 0
      }
    }
  }

  const chartData: any[] = data.map((item: any) => item.swap);

  const chartConfigData = {
    labels,
    datasets: [
      {
        borderColor: '#80CBC4',
        backgroundColor: '#80CBC4',
        data: chartData
      }
    ]
  }

  return (
    <Line options={ options } data={ chartConfigData } />
  );
}

export default CardChart;