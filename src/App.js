import './App.css';
import FamilyTree from './components/family/family-tree';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        THE SOMALI FAMILY
      </header>
      <div id='family-tree' className='family-tree bg-dark text-white'>
        <FamilyTree />
      </div>
      
    </div>
  );
}

export default App;
