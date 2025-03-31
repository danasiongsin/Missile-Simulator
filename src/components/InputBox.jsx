import { useState } from "react";
import '../App.css';

export default function InputBox({inputText, setText}) {
   return (
      <div>
         Enter your teamname:
         <input
         type= "text"
         value = {inputText}
         className=""
         onChange={(e) => setText(e.target.value)}>
         </input>
      </div>
   )
}