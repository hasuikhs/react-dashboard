import { useEffect, useState } from 'react';
// material
import { Typography, Alert, Grid, Card } from '@mui/material';
// components
import CardPopover from './CardPopover';
// utils
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';

function ScoreCardGroup() {
  const [cardData, setCardData] = useState<any[]>([]);
  const observeMetric: string[] = ['mi01', 'mi05', 'mi15', 'mem', 'swap', 'disk1', 'disk2', 'disk3'];

  const getAllServerData = async () => {
    // 조회 시점으로부터 1일 전
    const ps = new Date(Date.now() - 24 * 60 * 60 * 1_000).getTime().toString();
    const res = await requestAPI({
      type: 'GET',
      url: `/api/data/all?${ new URLSearchParams({ ps}) }`
    });

    const serverInfo = await requestAPI({
      type: 'GET',
      url: `/api/server`
    });

    let ret = Array.from(new Set(res.map((item: any) => item.serverSeq))).map((serverSeq: any) => {
      // 날짜별 오름차순 정렬
      const info = serverInfo.find((item: any) => item.seq === serverSeq);
      const serverData = res.filter((item: any) => item.serverSeq === serverSeq).sort((a: any, b: any) => (a.regDt > b.regDt) ? 1 : ((b.regDt > a.regDt) ? -1 : 0));

      const cpuCnt: number = info.cpuCnt as number;
      const percentLimit: number = 90;
      const diskUsageLimit: number = 80;

      const overData = observeMetric.reduce((obj: any, cur) => {
        if (cur.includes('mi')) {
          obj[cur] = serverData.filter((item: any) => item[cur] > cpuCnt);
        } else if (cur.includes('disk')) {
          obj[cur] = serverData.filter((item: any) => item[cur] > diskUsageLimit);
        } else {
          obj[cur] = serverData.filter((item: any) => item[cur] > percentLimit);
        }

        return obj;
      }, {});

      return {
        serverSeq,
        info: info,
        data: overData
      };
    });

    const refineData = observeMetric.map((metric: any) => {
      const filterData = ret.filter((item: any) => item.data?.[metric].length > 0);

      return {
        metric,
        data: filterData
      }
    });

    setCardData(refineData);
  }

  useEffect(() => {
    getAllServerData();
  }, []);

  return (
    <>
      {
        observeMetric.map((metric: string, idx: number) => {
          return (
            <Grid key={ idx } item xs={ 6 } sm={ 3 } md={ 1.5 } >
              <CardPopover data={ cardData } metric={ metric } />
            </Grid>
          );
        })
      }
    </>
  );
}

export default ScoreCardGroup;