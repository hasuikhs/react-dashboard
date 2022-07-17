import { Navbar, Container, Nav, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { resetAuth, Auth } from '../modules/auth';
import { RootState } from '../modules';
import { useSelector } from 'react-redux';

function MainBar(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();

  const dispatch: Dispatch<AnyAction> = useDispatch();

  const auth: Auth = useSelector<RootState>(state => state.auth) as Auth;

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
            <DropdownButton
              as={ ButtonGroup }
              title={ `${ auth.user.userNm} 님` }
              id="bg-nested-dropdown"
              variant="secondary"
              size="sm"
            >
              <Dropdown.Item
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
              </Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainBar;