import React from 'react';
import ReactDOM from 'react-dom';
import Home from './routes/landingPage/home';
import Bar from './routes/bar';
import Line from './routes/line';
import Map from './routes/map';

import './styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/bar'} element={<Bar />} />
        <Route path={'/line'} element={<Line />} />
        <Route path={'/map'} element={<Map />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
