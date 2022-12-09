import React, { Component } from 'react';
import '../../App.css';
import './Planner.css';
import PlannerItem from '../PlannerItem';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { getNo } from "../../auth";
import instance from "../../api/config";


export default function Planner(){
    const [buttonPopup, setButtonPopup] = useState(false);
    const [eventTitle, setTitle] = useState('title a'); 
    const [body, setBody] = useState('desc a');
    const [type,setType]= useState('type a'); 
    const [date,setDate]= useState('2022-12-25 22:30:00');
    const [maxAtendees,setmaxAtendees]= useState('10'); 
    const [author, setAuthor] = useState('London');
    const [eventLocation, setLocation] = useState('London');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async() => {
        /*
        e.preventDefault();
        const blog = {title, body, author};
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
        })
        */
        alert('handel submit')
        //save to database
        const user =  getNo();
        const location= eventLocation;
        const eventType = type;
        const eventDate = date;
        const maxA= maxAtendees;
        const title = eventTitle;
        const desc = body;
        //alert("adding friend"+ Friend);
        alert('sql query')
        try{
            const response = await instance.post('/addEvent',{
                user,
                location,
                eventType,
                eventDate,
                maxA,
                title,
                desc,
            });
            if (response)
            {
                alert('event scheduled')
            }
        }
        catch(error)
        {console.log(error);}

    } 

    const saveEvent = async()=>{

        //alert('handel submit')
        //save to database
        //const user =  getNo();
        //const location= eventLocation;
        //const eventType = type;
        //const eventDate = date;
        //const maxA= maxAtendees;
       // const title = eventTitle;
        //const desc = body;
        //alert("adding friend"+ Friend);
        alert('sql query')
        try{
            const response = await instance.post('/addEvent',{
                //user,
                //location,
                //eventType,
                //eventDate,
                //maxA,
                //title,
                //desc,
            });
            if (response)
            {
                alert('event scheduled')
            }
        }
        catch(error)
        {console.log(error);}

    } 


    

    return(
    <>
        <div className='planner-container'>
            <h1>PLANNER</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h3>Create an event</h3>
            <div class="center">
                <button class="add" onClick={() => setButtonPopup(true)}>
                    <i class="lni lni-plus"></i>
                </button>
                <button  onClick={saveEvent}>
                    <div>test</div>
                </button>
            </div>
            <PlannerItem trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h3>Enter Details</h3>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <label>Event name:</label>
                        <input type="text"
                            required
                            value={eventTitle}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br></br>
                        <label>Even description:</label>
                        <textarea 
                            required
                            value ={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                        <br></br>
                        <label>Even type:</label>
                        <textarea 
                            required
                            value ={type}
                            onChange={(e) => setType(e.target.value)}
                        ></textarea>
                        <br></br>
                        <label>Max Attendees:</label>
                        <textarea 
                            required
                            value ={maxAtendees}
                            onChange={(e) => setmaxAtendees(e.target.value)}
                        ></textarea>
                        <br></br>
                        <label>date/Time:</label>
                        <textarea 
                            required
                            value ={date}
                            onChange={(e) => setDate(e.target.value)}
                        ></textarea>
                        <br></br>
                        <label>Event location:</label>
                        <select
                            value={eventLocation}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="London">London</option>
                            <option value="Toronto">Toronto</option>
                            <option value="Niagra">Niagra</option>
                        </select>
                        <br></br>
                        { !isPending && <button>Add event</button>}
                        { isPending && <button disabled>Adding event...</button>}
                        
                    </form>
            </PlannerItem>
        </div>
    </>

    );
}
