import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Mainbar from '../components//MainBar';
import './css/Home.module.css';

import Table from '../components/table/Table';
import { requestAPI } from '../common/API';

function Server(): JSX.Element {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'seq'
    },
    {
      Header: '서버명',
      accessor: 'serverNm'
    },
    {
      Header: '서버 ID',
      accessor: 'serverId'
    },
    {
      Header: 'CPU 개수',
      accessor: 'cpuCnt'
    },
    {
      Header: '램 용량',
      accessor: 'ram',
    },
    {
      Header: 'DISK 1',
      accessor: 'disk1'
    },
    {
      Header: 'DISK 2',
      accessor: 'disk2'
    },
    {
      Header: 'OS',
      accessor: 'os'
    },
    {
      Header: '활성 상태',
      accessor: 'isActive'
    },
    {
      Header: '소속 그룹',
      accessor: 'groupSeq'
    },
    {
      Header: '등록일',
      accessor: 'regDt'
    },
    {
      Header: '수정일',
      accessor: 'updDt'
    }
  ], []);

  const getAllServerData = async () => {
    let ret = await requestAPI({
      type: 'GET',
      url: '/api/server',
      callback: () => navigate('/login')
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
        <Table columns={ columns } data={ data } />
      </Container>
    </>
  )
}

export default Server;