import { Container } from 'react-bootstrap';
import MainBar from '../components/MainBar';
import './css/Home.module.css';

function User(): JSX.Element {
  return (
    <>
      <MainBar />
      <Container>
        <h1>User</h1>
      </Container>
    </>
  )
}

export default User;