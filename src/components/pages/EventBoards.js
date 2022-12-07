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
            GetCreator(d.creator);
            content += "Event Type: ";
            content += d.eventType;
            content += "&nbsp;&nbsp;";
            content += "Date: ";
            content += sqlToJsDate(d.eventDate);
            content += "&nbsp;&nbsp;";
            content += "Max Attendance: ";
            content += d.maxAtendees;
            content += "&nbsp;&nbsp;";
            content += "Creator: ";
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


    function sqlToJsDate(sqlDate){
        //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
        var sqlDateArr1 = sqlDate.split("-");
        //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms'];
        var sMonth = (Number(sqlDateArr1[1])).toString();
        var sqlDateArr2 = sqlDateArr1[2].split("T");
        //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
        var sDay = sqlDateArr2[0];
        var month;
        switch(sMonth){
            case "1":
                month = "Jan"
                break;
            case "2":
                month = "Feb"
                break;
            case "3":
                month = "Mar"
                break;
            case "4":
                month = "Apr"
                break;
            case "5":
                month = "May"
                break;
            case "6":
                month = "Jun"
                break;
            case "7":
                month = "July"
                break;
            case "8":
                month = "Aug"
                break;
            case "9":
                month = "Sep"
                break;
            case "10":
                month = "Oct"
                break;
            case "11":
                month = "Nov"
                break;
            case "12":
                month = "Dec"
                break;
    

        }
        
        return new String(month + "  " + sDay);
    }
       const GetToronto = async () => {
        const response = await instance.get(`/torontoEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        for (let d of response.data) {
            GetCreator(d.creator);
            content += "Event Type: ";
            content += d.eventType;
            content += "&nbsp;&nbsp;";
            content += "Date: ";
            content += sqlToJsDate(d.eventDate);
            content += "&nbsp;&nbsp;";
            content += "Max Attendance: ";
            content += d.maxAtendees;
            content += "&nbsp;&nbsp;";
            content += "Creator: ";
            content += creator;
            content += '<br>'
        }
        content += '</p>'
        table.innerHTML = content;
    };

    const GetNiagara = async () => {
        const response = await instance.get(`/niagaraEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        for (let d of response.data) {
            GetCreator(d.creator);
            content += "Event Type: ";
            content += d.eventType;
            content += "&nbsp;&nbsp;";
            content += "Date: ";
            content += sqlToJsDate(d.eventDate);
            content += "&nbsp;&nbsp;";
            content += "Max Attendance: ";
            content += d.maxAtendees;
            content += "&nbsp;&nbsp;";
            content += "Creator: ";
            content += creator;
            content += '<br>'
        }
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
                onClick ={GetNiagaara}
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
