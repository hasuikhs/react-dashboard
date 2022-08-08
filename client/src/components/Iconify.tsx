import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

interface IconifyInterface {
  icon: any;
  sx?: any;
}

function Iconify({ icon, sx, ...other }: IconifyInterface) {
  return <Box component={ Icon } icon={ icon } sx={{ ...sx }} { ...other } />
}

export default Iconify;