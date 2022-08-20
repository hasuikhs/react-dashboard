import { useEffect, useState } from 'react';
// material
import { Container, Stack, Typography, Alert, Grid, Card } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
// components
import Page from '../components/Page';
import LoadAverageChart from '../sections/dashboard/LoadAverageChart';
import { requestAPI } from '../common/API';

function Dashboard(): JSX.Element {

  const [serverInfo, setServerInfo] =  useState();

  const getServerSpec = async () => {
    const res = await requestAPI({
      type: 'GET',
      url: `api/self/spec`
    });

    setServerInfo(res);
  }

  useEffect(() => {
    getServerSpec();
  }, []);


  return (
    <Page title="Dash">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 2 } >
          <Typography variant="h4" gutterBottom>
            <FontAwesomeIcon icon={ faChartPie } style={{ marginRight: '10px' }} />
            Dashboard
            <Alert severity="info" security='' sx={{ backgroundColor: 'transparent' }}>
              크롤링 서버 상태와 문제가 있는 서버의 정보를 가져옵니다.
            </Alert>
          </Typography>

        </Stack>

        <Grid container spacing={ 3 } columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={ 12 } sm={ 12 } md={ 9 } >
            <Card sx={{ p: 2, height: 505 }}>
              <LoadAverageChart serverInfo={ serverInfo } />
            </Card>
          </Grid>

          <Grid item xs={ 12 } sm={ 12 } md={ 3 }>
            <Stack spacing={ 3 }>
              <Card sx={{ p: 2, height: 240 }}>
tt
              </Card>

              <Card sx={{ p: 2, height: 240 }}>
tt
              </Card>
            </Stack>
          </Grid>
        </Grid>

      </Container>
    </Page>
  );
}

export default Dashboard;