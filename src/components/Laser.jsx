import { useState, useEffect } from "react";

export default function Laser({ state, time = 0, bottom = 0, left = 0 }) {
   const [ignited, setIgnited] = useState(false);
   useEffect( () => {
      console.log(state);
      if(state === "running_3") {
         setIgnited(false);
      }
      if(state === "stopped") {
         setIgnited(true);
      }
   }, [state, time]);

   return (
     <div
       className={`${ignited ? 'active' : 'inactive'}`}
       style={{ bottom: `${bottom}px`, left: `${left}px`}}
     ></div>
   );
 }