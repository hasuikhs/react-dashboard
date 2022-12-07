import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Row, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import Page from '../components/Page';

const ErrorDiv = styled.div`
  margin-top: 10%;
  padding: 40px 15px;
  text-align: center;
`;

const ErrorActionDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const TextDiv = styled.div`
  margin-top: 20px;
`;

function NotFound(): JSX.Element {

  const navigate = useNavigate();

  document.body.addEventListener('keyup', (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key === 'Escape') navigate(-1);
  });

  return (
    <Page title="404">
      <Row>
        <ErrorDiv>
          <FontAwesomeIcon icon={ faTriangleExclamation } size="4x"/>
          <TextDiv>
            <h2>404 Not Found</h2>
            <div>
              죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
            </div>
          </TextDiv>
          <ErrorActionDiv>
            <Button
              onClick={ () => navigate(-1) }
            >
              뒤로 가기
            </Button>
          </ErrorActionDiv>
        </ErrorDiv>
      </Row>
    </Page>
  )
}

export default NotFound;