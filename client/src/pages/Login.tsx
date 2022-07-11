import React, { useState, useRef, useEffect } from 'react';
import styles from './css/Login.module.css';
import Swal from 'sweetalert2';

import API from '../common/API';

function Login(): JSX.Element {

  const [id, setId] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');

  const idInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

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
        didClose: () => idInput.current?.focus()
      });
    } else if (!password) {
      return Swal.fire({
        title: '비밀번호를 입력해주세요.',
        icon: 'warning',
        didClose: () => passwordInput.current?.focus()
      });
    }

    let ret = await API.post('/token', {
      id, password
    });

    console.log(ret)
  }

  return (
    <>
      <main className={ styles['form-login'] }>
        <form onSubmit={ onSubmit }>

          <div className="form-floating">
            <input id="userId" ref={ idInput } className="form-control" type="text" placeholder="ID" value={ id } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value) } />
            <label htmlFor="userId">ID</label>
          </div>

          <div className="form-floating">
            <input id="userPw" ref={ passwordInput } className="form-control" type="password" placeholder="PASSWORD" value={ password } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) } />
            <label htmlFor="userPw">PW</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
        </form>
      </main>
    </>
  )
}

export default Login;