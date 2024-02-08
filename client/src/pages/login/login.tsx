import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLoginMutation } from '@services/user.service';
import { useNavigate } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth.ts';

export const Login: FC = (): JSX.Element => {
  const { setAuthData } = useAuth();
  const [login, { data: value }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (value) {
      setAuthData(value);
      navigate('/admin', { replace: true });
    }
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({ email: data.get('email') as string, password: data.get('password') as string });
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
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
