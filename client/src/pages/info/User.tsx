import React, { useState, useEffect, useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import ControlButtonGroup from '../../components/ControlButtonGroup';
import UserModal from '../../components/modal/UserModal';

import Mainbar from '../../components/MainBar';
import '../css/Home.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

import ReactTable from '../../components/table/ReactTable';
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';
import Swal from 'sweetalert2';

import Page from '../../components/Page';

function User(): JSX.Element {

  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

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
      Header: '관리',
      Cell: ({ row }: any) => (
        <div className="tc">
          <ControlButtonGroup
            selectFunc={ () => selectUser(row.values.seq) }
            deleteFunc={ () => deleteUser(row.values.seq, row.values.userNm) }
          />
        </div>
      )
    }
  ], []);

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
    }).then( async (result) => {
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

  // 최초 랜더링
  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <Page title="User">
      <Mainbar />
      <Container>
        <h1 className="mb-5 mt-3">
          <FontAwesomeIcon icon={ faUser } /> User
        </h1>

        <Button
          type="button"
          variant="primary"
          className="fl"
          size="sm"
          onClick={ () => setShowModal(true) }
        >
          <FontAwesomeIcon icon={ faPlus } /> NEW USER
        </Button>

        <ReactTable columns={ columns } data={ tableData }/>
      </Container>

      <UserModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ getAllUserData }
      />
    </Page>
  )
}

export default User;