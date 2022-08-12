import * as Yup from 'yup';

import { useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { setAuth } from '../../modules/auth';
import { setRemember, Remember } from '../../modules/remember';
import { RootState } from '../../modules';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton  } from '@mui/lab';

import Iconify from '../../components/Iconify';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../components/hook-form';
import API from '../../common/API';

import Swal from 'sweetalert2';
import { AxiosError } from 'axios';


// --------------------------------------------------------------------------------

interface LoginInterface {
  id: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrorInterface {
  code: number;
  message: string;
}

// --------------------------------------------------------------------------------

function LoginForm() {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const remember: Remember = useSelector<RootState>(state => state.remember) as Remember;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // --------------------------------------------------------------------------------

  const LoginSchema = Yup.object().shape({
    id: Yup.string().required('ID를 입력해주세요.'),
    password: Yup.string().required('PW를 입력해주세요.')
  });

  const defaultValues: LoginInterface = {
    id: '',
    password: '',
    rememberMe: true
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const {
    handleSubmit,
    setFocus,
    setValue,
    formState: { isSubmitting }
  } = methods;

  // --------------------------------------------------------------------------------

  const onSubmit = async ({ id, password, rememberMe} : LoginInterface) => {
    try {
      let res = await API.post('/token', { id, password });

      // id와 rememberMe 저장 localstorage
      dispatch(setRemember({
        store: rememberMe,
        id: id
      }));

      // 로그인 정보 저장 sessionStorage
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
      const err = error as AxiosError;
      const errBody = err.response?.data as LoginErrorInterface;

      return Swal.fire({
        title: `${ errBody?.message === 'Invalid ID' ? 'ID' : '비밀번호' }가 올바르지 않습니다.`,
        text: `${ errBody?.message === 'Invalid ID' ? 'ID' : '비밀번호' }를 확인해주세요.`,
        icon: 'error',
        confirmButtonText: '확인',
        didClose: () => errBody?.message === 'Invalid ID' ? setFocus('id') : setFocus('password')
      });
    }
  };

  const getStoreId = () => {
    if (remember.store && remember.id) {
      setValue('id', remember.id);
      setFocus('password');
    } else {
      setFocus('id');
    }
  };

  // --------------------------------------------------------------------------------

  useEffect(getStoreId, []);

  // --------------------------------------------------------------------------------

  return (
    <FormProvider methods={ methods } onSubmit={ handleSubmit(onSubmit) } >
      <Stack spacing={ 3 } >
        <RHFTextField name="id" label="ID" />

        <RHFTextField
          name="password"
          label="Password"
          type={ showPassword ? 'text' : 'password' }
          InputProps={ {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={ () => setShowPassword(!showPassword) } edge="end">
                  <Iconify icon={ showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill' } />
                </IconButton>
              </InputAdornment>
            )
          } }
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2}} >
        <RHFCheckbox name="rememberMe" label="Remember me" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={ isSubmitting } >
        Login
      </LoadingButton>
    </FormProvider>
  );
}

// --------------------------------------------------------------------------------

export default LoginForm;