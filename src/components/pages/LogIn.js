import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './/LogIn.css'
import instance from "../../api/config";
import { saveNo } from "../../auth";


function LogIn(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onChangeUser = (event) => {
        setUser(event.target.value);
    };

    const onChangePasswordText = (event) => {
        setPassword(event.target.value);
    };

    const onClickSignIn = async () => {
        
        try {
            const response = await instance.post(
              '/sign-in',
              {
                user,
                password,
              }
            
        );
        if (response.data.length == 1) {
            
            const userNo = response.data[0].userNo;
            saveNo("user", userNo)
            navigate("/");
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
    }
    
    return (
        
    <div className="log-in" >
        <form>
        <br></br><br></br><br></br>
        <label className="username">Username</label>
        <input  type="text" name = "user" placeholder = "fakeUser123" value={user} onChange={onChangeUser} required></input>
        <br></br><br></br><br></br>
        <label className="password">Password</label>
        
        <input type="password"  className="password" value={password} onChange={onChangePasswordText} required></input>
        <br></br><br></br><br></br>
  
        <div class="hcenter">
        <button type="button" className="login" onClick={onClickSignIn} >Log In</button>
        </div>
        </form>
        
        <Link to="/signup">Sign Up</Link>
    </div>
    );
}

export default LogIn;