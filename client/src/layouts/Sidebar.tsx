import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';

import NavSection from '../components/NavSection';

import navConfig from './NavConfig';
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

const DRAWER_WIDTH: number = 240;

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 1000,
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// ----------------------------------------------------------------------

interface SidebarInterface {
  isOpenSidebar: boolean;
  onCloseSidebar: any;
}

// ----------------------------------------------------------------------

function Sidebar({ isOpenSidebar, onCloseSidebar }: SidebarInterface) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
      {/* <Logo /> */}
      </Box>

      <NavSection navConfig={ navConfig } />
    </>
  );

  return (
    <RootStyle>

      {
        !isDesktop
          ? (
              <Drawer
                open={ isOpenSidebar }
                onClose={ onCloseSidebar }
                PaperProps={{
                  sx: { width: DRAWER_WIDTH }
                }}
              >
                { renderContent }
              </Drawer>
            )
          : (
              <Drawer
                open
                variant="persistent"
                PaperProps={{
                  sx: {
                    width: DRAWER_WIDTH,
                    bgcolor: 'background.default',
                    borderRightStyle: 'dashed'
                  }
                }}
              >
                { renderContent }
              </Drawer>
            )
      }

    </RootStyle>
  );
}

// ----------------------------------------------------------------------

export default Sidebar;