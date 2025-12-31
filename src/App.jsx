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
      <footer style={{ textAlign: 'center', padding: '20px 10px', marginTop: '40px', color: '#b4b3b3ff', fontFamily: 'sans-serif', fontSize: '1rem' }}>
      <p style={{ margin: '5px 0' }}>
        Urban Shadows foi criado por Andrew Medeiros e Mark Diaz Truman. Copyright © 2015 <strong>Magpie Games</strong>. Todos os direitos reservados.
      </p>
      
      <p style={{ margin: '5px 0' }}>
        Traduzido para o português pela <a href="https://triaeditora.com.br/" target="_blank" rel="noopener noreferrer" style={{ color: '#782b75', textDecoration: 'none', fontWeight: 'bold' }}>Tria Editora</a> via financiamento coletivo no <a href="https://www.catarse.me/shadows?ref=ctrse_banner-home" target="_blank" rel="noopener noreferrer" style={{ color: '#782b75', textDecoration: 'none', fontWeight: 'bold' }}>Catarse</a>.
      </p>

      <p style={{ marginTop: '15px' }}>
        Desenvolvido por <a href="https://github.com/LPfontes/ficha-urban" target="_blank" rel="noopener noreferrer" style={{ color: '#782b75', textDecoration: 'none', fontWeight: 'bold' }}>Luiz Paulo</a>
      </p>
    </footer>
    </div>
  );
}

export default App;