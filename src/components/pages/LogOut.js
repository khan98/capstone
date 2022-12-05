import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { saveNo, getNo } from "../../auth";
import './/LogOut.css'
import instance from "../../api/config";


function LogOut() {

    const navigate = useNavigate();
    function Logout (){
        saveNo(null);
        navigate("/log-in");
    }

    
    const Delete = async () => {
        const userNo = getNo();
        try {
            const response = await instance.post(
              '/deleteAccount',
              {
                userNo,
              }
            
        );
        if (response) {
        
            navigate("/signup");
            saveNo(null);
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div>
            <button className="button" onClick={Logout} style={{ marginTop: 30 }}>Log Out</button>
            <button className="button" onClick={Delete} style={{ marginTop: 30 }}>Delete Account</button>
        </div>
        );

}

export default LogOut;