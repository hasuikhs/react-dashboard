import { useNavigate } from 'react-router-dom';
import styles from './css/error.module.css';

import Page from '../components/Page';

function NotFound(): JSX.Element {

  const navigate = useNavigate();

  return (
    <Page title="403">
      <div className="row">
        <div className="col-md-12">
          <div className={ styles['error-template'] }>
            <h2>403 Forbidden</h2>
            <div className="error-details">
              죄송합니다. 권한이 없습니다.
            </div>
            <div className={ styles['error-actions'] }>
              <button 
                onClick={ () => navigate('/login') }
                className="btn btn-primary btn-md"
              >
                로그인 하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default NotFound;