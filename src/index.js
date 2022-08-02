import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import SignIn from './layouts/SignIn';
import HomeJuz from './containers/HomeJuz';
import JuzList from './containers/JuzList';
import Navbar from './containers/Navbar';
import Footer from './containers/Footer';
import SurahList from './containers/SurahList';
import DetailSurah from './containers/DetailSurah';
import { Box } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='login' element={<SignIn />} />
        <Route path='juz' element={<JuzList />} /> 
        <Route path='choosenJuz/:plan' element={<HomeJuz />} />
        <Route path='surah' element={<SurahList />} />
        <Route path='ayat' element={<SurahList />} />
        <Route path='detailSurah/:plan' element={<DetailSurah />} />
      </Routes>
    <Footer />
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
