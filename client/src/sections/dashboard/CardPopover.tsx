import { useEffect, useState } from 'react';
// material
import { Typography, Card, Popover, CardActionArea } from '@mui/material';
// components
import PopoverTable from './PopoverTable';

function CardPopover({ data, metric }: { data: any, metric: string }): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const metricData = data.find((item: any) => item.metric === metric)?.data;

  const cnt: number = metricData?.length || 0;

  return (
    <Card
      sx={{ p: 2, backgroundColor: cnt > 0 ? 'rgb(250, 232, 229)' : 'rgb(255, 255, 255)' }}
    >
      <CardActionArea
        aria-owns={ open ? metric : undefined }
        aria-haspopup="true"
        onMouseEnter={ handlePopoverOpen }
        onMouseLeave={ handlePopoverClose }
      >
        <Typography variant="overline">
          { metric }
        </Typography>
        <Typography variant="h3" align="center">
          { cnt }
        </Typography>
      </CardActionArea>
      <Popover
        id={ metric }
        sx={{ pointerEvents: 'none' }}
        open={ open }
        anchorEl={ anchorEl }
        onClose={ handlePopoverClose }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        disableRestoreFocus
      >
        <PopoverTable data={ metricData } />
      </Popover>
    </Card>
  );
}

export default CardPopover;