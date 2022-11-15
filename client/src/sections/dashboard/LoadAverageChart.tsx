import { useState, useEffect } from 'react';
// material
import { InputLabel, MenuItem, FormControl, Stack, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { requestAPI } from '../../common/API';
// utils
import { toDatetimeFormat } from '../../common/Date';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin
);

function LoadAverageChart({ serverInfo }: { serverInfo: any }) {
  const [labels, setLabels] = useState();
  const [datasets, setDatasets] = useState<any[]>([]);
  const [hour, setHour] = useState<number>(1);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      },
      annotation: {
        annotations: [{
          value: serverInfo?.cpu,
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

  const chartConfigData = {
    labels,
    datasets
  }

  const loadAvgkey: string[] = [ 'mi01', 'mi05', 'mi15' ];
  const colorPalette: string[] = [ '#80CBC4', '#FFCC80', '#B39DDB' ];

  const getLoadAvgData = async () => {
    const res = await requestAPI({
      type: 'GET',
      url: `/api/self/status?${ new URLSearchParams({ beforeHours: hour.toString() }) }`
    });

    const chartData = loadAvgkey.map((value: string, idx: number) => ({
      label: value,
      data: res.map((item: any) => item?.[value]),
      borderWidth: 2,
      borderColor: colorPalette[idx],
      backgroundColor: colorPalette[idx],
      pointRadius: 0,
      tension: 0.2
    }));

    setLabels(res.map((item: any) => toDatetimeFormat(item.regDt)));
    setDatasets(chartData);
  }

  const hourChange = (event: SelectChangeEvent) => {
    setHour(parseInt(event.target.value));
  }

  useEffect(() => {
    getLoadAvgData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ hour ]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" >
        <Typography variant="overline" >
          Load Average
        </Typography>

        <FormControl sx={{ m:1, width: 110 }} size="small">
          <InputLabel id="chart-select">시간 선택</InputLabel>
          <Select
            labelId="chart-select"
            value={ hour.toString() }
            label="시간 선택"
            onChange={ hourChange }
          >
            <MenuItem value="1">1시간 전</MenuItem>
            <MenuItem value="3">3시간 전</MenuItem>
            <MenuItem value="6">6시간 전</MenuItem>
            <MenuItem value="12">12시간 전</MenuItem>
            <MenuItem value="24">1일 전</MenuItem>
          </Select>
        </FormControl>

      </Stack>
      <Line style={{ maxHeight: '420px' }} options={ options } data={ chartConfigData } />
    </>
  );
}

export default LoadAverageChart;