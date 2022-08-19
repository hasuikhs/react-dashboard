import { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';
// material
import { Container, Card, Stack, Typography, Grid, Alert } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
// components
import Page from '../../components/Page';
import DataCard from '../../sections/data/Card/DataCard';
import SheetList from '../../sections/data/SheetList';
// utils
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';

// --------------------------------------------------------------------------------

const groupSelectStyles: StylesConfig = {
  control: (base: any, state: any) => ({
    ...base,
    width: 200,
    marginLeft: '220px',
    transition: 'width 300ms, box-shadow 300ms',
    boxShadow: state.isFocused ? '0 8px 16px 0 rgb(145 158 171 / 24%)' : '',
  }),
  menu: (base: any) => ({
    ...base,
    marginLeft: '220px',
    width: 200
  })
};

// --------------------------------------------------------------------------------

function Data(): JSX.Element {
  const [groupSeqFilter, setGroupSeqFilter] = useState<number>(0);
  const [groupOptions, setGroupOptions] = useState<any>([]);
  const [cardData, setCardData] = useState<any>([]);

  // --------------------------------------------------------------------------------

  const getGroupOptions = async (): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: '/api/group'
    });

    ret = ret.sort((a: any, b: any) => a.seq - b.seq).reduce((arr: any[], cur: any) => {
      arr.push({
        value: cur.seq,
        label: cur.groupNm
      });

      return arr;
    }, []);

    setGroupOptions(ret);
  }

  const getDataByGroupSeq = async (groupSeq: number) => {
    // 조회 시점으로부터 1일 전
    const ps = new Date(Date.now() - 24 * 60 * 60 * 1_000).getTime().toString();
    let res = await requestAPI({
      type: 'GET',
      url: `/api/data/group/${ groupSeq }?${ new URLSearchParams({ ps }) }`
    });

    let serverInfo = await requestAPI({
      type: 'GET',
      url: `/api/server/group/${ groupSeq }`
    });

    let ret = Array.from(new Set(res.map((item: any) => item.serverSeq))).map((serverSeq: any) => {
      // 날짜별 오름차순 정렬
      const serverData = res.filter((item: any) => item.serverSeq === serverSeq).sort((a: any, b: any) => (a.regDt > b.regDt) ? 1 : ((b.regDt > a.regDt) ? -1 : 0));
      return {
        serverSeq,
        info: serverInfo.find((item: any) => item.seq === serverSeq),
        data: serverData.map((item: any) => ({ ...item, regDt: toDatetimeFormat(item.regDt) }))
      };
    });

    setCardData(ret);
  }

  // --------------------------------------------------------------------------------

  // 최초 랜더링
  useEffect(() => {
    getGroupOptions();
  }, []);

  // 필터 선택
  useEffect(() => {
    if (groupSeqFilter) {
      getDataByGroupSeq(groupSeqFilter);
    }
  }, [groupSeqFilter]);

  // --------------------------------------------------------------------------------

  return (
    <Page title="Data">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 2 } >
          <Typography variant="h4" gutterBottom>
            <FontAwesomeIcon icon={ faCalendarCheck } style={{ marginRight: '10px' }} />
            Data
            <Alert severity="info" sx={{ backgroundColor: 'transparent' }}>
              24시간 전부터 현재 시간까지의 데이터입니다.<br/>
              {
                cardData.length > 0
                  ? `(조회된 시간: ${ cardData[0].data.slice(0, 1)[0].regDt } ~ ${ cardData[0].data.slice(-1)[0].regDt })`
                  : ''
              }
            </Alert>
          </Typography>
          <Stack spacing={ 0.5 } display="flex" justifyContent="flex-end">
            <SheetList />
            <Select
              isSearchable={ false }
              placeholder={ '그룹 필터' }
              options={ groupOptions }
              styles={ groupSelectStyles }
              onChange={ (e: any) => setGroupSeqFilter(e?.value) }
            />
          </Stack>
        </Stack>

        <Card sx={{ minHeight: '400px', p: 2, m: -1 }} >
          {
            !cardData.length
              ? (
                  <Typography sx={{ p: 10, m: 10, color: 'gray' }} align="center" >
                    선택된 그룹이 없습니다. 그룹을 선택해주세요.
                  </Typography>
                )
              : (
                  <Grid container spacing={ 3 } sx={{ p: 2 }}>
                    {
                      cardData.map((data: any, idx: number) => (
                        <Grid key={ idx } item xs={ 4 } >
                          <DataCard data={ data } groupSeqFilter={ groupSeqFilter } />
                        </Grid>
                      ))
                    }
                  </Grid>
                )
          }
        </Card>
      </Container>
    </Page>
  );
}

// --------------------------------------------------------------------------------

export default Data;