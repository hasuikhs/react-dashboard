import { useState } from 'react';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Auth } from '../../modules/auth';
// mui
import { styled } from '@mui/material/styles';
import { Alert, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// components
import CopyButton from './CopyButton';

// --------------------------------------------------------------------------------

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${ tooltipClasses.tooltip }`]: {
    fontSize: 14
  }
}));

function CardHeader({ serverInfo, monitoringData, overData }: { serverInfo: any, monitoringData: any, overData: any }) {
  const overCnt = Object.values(overData).reduce((acc: any, cur: any) => acc + cur.length, 0) as number;

  const presentData = monitoringData.slice(-1)?.[0];

  return (
    <Alert
      sx={{
        borderRadius: 0,
        backgroundColor: overCnt > 0 ? 'rgb(250, 232, 229)' : 'rgb(226, 244, 215)'
      }}
      severity={ overCnt > 0 ? 'error' : 'success' }
      action={ <CopyButton presentData={ presentData } overData={ overData } /> }
    >
      <CustomTooltip title={ `${ serverInfo?.cpuCnt } Core, ${ serverInfo?.ram }GB Ram` } placement="top" arrow>
        <Typography sx={{ fontWeight: 'bolder' }}>
          { serverInfo?.serverNm }
        </Typography>
      </CustomTooltip>
    </Alert>
  );
}

// --------------------------------------------------------------------------------

export default CardHeader;
