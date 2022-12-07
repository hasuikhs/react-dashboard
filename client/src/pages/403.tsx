import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'react-bootstrap';

import Page from '../components/Page';

const ErrorDiv = styled.div`
  margin-top: 10%;
  padding: 40px 15px;
  text-align: center;
`;

const ErrorActionDiv = styled.div`
  margin-top:15px;
  margin-bottom:15px;
`;

const TextDiv = styled.div`
  margin-top: 20px;
`;

function NotFound(): JSX.Element {

  const navigate = useNavigate();

  return (
    <Page title="403">
      <div className="row">
        <div className="col-md-12">
          <ErrorDiv>
            <TextDiv>
              <h2>403 Forbidden</h2>
              <div>
                죄송합니다. 권한이 없습니다.
              </div>
            </TextDiv>
            <ErrorActionDiv>
              <Button 
                onClick={ () => navigate('/login') }
              >
                로그인 하기
              </Button>
            </ErrorActionDiv>
          </ErrorDiv>
        </div>
      </div>
    </Page>
  )
}

export default NotFound;