import React, { Component, useState } from 'react'

//import '../../App.css'
import instance from "../../api/config";
import { getNo } from "../../auth";
import CardItem from '../CardItem';
import Cards from '../Cards';
import '../Cards.css';
import './/EventBoard.css'

function EventBoard(){
    const [creator, setCreator] = useState("");
    
    const GetLondon = async () => {
        const response = await instance.get(`/londonEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        for (let d of response.data) {
            content += "Event Type: ";
            content += d.eventType;
            content += ":&nbsp;";
            content += "Date: ";
            content += d.eventDate;
            content += ":&nbsp;";
            content += "Max Attendance: ";
            content += d.maxAtendees;
            content += ":&nbsp;";
            content += "Creator: ";
            GetCreator(d.creator);
            content += creator;
            content += '<br>'
        }
        content += '</p>'
        table.innerHTML = content;
    };
    const GetCreator = async (userNo) => {
        try {
            const response = await instance.post(
                '/lookUpUser',
                {
                    userNo,
                
                }
            );
            if (response) {
                setCreator(response.data[0].username);
            }
            } catch (error) {
            console.log(error);
            }
            
    };
    const GetToronto = async () => {
        const response = await instance.get(`/torontoEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        for (let d of response.data) {
            
            content += JSON.stringify(d.name);
            content += '<br>'
        }
        content += '</p>'
        table.innerHTML = content;
    };

    const GetNiagara = async () => {
        //const response = await instance.get(`/niagaraEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        //for (let d of response.data) {
            content += getNo();
            //content += JSON.stringify(d.name);
            content += '<br>'
        //}
        content += '</p>'
        table.innerHTML = content;
    };
    
    return (
    <body>
    <h1  className='eventboard'>EVENT BOARD</h1>
    <div className='cards'>
       <h1>In your area</h1> 
       <div className="cards__container">
        <div className="cards__wrapper">
            <ul className="cards__items">
                <CardItem 
                src="images/uwo.jpeg"
                text="London"
                label='Western University and Richmond'
                onClick ={GetLondon}
                />
                <CardItem 
                src="images/toronto.jpeg"
                text="Greater Toronto Area (GTA)"
                label='Toronto City Centre'
                onClick ={GetToronto}
                />
                 <CardItem 
                src="images/niagara.webp"
                text="Niagara Region"
                label='Niagara on the Lake Winter Market'
                onClick ={GetNiagara}
                />
            </ul>
        </div>
       </div>
    </div>
    <div id='table' className = 'events'></div>
    </body>
    )
}

export default EventBoard;
