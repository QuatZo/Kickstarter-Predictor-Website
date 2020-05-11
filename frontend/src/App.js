import React from 'react';
import './App.css';
import InputForm from './components/InputForm'
import Logo from './components/logo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Logo />
      </header>

      <div className='content'>
        <InputForm />
      </div>

    </div>
  );
}

export default App;
