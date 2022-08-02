import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import { requestAPI } from '../../common/API';

function LicenseModal({ showModal, setShowModal, modalData, setModalData, updateList, groupOptions }: { showModal: any, setShowModal: any, modalData: any, setModalData: any, updateList: any, groupOptions: any }) {

  const [licenseSeq, setLicenseSeq] = useState<number|null>(null);

  const [licenseNm, setLicenseNm] = useState<string>('');
  const licenseNmRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [licenseId, setLicenseId] = useState<string>('');
  const licenseIdRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [licensePw, setLicensePw] = useState<string>('');
  const licensePwRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [loginUrl, setLoginUrl] = useState<string>('');
  const loginUrlRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [groupSeq, setGroupSeq] = useState<string>('');
  const groupRef: any = useRef<any>(null);

  useEffect(() => {
    setLicenseSeq(modalData.seq || null);
    setLicenseNm(modalData.licenseNm || '');
    setLicenseId(modalData.licenseId || '');
    setLicensePw(modalData.licensePw || '');
    setLoginUrl(modalData.loginUrl || '');
    setGroupSeq(modalData.groupSeq);
  }, [modalData]);

  const closeModal = (): void => {
    setShowModal(false);

    setModalData([]);
  }

  const onSubmit = async () => {
    const httpRegex =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (!licenseNm.trim()) {
      return Swal.fire({
        title: '라이센스명을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => licenseNmRef.current?.focus()
      });
    } else if (!licenseId.trim()) {
      return Swal.fire({
        title: '라이센스 ID를 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => licenseIdRef.current?.focus()
      });
    } else if (!licensePw.trim()) {
      return Swal.fire({
        title: '라이센스 PW를 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => licensePwRef.current?.focus()
      });
    } else if (!loginUrl.trim()) {
      return Swal.fire({
        title: '로그인 URL을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => loginUrlRef.current?.focus()
      });
    } else if (!httpRegex.test(loginUrl)) {
      return Swal.fire({
        title: '올바른 URL을 입력해주세요.',
        text: 'URL은 http를 포함해야합니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => loginUrlRef.current?.focus()
      });
    } else if (!groupSeq) {
      return Swal.fire({
        title: '그룹을 선택해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => groupRef.current && groupRef.current.focus()
      });
    }

    let dataBody: any = {
      seq: licenseSeq,
      licenseNm: licenseNm,
      licenseId: licenseId,
      licensePw: licensePw,
      loginUrl: loginUrl,
      groupSeq: groupSeq
    };

    let affected = null;

    if (licenseSeq) {
      affected = await requestAPI({
        type: 'PUT',
        url: `/api/license/${ licenseSeq }`,
        body: dataBody
      });
    } else {
      affected = await requestAPI({
        type: 'POST',
        url: '/api/license',
        body: dataBody
      });
    }

    if (affected) {
      Swal.fire({
        title: `${ licenseSeq ? '수정' : '등록' }되었습니다!`,
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
          <Modal.Title><FontAwesomeIcon icon={ faKey } /> LICENSE </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form-license-nm">
              <Form.Label>라이센스명<span className="red_ico"></span></Form.Label>
              <Form.Control
                ref={ licenseNmRef }
                type="text"
                placeholder="라이센스명을 입력해주세요."
                value={ licenseNm }
                onChange={ e => setLicenseNm(e.target.value) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-license-id">
              <Form.Label>라이센스 ID<span className="red_ico"></span></Form.Label>
              <Form.Control
                ref={ licenseIdRef }
                type="text"
                placeholder="라이센스 ID를 입력해주세요."
                value={ licenseId }
                onChange={ e => setLicenseId(e.target.value) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-license-pw">
              <Form.Label>라이센스 PW<span className="red_ico"></span></Form.Label>
              <Form.Control
                ref={ licensePwRef }
                type="text"
                placeholder="라이센스 PW를 입력해주세요."
                value={ licensePw }
                onChange={ e => setLicensePw(e.target.value) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-login-url">
              <Form.Label>로그인 URL<span className="red_ico"></span></Form.Label>
              <Form.Control
                ref={ loginUrlRef }
                type="text"
                placeholder="로그인 URL을 입력해주세요. ex) http://www.example.com"
                value={ loginUrl }
                onChange={ e => setLoginUrl(e.target.value) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-license-group">
              <Form.Label>그룹<span className="red_ico"></span></Form.Label>
              <Select
                ref={ groupRef }
                isMulti={ true }
                value={ groupSeq?.split(',').map((item: any) => groupOptions.find((item2: any) => item2.value === item * 1 ) ) }
                isSearchable={ false }
                placeholder={ '그룹을 선택해주세요.' }
                options={ groupOptions }
                noOptionsMessage={ () => '선택할 그룹이 없습니다.' }
                styles={ {
                  control: (base: any, state: any) => ({
                    ...base,
                    border: state.isFocused
                      ? '1px solid #B2D4FF'
                      : '1px solid lightgray',
                    '&:hover': { borderColor: 'lightgray' }
                  })
                } }
                onChange={ e => setGroupSeq(e.map(item => item.value).join()) }
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ closeModal } >닫기</Button>
          <Button variant="primary" onClick={ onSubmit } >{ licenseSeq ? '수정' : '등록' }하기</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LicenseModal;