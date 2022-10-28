import logo from './logo.svg';
import './App.css';
import { HelloTable } from './components/HelloTable';
import { HelloEditable } from './components/HelloEditable';
import { HelloSelectable } from './components/HelloSelectable';

function App() {
  return (
    <div className="App">
      <HelloSelectable />
    </div>
  );
}

export default App;
