import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFaceAngry, faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';

import { requestAPI } from '../../common/API';

function UserModal({ showModal, setShowModal, modalData, setModalData, updateList }: { showModal: any, setShowModal: any, modalData: any, setModalData: any, updateList?: any }) {

  const [userSeq, setUserSeq] = useState<number|null>(null);

  const [userNm, setUserNm] = useState<string>('');
  const userNmRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState<string>('');
  const userIdRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [userPw, setUserPw] = useState<string>('');
  const userPwRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const pwRegex = /^[a-zA-Z0-9]{6,10}$/;

  useEffect(() => {
    setUserSeq(modalData.seq || null);
    setUserNm(modalData.userNm || '');
    setUserId(modalData.userId || '');
    setUserPw(modalData.userPw || '');
  }, [modalData]);

  const closeModal = (): void => {
    setShowModal(false);

    setModalData({});
  }

  const onSubmit = async () => {

    if (!userNm.trim()) {
      return Swal.fire({
        title: '유저명을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => userNmRef.current?.focus()
      });
    } else if (!userId.trim()) {
      return Swal.fire({
        title: 'ID를 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => userIdRef.current?.focus()
      });
    } else if (!userPw.trim() && !userSeq) {
      return Swal.fire({
        title: 'Password를 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => userPwRef.current?.focus()
      });
    } else if (userPw.trim() && !pwRegex.test(userPw.trim())) {
      return Swal.fire({
        title: 'Password를 확인해주세요.',
        text: 'Passwords는 6~10자리 사이의 영문, 숫자입니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => userPwRef.current?.focus()
      });
    }

    let dataBody: any = {
      seq: userSeq,
      userNm: userNm,
      userId: userId,
      userPw: userPw,
    };

    let affected = null;

    if (userSeq) {
      affected = await requestAPI({
        type: 'PUT',
        url: `/api/user/${ userSeq }`,
        body: dataBody
      });
    } else {
      affected = await requestAPI({
        type: 'POST',
        url: '/api/user',
        body: dataBody
      });
    }

    if (affected) {
      Swal.fire({
        title: `${ userSeq ? '수정' : '등록' }되었습니다!`,
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
    <>
      <Modal show={ showModal } onHide={ closeModal } backdrop="static" keyboard={ false } >
        <Modal.Header closeButton>
          <Modal.Title><FontAwesomeIcon icon={ faUser } /> USER </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form-user-nm">
              <Form.Label>유저명<span className="red_ico"></span></Form.Label>
              <Form.Control
                ref={ userNmRef }
                type="text"
                placeholder="유저명을 입력해주세요."
                value={ userNm }
                onChange={ e => setUserNm(e.target.value) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-license-id">
              <Form.Label>ID<span className="red_ico"></span></Form.Label>
              <Form.Control
                ref={ userIdRef }
                type="text"
                placeholder="ID를 입력해주세요."
                value={ userId }
                onChange={ e => setUserId(e.target.value) }
                readOnly={ userSeq ? true : false }
                disabled={ userSeq ? true : false }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-license-pw">
              <Form.Label>Password { userSeq ? '' : <span className="red_ico"></span> }</Form.Label>
              <Form.Control
                ref={ userPwRef }
                type="password"
                placeholder={ 
                  userSeq
                    ? '입력할 경우 Password가 수정됩니다.'
                    : 'Password를 입력해주세요.'
                }
                value={ userPw }
                onChange={ e => setUserPw(e.target.value) }
                autoComplete="off"
              />
              <Form.Text className="text-muted" style={{ marginLeft: '10px'}}>
                { '*' }
                {
                  userPw
                    ? pwRegex.test(userPw)
                      ? <span>{ '6~10자리 사이의 영문, 숫자' } <FontAwesomeIcon icon={ faFaceLaughBeam } color="#43A047"/></span>
                      : <span>{ '6~10자리 사이의 영문, 숫자' } <FontAwesomeIcon icon={ faFaceAngry } color="#E53935"/></span>
                    : 'Passwords는 6~10자리 사이의 영문, 숫자입니다.'
                }
              </Form.Text>
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ closeModal } >닫기</Button>
          <Button variant="primary" onClick={ onSubmit } >{ userSeq ? '수정' : '등록' }하기</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserModal;