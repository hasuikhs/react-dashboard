import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${ tooltipClasses.tooltip }`]: {
    fontSize: 14
  }
}));

function CopyButton() {

  const [tooltipText, setTooltipText] = useState<string>('copy');

  const changeText = () => {
    setTooltipText('copied');
    setTimeout(() => {
      setTooltipText('copy');
    }, 1_000);
  };

  return (
    <CustomTooltip title={ tooltipText } placement="top" arrow>
      <IconButton onClick={ changeText } >
        <FontAwesomeIcon icon={ faCopy } style={{ fontSize: '14px' }} />
      </IconButton>
    </CustomTooltip>
  );
}

export default CopyButton;