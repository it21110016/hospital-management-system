import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import toast from 'react-hot-toast';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous toasts
    toast.dismiss();

    // Validation checks
    if (!email) {
      return toast.error("Please provide an email.", { id: 'email' });
    } else if (!emailRegex.test(email)) {
      return toast.error("Please provide a valid email.", { id: 'emailInvalid' });
    }

    if (!passwd) {
      return toast.error("Please provide a password.", { id: 'password' });
    }

    try {
      const admin = { email, Hash_password: passwd };
      const response = await axios.post("http://localhost:8040/user/Signin", admin);

      toast.success("Successfully Logged In!");
      localStorage.setItem('token', response.data.token);
      const uid = response.data.payload.uid;
      console.log(uid);

      setTimeout(() => {
        window.location.replace('/main');
      }, 1000);

      // Clear the form
      setEmail('');
      setPasswd('');
    } catch (error) {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className='container2'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={adminLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Hash_password"
              label="Password"
              type="password"
              id="Hash_password"
              autoComplete="current-password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <center>
              <Grid>
                <Grid item xs={12} sm={6}>
                  <Link to='/signup' variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </center>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
