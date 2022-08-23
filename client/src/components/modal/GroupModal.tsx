import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import { requestAPI } from '../../common/API';

function GroupModal({ showModal, setShowModal, modalData, setModalData, updateList }: { showModal: any, setShowModal: any, modalData: any, setModalData: any, updateList?: any }) {

  const [groupSeq, setGroupSeq] = useState<number|null>(null);

  const [groupNm, setGroupNm] = useState<string>('');
  const groupNmRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGroupSeq(modalData.seq || null);
    setGroupNm(modalData.groupNm || '');
  }, [modalData]);

  const closeModal = (): void => {
    setShowModal(false);

    setModalData({});
  }

  const onSubmit = async () => {
    if (!groupNm.trim()) {
      return Swal.fire({
        title: '그룹명을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => groupNmRef.current?.focus()
      });
    }

    let dataBody: any = {
      seq: groupSeq,
      groupNm: groupNm
    };

    let affected = null;

    if (groupSeq) {
      affected = await requestAPI({
        type: 'PUT',
        url: `/api/group/${ groupSeq }`,
        body: dataBody
      });
    } else {
      affected = await requestAPI({
        type: 'POST',
        url: '/api/group',
        body: dataBody
      });
    }

    if (affected) {
      Swal.fire({
        title: `${ groupSeq ? '수정' : '등록' }되었습니다!`,
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
        <Modal.Title><FontAwesomeIcon icon={ faUserGroup } /> GROUP</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="form-group-nm">
            <Form.Label>그룹명<span className="red_ico"></span></Form.Label>
            <Form.Control
              ref={ groupNmRef }
              type="text"
              placeholder="그룹명을 입력해주세요."
              value={ groupNm }
              onChange={ e => setGroupNm(e.target.value) }
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ closeModal }>닫기</Button>
        <Button variant="primary" onClick={ onSubmit }>{ groupSeq ? '수정' : '등록' }하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GroupModal;