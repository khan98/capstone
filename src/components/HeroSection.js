import React from 'react';
import '../App.css';
import {Button} from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
        {/* <video src='/videos/herovideo2.mp4' autoPlay loop muted /> */}
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for?</p>
    </div>
  );
}

export default HeroSection;