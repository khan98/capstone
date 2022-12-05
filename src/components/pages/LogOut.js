import React, { useState } from 'react'
import '../../App.css'



export default function EventBoard(){
    const [user, setUser] = useState({username:"", password:""})
    return (
        
    <div className="log-out">
        <form>
        <label className="username">Username</label>
        <input  type="text" name = "user" placeholder = "fakeUser123" required></input>
        <label className="username">Password</label>
        <input type = "text"  name = "password" placeholder = "password"required></input>
        <button type="submit">Log In</button>
        </form>

    </div>
    );
}