import React from "react";
import LoginButton from "./Loginbutton";
import Profile from "./Profile";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
const Login=()=>{
    const {isAuthenticated}=useAuth0();
    return(
        <div>
            {
                isAuthenticated ? <LogoutButton/> : <LoginButton/> 
            }
            <Profile/>
        </div>
    )
}
export default Login