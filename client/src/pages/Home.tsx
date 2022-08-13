import { Container } from 'react-bootstrap';

import Page from '../components/Page';

function Home(): JSX.Element {
  return (
    <Page title="Home">
      <Container>
        <h1>Main</h1>
      </Container>
    </Page>
  );
}

export default Home;