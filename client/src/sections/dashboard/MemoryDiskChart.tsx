import { useState, useEffect } from 'react';
// material
import { Typography } from '@mui/material';
// chart
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { requestAPI } from '../../common/API';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function MemoryChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [memData, setMemData] = useState<number[]>([]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'dataset' as const,
      intersect: false
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const total: number = context.dataset.data.reduce((acc: number, cur: number) => acc + cur, 0);
            const percent: string = (context.raw / total * 100).toFixed(2);

            return `${ context.label }: ${ context.raw.toFixed(2) } (${ percent }%)`;
          }
        }
      }
    }
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: memData,
        backgroundColor: [ '#80CBC4', '#EAEAEA' ],
        borderColor: [ '#80CBC4', '#EAEAEA' ]
      }
    ]
  }

  const getMemoryData = async () => {
    const res = await requestAPI({
      type: 'GET',
      url: '/api/self/status-real'
    });

    setLabels(Object.keys(res.mem));
    setMemData(Object.values(res.mem));
  }

  useEffect(() => {
    getMemoryData();
  }, [])

  return (
    <>
      <Typography variant="overline" >
        Memory (MB)
      </Typography>
      <Doughnut style={{ maxHeight: '200px' }} data={ chartData } options={ options } />
    </>
  );
}

function DiskChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [diskData, setDiskData] = useState<number[]>([]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'dataset' as const,
      intersect: false
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const total: number = context.dataset.data.reduce((acc: number, cur: number) => acc + cur, 0);
            const percent: string = (context.raw / total * 100).toFixed(2);

            return `${ context.label }: ${ context.raw.toFixed(2) } (${ percent }%)`;
          }
        }
      }
    }
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: diskData,
        backgroundColor: [ '#FFCC80', '#EAEAEA' ],
        borderColor: [ '#FFCC80', '#EAEAEA' ]
      }
    ]
  }

  const getDiskData = async () => {
    const res = await requestAPI({
      type: 'GET',
      url: '/api/self/status-real'
    });

    setLabels(Object.keys(res.disk));
    setDiskData(Object.values(res.disk));
  }

  useEffect(() => {
    getDiskData();
  }, [])

  return (
    <>
      <Typography variant="overline" >
        Disk (MB)
      </Typography>
      <Doughnut style={{ maxHeight: '200px' }} data={ chartData } options={ options } />
    </>
  );
}

export { MemoryChart, DiskChart };