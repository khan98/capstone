import React, { Component } from 'react'
import '../../App.css'
import instance from "../../api/config";

function EventBoard(){
    const onClick = async () => {
        const response = await instance.get(`/users`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        content += JSON.stringify(response.data[0].userId);
        content += ":&nbsp;";
        content += JSON.stringify(response.data[0].name);
        content += '</p>'
        table.innerHTML = content;
    };
    
    return (
    
    <><h1 className='eventboard'>EVENT BOARD</h1>
    <div className="button-container">
     <button className="button"  onClick= {onClick} style={{ margin: "auto", height: 400, width: 600 }}>
        View
    </button>
    </div>
    <div id='table'></div>
    </>
    )
}

export default EventBoard;
