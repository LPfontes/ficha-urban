// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import HunterSheet from './components/HunterSheet';
import AwakeSheet from './components/AwakeSheet';
function App() {
  const [currentSheet, setCurrentSheet] = useState('cacador');

  return (
    <div className="App">
      {/* Menu de Controle */}
      <div className="controls">
        <label>Selecione a Ficha: </label>
        <select value={currentSheet} onChange={(e) => setCurrentSheet(e.target.value)}>
          <option value="cacador">Caçador</option>
          <option value="desperto">Desperto</option>
        </select>
        <button onClick={() => window.print()} style={{ marginLeft: '10px' }}>
          Salvar como PDF
        </button>
      </div>

      {/* Renderização Condicional */}
      {currentSheet === 'cacador' && <HunterSheet />}
      
      {currentSheet === 'desperto' && <AwakeSheet />}
    </div>
  );
}

export default App;