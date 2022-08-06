import { useNavigate } from 'react-router-dom';
import styles from './css/error.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import Page from '../components/Page';

function NotFound(): JSX.Element {

  const navigate = useNavigate();

  document.body.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'Escape') navigate(-1);
  });

  return (
    <Page title="404">
      <div className="row">
        <div className="col-md-12">
          <div className={ styles['error-template'] }>
            <FontAwesomeIcon icon={ faTriangleExclamation } size="4x"/>
            <br />
            <br />
            <h2>404 Not Found</h2>
            <div className="error-details">
              죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
            </div>
            <div className={ styles['error-actions'] }>
              <button 
                onClick={ () => navigate(-1) }
                className="btn btn-primary btn-md"
              >
                뒤로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default NotFound;