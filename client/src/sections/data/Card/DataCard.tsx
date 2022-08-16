import { useState } from 'react';
// mui
import { styled } from '@mui/material/styles';
import { Card, CardContent, CardActions } from '@mui/material';
import { Collapse, Typography } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
// components
import CardHeader from './CardHeader';
import CardTable from './CardTable';

// --------------------------------------------------------------------------------

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// --------------------------------------------------------------------------------

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton { ...other } />;
}) (({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginleft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

// --------------------------------------------------------------------------------

function DataCard({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const serverInfo = data.info;
  const monitoringData = data.data;

  const cpuCnt: number = serverInfo.cpuCnt as number;
  const percentLimit: number = 90;

  const observeMetric: string[] = ['mi01', 'mi05', 'mi15', 'mem', 'swap', 'totalDisk', 'disk1', 'disk2', 'disk3'];

  const overData = observeMetric.reduce((obj: any, cur) => {
    if (cur.includes('mi')) {
      obj[cur] = monitoringData.filter((item: any) => item[cur] > cpuCnt);
    } else {
      obj[cur] = monitoringData.filter((item: any) => item[cur] > percentLimit);
    }

    return obj;
  }, {});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: '300px', maxWidth: '100%', borderRadius: '5px', border: '0.5px solid lightgray' }}>

      <CardHeader serverInfo={ serverInfo } monitoringData={ monitoringData } overData={ overData }/>

      <CardContent sx={{ p: 0 }}>
        <CardTable serverInfo={ serverInfo } monitoringData={ monitoringData } overData={ overData } />
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={ expanded }
          onClick={ handleExpandClick }
          sx={{
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
          aria-expanded={ expanded }
          aria-label="show more"
        >
          <FontAwesomeIcon icon={ faAngleDown } style={{ fontSize: '12px'}} />
        </ExpandMore>
      </CardActions>

      <Collapse in={ expanded } timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            test
          </Typography>
        </CardContent>
      </Collapse>

    </Card>
  );
}

export default DataCard;