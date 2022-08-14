import { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Auth } from '../../modules/auth';
// material
import { Container, Card, Stack, Typography } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
// components
import Page from '../../components/Page';
// utils
import { requestAPI } from '../../common/API';

// --------------------------------------------------------------------------------

const groupSelectStyles: StylesConfig = {
  control: (base: any, state: any) => ({
    ...base,
    width: state.isFocused ? 250: 200,
    boxShadow: state.isFocused ? '0 8px 16px 0 rgb(145 158 171 / 24%)' : ''
  }),
  menu: (base: any) => ({
    ...base,
    width: 250,
    display: 'block'
  }),
  menuList: (base: any) => ({
    ...base,
    display: 'block'
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

    res = Array.from(new Set(res.map((item: any) => item.serverSeq))).map((serverSeq: any) => {
      // 날짜별 오름차순 정렬
      const serverData = res.filter((item: any) => item.serverSeq === serverSeq).sort((a: any, b: any) => (a.regDt > b.regDt) ? 1 : ((b.regDt > a.regDt) ? -1 : 0));
      return {
        serverSeq,
        data: serverData
      };
    });

    setCardData(res);
  }

  // --------------------------------------------------------------------------------

  // 최초 랜더링
  useEffect(() => {
    getGroupOptions();
  }, []);

  // 필터가 선택
  useEffect(() => {
    if (groupSeqFilter) {
      getDataByGroupSeq(groupSeqFilter);
    }
  }, [groupSeqFilter]);

  // --------------------------------------------------------------------------------

  return (
    <Page title="Data">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 5 } >
          <Typography variant="h4" gutterBottom>
            <FontAwesomeIcon icon={ faCalendarCheck } style={{ marginRight: '10px' }} />
            Data
          </Typography>
          <Select
            isSearchable={ false }
            placeholder={ '그룹 필터' }
            options={ groupOptions }
            styles={ groupSelectStyles }
            onChange={ (e: any) => setGroupSeqFilter(e?.value) }
          />
        </Stack>
        {

        }
        <Card sx={{ minHeight: '200px', p: 2 }}>

        </Card>
      </Container>
    </Page>
  );
}

// --------------------------------------------------------------------------------

export default Data;