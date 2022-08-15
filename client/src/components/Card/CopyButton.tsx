import { useState } from 'react';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Auth } from '../../modules/auth';
// material
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

// --------------------------------------------------------------------------------

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${ tooltipClasses.tooltip }`]: {
    fontSize: 14
  }
}));

// --------------------------------------------------------------------------------

function CopyButton({ presentData, overData }: { presentData: any, overData: any }) {

  const [tooltipText, setTooltipText] = useState<string>('copy');

  const copyData = async () => {
    const text = 'test111';

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);

      setTooltipText('copied!');
    } else {
      const textarea: HTMLTextAreaElement = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');

      document.body.removeChild(textarea);
      setTooltipText('copied!');
    }

    setTimeout(() => {
      setTooltipText('copy');
    }, 1_000);
  };

  return (
    <CustomTooltip title={ tooltipText } placement="top" arrow>
      <IconButton onClick={ copyData } >
        <FontAwesomeIcon icon={ faCopy } style={{ fontSize: '14px' }} />
      </IconButton>
    </CustomTooltip>
  );
}

// --------------------------------------------------------------------------------

export default CopyButton;