// src/components/BaseSheet.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image'; 
import { jsPDF } from 'jspdf';
import AbsoluteInput from './AbsoluteInput';

// --- Helper Exportável para uso nas classes filhas ---
export const renderCheckboxes = (startX, startY, count, gapX, gapY, width, height, className = "", checkedValues = []) => {
  return Array.from({ length: count }).map((_, i) => (
    <AbsoluteInput
      key={`${startX}-${startY}-${i}`}
      top={startY + i * gapY}
      left={startX + i * gapX}
      width={width}
      height={height}
      type="checkbox"
      className={className}
      checked={checkedValues[i]}
    />
  ));
};

const DEFAULT_SUGGESTIONS_COMPORTAMENTO = ["calculista", "distante", "amigável", "volátil"];
const DEFAULT_SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas casuais", "roupas escuras", "roupas sujas", "roupas táticas"];
const DEFAULT_SUGGESTIONS_EQUIPMENT = ["Pistola (2-ferimento, perto, barulhento)", "Revólver (2-ferimento, perto, recarga, barulhento)", "Espingarda (3-ferimento, perto, destrutivo, barulhento)", "Faca (1-ferimento, toque)", "Soco Inglês (1-ferimento, toque)", "Espada (2-ferimento, toque, destrutivo)", "Smartphone", "Carro", "Moto", "Kit Médico"];
const ORIGINAL_SHEET_WIDTH = 1300;
const SHEET_HEIGHT = 1200;

const BaseSheet = ({ 
  bgPage1, 
  bgPage2, 
  page1Extras, // Elementos específicos da Página 1 (ex: Checkboxes de movimentos)
  page2Extras,  // Elementos específicos da Página 2 (ex: Sociedade, Presas)
  equipmentsTop = 780,
  equipmentsLeft = 370,
  equipmentWidth = 545,
  equipmentButtonWidth = 200,
  buttonEquipmentFontSize = 16,
  buttonEquipmentText = "Adicionar Equipamento",
  equipmentButtonTop = 740,
  equipmentButtonleft = 705,
  checkcorrupcaoGap1 = 106,
  checkcorrupcaoGap2 = 106,  
  /*? Valores iniciais dos atributos*/
  inputCoracaoValue,
  inputEspiritoValue,
  inputMenteValue,
  inputSangueValue,
  /*? Valores iniciais dos círculos */
  inputLimiarValue,
  inputMortalisValue,
  inputNoiteValue,
  inputPoderValue,
  /*? Valores iniciais dos círculos de status */
  inputLimiarStatusValue = false,
  inputMortalisStatusValue = false,
  inputNoiteStatusValue = false,
  inputPoderStatusValue = false,

  topCorrupcao1 = 1381,
  leftCorrupcao1 = 363,
  topCorrupcao2 = 1381,
  leftCorrupcao2 = 794,
  suggestionsComportamento = DEFAULT_SUGGESTIONS_COMPORTAMENTO,
  suggestionsVisual = DEFAULT_SUGGESTIONS_VISUAL,
  suggestionsEquipment = DEFAULT_SUGGESTIONS_EQUIPMENT,
}) => {
  const [scale, setScale] = useState(1);

  // NOVO: Efeito para calcular a escala ao redimensionar a janela
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Se a tela for menor que a ficha, calcula a proporção. Senão, mantém 1.
      // Subtraímos 20px para dar uma margem de segurança nas bordas
      const newScale = screenWidth < ORIGINAL_SHEET_WIDTH 
        ? (screenWidth - 20) / ORIGINAL_SHEET_WIDTH 
        : 1;
      setScale(newScale);
    };

    handleResize(); // Executa na montagem
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Estado para equipamentos dinâmicos (Compartilhado por todos)
  const [equipments, setEquipments] = useState(['', '', '', '']); 
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const sheetRef1 = useRef(null);
   const sheetRef2 = useRef(null);
  const addEquipment = () => {
    setEquipments([...equipments, '']);
  };
  const adjustFontSize = (element) => {
      if (!element) return;
      const maxFontSize = 24; 
      const minFontSize = 10;
      const maxWidth = element.clientWidth - 20; // Padding de segurança
      
      let currentSize = maxFontSize;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const fontFamily = window.getComputedStyle(element).fontFamily || 'inherit';

      while (currentSize > minFontSize) {
        context.font = `${currentSize}px ${fontFamily}`;
        if (context.measureText(element.value).width <= maxWidth) break;
        currentSize--;
      }

      element.style.fontSize = `${currentSize}px`;
    };
  const handleDownloadImage = useCallback(async () => {
    if (sheetRef1.current === null || sheetRef2.current === null) {
      return;
    }

    try {
      // Configuração para forçar a escala 1 durante a "foto", garantindo qualidade do PDF
      const options = { 
        cacheBust: true, 
        backgroundColor: '#ffffff',
        pixelRatio: 1, // Aumenta a resolução (3x) para textos nítidos e alta qualidade
        style: { 
          boxShadow: 'none', // Remove a sombra para um visual de documento limpo
          margin: '0'        // Garante que não haja margens extras na captura
        }
      };

      const dataUrl1 = await toPng(sheetRef1.current, options);
      const dataUrl2 = await toPng(sheetRef2.current, options);

      // ... (Resto da lógica do PDF igual)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a3',
        compress: false
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl1, 'PNG', 0, 0, width, height);
      pdf.addPage();
      pdf.addImage(dataUrl2, 'PNG', 0, 0, width, height);

      pdf.save('ficha-urban-shadows.pdf');
    } catch (err) {
      console.error('Erro ao gerar o PDF:', err);
    }
  }, [sheetRef1, sheetRef2]);

  const handleInputFocus = (e, page, options) => {
    const target = e.target;
    let top = 0;
    let left = 0;
    let current = target;
    
    const pageElement = page === 1 ? sheetRef1.current : sheetRef2.current;
    
    if (!pageElement) return;

    while (current && current !== pageElement) {
      top += current.offsetTop;
      left += current.offsetLeft;
      current = current.offsetParent;
    }

    setActiveSuggestion({
      page,
      top: top + target.offsetHeight,
      left: left,
      width: target.offsetWidth,
      options,
      target
    });
  };

  const handleOptionClick = (option) => {
    if (activeSuggestion && activeSuggestion.target) {
      const input = activeSuggestion.target;
      const currentValue = input.value;
      if (!currentValue.trim()) {
        input.value = option;
      } else {
        input.value = currentValue + ", " + option;
      }
      adjustFontSize(input);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeSuggestion && !e.target.closest('.suggestion-dropdown') && e.target !== activeSuggestion.target) {
        setActiveSuggestion(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeSuggestion]);

  const renderDropdown = () => {
    if (!activeSuggestion) return null;
    return (
      <div className="suggestion-dropdown" style={{ position: 'absolute', top: activeSuggestion.top, left: activeSuggestion.left, width: activeSuggestion.width, backgroundColor: 'white', border: '1px solid #ccc', zIndex: 9999, maxHeight: '200px', overflowY: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        {activeSuggestion.options.map((opt, i) => (
          <div key={i} onClick={() => handleOptionClick(opt)} style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'} onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}>
            {opt}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="sheet-container active">
      <button onClick={handleDownloadImage}>Baixar Ficha (PDF)</button>
      

      <div style={{ 
        width: ORIGINAL_SHEET_WIDTH, // Mantém a largura interna fixa
        height: SHEET_HEIGHT, // Altura fixa da imagem
        transform: `scale(${scale})`, 
        transformOrigin: 'top left',
        marginBottom: `-${SHEET_HEIGHT * (1 - scale)}px` // Truque para remover espaço branco extra no fundo
      }}>
{/* --- PÁGINA 1 --- */}
      <div className="sheet-page" ref={sheetRef1}>
        <img src={bgPage1} alt="Ficha Frente" />
        
        {/* --- CAMPOS COMUNS A TODOS OS ARQUÉTIPOS --- */}
        
        {/* Cabeçalho */}
        <AbsoluteInput top={225} left={80} width={400} height={50} placeholder="Nome" />
        <AbsoluteInput top={225} left={490} width={125} height={50} placeholder="Pronomes" />
        <AbsoluteInput 
          top={203} 
          left={815} 
          width={380} 
          height={50} 
          placeholder="Comportamento" 
          onFocus={(e) => handleInputFocus(e, 1, suggestionsComportamento)} 
          onInput={(e) => adjustFontSize(e.target)}
        />
        <AbsoluteInput 
          top={240} 
          left={715} 
          width={485} 
          height={50} 
          placeholder="Visual" 
          onFocus={(e) => handleInputFocus(e, 1, suggestionsVisual)} 
          onInput={(e) => adjustFontSize(e.target)}
        />
        
        {/* Atributos (Stats) */}
        <AbsoluteInput top={368} left={122} width={60} height={60} type="number"  className="number-input stat-coracao" value={inputCoracaoValue}/>
        <AbsoluteInput top={368} left={253} width={60} height={60} type="number" className="number-input stat-espirito" value={inputEspiritoValue}/>
        <AbsoluteInput top={368} left={390} width={60} height={60} type="number" className="number-input stat-mente"    value={inputMenteValue}/>
        <AbsoluteInput top={368} left={524} width={60} height={60} type="number" className="number-input stat-sangue"   value={inputSangueValue}/>
        
        {/* Círculos Numéricos */}
        <AbsoluteInput top={368} left={696} width={60} height={60} type="number" className="number-input circulo-limiar" value={inputLimiarValue}/>
        <AbsoluteInput top={368} left={830} width={60} height={60} type="number" className="number-input circulo-mortalis" value={inputMortalisValue}/>
        <AbsoluteInput top={368} left={964} width={60} height={60} type="number" className="number-input circulo-noite" value={inputNoiteValue}/>
        <AbsoluteInput top={368} left={1098} width={60} height={60} type="number" className="number-input circulo-poder" value={inputPoderValue}/>

        {/* Círculos de Status (Checks) */}
        {renderCheckboxes(682, 500, 3, 29, 0, 26, 26, "check-status", [inputLimiarStatusValue])} {/* Limiar */}
        {renderCheckboxes(816, 500, 3, 29, 0, 26, 26, "check-status", [inputMortalisStatusValue]) } {/* Mortalis */}
        {renderCheckboxes(950, 500, 3, 29, 0, 26, 26, "check-status", [inputNoiteStatusValue])} {/* Noite */}
        {renderCheckboxes(1084, 500, 3, 29, 0, 26, 26, "check-status", [inputPoderStatusValue])} {/* Poder */}
        
        {/* Avanços */}
        {renderCheckboxes(869, 713, 2, 77, 0, 38, 38, "check-avanco")}
        {renderCheckboxes(869, 780, 2, 77, 0, 38, 38, "check-avanco")}
        {/* Avanços Bonus */}
        {renderCheckboxes(898, 897, 8, 0, 24, 16, 16, "check-avanco-bonus")}
        {renderCheckboxes(937, 897, 8, 0, 24, 16, 16, "check-avanco-bonus")}

        {/* Ferimentos e Armadura */}
        {renderCheckboxes(653, 1287, 2, 0, 38, 23, 23, "check-ferimento")}
        {renderCheckboxes(684, 1250, 3, 0, 37, 23, 23, "check-ferimento")}
        
        <AbsoluteInput top={1164} left={1153} width={40} height={40} type="number" className="field-armadura-padrao" />

        {/* Cicatrizes */}
        {renderCheckboxes(651, 1387, 2, 0, 24, 16, 16, "check-cicatriz")}
        {renderCheckboxes(867, 1387, 2, 0, 24, 16, 16, "check-cicatriz")}

        {/* --- INJEÇÃO DE CONTEÚDO ESPECÍFICO DA PÁGINA 1 --- */}
        {page1Extras}
        {activeSuggestion?.page === 1 && renderDropdown()}

      </div>

      {/* --- PÁGINA 2 --- */}
      <div className="sheet-page" ref={sheetRef2} style={{paddingBottom: '20px'}}>
        <img src={bgPage2} alt="Ficha Verso" />
        
        {/* --- INJEÇÃO DE CONTEÚDO ESPECÍFICO DA PÁGINA 2 (Antes dos equipamentos) --- */}
        {page2Extras}

        {/* Equipamentos Dinâmicos */}
        <div style={{ position: 'absolute', top: equipmentsTop, left: equipmentsLeft, width: equipmentWidth, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {equipments.map((item, index) => (
            <input 
              key={index} 
              type="text" 
              onFocus={(e) => handleInputFocus(e, 2, suggestionsEquipment)}
              className="field" 
              style={{fontSize: '20px',position: 'relative', background: 'rgba(255,255,255,0.3)' }}
              placeholder="Item..."
            />
          ))}
        </div>

        <button 
          className='button-add-equip'
          onClick={addEquipment}
          style={{color: 'white', position: 'absolute', top: equipmentButtonTop, left: equipmentButtonleft, cursor: 'pointer', width: equipmentButtonWidth, fontSize: buttonEquipmentFontSize}}
        >
         {buttonEquipmentText || 'Adicionar Equipamento'}
        </button>

        {/* Corrupção */}
        {renderCheckboxes(75, 1329, 5, 38, 0, 31, 30, "check-corrupcao")}
        {renderCheckboxes(76, 1380, 5, 0, 21, 14, 14, "check-corrupcao-bonus")}
        {renderCheckboxes(76, 1506, 1, 0, 20, 14, 14, "check-corrupcao-bonus")}
        \
        {/* Movimentos Corrupção */}
        {renderCheckboxes(leftCorrupcao1, topCorrupcao1, 2, 0, checkcorrupcaoGap1, 14, 14, "check-mov-corrupcao")}
        {renderCheckboxes(leftCorrupcao2, topCorrupcao2, 2, 0, checkcorrupcaoGap2, 14, 14, "check-mov-corrupcao")}
        {activeSuggestion?.page === 2 && renderDropdown()}
      </div>

      </div>
      
    </div>
  );
};

export default BaseSheet;