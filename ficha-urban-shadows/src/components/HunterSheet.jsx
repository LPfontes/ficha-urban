// src/components/HunterSheet.jsx
import React, { useState } from 'react';
import AbsoluteInput from './AbsoluteInput';
// Importe as imagens (assumindo que estão na pasta assets)
import bgPage1 from '../assets/imagens/cacador.webp';
import bgPage2 from '../assets/imagens/cacador2.webp';

const HunterSheet = () => {
  // Estado para equipamentos dinâmicos
  const [equipments, setEquipments] = useState(['', '', '', '']); // Começa com 4 linhas vazias

  const addEquipment = () => {
    setEquipments([...equipments, '']);
  };

  // Helper para renderizar grupos de checkboxes
  const renderCheckboxes = (startX, startY, count, gapX, gapY, width, height, className = "") => {
    return Array.from({ length: count }).map((_, i) => (
      <AbsoluteInput
        key={`${startX}-${startY}-${i}`}
        top={startY + i * gapY}
        left={startX + i * gapX}
        width={width}
        height={height}
        type="checkbox"
        className={className}
      />
    ));
  };

  return (
    <div className="sheet-container active">
      {/* --- PÁGINA 1 --- */}
      <div className="sheet-page">
        <img src={bgPage1} alt="Ficha do Caçador" />
        {/* Cabeçalho */}
        <AbsoluteInput top={225} left={80} width={400} height={50} placeholder="Nome" />
        <AbsoluteInput top={225} left={513} width={100} height={50} placeholder="Pronomes" />
        <AbsoluteInput top={205} left={815} width={380} height={50} placeholder="Comportamento" />
        <AbsoluteInput top={240} left={715} width={485} height={50} placeholder="Visual" />
        
        {/* Atributos (Stats) */}
        <AbsoluteInput top={368} left={122} width={60} height={60} type="number"  className="number-input stat-coracao" />
        <AbsoluteInput top={368} left={253} width={60} height={60} type="number" className="number-input stat-espirito" />
        <AbsoluteInput top={368} left={390} width={60} height={60} type="number" className="number-input stat-mente" />
        <AbsoluteInput top={368} left={524} width={60} height={60} type="number" className="number-input stat-sangue" />
        
        {/* Círculos Numéricos */}
        <AbsoluteInput top={368} left={696} width={60} height={60} type="number" className="number-input circulo-limiar" />
        <AbsoluteInput top={368} left={830} width={60} height={60} type="number" className="number-input circulo-mortalis" />
        <AbsoluteInput top={368} left={964} width={60} height={60} type="number" className="number-input circulo-noite" />
        <AbsoluteInput top={368} left={1098} width={60} height={60} type="number" className="number-input circulo-poder" />

        {/* Círculos de Status (Checks) */}
        {/* Limiar */}
        {renderCheckboxes(682, 500, 3, 29, 0, 24, 24, "check-status")}
        {/* Mortalis */}
        {renderCheckboxes(816, 500, 3, 29, 0, 24, 24, "check-status")}
        {/* Mente */}
        {renderCheckboxes(951, 500, 3, 29, 0, 24, 24, "check-status")}
        {/* Noite */}
        {renderCheckboxes(1085, 500, 3, 29, 0, 24, 24, "check-status")}
        
        {/* Movimentos */}
        <AbsoluteInput top={616} left={76} width={17} height={17} type="checkbox" className="check-move" />
        <AbsoluteInput top={702} left={76} width={17} height={17} type="checkbox" className="check-move" />
        <AbsoluteInput top={884} left={76} width={17} height={17} type="checkbox" className="check-move" />
        <AbsoluteInput top={1016} left={76} width={17} height={17} type="checkbox" className="check-move" />
        <AbsoluteInput top={1102} left={76} width={17} height={17} type="checkbox" className="check-move" />
        <AbsoluteInput top={1188} left={76} width={17} height={17} type="checkbox" className="check-move" />
        
        {/* Avanços */}
        {renderCheckboxes(869, 713, 2, 77, 0, 38, 38, "check-avanco")}
        {renderCheckboxes(869, 780, 2, 77, 0, 38, 38, "check-avanco")}
        {/* Avanços Bonus (2 colunas) */}
        {renderCheckboxes(898, 897, 8, 0, 24, 16, 16, "check-avanco-bonus")}
        {renderCheckboxes(937, 897, 8, 0, 24, 16, 16, "check-avanco-bonus")}

        {/* Ferimentos e Armadura */}
        {renderCheckboxes(653, 1287, 2, 0, 38, 23, 23, "check-ferimento")}
        {renderCheckboxes(684, 1250, 3, 0, 37, 23, 23, "check-ferimento")}
        <AbsoluteInput top={740} left={715} width={40} height={30} type="number" className="field-armadura" />

        {/* Cicatrizes */}
        {renderCheckboxes(651, 1387, 2, 0, 23, 16, 16, "check-cicatriz")}
        {renderCheckboxes(867, 1387, 2, 0, 23, 16, 16, "check-cicatriz")}
      </div>

      {/* --- PÁGINA 2 --- */}
      <div className="sheet-page">
        <img src={bgPage2} alt="Ficha do Caçador" />
        {/* Sociedade */}
        {renderCheckboxes(365, 268, 5, 0, 24, 14, 14, "check-presa")}
        {renderCheckboxes(365, 463, 4, 0, 24, 14, 14, "check-sacrificio")}
        {renderCheckboxes(365, 268, 3, 0, 24, 14, 14, "check-sociedade")}
        {renderCheckboxes(365, 559, 1, 0, 24, 14, 14, "check-sociedade")}
        {renderCheckboxes(365, 619, 4, 0, 24, 14, 14, "check-sociedade-local")}
        {/* Equipamentos Dinâmicos */}
        <div style={{ position: 'absolute', top: 780, left: 365, width: 545, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {equipments.map((item, index) => (
            <input 
              key={index} 
              type="text" 
              className="field" 
              style={{fontSize: '25px',position: 'relative', background: 'rgba(255,255,255,0.3)' }}
              placeholder="Item..."
            />
          ))}
        </div>

        {/* Botão de Adicionar (Estilizado para parecer parte da ficha ou flutuante) */}
        <button 
          onClick={addEquipment}
          style={{color: 'white', position: 'absolute', top: 740, left: 705, cursor: 'pointer' }}
        >
          Adicionar Equipamento
        </button>

        {/* Corrupção */}
        {renderCheckboxes(75, 1329, 5, 38, 0, 30, 30, "check-corrupcao")}
        {renderCheckboxes(76, 1380, 5, 0, 21, 14, 14, "check-corrupcao-bonus")}
        {renderCheckboxes(76, 1507, 1, 0, 20, 14, 14, "check-corrupcao-bonus")}
        {/* Movimentos Corrupção */}
        {renderCheckboxes(363, 1381, 2, 0, 106, 14, 14, "check-mov-corrupcao")}
        {renderCheckboxes(794, 1381, 2, 0, 106, 14, 14, "check-mov-corrupcao")}
      </div>
    </div>
  );
};

export default HunterSheet;