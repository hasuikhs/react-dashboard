import { Container } from 'react-bootstrap';
import MainBar from '../components/MainBar';
import './css/Home.module.css';

import Page from '../components/Page';

function Home(): JSX.Element {
  return (
    <Page title="Home">
      <MainBar />
      <Container>
        <h1>Main</h1>
      </Container>
    </Page>
  );
}

export default Home;