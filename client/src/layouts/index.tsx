import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

// --------------------------------------------------------------------------------

const APP_BAR_MOBILE: number = 64;
const APP_BAR_DESKTOP: number = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 10,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 10,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// --------------------------------------------------------------------------------

function Layout() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RootStyle>
      <Navbar onOpenSidebar={ () => setOpen(true) } />
      <Sidebar isOpenSidebar={ open } onCloseSidebar={ () => setOpen(false) } />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

// --------------------------------------------------------------------------------

export default Layout;