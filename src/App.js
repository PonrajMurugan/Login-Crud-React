import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; 
import TodoContextProvider from './store/todoContext';


function App() {
   
   const token = localStorage.getItem("token")   
   const [isLogin, setIsLogin] = useState(false);
   const navigate = useNavigate();

   const isChange = ()=>{
      if(!token) {
      navigate("/auth/login-page")
      console.log("App")
      return;
  }

  setIsLogin(true);    

  }

   useEffect(()=>{
   isChange()
  }, [isLogin]);


  return (

    isLogin  &&

    <div>
     
     <TodoContextProvider>
         <Outlet/>         
     </TodoContextProvider>  
 
    </div>
  );
}

export default App;
