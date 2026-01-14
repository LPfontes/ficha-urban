import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image'; 
import { PDFDocument, rgb ,TextAlignment} from 'pdf-lib';
import AbsoluteInput from './AbsoluteInput';

// --- Helper Exportável para uso nas classes filhas ---
export const renderCheckboxes = (startX, startY, count, gapX, gapY, width, height, className = "", checkedValues = []) => {
  return Array.from({ length: count }).map((_, i) => (
    <AbsoluteInput
      key={`${startX}-${startY}-${i}`}
      id={`${className}-${startX}-${startY}-${i}`}
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
  sheetType,
  importedData,
  onLoadData,
  onClearImportedData,
}) => {
  // Função para coletar todos os inputs de equipamento em uma lista
  const getEquipmentList = () => {
    const container = sheetRef2.current || document;
    const inputs = container.querySelectorAll('input[id^="equipment-"]');
    return Array.from(inputs).map(input => input.value).filter(val => val.trim() !== '');
  };

  const handleExportJSON = () => {
    const data = {};
    
    // Função auxiliar para processar listas de inputs
    const processInputs = (containerRef) => {
      if (!containerRef.current) return;
      
      // Seleciona todos os elementos de input, select e textarea
      const inputs = containerRef.current.querySelectorAll('input, select, textarea');
      
      inputs.forEach((input) => {
        // Ignora inputs sem ID ou botões
        if (!input.id || input.type === 'button' || input.type === 'submit') return;

        // Guarda o valor dependendo do tipo
        if (input.type === 'checkbox') {
          data[input.id] = input.checked;
        } else if (input.type === 'number') {
          // Tenta guardar como número, se falhar guarda como string
          data[input.id] = input.value === "" ? "" : Number(input.value);
        } else {
          data[input.id] = input.value;
        }
      });
    };
    
    // Processa a Página 1 e a Página 2
    processInputs(sheetRef1);
    processInputs(sheetRef2);

    // Adiciona a lista de equipamentos agrupada ao JSON
    data.equipmentList = getEquipmentList();

    // Adiciona metadados úteis (opcional)
    data.sheetType = sheetType;
    data.exportedAt = new Date().toISOString();
    
    // Cria o ficheiro para download
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Gera o nome do ficheiro baseado no nome da personagem (se existir)
    const charName = data['input-nome'] ? data['input-nome'].replace(/\s+/g, '_') : 'sem-nome';
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ficha_urban_${charName}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Limpeza
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const fileInputRef = useRef(null);

  // Função unificada para popular a ficha
  const populateSheet = useCallback((data) => {
    // 1. Lidar com Equipamentos Dinâmicos
    const equipIndices = Object.keys(data)
      .filter(key => key.startsWith('equipment-'))
      .map(key => parseInt(key.split('-').pop(), 10));

    if (equipIndices.length > 0) {
      const maxIndex = Math.max(...equipIndices);
      setEquipments(Array(maxIndex + 1).fill(''));
    }

    // 2. Preencher os Inputs (com pequeno atraso para o React renderizar)
    setTimeout(() => {
      Object.keys(data).forEach((key) => {
        const element = document.getElementById(key);
        
        if (element) {
          const value = data[key];

          if (element.type === 'checkbox') {
            element.checked = value;
          } else {
            element.value = value;
            // Ajusta o tamanho da fonte se for texto
            if (element.type === 'text') {
                adjustFontSize(element);
            }
          }
        }
      });
      
      // alert("Ficha carregada com sucesso!");
    }, 100);
  }, []);

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (onLoadData) {
          onLoadData(data);
        } else {
          populateSheet(data);
        }

      } catch (error) {
        console.error("Erro ao ler o ficheiro JSON:", error);
        alert("Erro ao ler o ficheiro. Verifique se é um JSON válido.");
      }
    };

    reader.readAsText(file);
    // Limpa o input para permitir carregar o mesmo ficheiro duas vezes seguidas se necessário
    event.target.value = ''; 
  };

  // Efeito para carregar dados quando a ficha é montada ou os dados mudam
  useEffect(() => {
    if (importedData && importedData.sheetType === sheetType) {
      populateSheet(importedData);
      if (onClearImportedData) onClearImportedData();
    }
  }, [importedData, sheetType, populateSheet, onClearImportedData]);

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
      const maxWidth = element.clientWidth - 20; 
      
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
    const filter = (node) => {
      return (node.tagName !== 'INPUT' && node.tagName !== 'TEXTAREA' && node.tagName !== 'SELECT' && node.tagName !== 'BUTTON');
    };

    const options = { 
      cacheBust: true, 
      backgroundColor: '#ffffff',
      pixelRatio: 1, 
      skipFonts: true,
      filter: filter, 
      style: { boxShadow: 'none', margin: '0' }
    };

    // 2. Gera as imagens PNG
    const dataUrl1 = await toPng(sheetRef1.current, options);
    const dataUrl2 = await toPng(sheetRef2.current, options);

    // 3. Inicia o PDF com pdf-lib
    const pdfDoc = await PDFDocument.create();
    
    // Função auxiliar para converter DataURL para bytes
    const embedImage = async (dataUrl) => {
      const pngImageBytes = await fetch(dataUrl).then((res) => res.arrayBuffer());
      return pdfDoc.embedPng(pngImageBytes);
    };

    const image1 = await embedImage(dataUrl1);
    const image2 = await embedImage(dataUrl2);

    const pageWidth = sheetRef1.current.offsetWidth;
    const pageHeight = sheetRef1.current.offsetHeight;

    // Função para adicionar campos na página específica
    const addFormFieldsToPage = (containerRef, page) => {
      const form = pdfDoc.getForm();
      const domWidth = containerRef.current.offsetWidth;
      const domHeight = containerRef.current.offsetHeight;
      
      const scaleX = pageWidth / domWidth;
      const scaleY = pageHeight / domHeight;

      const inputs = containerRef.current.querySelectorAll('input, textarea, select');

      inputs.forEach((input) => {
        if (input.type === 'hidden' || input.style.display === 'none' || input.type === 'file') return;

        // Ignora inputs de equipamento individuais para agrupar depois
        if (input.id && input.id.startsWith('equipment-')) return;

        // REGRA ESPECÍFICA: Ignora inputs de "devedor" se for Sanguessuga para agrupar depois
        if (sheetType === 'sanguessuga' && input.id && input.id.startsWith('devedor-')) return;

        const rect = input.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        // Cálculos de dimensão escalados
        const w = rect.width * scaleX;
        const h = rect.height * scaleY;

        const domTopRelative = (rect.top - containerRect.top) * scaleY;
        var x = (rect.left - containerRect.left) * scaleX;
        const y = pageHeight - domTopRelative - h;

        const fieldName = input.id || `field_${Math.random().toString(36).substr(2, 9)}`;

        if (input.type === 'checkbox') {
          let checkBox;
          try {
            checkBox = form.getCheckBox(fieldName);
          } catch (e) {
            checkBox = form.createCheckBox(fieldName);
          }
          
          checkBox.addToPage(page, { x, y, width: w, height: h });
          
          if (input.checked) {
            checkBox.check();
          }

        } else {
          // Cria Text Field
          let textField;
          try {
            textField = form.getTextField(fieldName);
          } catch (e) {
            textField = form.createTextField(fieldName);
          }
          if(input.type === 'number') {
            x = x - 8;
          }
          textField.addToPage(page, { x, y, width: w, height: h,backgroundColor: undefined, borderColor: undefined });
          textField.setText(input.value);
          
          if (input.tagName === 'TEXTAREA') {
            textField.enableMultiline();
            textField.setFontSize(14);
            textField.setAlignment(TextAlignment.Left);
          } else if (input.type === 'number') {
            textField.setFontSize(44);
            textField.setAlignment(TextAlignment.Center);
          } else {
            if(input.id === 'char-pronouns') {
              textField.setFontSize(20);
              textField.setAlignment(TextAlignment.Center);
            }else{
              textField.setFontSize(20);
              textField.setAlignment(TextAlignment.Left);
            }
          }
          
        }
      });

      // Adiciona o textarea agrupado para equipamentos na página 2
      if (containerRef === sheetRef2) {
        // --- Lógica Geral: Equipamentos ---
        const equipmentList = getEquipmentList().join('\n');
        const fieldName = 'equipment_list_grouped';
        
        var contentHeight = 460;
        if (sheetType === 'sanguessuga') {
          contentHeight = 220;
        }
        if (sheetType === 'oraculo') {
          contentHeight = 300;
        }
        
        const w = equipmentWidth * scaleX - 10;
        const h = contentHeight * scaleY;
        
        const x = equipmentsLeft * scaleX;
        const y = pageHeight - (equipmentsTop * scaleY) - h;

        let textField;
        try {
          textField = form.getTextField(fieldName);
        } catch (e) {
          textField = form.createTextField(fieldName);
        }

        textField.addToPage(page, { x, y, width: w, height: h, backgroundColor: undefined, borderColor: undefined });
        textField.setText(equipmentList);
        textField.enableMultiline();
        textField.setFontSize(14);
        textField.setAlignment(TextAlignment.Left);

        // --- REGRA ESPECÍFICA: Sanguessuga (Devedores) ---
        if (sheetType === 'sanguessuga') {
           const debtorsList = Array.from(containerRef.current.querySelectorAll('input[id^="devedor-"]'))
             .map(input => input.value)
             .filter(val => val.trim() !== '')
             .join('\n');
           
           const debtorsFieldName = 'debtors_list_grouped';
           
           // Coordenadas baseadas no layout do SanguessugaSheet (top: 539, left: 369, width: 394, height: 355)
           const dW = 394 * scaleX;
           const dH = 355 * scaleY;
           const dX = 369 * scaleX;
           const dY = pageHeight - (539 * scaleY) - dH - 30;

           let debtorsField;
           try {
             debtorsField = form.getTextField(debtorsFieldName);
           } catch (e) {
             debtorsField = form.createTextField(debtorsFieldName);
           }
           
           debtorsField.addToPage(page, { x: dX, y: dY, width: dW, height: dH, backgroundColor: undefined, borderColor: undefined });
           debtorsField.setText(debtorsList);
           debtorsField.enableMultiline();
           debtorsField.setFontSize(14);
           debtorsField.setAlignment(TextAlignment.Left);
        }
      }
    };

    // --- Página 1 ---
    const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
    page1.drawImage(image1, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });
    addFormFieldsToPage(sheetRef1, page1);

    // --- Página 2 ---
    const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
    page2.drawImage(image2, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });
    addFormFieldsToPage(sheetRef2, page2);

    // 4. Salvar e Baixar
    const pdfBytes = await pdfDoc.save();
    
    // Cria o Blob e dispara o download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ficha-urban-shadows-editavel.pdf';
    link.click();

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
      {/* Input Oculto para carregar ficheiro */}
      <input 
        type="file" 
        accept=".json" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleImportJSON} 
      />

      <div className="sheet-actions" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={handleDownloadImage}>Baixar Ficha (PDF)</button>
        
        <button onClick={handleExportJSON} style={{ backgroundColor: '#2b7875' }}>
          Salvar Ficha
        </button>

        {/* Botão que ativa o input oculto */}
        <button 
          onClick={() => fileInputRef.current.click()} 
          style={{ backgroundColor: '#d97706' }}
        >
          Carregar Ficha
        </button>
      </div>
      

{/* --- PÁGINA 1 --- */}
      <div className="sheet-page" ref={sheetRef1}>
        <img src={bgPage1} alt="Ficha Frente" />
        
        {/* --- CAMPOS COMUNS A TODOS OS ARQUÉTIPOS --- */}
        
        {/* Cabeçalho */}
        <AbsoluteInput id="char-name" top={225} left={80} width={400} height={50} placeholder="Nome" />
        <AbsoluteInput id="char-pronouns" top={225} left={490} width={125} height={50} placeholder="Pronomes" />
        <AbsoluteInput 
          id="char-demeanor"
          top={203} 
          left={815} 
          width={380} 
          height={50} 
          placeholder="Comportamento" 
          onFocus={(e) => handleInputFocus(e, 1, suggestionsComportamento)} 
          onInput={(e) => adjustFontSize(e.target)}
        />
        <AbsoluteInput 
          id="char-look"
          top={240} 
          left={715} 
          width={485} 
          height={50} 
          placeholder="Visual" 
          onFocus={(e) => handleInputFocus(e, 1, suggestionsVisual)} 
          onInput={(e) => adjustFontSize(e.target)}
        />
        <div className='stats'>
          {/* Atributos (Stats) */}
          <AbsoluteInput id="stat-coracao" top={0} left={0} width={80} height={80} type="number"  className="number-input stat-coracao" value={inputCoracaoValue}/>
          <AbsoluteInput id="stat-espirito" top={-1} left={0} width={80} height={80} type="number" className="number-input stat-espirito" value={inputEspiritoValue}/>
          <AbsoluteInput id="stat-mente" top={-1} left={0} width={80} height={80} type="number" className="number-input stat-mente"    value={inputMenteValue}/>
          <AbsoluteInput id="stat-sangue" top={-1} left={0} width={80} height={80} type="number" className="number-input stat-sangue"   value={inputSangueValue}/>
        </div>
        
        <div className='stat-circles'>
          {/* Círculos Numéricos */}
          <AbsoluteInput id="circle-limiar" top={0} left={0} width={80} height={80} type="number" className="number-input circulo-limiar" value={inputLimiarValue}/>
          <AbsoluteInput id="circle-mortalis" top={0} left={0} width={80} height={80} type="number" className="number-input circulo-mortalis" value={inputMortalisValue}/>
          <AbsoluteInput id="circle-noite" top={0} left={0} width={80} height={80} type="number" className="number-input circulo-noite" value={inputNoiteValue}/>
          <AbsoluteInput id="circle-poder" top={0} left={-2} width={80} height={80} type="number" className="number-input circulo-poder" value={inputPoderValue}/>
        </div>
      

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
        
        <AbsoluteInput id="armor-main" top={1164} left={1153} width={40} height={40} type="number" className="field-armadura-padrao" />

        {/* Cicatrizes */}
        {renderCheckboxes(651, 1387, 2, 0, 24, 16, 16, "check-cicatriz")}
        {renderCheckboxes(867, 1387, 2, 0, 24, 16, 16, "check-cicatriz")}

        {/* --- INJEÇÃO DE CONTEÚDO ESPECÍFICO DA PÁGINA 1 --- */}
        {page1Extras}
        {activeSuggestion?.page === 1 && renderDropdown()}

      </div>

      {/* --- PÁGINA 2 --- */}
      <div className="sheet-page" ref={sheetRef2}>
        <img src={bgPage2} alt="Ficha Verso" />
        
        {/* --- INJEÇÃO DE CONTEÚDO ESPECÍFICO DA PÁGINA 2 (Antes dos equipamentos) --- */}
        {page2Extras}

        {/* Equipamentos Dinâmicos */}
        <div style={{ position: 'absolute', top: equipmentsTop, left: equipmentsLeft, width: equipmentWidth, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {equipments.map((item, index) => (
            <input 
              key={index} 
              id={`equipment-${index}`}
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
  );
};

export default BaseSheet;
