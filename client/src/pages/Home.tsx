// material
import { Container, Card, Stack, Typography, Alert } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
// components
import Page from '../components/Page';

function Home(): JSX.Element {
  return (
    <Page title="Home">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 5 } >
          <Typography variant="h4" gutterBottom>
            <FontAwesomeIcon icon={ faHouse } style={{ marginRight: '10px' }} />
            Home
            {/* <Alert severity="info" security='' sx={{ backgroundColor: 'transparent' }}>
              Home
            </Alert> */}
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}

export default Home;