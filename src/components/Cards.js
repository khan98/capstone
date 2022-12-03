import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
       <h1>In your area</h1> 
       <div className="cards__container">
        <div className="cards__wrapper">
            <ul className="cards__items">
                <CardItem 
                src="images/aspen.jpeg"
                text="Explore the hidden waterfall deep inside the 
                Amazon Jungle"
                label='Adventure'
                path='/eventboard'
                />
            </ul>
            <ul className="cards__items">
                <CardItem 
                src="images/aspen.jpeg"
                text="Explore the hidden waterfall deep inside the 
                Amazon Jungle"
                label='Adventure'
                path='/eventboard'
                />
            </ul>
        </div>
       </div>
    </div>
  )
}

export default Cards