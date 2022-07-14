import { Container } from 'react-bootstrap';
import MainBar from '../components/MainBar';
import './css/Home.module.css';

function Home({ authentificated }: { authentificated: boolean }): JSX.Element {
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