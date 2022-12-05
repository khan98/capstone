import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () =>{
    if(window.innerWidth <= 960){
        setButton(false);
    }else{
        setButton(true);
    }
  };

  useEffect(()=>{
    showButton();
  }, []);
  window.addEventListener('resize', showButton);
  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick ={closeMobileMenu}>
                    EventFL <i className='lni lni-500px'></i> 
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'lni lni-exit' : 'lni lni-menu'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/eventboard' className='nav-links' onClick={closeMobileMenu}>
                            Event Board
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/planner' className='nav-links' onClick={closeMobileMenu}>
                            Planner
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/personal' className='nav-links' onClick={closeMobileMenu}>
                            Personal
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/log-out' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Log Out
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>LOG OUT</Button>}

            </div>
        </nav>
    </>
  );
}

export default Navbar