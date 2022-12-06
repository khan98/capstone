import React, { useState } from 'react';
import { getNo } from "../../auth";
import instance from "../../api/config";
import { Link, useNavigate } from "react-router-dom";

function friendsList()
{
    const myfriends = async () => {
        let table = document.getElementById('table');
        const user = getNo();
        let content =' friends list  ';
         content += user + '   ';
        try {
            const response = await instance.post(
                `/friends`,
                {
                    user,
                }
            );
           
            if (response) { 
                //alert("flag 1" + response.data[0].username);
                alert("flag 2");
                for (let d of response.data) {
                    content+= d.username +'  '
                } 
            }
            
        } catch (error) {
            console.log(error);
        }
        table.innerHTML = content;
    };

return (
    <div>
           <h1>test  </h1> 
           <div onClick={myfriends}>
                show
           </div>

           <div id='table' ></div>

    </div>
)

}
export default friendsList;

