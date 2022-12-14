import React, { Component } from 'react';
import '../../App.css';
import './Planner.css';
import PlannerItem from '../PlannerItem';
import { Link } from 'react-router-dom';
import {useState} from 'react';


export default function Planner(){
    const [buttonPopup, setButtonPopup] = useState(false);
    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState(''); 
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const handleSubmit = (e) => {
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
            </div>
            <PlannerItem trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h3>Enter Details</h3>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <label>Event name:</label>
                        <input type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br></br>
                        <label>Event description:</label>
                        <textarea 
                            required
                            value ={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                        <br></br>
                        <label>Event Author:</label>
                        <select
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        >
                            <option value="mario">mario</option>
                            <option value="yoshi">yoshi</option>
                        </select>
                        <br></br>
                        { !isPending && <button>Add event</button>}
                        { isPending && <button disabled>Adding event...</button>}
                        <p>{title}</p>
                        <p>{body}</p>
                        <p>{author}</p>
                    </form>
            </PlannerItem>
        </div>
    </>

    )
}
