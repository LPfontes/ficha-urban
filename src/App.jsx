// src/App.jsx
import React, { useState, useRef } from 'react';// Importe a biblioteca
import './App.css';
import FichaCacador from './components/CaçadorSheet';
import FichaDesperto from './components/DespertoSheet';
import FichaDiabrete from './components/DiabreteSheet';
import FichaEspectro from './components/EspectroSheet';
import FichaFeerico from './components/FeericoSheet';
import FichaJuramentado from './components/JuramentadoSheet';
import FichaLobo from './components/LoboSheet';
import FichaMaculado from './components/MaculadoSheet';
import FichaMago from './components/MagoSheet';
import FichaOraculo from './components/OraculoSheet';
import FichaSanguessuga from './components/SanguessugaSheet';
import FichaVeterano from './components/VeteranoSheet';



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
          <option value="diabrete">Diabrete</option>
          <option value="espectro">Espectro</option>
          <option value="feerico">Feérico</option>
          <option value="juramentado">Juramentado</option>
          <option value="lobo">Lobo</option>
          <option value="maculado">Maculado</option>
          <option value="mago">Mago</option>
          <option value="oraculo">Oráculo</option>
          <option value="sanguessuga">Sanguessuga</option>
          <option value="veterano">Veterano</option>
          

        </select>
      </div>

      <div className="sheet-container">
       {/* Renderização Condicional */}
      {currentSheet === 'cacador' && <FichaCacador />}
      {currentSheet === 'desperto' && <FichaDesperto />}
      {currentSheet === 'diabrete' && <FichaDiabrete />}
      {currentSheet === 'espectro' && <FichaEspectro />}
      {currentSheet === 'feerico' && <FichaFeerico />}
      {currentSheet === 'juramentado' && <FichaJuramentado />}
      {currentSheet === 'lobo' && <FichaLobo />}
      {currentSheet === 'maculado' && <FichaMaculado />}
      {currentSheet === 'mago' && <FichaMago />}
      {currentSheet === 'oraculo' && <FichaOraculo />}
      {currentSheet === 'sanguessuga' && <FichaSanguessuga />}
      {currentSheet === 'veterano' && <FichaVeterano />}
      </div>
    </div>
  );
}

export default App;