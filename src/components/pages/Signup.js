import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../api/config";
//import "../App.css";
import "./Signup.css";

function Signup() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [info, setinfo] = useState("");
    const [favEvent, setfavEvent] = useState("");

    const onChangeUser = (event) => {
        setUser(event.target.value)
    }

    const onChangePasswordText = (event) => {
        setPassword(event.target.value)
    }

    const onChangeInfo = (event) => {
        setinfo(event.target.value)
    }

    const onChangeFavEvent= (event) => {
        setfavEvent(event.target.value)
    }

    const getUserNo = async () => {
        const response = await instance.post(`/getUserNo`);
        onClickSignUp(response.data);
    };

    const onClickSignUp = async (number) => {
        try {
            const response = await instance.post(
                `/sign-up`,
                {
                    user,
                    password,
                    info,
                    favEvent,
                    number,
                }
            );
           
            if (response) { 
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const navigate = useNavigate();
    return (
    <div>
        <h1>Sign Up</h1>
            <form style={{ width: 200 }}>
                <div className="input-container">
                    <p className="text-input-title-text">Username</p>
                    <input className="text-input" type="text" value={user} onChange={onChangeUser} required />
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">Password</p>
                    <input className="text-input" type="password" value={password} onChange={onChangePasswordText} required/>
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">Info</p>
                    <input className="text-input" type="text" value={info} onChange={onChangeInfo} />
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">favEvent</p>
                    <input className="text-input" type="text" value={favEvent} onChange={onChangeFavEvent} />
                </div>

            </form>
            <button className="button" onClick={getUserNo} style={{ marginTop: 30 }}>Sign Up</button>
    </div>
    );

}

export default Signup;