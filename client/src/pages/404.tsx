import { useNavigate } from 'react-router-dom';
import styles from './css/404.module.css';

function NotFound(): JSX.Element {

  const navigate = useNavigate();

  return (
    <>
    <div className="row">
      <div className="col-md-12">
        <div className={ styles['error-template'] }>
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
    </>
  )
}

export default NotFound;