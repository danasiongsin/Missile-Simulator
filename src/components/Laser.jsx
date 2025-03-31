export default function Laser({ time = 0, top = 0, left = 0 }) {
   return (
     <div
       className="red-dot"
       style={{ top: `${top}px`, left: `${left}px` }}
     ></div>
   );
 }