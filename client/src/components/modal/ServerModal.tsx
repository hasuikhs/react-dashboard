import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Select from 'react-select';

function ServerModal({ showModal, setShowModal, modalData }: { showModal: any, setShowModal: any, modalData: any }) {

  const [serverSeq, setServeSeq] = useState<number|null>(null);

  const [serverNm, setServerNm] = useState<string>('');
  const serverNmRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [serverId, setServerId] = useState<string>('');
  const serverIdRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [cpu, setCpu] = useState<number>(0);
  const cpuRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [ram, setRam] = useState<number>(0);
  const ramRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [disk1, setDisk1] = useState<number>(0);
  const disk1Ref: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [disk2, setDisk2] = useState<number>(0);
  const disk2Ref:RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [os, setOs] = useState<string>('');
  const osRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [group, setGroup] = useState<string>('');
  const groupRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);

  const [selectedOption, setSelectedOption] = useState<any>([]);

  useEffect(() => {
    setServerNm(modalData.serverNm || '');
    setServerId(modalData.serverId || '');
    setCpu(modalData.cpuCnt || 0);
    setRam(modalData.ram || 0);
    setDisk1(modalData.disk1 || 0);
    setDisk2(modalData.disk2 || 0);
  }, [modalData]);

  const closeModal = (): void => {
    setShowModal(false);
  }

  const onSubmit = () => {
    if (!serverNm.trim()) {
      return Swal.fire({
        title: '서버명을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => serverNmRef.current?.focus()
      });
    } else if (!serverId.trim()) {
      return Swal.fire({
        title: '서버 ID를 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => serverIdRef.current?.focus()
      });
    } else if (!cpu || cpu < 1) {
      return Swal.fire({
        title: 'CPU를 입력해주세요.',
        text: cpu < 1 ? 'CPU는 1보다 작을 수 없습니다.' : undefined,
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => cpuRef.current?.focus()
      });
    } else if (!ram || ram < 1) {
      return Swal.fire({
        title: 'RAM을 입력해주세요.',
        text: ram < 1 ? 'RAM은 1보다 작을 수 없습니다.' : undefined,
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => ramRef.current?.focus()
      });
    } else if (!disk1) {
      return Swal.fire({
        title: 'DISK 1을 입력해주세요.',
        text: disk1 < 1 ? 'DISK는 1보다 작을 수 없습니다.' : undefined,
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => disk1Ref.current?.focus()
      });
    } else if (disk2 < 0) {
      return Swal.fire({
        title: 'DISK 2를 확인해주세요.',
        text: 'DISK는 0보다 작을 수 없습니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => disk2Ref.current?.focus()
      });
    }

    if (serverSeq) {
      // 수정 로직
    } else {
      // 등록 로직
    }
  }

  return (
    <>
      <Modal show={ showModal } onHide={ closeModal } backdrop="static" keyboard={ false } >
        <Modal.Header closeButton>
          <Modal.Title>Server { serverSeq ? '등록' : '수정' }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form-server-nm">
              <Form.Label>서버명<span className="red_ico">*</span></Form.Label>
              <Form.Control
                ref={ serverNmRef }
                type="text"
                placeholder="서버명을 입력해주세요."
                value={ serverNm }
                onChange={ e => setServerNm(e.target.value) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-server-id">
              <Form.Label>서버 ID<span className="red_ico">*</span></Form.Label>
              <Form.Control
                ref={ serverIdRef }
                type="text"
                placeholder="서버 ID를 입력해주세요."
                value={ serverId }
                onChange={ e => setServerId(e.target.value) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-cpu-cnt">
              <Form.Label>CPU<span className="red_ico">*</span></Form.Label>
              <Form.Control
                ref={ cpuRef }
                type="number"
                placeholder="CPU 수를 입력해주세요."
                value={ cpu }
                onChange={ e => setCpu(parseInt(e.target.value)) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-server-ram">
              <Form.Label>RAM<span className="red_ico">*</span></Form.Label>
              <Form.Control
                ref={ ramRef }
                type="number"
                placeholder="RAM 용량을 입력해주세요."
                value={ ram }
                onChange={ e => setRam(parseInt(e.target.value)) }
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-server-disk">
              <Row>
                <Col>
                  <Form.Label>DISK 1<span className="red_ico">*</span></Form.Label>
                  <Form.Control
                    ref={ disk1Ref }
                    type="number"
                    placeholder="DISK1 용량을 입력해주세요."
                    value={ disk1 }
                    onChange={ e => setDisk1(parseInt(e.target.value)) }
                    autoComplete="off"
                  />
                </Col>
                <Col>
                  <Form.Label>DISK 2</Form.Label>
                  <Form.Control
                    ref={ disk2Ref }
                    type="number"
                    placeholder="DISK2 용량을 입력해주세요."
                    value={ disk2 }
                    onChange={ e => setDisk2(parseInt(e.target.value)) }
                    autoComplete="off"
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-server-group">
              <Form.Label>그룹<span className="red_ico">*</span></Form.Label>
              <Select
                isSearchable={ false }
                options={ selectedOption }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ closeModal } >닫기</Button>
          <Button variant="primary" onClick={ onSubmit }>{ serverSeq ? '등록' : '수정' }하기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ServerModal;