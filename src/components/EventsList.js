import React, { Component }  from 'react';
import { Link } from "react-router-dom";

const EventsList = ({ blogs, title }) => {
    return (
        <div className= "events-list">
         <h2>{ title }</h2>
        {blogs.map((blog) => (
        <div className="events-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            <h2>{ blog.title }</h2>
            <p>Written by { blog.author }</p>
          </Link>
        </div>
      ))}
    </div>

    );
}

export default EventsList