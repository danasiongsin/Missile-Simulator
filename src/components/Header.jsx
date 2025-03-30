import './Header.css';
import React from 'react';
import { Link } from 'react-router';

function Header() {
   const rootPath = process.env.PUBLIC_URL;
   return (
      <header>
         <h1>Missile Simulator</h1>
         <ul>
            <li className="page">
               <Link to='/'>Part 1</Link>
            </li>
            <li className="page">
               <Link to='part2'>Part 2</Link>
            </li>
            <li className="page">
               <Link to='part3/'>Part 3</Link>
            </li>
         </ul>
      </header>
   );
}

export default Header;
