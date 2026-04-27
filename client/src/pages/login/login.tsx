import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLoginMutation } from '@services/user.service';
import { useNavigate } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface ErrorResponse {
  message?: string;
}

export const Login: FC = (): JSX.Element => {
  const { setAuthData } = useAuth();
  const [login, { data: value, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (value) {
      setAuthData(value);
      navigate('/admin', { replace: true });
    }
    return () => {};
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) {
      return;
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({ email: data.get('email') as string, password: data.get('password') as string });
  };

  const getErrorMessage = () => {
    if (!error) {
      return '';
    }
    const response = error as FetchBaseQueryError;
    if (response.status === 429) {
      return 'Слишком много попыток входа. Попробуйте позже.';
    }
    const payload = response.data as ErrorResponse | undefined;
    return payload?.message || 'Ошибка авторизации. Проверьте данные и попробуйте снова.';
  };

  return (
    <>
      <Container component='main'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Войти в приложение
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
              disabled={isLoading}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='current-password'
              disabled={isLoading}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
            {error ? (
              <Typography variant='description' color='error.main' role='alert'>
                {getErrorMessage()}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </Container>
    </>
  );
};
