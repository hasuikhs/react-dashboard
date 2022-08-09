import React, { useState, useEffect, useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import ControlButtonGroup from '../../components/ControlButtonGroup';
import LicenseModal from '../../components/modal/LicenseModal';

import Mainbar from '../../components/MainBar';
import '../css/Home.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPlus } from '@fortawesome/free-solid-svg-icons';

import ReactTable from '../../components/table/ReactTable';
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';
import Swal from 'sweetalert2';

import Page from '../../components/Page';

function License(): JSX.Element {

  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const [groupOptions, setGroupOptions] = useState<any>([]);

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'seq',
      Cell: ({ value }: any) => <div className="tc">{ value }</div>
    },
    {
      Header: '라이센스명',
      accessor: 'licenseNm'
    },
    {
      Header: '라이센스 ID',
      accessor: 'licenseId'
    },
    {
      Header: '라이센스 PW',
      accessor: 'licensePw'
    },
    {
      Header: '로그인 URL',
      accessor: 'loginUrl'
    },
    {
      Header: '그룹',
      accessor: 'group',
      Cell: ({ row }: any) => {
        return (
          row.values.group.map((item: any) => (
            <p key={ item.seq }>{ item.nm }</p>
          ))
        );
      }
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
            selectFunc={ () => selectLicense(row.values.seq) }
            deleteFunc={ () => deleteLicense(row.values.seq, row.values.licenseNm) }
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

  const getAllLicenseData = async (): Promise<void> => {
    let licenseData = await requestAPI({
      type: 'GET',
      url: '/api/license'
    });

    let groupData = await requestAPI({
      type: 'GET',
      url: '/api/group'
    });

    licenseData = licenseData.map((item: any) => ({
      ...item,
      group: item.groupSeq.split(',').reduce((arr: any[], cur: any) => {
        let tmpObj = {
          seq: cur * 1,
          nm: groupData.find((item: any) => item.seq === cur * 1).groupNm
        };

        arr.push(tmpObj);

        return arr;
      }, [])
    }));

    return setTableData(licenseData);
  }

  const selectLicense = async (seq: number): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: `/api/license/${ seq }`
    });

    setShowModal(true);
    setModalData(ret);
  }

  const deleteLicense = async (seq: number, licenseNm: string): Promise<any> => {
    // 1차 확인
    Swal.fire({
      title: `${ licenseNm } 라이센스 삭제하시겠습니까?`,
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
              url: `/api/license/${ seq }`
            });

            if (ret) {
              Swal.fire({
                title: '삭제되었습니다!',
                icon: 'success',
                confirmButtonText: '확인',
                didClose: () => getAllLicenseData()
              });
            }
          }
        });
      }
    });
  }

  // 최초 랜더링
  useEffect(() => {
    getGroupOptions();
    getAllLicenseData();
  }, []);

  return (
    <Page title="License">
      {/* <Mainbar /> */}
      <Container>
        <h1 className="mb-5">
          <FontAwesomeIcon icon={ faKey } /> LICENSE
        </h1>

        <Button
          type="button"
          variant="primary"
          className="fl"
          size="sm"
          onClick={ () => setShowModal(true) }
        >
          <FontAwesomeIcon icon={ faPlus } /> NEW LICENSE
        </Button>

        <ReactTable columns={ columns } data={ tableData } />
      </Container>

      <LicenseModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ getAllLicenseData }
        groupOptions={ groupOptions }
      />
    </Page>
  )
}

export default License;