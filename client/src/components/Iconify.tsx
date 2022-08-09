import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

interface IconifyInterface {
  icon: any;
  sx?: any;
  width?: number;
  height?: number
}

function Iconify({ icon, sx, width, height }: IconifyInterface) {
  return <Box component={ Icon } icon={ icon } sx={{ ...sx }} width={ width } height={ height } />
}

export default Iconify;