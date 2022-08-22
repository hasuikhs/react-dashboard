import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
// material
import { Container, Card, Stack, Typography, Button, Alert } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
// components
import ControlButtonGroup from '../../components/ControlButtonGroup';
import UserModal from '../../components/modal/UserModal';
import ReactTable from '../../components/table/ReactTable';
import Page from '../../components/Page';
// utils
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';

// --------------------------------------------------------------------------------

function User(): JSX.Element {

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
      Header: '유저명',
      accessor: 'userNm'
    },
    {
      Header: '유저 ID',
      accessor: 'userId'
    },
    {
      Header: '최근 로그인 시간',
      accessor: 'loginDt',
      Cell: ({ value }: any) => <div className="tc">{ toDatetimeFormat(value) }</div>
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
            selectFunc={ () => selectUser(row.values.seq) }
            deleteFunc={ () => deleteUser(row.values.seq, row.values.userNm) }
          />
        </div>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

  // --------------------------------------------------------------------------------

  const getAllUserData = async (): Promise<void> => {
    let userData = await requestAPI({
      type: 'GET',
      url: '/api/user'
    });

    setTableData(userData);
  }

  const selectUser = async (seq: number): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: `/api/user/${ seq }`
    });

    setShowModal(true);
    setModalData(ret);
  }

  const deleteUser = async (seq: number, userNm: string): Promise<any> => {
    // 1차 확인
    Swal.fire({
      title: `${ userNm } 유저를 삭제하시겠습니까?`,
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
              url: `/api/user/${ seq }`
            });

            if (ret) {
              Swal.fire({
                title: '삭제되었습니다!',
                icon: 'success',
                confirmButtonText: '확인',
                didClose: () => getAllUserData()
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
    getAllUserData();
  }, []);

  // --------------------------------------------------------------------------------

  return (
    <Page title="User">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 2 } >
          <Typography variant="h4" gutterBottom>
            <FontAwesomeIcon icon={ faUser } style={{ marginRight: '10px' }} />
            User
            <Alert severity="info" sx={{ backgroundColor: 'transparent' }}>
              모니터링 사이트에 접속 가능한 사용자 목록입니다.
            </Alert>
          </Typography>
          <Button
            variant="contained"
            startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
            onClick={ () => setShowModal(true) }
          >
            New User
          </Button>
        </Stack>

        <Card>
          <ReactTable columns={ columns } data={ tableData }/>
        </Card>

      </Container>

      <UserModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ getAllUserData }
      />
    </Page>
  );
}

// --------------------------------------------------------------------------------

export default User;