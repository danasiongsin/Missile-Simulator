import '../App.css';

export default function InputBox({inputText, setText}) {
   return (
      <input
      type="text"
      value={inputText}
      className="input-box"
      onChange={(e) => setText(e.target.value)}>
      </input>
   )
}
