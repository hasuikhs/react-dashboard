import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Container } from 'react-bootstrap'; 
import CustomAlert from '../components/CustomAlert';

import styles from './css/Login.module.css';

import API from '../common/API';

function Login(): JSX.Element {

  const [id, setId] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');

  const idInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const passwordInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const navigate: NavigateFunction = useNavigate();

  // 최초 ID focus
  useEffect(() => {
    idInput.current?.focus();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      return CustomAlert({
        title: 'ID를 입력해주세요.',
        icon: 'warning',
        didCloseCallback: () => idInput.current?.focus()
      })
    } else if (!password) {
      return CustomAlert({
        title: '비밀번호를 입력해주세요.',
        icon: 'warning',
        didCloseCallback: () => passwordInput.current?.focus()
      });
    }

    let ret = await API.post('/token', {
      id, password
    });

    if (ret.data.code === 200) {
      API.defaults.headers.common['Authorization'] = ret.data.token;
      sessionStorage.setItem('token', ret.data.token);

      return navigate('/');
    } else {
      return CustomAlert({
        title: '계정 정보를 확인해주세요.',
        icon: 'error',
      })
    }
  }

  return (
    <>
      <Container>
        <main className={ styles['form-login'] }>
          <form onSubmit={ onSubmit }>

            <div className="form-floating">
              <input
                id="userId"
                ref={ idInput }
                className="form-control"
                type="text"
                placeholder="ID"
                value={ id }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value) }
              />
              <label htmlFor="userId">ID</label>
            </div>

            <div className="form-floating">
              <input
                id="userPw"
                ref={ passwordInput }
                className="form-control"
                type="password"
                placeholder="PASSWORD"
                value={ password }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) }
              />
              <label htmlFor="userPw">PW</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">LOGIN</button>
          </form>
        </main>
      </Container>
    </>
  )
}

export default Login;