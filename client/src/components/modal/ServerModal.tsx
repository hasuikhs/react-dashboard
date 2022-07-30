import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ServerModal({ showModal, setShowModal, modalData }: { showModal: any, setShowModal: any, modalData: any }) {

  const [serverNm, setServerNm] = useState(modalData.serverNm);
  const serverNmRef = useRef(null);

  const closeModal = (): void => {
    setShowModal(false);
  }

  return (
    <>
      <Modal show={ showModal } onHide={ closeModal } backdrop="static" keyboard={ false } >
        <Modal.Header closeButton>
          <Modal.Title>Server 수정</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form-ex1">
              <Form.Label>서버명<span className="red_ico">*</span></Form.Label>
              <Form.Control
                ref={ serverNmRef }
                type="text"
                placeholder="서버명을 입력해주세요."
                value={ serverNm }
                onChange={ e => setServerNm(e.target.value) }
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ closeModal } >닫기</Button>
          <Button variant="primary" onClick={ () => console.log('수정하기') }>수정하기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ServerModal;