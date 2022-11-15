import { styled } from '@mui/material/styles';

import { Card, Container, Typography } from '@mui/material';

import Page from '../components/Page';

import LoginForm from '../sections/auth/LoginForm';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { toDateFormat } from '../common/DateFormat';

// --------------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

// const HeaderStyle = styled('header')(({ theme }) => ({
//   top: 0,
//   zIndex: 9,
//   lineHeight: 0,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   position: 'absolute',
//   padding: theme.spacing(3),
//   justifyContent: 'space-between',
//   [theme.breakpoints.up('md')]: {
//     alignItems: 'flex-start',
//     padding: theme.spacing(7, 5, 0, 7),
//   },
// }));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// --------------------------------------------------------------------------------

function Login() {

  useEffect(() => {
    // notice
    if (toDateFormat(new Date().toString()) <= '2022-11-18') {
      Swal.fire({
        title: 'Note',
        html: `
          <p class="tl"><strong>1. busan-web01, media</strong></p>
          <p class="tl">&nbsp;&nbsp;- disk가 모두 0인 현상</p>
          <p class="tl">&nbsp;&nbsp;- 데이터 복사시 xvda2 데이터를 xvda1으로 복사</p>
          <p class="tl"><strong>2. 위 부분으로 인해 DB 내 tb_data 컬럼 disk4, 5, 6 추가</strong></p>
          <p class="tl">&nbsp;&nbsp;- 순서대로 /dev/xvda2, /dev/xvdb2, /dev/xvdc2</p>
          <p class="tl fs12 color-gray">* 본 Note는 금요일(11-18)까지 노출됩니다.</p>
        `,
        confirmButtonText: '확인'
      });
    }
  }, []);

  return (
    <Page title="Login">
      <RootStyle>
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }} >
            MONITORING
          </Typography>
        </SectionStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom >
              SIGN IN
            </Typography>

            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

// --------------------------------------------------------------------------------

export default Login;