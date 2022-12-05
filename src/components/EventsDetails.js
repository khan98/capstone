import React, { Component }  from 'react';
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import './EventsDetails.css';

const EventsDetails = () =>{
    const { id } = useParams();
    const { data : blog , error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    return ( 
        <div className="events-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>
                        { blog.body }
                    </div>
                </article>
            )}
        </div>
    );
}

export default EventsDetails