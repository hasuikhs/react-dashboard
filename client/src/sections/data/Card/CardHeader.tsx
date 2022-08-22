// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { Auth } from '../../../modules/auth';
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
  const authentificated: Auth = useSelector<RootState>(state => state.auth) as Auth;
  const overCnt = Object.values(overData).reduce((acc: any, cur: any) => acc + cur.length, 0) as number;
  const presentData = monitoringData.slice(-1)?.[0];

  let note: string[] = [];
  let monitorResult: string[] = [];

  let disk1: string = `${ presentData?.disk1 || 0 }%`;
  let disk2: string = `${ presentData?.disk2 || presentData?.disk3 || '' }%`;
  if (disk2.length === 1) disk2 = '';

  if (overData.disk1.length) {
    monitorResult.push('/xvda 80% 초과');
  }
  if (overData.disk2.length) {
    monitorResult.push('/xvdb 80% 초과');
  }
  if (overData.disk3.length) {
    monitorResult.push('/xvdc 80% 초과')
  }

  if (overData.mem.length > 0) {
    monitorResult.push(`Memory ${ presentData?.mem }%`);
  }
  
  let datetime: string[] = [];
  if (overData.swap.length > 0) {
    note.push(`Swap ${ presentData?.swap }%`);
    datetime = [...datetime, ...overData.swap.map((item: any) => item.regDt)];
  }

  if (overData.mi01.length > 0 || overData.mi05.length > 0 || overData.mi15.length > 0) {
    monitorResult.push(`LoadAvg ${ serverInfo.cpuCnt } 초과`);
  }

  if (overData.mi01.length > 0) {
    datetime = [...datetime, ...overData.mi01.map((item: any) => item.regDt)];
  }
  if (overData.mi05.length > 0) {
    datetime = [...datetime, ...overData.mi05.map((item: any) => item.regDt)];
  }
  if (overData.mi15.length > 0) {
    datetime = [...datetime, ...overData.mi15.map((item: any) => item.regDt)];
  }

  let timeString: string = '';
  if (datetime.length) {
    datetime = Array.from(new Set(datetime.sort().map((item: any) => item.slice(0, -3))));

    let curDay: string = '';
    let time: string[] = [];

    for (let i = 0, len = datetime.length; i < len; i++) {

      let curDatetime = datetime[i].split(' ');

      if (!curDay || curDay !== curDatetime[0].slice(5)) {
        curDay = curDatetime[0].slice(5);

        timeString += ` ${ time.join(', ') }`;
        timeString += ` ${ curDay }`;
        time = [];
      }

      if (datetime[i].includes(curDay)) {
        time.push(curDatetime[1]);
      }

    }
    timeString += ` ${ time.join(', ') }`;
    note.push(timeString.trim());
  }

  let userNm: string = authentificated.user.userNm;

  if (!monitorResult.length) monitorResult.push('특이사항 없음');

  const copyText = [disk1, disk2, monitorResult.join(', '), userNm, note.join(', ')].join('\t');

  return (
    <Alert
      sx={{
        borderRadius: 0,
        backgroundColor: overCnt > 0 ? 'rgb(250, 232, 229)' : 'rgb(226, 244, 215)'
      }}
      severity={ overCnt > 0 ? 'error' : 'success' }
      action={ <CopyButton copyText={ copyText } /> }
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
