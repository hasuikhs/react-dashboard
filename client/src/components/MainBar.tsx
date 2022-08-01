import { Navbar, Container, Nav, Button, OverlayTrigger, Popover, NavDropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { resetAuth, Auth } from '../modules/auth';
import { RootState } from '../modules';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faUser, faLayerGroup, faKey, faFileExcel } from '@fortawesome/free-solid-svg-icons';

function MainBar(): JSX.Element {

  const location = useLocation();

  const navigate: NavigateFunction = useNavigate();

  const dispatch: Dispatch<AnyAction> = useDispatch();

  const auth: Auth = useSelector<RootState>(state => state.auth) as Auth;

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MAIN</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={ location.pathname }>
              <Nav.Link href="/">HOME</Nav.Link>
              
              <NavDropdown title="INFO">
                <NavDropdown.Item href="/server">
                  <FontAwesomeIcon icon={ faServer } className="color-gray" /> SERVER
                </NavDropdown.Item>
                <NavDropdown.Item href="/group">
                  <FontAwesomeIcon icon={ faLayerGroup } className="fr color-gray" /> GROUP
                </NavDropdown.Item>
                <NavDropdown.Item href="/license">
                  <FontAwesomeIcon icon={ faKey } className="fr color-gray" /> LICENSE
                </NavDropdown.Item>
                <NavDropdown.Item href="/sheet">
                  <FontAwesomeIcon icon={ faFileExcel } className="fr color-gray" /> SHEET
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/user">
                  <FontAwesomeIcon icon={ faUser } className="fr color-gray" /> USER
                </NavDropdown.Item>
              </NavDropdown>
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