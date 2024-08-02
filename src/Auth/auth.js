
import { Outlet } from "react-router-dom";
import './auth.css';
import UserContextProvider from "../store/userContext";
const Auth =()=>{    
     return(
      <UserContextProvider> 
        <div className="auth-container">           
              {/* <h2>Auth Page</h2> */}
              <Outlet/>        
        </div> 
        </UserContextProvider>
     )

}

export default Auth;
