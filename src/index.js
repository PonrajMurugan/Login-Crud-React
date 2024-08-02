import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Todo from './Components/Todo/todo';
import Auth from './Auth/auth';
import LoginPage from './Auth/login-page';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  

    <BrowserRouter basename='/'>    
    <Routes>
     Auth Page Router 
    <Route path='auth' element={<Auth/>}>
    <Route path='login-page' element={<LoginPage/>}/>
     </Route>
    <Route path='/' element={<App/>}>
    <Route index element={<Todo/>}/>
    </Route>
    <Route path='*' element={<h1>404 Page Not Found</h1>}  />
    </Routes>
    </BrowserRouter> 
  
);


reportWebVitals();
