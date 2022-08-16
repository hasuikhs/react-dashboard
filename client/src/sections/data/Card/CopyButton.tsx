import { useState } from 'react';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { Auth } from '../../../modules/auth';
// material
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
// utils
import copyToClipboard from '../../../common/copy';

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

  const authentificated: Auth = useSelector<RootState>(state => state.auth) as Auth;

  const [tooltipText, setTooltipText] = useState<string>('copy');

  const copyData = async () => {
    const text = `${ authentificated.user.userNm }`;

    if (await copyToClipboard(text)) {
      setTooltipText('copied!');

      setTimeout(() => {
        setTooltipText('copy');
      }, 1_000);
    }
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