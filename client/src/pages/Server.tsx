import React, { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import UpdateSwitch from '../components/UpdateSwitch';
import ControlButtonGroup from '../components/ControlButtonGroup';
import ServerModal from '../components/modal/ServerModal';

import Mainbar from '../components//MainBar';
import './css/Home.module.css';

import ReactTable from '../components/table/ReactTable';
import { requestAPI } from '../common/API';
import { toDateFormat } from '../common/DateFormat';

function Server(): JSX.Element {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'seq',
      Cell: ({ value }: any) => <div className="tc">{ value }</div>
    },
    {
      Header: '서버명',
      accessor: 'serverNm',
      width: 3000
    },
    {
      Header: '서버 ID',
      accessor: 'serverId',
      Cell: ({ value }: any) => <div className="tc">{ value }</div>
    },
    {
      Header: 'CPU',
      accessor: 'cpuCnt',
      Cell: ({ value }: any) => <div className="tr">{ Number(value).toLocaleString() }</div>
    },
    {
      Header: '램 용량(gb)',
      accessor: 'ram',
      Cell: ({ value }: any) => <div className="tr">{ Number(value).toLocaleString() }</div>
    },
    {
      Header: 'DISK 1(gb)',
      accessor: 'disk1',
      Cell: ({ value }: any) => <div className="tr">{ Number(value).toLocaleString() }</div>
    },
    {
      Header: 'DISK 2(gb)',
      accessor: 'disk2',
      Cell: ({ value }: any) => <div className="tr">{ Number(value).toLocaleString() }</div>
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
          <UpdateSwitch
            isActive={ value === 1 ? true : false }
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
      Cell: ({ value }: any) => <div className="tc">{ toDateFormat(value) }</div>
    },
    {
      Header: '수정일',
      accessor: 'updDt',
      Cell: ({ value }: any) => <div className="tc">{ toDateFormat(value) }</div>
    },
    {
      Header: '관리',
      Cell: ({ row }: any) => (
        <div className="tc">
          <ControlButtonGroup
            selectFunc={ () => updateServer(row.values.seq) }
            deleteFunc={ () => deleteServer(row.values.seq) }
          />
        </div>
      )
    }
  ], []);

  const getAllServerData = async (): Promise<void> => {
    let ret = await requestAPI({
      type: 'GET',
      url: '/api/server'
    });

    return setData(ret);
  }

  const updateServer = (seq: number): any => {
    console.log(`update seq: ${ seq }`);
    setShowModal(true);
    setModalData({
      serverNm: '테스트',
      serverId: '123'
    });
  }

  const deleteServer = (seq: number): any => {
    console.log(`delete seq: ${ seq }`);
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

      <ServerModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
      />
    </>
  )
}

export default Server;