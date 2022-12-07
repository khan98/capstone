import React from 'react'
import { useState, useEffect } from 'react';
import '../../App.css'
import './Personal.css'
import EventsList from '../EventsList';
import useFetch from '../useFetch';

export default function Personal(){
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs')
    return (
    <div className="personal">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        <h1>
            PERSONAL
        </h1>
        <h3>
        {blogs && <EventsList blogs={blogs} title="My Events"/>}
        </h3>
    </div>
    );
}