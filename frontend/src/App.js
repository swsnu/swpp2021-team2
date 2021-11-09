import './App.css';
import SearchBar from './components/SearchBar.js';
import StateData from './states.json';

function App() {
  return (
    <div className="App" >
      <SearchBar placeholder="Enter a state in the US..." data={StateData}/>
    </div >
  );
}

export default App;
