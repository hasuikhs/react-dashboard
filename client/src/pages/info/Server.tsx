import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import UpdateSwitch from '../../components/UpdateSwitch';
import ControlButtonGroup from '../../components/ControlButtonGroup';
import ServerModal from '../../components/modal/ServerModal';

import Mainbar from '../../components//MainBar';
import '../css/Home.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faPlus } from '@fortawesome/free-solid-svg-icons';

import ReactTable from '../../components/table/ReactTable';
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';
import Swal from 'sweetalert2';
import Select, { StylesConfig } from 'react-select';

function Server(): JSX.Element {

  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const selectGroupRef: any = useRef<any>(null);

  const [groupSeqFilter, setGroupSeqFilter] = useState<number|undefined>(undefined);
  const [groupOptions, setGroupOptions] = useState<any>([]);

  const groupSelectStyles: StylesConfig = {
    control: (base: any) => ({
      ...base,
      height: '31px',
      minHeight: '31px',
      width: 250
    }),
    placeholder: (base: any) => ({
      ...base,
      height: '30px'
    }),
    container: (base: any) => ({
      ...base,
      height: '30px'
    }),
    valueContainer: (base: any) => ({
      ...base,
      height: '30px'
    }),
    singleValue: (base: any) => ({
      ...base,
      height: '32px'
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      height: '30px'
    })
  }

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
      Header: 'DISK 1',
      accessor: 'disk1',
      Cell: ({ value }: any) => <div className="tr">{ Number(value).toLocaleString() }</div>
    },
    {
      Header: 'DISK 2',
      accessor: 'disk2',
      Cell: ({ value }: any) => <div className="tr">{ Number(value).toLocaleString() }</div>
    },
    // {
    //   Header: 'OS',
    //   accessor: 'os'
    // },
    {
      Header: '사용 상태',
      accessor: 'isActive',
      Cell: ({ row }: any) => (
        <UpdateSwitch
          isActive={ row.values.isActive === 1 ? true : false }
          onChange={ () => updateActive(row.values.seq, row.values.isActive === 1 ? true : false) }
        />
      )
    },
    {
      Header: '그룹',
      accessor: 'groupNm'
    },
    {
      Header: '등록 시간',
      accessor: 'regDt',
      Cell: ({ value }: any) => <div className="tc">{ toDatetimeFormat(value) }</div>
    },
    {
      Header: '수정 시간',
      accessor: 'updDt',
      Cell: ({ value }: any) => <div className="tc">{ toDatetimeFormat(value) }</div>
    },
    {
      Header: '관리',
      Cell: ({ row }: any) => (
        <div className="tc">
          <ControlButtonGroup
            selectFunc={ () => selectServer(row.values.seq) }
            deleteFunc={ () => deleteServer(row.values.seq, row.values.serverNm) }
          />
        </div>
      )
    }
  ], []);

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

  const getAllServerData = async (): Promise<void> => {
    let selected = selectGroupRef.current?.getValue();
    let selectedGroupSeq = selected[0]?.value;

    let ret = null;
    if (selectedGroupSeq){
      ret = await requestAPI({
        type: 'GET',
        url: `/api/server/group/${ selectedGroupSeq }`
      });
    } else {
      ret = await requestAPI({
        type: 'GET',
        url: '/api/server'
      });
    }

    return setTableData(ret);
  }

  const updateActive = async (seq: number, isActive: boolean): Promise<any> => {
    let affected = await requestAPI({
      type: 'PUT',
      url: `/api/server/${ seq }`,
      body: {
        seq: seq,
        isActive: !isActive
      }
    });

    if (affected) {
      Swal.fire({
        title: '상태가 변경되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
        didClose: () => getAllServerData()
      });
    } else {
      getAllServerData();
    }
  }

  const selectServer = async (seq: number): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: `/api/server/${ seq }`
    });

    setShowModal(true);
    setModalData(ret);
  }

  const deleteServer = async (seq: number, serverNm: string): Promise<any> => {
    // 1차 확인
    Swal.fire({
      title: `${ serverNm } 서버를 삭제하시겠습니까?`,
      icon: 'warning',
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소'
    }).then( async (result) => {
      if (result.isConfirmed) {
        // 2차 확인
        Swal.fire({
          title: '정말요?',
          text: '확인을 누르시면 DB에서 삭제되어 복구가 불가능합니다.',
          icon: 'question',
          confirmButtonText: '확인',
          showCancelButton: true,
          cancelButtonText: '취소'
        }).then( async (result) => {
          if (result.isConfirmed) {
            let ret = await requestAPI({
              type: 'DELETE',
              url: `/api/server/${ seq }`
            });

            if (ret) {
              Swal.fire({
                title: '삭제되었습니다!',
                icon: 'success',
                confirmButtonText: '확인',
                didClose: () => getAllServerData()
              });
            }
          }
        });
      }
    });
  }

  // 최초 랜더링
  useEffect(()=> {
    getGroupOptions();
  }, []);

  // 최초 랜더링에서 그룹 필터가 그려지고 state 할당될때 변화
  useEffect(() => {
    getAllServerData();
  }, [groupSeqFilter]);

  return (
    <>
      <Mainbar />
      <Container>
        <h1 className="mb-5 mt-3">
          <FontAwesomeIcon icon={ faServer } /> SERVER
        </h1>

        <Button
          type="button"
          variant="primary"
          className="fl me-2"
          size="sm"
          onClick={ () => setShowModal(true) }
        >
          <FontAwesomeIcon icon={ faPlus } /> NEW SERVER
        </Button>

        <Select
          ref={ selectGroupRef }
          className="fl"
          isClearable={ true }
          placeholder={ '그룹 필터' }
          options={ groupOptions }
          styles={ groupSelectStyles }
          onChange={ (e: any) => setGroupSeqFilter(e?.value) }
        />

        <ReactTable columns={ columns } data={ tableData } />
      </Container>

      <ServerModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ getAllServerData }
        groupOptions={ groupOptions }
      />
    </>
  )
}

export default Server;