import { useEffect, useState } from 'react';
// material
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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

function CardChart({ monitoringData, serverInfo }: { monitoringData: any, serverInfo: any }) {
  const [indicator, setIndicator] = useState('cpu');
  const [limit, setLimit] = useState(undefined);
  const [datasets, setDatasets] = useState<any[]>([]);

  const percentLimit: number = 90;
  const diskUsageLimit: number = 80;

  const chartField = [
    {
      title: 'cpu',
      values: [ 'cpu' ]
    },
    {
      title: 'loadAvg',
      values: [ 'mi01', 'mi05', 'mi15' ],
      limit: serverInfo.cpuCnt
    },
    {
      title: 'memory',
      values: [ 'mem' ],
      limit: percentLimit
    },
    {
      title: 'swap',
      values: [ 'swap' ],
      limit: percentLimit
    },
    {
      title: 'disk',
      values: [ 'totalDisk', 'disk1', 'disk2', 'disk3' ],
      limit: diskUsageLimit
    }
  ];

  const colorPalette: string[] = [ '#80CBC4', '#FFCC80', '#B39DDB', '#B0BEC5' ];

  const labels: string[] = monitoringData.map((item : any) => item.regDt);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      annotation: {
        annotations: [{
          value: limit,
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

  const handleChange = (event: SelectChangeEvent) => {
    setIndicator(event.target.value);
  }

  useEffect(() => {
    const matchRet = chartField.find((item: any) => item.title === indicator);

    const chartData = matchRet?.values.map((value: string, idx: number) => ({
      label: value,
      data: monitoringData.map((item: any) => item?.[value]),
      borderColor: colorPalette[idx],
      backgroundColor: colorPalette[idx],
      pointRadius: 2,
      tension: 0.2
    })) || [];

    setLimit(matchRet?.limit);
    setDatasets(chartData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ indicator ]);

  return (
    <>
      <FormControl sx={{ m:1, width: 110 }} size="small">
        <InputLabel id="chart-select">Indicator</InputLabel>
        <Select
          labelId="chart-select"
          value={ indicator }
          label="Indicatddor"
          onChange={ handleChange }
        >
          <MenuItem value="cpu">CPU</MenuItem>
          <MenuItem value="loadAvg">Load Avg</MenuItem>
          <MenuItem value="memory">Memory</MenuItem>
          <MenuItem value="swap">Swap</MenuItem>
          <MenuItem value="disk">Disk</MenuItem>
        </Select>
      </FormControl>

      <Line options={ options } data={ chartConfigData } />
    </>
  );
}

export default CardChart;