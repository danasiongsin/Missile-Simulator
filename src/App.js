import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

function App({ children }) {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}

export default App;
