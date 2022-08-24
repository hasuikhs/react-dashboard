import { useState, useEffect, useMemo, useRef } from 'react';
import Swal from 'sweetalert2';
import Select, { StylesConfig } from 'react-select';
// material
import { Container, Card, Stack, Typography, Button, Alert } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faServer } from '@fortawesome/free-solid-svg-icons';
// components
import UpdateSwitch from '../../components/UpdateSwitch';
import ControlButtonGroup from '../../components/ControlButtonGroup';
import InformationModal from '../../components/modal/InformationModal';
import ServerModal from '../../components/modal/ServerModal';
import ReactTable from '../../components/table/ReactTable';
import Page from '../../components/Page';
// utils
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';

// --------------------------------------------------------------------------------

function Server(): JSX.Element {

  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const selectGroupRef: any = useRef<any>(null);

  const [groupSeqFilter, setGroupSeqFilter] = useState<number|undefined>(undefined);
  const [groupOptions, setGroupOptions] = useState<any>([]);

  // --------------------------------------------------------------------------------

  const groupSelectStyles: StylesConfig = {
    control: (base: any, state: any) => ({
      ...base,
      height: '56px',
      minHeight: '31px',
      borderColor: '#DBE0E4',
      '&:hover': { borderColor: '#DBE0E4' },
      borderRadius: '10px',
      width: state.isFocused ? 230 : 200,
      transition: 'width 300ms, box-shadow 300ms',
      marginTop: '18px',
      marginRight: '25px',
      boxShadow: state.isFocused ? '0 8px 16px 0 rgb(145 158 171 / 24%)' : ''
    }),
    placeholder: (base: any) => ({
      ...base,
      height: '30px'
    }),
    container: (base: any) => ({
      ...base,
      height: '40px'
    }),
    valueContainer: (base: any) => ({
      ...base,
      height: '28px'
    }),
    singleValue: (base: any) => ({
      ...base,
      height: '32px',
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      height: '52px'
    }),
    menu: (base: any) => ({
      ...base,
      marginTop: '35px',
      width: 230
    })
  }

  // --------------------------------------------------------------------------------

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
      Cell: ({ value }: any) => {
        return <div className="tc">{ value }</div>
      }
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
    {
      Header: '상태',
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
      Header: ' ',
      Cell: ({ row }: any) => (
        <div className="tc">
          <ControlButtonGroup
            selectFunc={ () => selectServer(row.values.seq) }
            deleteFunc={ () => deleteServer(row.values.seq, row.values.serverNm) }
          />
        </div>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

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
        Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            getAllServerData()
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        }).fire({
          icon: 'success',
          title: '상태가 변경되었습니다!'
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
    }).then((result) => {
      if (result.isConfirmed) {
        // 2차 확인
        Swal.fire({
          title: '정말요?',
          text: '확인을 누르시면 영구히 삭제되어 복구가 불가능합니다.',
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

  // --------------------------------------------------------------------------------

  // 최초 랜더링
  useEffect(() => {
    getGroupOptions();
  }, []);

  // 최초 랜더링에서 그룹 필터가 그려지고 state 할당될때 변화
  useEffect(() => {
    getAllServerData();
  }, [groupSeqFilter]);

  // --------------------------------------------------------------------------------

  return (
    <Page title="Server">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 2 } >
          <Typography variant="h4" gutterBottom>
          <FontAwesomeIcon icon={ faServer } style={{ marginRight: '10px' }} />
            Server
            <Alert severity="info" sx={{ backgroundColor: 'transparent' }}>
              관리 중인 서버 목록입니다.
            </Alert>
          </Typography>
          <Stack>
            <Button
              variant="contained"
              startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
              onClick={ () => setShowModal(true) }
            >
              New Server
            </Button>
            <InformationModal />
          </Stack>
        </Stack>

        <Card>
          <Select
            isSearchable={ false }
            ref={ selectGroupRef }
            className="fr"
            isClearable={ true }
            placeholder={ '그룹 필터' }
            options={ groupOptions }
            styles={ groupSelectStyles }
            onChange={ (e: any) => setGroupSeqFilter(e?.value) }
          />
          <ReactTable columns={ columns } data={ tableData } />
        </Card>

      </Container>

      <ServerModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ getAllServerData }
        groupOptions={ groupOptions }
      />
    </Page>
  )
}

// --------------------------------------------------------------------------------

export default Server;