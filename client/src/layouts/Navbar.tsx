import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Tooltip, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
// redux
import { Dispatch, AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth, Auth } from '../modules/auth';
import { RootState } from '../modules';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// components
import UserModal from '../components/modal/UserModal';
// utils
import { requestAPI } from '../common/API';

// --------------------------------------------------------------------------------

const DRAWER_WIDTH: number = 220;
const APPBAR_MOBILE: number = 60;
const APPBAR_DESKTOP: number = 80;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  zIndex: 1000,
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.82),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

interface NavbarInterface {
  onOpenSidebar: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

// ----------------------------------------------------------------------

function Navbar({ onOpenSidebar }: NavbarInterface) {

  const navigate: NavigateFunction = useNavigate();

  const dispatch: Dispatch<AnyAction> = useDispatch();

  const auth: Auth = useSelector<RootState>(state => state.auth) as Auth;

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectUser = async (): Promise<any> => {
    let ret = await requestAPI({
      type: 'GET',
      url: `/api/user/${ 2 }`
    });

    setShowModal(true);
    setUserData(ret);
  }

  return (
    <>
      <RootStyle>
        <ToolbarStyle>
          <IconButton
            onClick={ onOpenSidebar }
            sx={{
              mr: 1,
              color: 'text.primary',
              display: { lg: 'none' } }}
          >
            <FontAwesomeIcon icon={ faBars } />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <Tooltip title={ `마지막 로그인: ${ new Date(auth.user.loginDt as Date).toLocaleString() }` } arrow >
              <IconButton
                onClick={ handleClick }
                size="medium"
                sx={{ ml: 2 }}
                // aria-control={ open ? 'account-menu' : undefined }
                // aria-hashpopup="true"
                aria-expanded={ open ? 'true' : undefined }
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#8C8C8C' }}></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={ anchorEl }
              // id="account-menu"
              open={ open }
              onClose={ handleClose }
              onClick={ handleClose }
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                onClick={ selectUser }
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#8C8C8C' }}/> { `${ auth.user.userNm } 님` }
              </MenuItem>
              <Divider />
              <MenuItem
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
                      navigate('/login', { replace: true });
                    }
                  });
                } }
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </ToolbarStyle>
      </RootStyle>
      <UserModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ userData }
        setModalData={ setUserData }
      />
    </>
  );
}

// ----------------------------------------------------------------------

export default Navbar;