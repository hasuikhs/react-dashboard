import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
// material
import { Container, Card, Stack, Typography, Button, Alert } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
// components
import ControlButtonGroup from '../../components/ControlButtonGroup';
import GroupModal from '../../components/modal/GroupModal';
import ReactTable from '../../components/table/ReactTable';
import Page from '../../components/Page';
// utils
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/Date';

// --------------------------------------------------------------------------------

function Group(): JSX.Element {

  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  
  // --------------------------------------------------------------------------------

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'seq',
      Cell: ({ value }: any) => <div className="tc">{ value }</div>
    },
    {
      Header: '그룹명',
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
            selectFunc={ () => selectGroup(row.values.seq) }
            deleteFunc={ () => deleteGroup(row.values.seq, row.values.groupNm) }
          />
        </div>
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

  // --------------------------------------------------------------------------------

  const getAllGroupData = async (): Promise<void> => {
    let groupData = await requestAPI({
      type: 'GET',
      url: '/api/group'
    });

    setTableData(groupData);
  }

  const selectGroup = async (seq: number): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: `/api/group/${ seq }`
    });

    setShowModal(true);
    setModalData(ret);
  }

  const deleteGroup = async (seq: number, groupNm: string): Promise<any> => {
    // 1차 확인
    Swal.fire({
      title: `${ groupNm } 그룹을 삭제하시겠습니까?`,
      icon: 'warning',
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소'
    }).then(result => {
      if (result.isConfirmed) {
        // 2차 확인
        Swal.fire({
          title: '정말요?',
          text: '확인을 누르시면 영구히 삭제되어 복구가 불가능합니다.',
          icon: 'question',
          confirmButtonText: '확인',
          showCancelButton: true,
          cancelButtonText: '취소'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let ret = await requestAPI({
              type: 'DELETE',
              url: `/api/group/${ seq }`
            });

            if (ret) {
              Swal.fire({
                title: '삭제되었습니다!',
                icon: 'success',
                confirmButtonText: '확인',
                didClose: () => getAllGroupData()
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
    getAllGroupData();
  }, []);

  // --------------------------------------------------------------------------------

  return (
    <Page title="Group">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 2 }>
          <Typography variant="h4" gutterBottom>
            <FontAwesomeIcon icon={ faUserGroup } style={{ marginRight: '10px' }} />
            Group
            <Alert severity="info" sx={{ backgroundColor: 'transparent' }}>
              관리 중인 그룹 목록입니다.
            </Alert>
          </Typography>
          <Button
            variant='contained'
            startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
            onClick={ () => setShowModal(true) }
          >
            New Group
          </Button>
        </Stack>
        <Card>
          <ReactTable columns={ columns } data={ tableData } />
        </Card>
      </Container>
      <GroupModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ getAllGroupData }
      />
    </Page>
  );
}

// --------------------------------------------------------------------------------

export default Group;