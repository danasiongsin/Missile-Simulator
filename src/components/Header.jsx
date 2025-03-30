import './Header.css';

function Header() {
   return (
      <header>
         <h1>Missile Simulator</h1>
         <ul>
            <li className="page"><a href="../pages/Part1.jsx">Part 1</a></li>
            <li className="page"><a href="../pages/Part2.jsx">Part 2</a></li>
            <li className="page"><a href = "../pages/Part3.jsx">Part 3</a></li>
         </ul>
      </header>
   );
}

export default Header;