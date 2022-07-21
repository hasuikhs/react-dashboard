import { Navbar, Container, Nav, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { resetAuth, Auth } from '../modules/auth';
import { RootState } from '../modules';
import { useSelector } from 'react-redux';

function MainBar(): JSX.Element {

  const location = useLocation();

  const navigate: NavigateFunction = useNavigate();

  const dispatch: Dispatch<AnyAction> = useDispatch();

  const auth: Auth = useSelector<RootState>(state => state.auth) as Auth;

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Main</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={ location.pathname }>
              <Nav.Link href="/user">USER</Nav.Link>
              <Nav.Link href="/server">SERVER</Nav.Link>
              <Nav.Link href="/">Home2</Nav.Link>
            </Nav>

            <Nav>
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                <Popover id="last-login-popover">
                  <Popover.Header as="h3">마지막 로그인</Popover.Header>
                  <Popover.Body>{ `${ new Date(auth.user.loginDt as Date).toLocaleString() }`  }</Popover.Body>
                </Popover>
                }
              >
                <Nav.Link>
                  { `${ auth.user.userNm } 님 ` }
                </Nav.Link>
              </OverlayTrigger>
            </Nav>

            <Button
              variant="outline-light"
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
                    dispatch(resetAuth());
                    navigate('/login')
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