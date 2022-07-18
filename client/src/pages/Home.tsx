import { Container } from 'react-bootstrap';
import MainBar from '../components/MainBar';
import './css/Home.module.css';

import Spinner from '../components/Spinner';

function Home(): JSX.Element {
  return (
    <>
      <MainBar />
      <Container>
        <h1>Main</h1>
      </Container>
    </>
  );
}

export default Home;