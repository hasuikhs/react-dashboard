import React, { useState, useEffect, useMemo } from 'react';
import { Container, Form } from 'react-bootstrap';
import TableSwitch from '../components/table/TableSwitch';

import Mainbar from '../components//MainBar';
import './css/Home.module.css';

import ReactTable from '../components/table/ReactTable';
import { requestAPI } from '../common/API';
import { toDatetimeFormat } from '../common/DateFormat';

function Server(): JSX.Element {

  const [data, setData] = useState([]);

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'seq',
      Cell: ({ value }: any) => <p className="tc">{ value }</p>
    },
    {
      Header: '서버명',
      accessor: 'serverNm',
      width: 3000
    },
    {
      Header: 'CPU 개수',
      accessor: 'cpuCnt',
      Cell: ({ value }: any) => <p className="tr">{ Number(value).toLocaleString() }</p>
    },
    {
      Header: '램 용량(gb)',
      accessor: 'ram',
      Cell: ({ value }: any) => <p className="tr">{ Number(value).toLocaleString() }</p>
    },
    {
      Header: 'DISK 1(gb)',
      accessor: 'disk1',
      Cell: ({ value }: any) => <p className="tr">{ Number(value).toLocaleString() }</p>
    },
    {
      Header: 'DISK 2(gb)',
      accessor: 'disk2',
      Cell: ({ value }: any) => <p className="tr">{ Number(value).toLocaleString() }</p>
    },
    {
      Header: 'OS',
      accessor: 'os'
    },
    {
      Header: '활성 상태',
      accessor: 'isActive',
      Cell: ({ value }: any) => {
        return (
          <TableSwitch
            isActive={ value === 'Y' ? true : false }
          />
        )
      }
    },
    {
      Header: '소속 그룹',
      accessor: 'groupSeq'
    },
    {
      Header: '등록일',
      accessor: 'regDt',
      Cell: ({ value }: any) => <p className="tc">{ toDatetimeFormat(value) }</p>
    },
    {
      Header: '수정일',
      accessor: 'updDt',
      Cell: ({ value }: any) => <p className="tc">{ toDatetimeFormat(value) }</p>
    }
  ], []);

  const getAllServerData = async () => {
    let ret = await requestAPI({
      type: 'GET',
      url: '/api/server'
    });

    setData(ret);
  }

  useEffect(()=> {
    getAllServerData();
  }, []);


  return (
    <>
      <Mainbar />
      <Container>
        <h1>Server</h1>
        <ReactTable columns={ columns } data={ data } />
      </Container>
    </>
  )
}

export default Server;