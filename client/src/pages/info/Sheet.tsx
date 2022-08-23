import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
// material
import { Container, Card, Stack, Typography, Button, Alert, Link } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTableList } from '@fortawesome/free-solid-svg-icons';
// components
import ControlButtonGroup from '../../components/ControlButtonGroup';
import SheetModal from '../../components/modal/SheetModal';
import ReactTable from '../../components/table/ReactTable';
import Page from '../../components/Page';
// utils
import { requestAPI } from '../../common/API';
import { toDatetimeFormat } from '../../common/DateFormat';

// --------------------------------------------------------------------------------

function Sheet(): JSX.Element {

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
      Header: '시트명',
      accessor: 'sheetNm',
      Cell: ({ row }: any) => <Link href={ row.original.sheetUrl } target="_blank" rel="noopener">{ row.original.sheetNm }</Link>
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
            selectFunc={ () => selectSheet(row.values.seq) }
            deleteFunc={ () => deleteSheet(row.values.seq, row.values.sheetNm) }
          />
        </div>
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

  // --------------------------------------------------------------------------------

  const getAllSheetData = async (): Promise<void> => {
    let sheetData = await requestAPI({
      type: 'GET',
      url: '/api/sheet'
    });

    setTableData(sheetData);
  }

  const selectSheet = async (seq: number): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: `/api/sheet/${ seq }`
    });

    setShowModal(true);
    setModalData(ret);
  }

  const deleteSheet = async (seq: number, sheetNm: string): Promise<any> => {
    // 1차 확인
    Swal.fire({
      title: `${ sheetNm } 시트를 삭제하시겠습니까?`,
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
              url: `/api/sheet/${ seq }`
            });

            if (ret) {
              Swal.fire({
                title: '삭제되었습니다!',
                icon: 'success',
                confirmButtonText: '확인',
                didClose: () => getAllSheetData()
              });
            }
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------------

  // 최초 렌더링
  useEffect(() => {
    getAllSheetData();
  }, []);

  // --------------------------------------------------------------------------------

  return (
    <Page title="Sheet">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 2 }>
          <Typography variant="h4" gutterBottom>
            <FontAwesomeIcon icon={ faTableList } style={{ marginRight: '10px' }} />
            Sheet
            <Alert severity="info" sx={{ backgroundColor: 'transparent' }}>
              관리 중인 시트 목록입니다.
            </Alert>
          </Typography>
          <Button
            variant='contained'
            startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
            onClick={ () => setShowModal(true) }
          >
            New Sheet
          </Button>
        </Stack>
        <Card>
          <ReactTable columns={ columns } data={ tableData } />
        </Card>
      </Container>
      <SheetModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ getAllSheetData }
      />
    </Page>
  );
}

// --------------------------------------------------------------------------------

export default Sheet;