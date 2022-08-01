import React, { useState, useEffect, useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import UpdateSwitch from '../components/UpdateSwitch';
import ControlButtonGroup from '../components/ControlButtonGroup';
import ServerModal from '../components/modal/ServerModal';

import Mainbar from '../components//MainBar';
import './css/Home.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faPlus } from '@fortawesome/free-solid-svg-icons';

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
      accessor: 'serverNm'
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
      Header: 'RAM',
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

  const updateServer = async (seq: number): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: `/api/server/${ seq }`
    });

    setShowModal(true);
    setModalData(ret);
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
        <h1 className="mb-5 mt-3">
          <FontAwesomeIcon icon={ faServer } /> SERVER LIST
        </h1>
        <Button
          type="button"
          variant="primary"
          className="fl"
          size="sm"
          onClick={ () => setShowModal(true) }
        >
          <FontAwesomeIcon icon={ faPlus } /> NEW SERVER
        </Button>
        <ReactTable columns={ columns } data={ data } />
      </Container>

      <ServerModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData = { setModalData }
      />
    </>
  )
}

export default Server;