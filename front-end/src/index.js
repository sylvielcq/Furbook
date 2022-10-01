import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';

import LandingPage from './components/LandingPage';
import Friendships from './components/Friendships';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {/* DO NOT REMOVE Nav COMPONENT FROM HERE */}
      

//       <Routes></Routes>
        
//     </BrowserRouter>
//   </React.StrictMode>
// );

ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
      {/* DO NOT REMOVE Nav COMPONENT FROM HERE */}
      

      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/friendships' element={<Friendships />} />
      </Routes>
        
    </BrowserRouter>
  </React.StrictMode>


, document.getElementById('root'));
