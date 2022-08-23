import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

import { requestAPI } from '../../common/API';

function SheetModal({ showModal, setShowModal, modalData, setModalData, updateList }: { showModal: any, setShowModal: any, modalData: any, setModalData: any, updateList?: any }) {

  const [sheetSeq, setSheetSeq] = useState<number|null>(null);

  const [sheetNm, setSheetNm] = useState<string>('');
  const sheetNmRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [sheetUrl, setSheetUrl] = useState<string>('');
  const sheetUrlRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setSheetSeq(modalData.seq || null);
    setSheetNm(modalData.sheetNm || '');
    setSheetUrl(modalData.sheetUrl || '');
  }, [modalData]);

  const closeModal = (): void => {
    setShowModal(false);

    setModalData({});
  }

  const onSubmit = async () => {
    if (!sheetNm.trim()) {
      return Swal.fire({
        title: '시트명을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => sheetNmRef.current?.focus()
      });
    } else if (!sheetUrl.trim()) {
      return Swal.fire({
        title: 'URL을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => sheetUrlRef.current?.focus()
      });
    }

    let dataBody: any = {
      seq: sheetSeq,
      sheetNm: sheetNm,
      sheetUrl: sheetUrl
    };

    let affected = null;

    if (sheetSeq) {
      affected = await requestAPI({
        type: 'PUT',
        url: `/api/sheet/${ sheetSeq }`,
        body: dataBody
      });
    } else {
      affected = await requestAPI({
        type: 'POST',
        url: '/api/sheet',
        body: dataBody
      });
    }

    if (affected) {
      Swal.fire({
        title: `${ sheetSeq ? '수정' : '등록' }되었습니다!`,
        icon: 'success',
        confirmButtonText: '확인',
        didClose: () => {
          closeModal();
          updateList();
        }
      });
    }
  }

  return (
    <Modal show={ showModal } onHide={ closeModal } backdrop="static" keyboard={ false }>
      <Modal.Header closeButton>
        <Modal.Title><FontAwesomeIcon icon={ faTableList } /> SHEET</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="form-sheet-nm">
            <Form.Label>시트명<span className="red_ico"></span></Form.Label>
            <Form.Control
              ref={ sheetNmRef }
              type="text"
              placeholder="그룹명을 입력해주세요."
              value={ sheetNm }
              onChange={ e => setSheetNm(e.target.value) }
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="form-sheet-url">
            <Form.Label>URL<span className="red_ico"></span></Form.Label>
            <Form.Control
              ref={ sheetUrlRef }
              type="text"
              placeholder="URL을 입력해주세요."
              value={ sheetUrl }
              onChange={ e => setSheetUrl(e.target.value) }
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ closeModal }>닫기</Button>
        <Button variant="primary" onClick={ onSubmit }>{ sheetSeq ? '수정' : '등록' }하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SheetModal;