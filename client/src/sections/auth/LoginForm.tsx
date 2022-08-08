import * as Yup from 'yup';

import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton  } from '@mui/lab';

import Iconify from '../../components/Iconify';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFCheckbox from '../../components/hook-form/RHFCheckbox';
import RHFTextField from '../../components/hook-form/RHFTextField';

function LoginForm() {
  const navigate: NavigateFunction = useNavigate();

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const LoginSchema = Yup.object().shape({
    id: Yup.string().required('ID를 입력해주세요.'),
    password: Yup.string().required('PW를 입력해주세요.')
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async () => {
    console.log('tterr')
  };

  return (
    <FormProvider methods={ methods } onSubmit={ handleSubmit(onSubmit) } >
      <Stack spacing={ 3 } >
        <RHFTextField name="id" label="ID" />

        <RHFTextField
          name="password"
          label="Pasword"
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
        <RHFCheckbox name="remember" label="Remember me" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={ isSubmitting } >
        Login
      </LoadingButton>
    </FormProvider>
  );
}

export default LoginForm;