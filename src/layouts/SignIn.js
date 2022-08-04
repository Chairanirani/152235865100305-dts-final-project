
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../configs/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Copyright(props) { 
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Final Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  const handleToSignUp = () => {
    navigate("/signup");

  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ 
            minHeight: "100vh", 
            backgroundImage: "url(../../assets/images/5268821.jpg)", 
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
             }}>
      <Container component="main" maxWidth="xs"
      sx={{ 
        backgroundColor: "white", 
        height: "20%" , 
        marginTop: "90px", 
        marginBottom: "90px",
        boxShadow: "5px 10px 18px #888888" 
    }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white' }} src="./../assets/images/logo.png">
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
          onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={() => logInWithEmailAndPassword(email, password)}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In with Email and Password
            </Button>
            <Button
              onClick={signInWithGoogle}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/signup" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Button
                onClick={()=> handleToSignUp()}
                variant="outlined"
                size="small"
                sx={{ mt: 1, mb: 1, fontSize: '10px' }}
              >
                {`Don't have an account? Sign Up`}
              </Button>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </Grid>
    </ThemeProvider>
  );
}