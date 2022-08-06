import { ForwardedRef, forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box  } from '@mui/material';

interface PageProps {
  children: any;
  title: string;
  meta?: any;
}

const Page = forwardRef(({ children, title = '', meta, ...other } : PageProps, ref: ForwardedRef<JSX.Element>) => (
  <>
    <Helmet>
      <title>{ `${ title } | Monitoring` }</title>
    </Helmet>

    <Box ref={ ref } { ...other }>
      { children }
    </Box>
  </>
))

export default Page;