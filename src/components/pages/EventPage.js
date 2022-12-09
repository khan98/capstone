
import React, { useState } from "react";
import { getNo } from "../../auth";
import instance from "../../api/config";

import { Link, useNavigate } from "react-router-dom";




function EventCreate()
{
    
    const [eventTitle, setTitle] = useState('event a'); 
    const [body, setBody] = useState('sample description');
    const [type,setType]= useState('type a'); 
    const [date,setDate]= useState('2022-12-25 22:30:00');
    const [maxAtendees,setmaxAtendees]= useState('10'); 
    const [eventLocation, setLocation] = useState('London');
    
    

    
    const addevent = async()=>
    {
        //alert("event scheduled a");
        const user =  getNo();
        const location= eventLocation;
        const eventType = type;
        const eventDate = date;
        const maxA= maxAtendees;
        const title = eventTitle;
        const desc = body;
        //alert(desc);
        try {
            const response = await instance.post(
                `/addDBEvents`,
                {
                user,
                location,
                eventType,
                eventDate,
                maxA,
                title,
                desc,
                }
            );
            if (response)
            {
                alert("event scheduled");

            }
            //alert('alert');
            
        } catch (error) {
            console.log(error)
        }
        //alert('alert');

    }
   

    return(
        
        <div>      
            
            <div className = 'center'>
            
                <div>
                <label>
                    Event Title:
                    
                </label>
                </div>
                <input type="text" value={eventTitle} onChange={(e) => setTitle(e.target.value)}/>
                
                <div>
                <label>
                    description:
                    
                </label>
                </div>
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)}/>
                
                <div>
                <label>
                    type:
                    
                </label>
                </div>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                
                <div>
                <label>
                    date/time:
                    
                </label>
                </div>
                <input type="text" value={date} onChange={(e) => setDate(e.target.value)}/>
                <div>
                <label>
                    max Atendees:
                    
                </label>
                </div>
                <input type="text" value={maxAtendees} onChange={(e) => setmaxAtendees(e.target.value)}/>
                <div>
                <label>Event location:</label>
                        <select
                            value={eventLocation}
                            onChange={(e) =>  setLocation(e.target.value)}
                        >
                            <option value="London">London</option>
                            <option value="Toronto">Toronto</option>
                            <option value="Niagra">Niagra</option>
                        </select>
                </div>
                <div>
                    <button onClick={addevent}> submit</button>
                
                </div>
            
            </div>     
        </div>
       
        
    
    );
}
export default EventCreate;