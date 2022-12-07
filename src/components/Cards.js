import React from 'react';
import CardItem from './CardItem';
import './Cards.css';
import { GetLondon }from './pages/EventBoards.js';

function Cards() {
  return (
    <div className='cards'>
       <h1>In your area</h1> 
       <div className="cards__container">
        <div className="cards__wrapper">
            <ul className="cards__items">
                <CardItem 
                src="images/uwo.jpeg"
                text="London"
                label='Western University and Richmond'
                path='/eventboard'
                />
                <CardItem 
                src="images/toronto.jpeg"
                text="Greater Toronto Area (GTA)"
                label='Toronto City Centre'
                path='/eventboard'
                />
                 <CardItem 
                src="images/niagara.webp"
                text="Niagara Region"
                label='Niagara on the Lake Winter Market'
                path='/eventboard'
                />
            </ul>
        </div>
       </div>
    </div>
  )
}

export default Cards