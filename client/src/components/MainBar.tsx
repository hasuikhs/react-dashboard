import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import API from '../common/API';

function MainBar(): JSX.Element {

  const navigate = useNavigate();

  // 페이지 랜더링시 마다 토큰 유효성 확인
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      API.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') as string;
      const ret = await API.post('/token/check');
    } catch (err) {
      Swal.fire({
        title: '로그인 세션이 만료되었습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        didClose: () => navigate('/login')
      });
    }
  }

  return (
    <>
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Main</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home1</Nav.Link>
              <Nav.Link href="/">Home2</Nav.Link>
            </Nav>
            <Button
              variant="dark"
              size="sm"
              onClick={ () => {
                Swal.fire({
                  title: '확인 버튼을 누르면 로그아웃됩니다.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: '확인',
                  cancelButtonText: '취소'
                }).then(result => {
                  if (result.isConfirmed) {
                    sessionStorage.removeItem('token');
                    navigate('/login');
                  }
                })
              } }
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainBar;