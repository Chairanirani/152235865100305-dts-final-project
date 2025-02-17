import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import Button from '@mui/material/Button';
import { auth, logout } from "../configs/Firebase.js";
import { useNavigate } from "react-router-dom";

const pages = [
    { text: 'Home', link: '/' },
    { text: 'Juz', link: '/juz' },
    { text: 'Surah', link: '/surah' }
  ];
const settings = [
  {text: 'Profile', link: '/profile'}, 
  {text: 'Account', link: '/account'}, 
  {text: 'Dashboard', link: '/dashboard'},
  {text: 'Logout', link: '/logout'}
];

const Navbar = (prop) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await logout();
      navigate('/signin');
    }catch(err){
      console.log(err);
    }
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl" sx={{ backgroundColor: "#398486" }}>
        <Toolbar disableGutters>
         
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BACALAH 
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },  }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <NavLink 
                    key={page.text}
                    to={page.link}
                    className={({isActive}) => isActive ? 'nav-active' : 'nav-inactive'}
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </NavLink>
              ))}
            </Menu>
          </Box>
          
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BACALAH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <NavLink 
                    key={page.text}
                    to={page.link}
                    className={({isActive}) => isActive ? 'nav-active' : 'nav-inactive'}
                >
                    <Typography textAlign="center">{page.text}</Typography>
                </NavLink>
            ))}
          </Box>
          {
            prop.num ? (<ReactAudioPlayer 
                src={`https://cdn.islamic.network/quran/audio/64/ar.alafasy/${prop.num}.mp3`}
                autoPlay
                controls 
            />) : null
          }
          {
            prop.numSurah ? (<ReactAudioPlayer 
                src={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${prop.numSurah}.mp3`}
                autoPlay
                controls 
            />) : null
          }
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {prop.userName ? (<Typography sx={{ fontSize: '10px', color: 'white' }}>{`Welcome ${prop.userName}`}</Typography>) : null }
                
              </IconButton>
            </Tooltip>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <NavLink 
                    key={settings.text}
                    to={setting.link}
                >
                    <Typography textAlign="center">{setting.text}</Typography>
                </NavLink>
              ))} */}
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
