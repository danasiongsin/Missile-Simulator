import './Header.css';

function Header() {
   const rootPath = process.env.PUBLIC_URL;
   return (
      <header>
         <h1>Missile Simulator</h1>
         <ul>
            <li className="page"><a href={rootPath}>Part 1</a></li>
            <li className="page"><a href={`${rootPath}/part2`}>Part 2</a></li>
            <li className="page"><a href={`${rootPath}/part3`}>Part 3</a></li>
         </ul>
      </header>
   );
}

export default Header;
