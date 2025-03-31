import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';
import Part1 from './pages/Part1';
import Part2 from './pages/Part2';
import Part3 from './pages/Part3';

const root = ReactDOM.createRoot(document.getElementById('root'));
const rootPath = process.env.PUBLIC_URL;
// console.log(rootPath);
root.render(
  <BrowserRouter basename={rootPath}>
    <App>
      <Routes>
        <Route path='/' element={<Part1/>}/>
        <Route path='/part2' element={<Part2/>}/>
        <Route path='/part3' element={<Part3/>}/>
      </Routes>
    </App>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
