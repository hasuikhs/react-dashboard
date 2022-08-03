import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { setAuth } from '../modules/auth';
import { Container } from 'react-bootstrap'; 
import Swal from 'sweetalert2';

import styles from './css/Login.module.css';

import API from '../common/API';

function Login(): JSX.Element {

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const idInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const passwordInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const navigate: NavigateFunction = useNavigate();

  const dispatch: Dispatch<AnyAction> = useDispatch();

  // 최초 ID focus
  useEffect(() => {
    idInput.current?.focus();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      return Swal.fire({
        title: 'ID를 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => idInput.current?.focus()
      });
    } else if (!password) {
      return Swal.fire({
        title: '비밀번호를 입력해주세요',
        icon: 'warning',
        confirmButtonText: '확인',
        didClose: () => passwordInput.current?.focus()
      });
    }

    try {
      let res = await API.post('/token', { id, password });
      sessionStorage.setItem('token', res.data.token);

      dispatch(setAuth({
        token: res.data.token,
        user: {
          isLogin: true,
          userNm: res.data.user.userNm,
          loginDt: res.data.user.loginDt
        }
      }));

      return navigate('/');
    } catch (error) {
      return Swal.fire({
        title: '계정 정보가 올바르지 않습니다.',
        text: '아이디 또는 비밀번호를 확인해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
        didClose: () => idInput.current?.focus()
      });
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