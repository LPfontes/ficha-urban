// src/components/HunterSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
// Importa o BaseSheet e a função helper
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Imagens específicas do Caçador
import bgHunterPage1 from '../assets/imagens/cacador.webp';
import bgHunterPage2 from '../assets/imagens/cacador2.webp';

const SUGGESTIONS_COMPORTAMENTO = [
    "calculista", 
    "distante", 
    "amigável", 
    "volátil"
];

const SUGGESTIONS_VISUAL = [
    "andrógino", 
    "conformado", 
    "mutável", 
    "não conformista", 
    "Asiático ou sul-asiático", 
    "negro", 
    "hispânico/latino", 
    "indígena", 
    "do Oriente Médio", 
    "branco", 
    "roupas casuais", 
    "roupas escuras", 
    "roupas sujas", 
    "roupas táticas"
];

const SUGGESTIONS_EQUIPMENT = [
    "Arco (2-ferimentos, curto/longo, recarga)",
    "Espingarda (2-ferimentos, curto/médio, barulhenta, recarga, sangrenta)",
    "Submetralhadora (2-ferimentos, médio, automática, barulhenta)",
    "Pistola (2-ferimentos, médio, barulhenta, ocultável)",
    "Fuzil (2-ferimentos, longo, barulhento, recarga)",
    "Porrete (ferimento-a, toque)",
    "Corrente (1-ferimento, curto, área, exaustiva)",
    "Faca (2-ferimento, toque)",
    "Bordão (2-ferimento, curto)",
    "Espada (3-ferimento, curto, sangrenta)",
    "Um apartamento de merda",
    "Um síbolo da sua sociedade",
    "Uma camionete",
    "Um muscle car",
    "Um celular"

];
const FichaCacador = () => {
  
  // Conteúdo extra para a Página 1 (Movimentos e Armadura em posição específica)
  const hunterPage1Extras = (
    <>
      {/* Movimentos específicos do Caçador */}
      <AbsoluteInput top={616} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={702} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={884} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1016} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1102} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1188} left={76} width={17} height={17} type="checkbox" className="check-move" />

    </>
  );

  // Conteúdo extra para a Página 2 (Sociedade/Presa)
  const hunterPage2Extras = (
    <>
      {/* Sociedade / Presa / Sacrifício */}
      {renderCheckboxes(365, 268, 5, 0, 24, 14, 14, "check-presa")}
      {renderCheckboxes(365, 463, 4, 0, 24, 14, 14, "check-sacrificio")}
      {renderCheckboxes(365, 268, 3, 0, 24, 14, 14, "check-sociedade")}
      {renderCheckboxes(365, 559, 1, 0, 24, 14, 14, "check-sociedade")}
      {renderCheckboxes(365, 620, 4, 0, 24, 14, 14, "check-sociedade-local")}
    </>
  );

  return (
    <BaseSheet 
      bgPage1={bgHunterPage1}
      bgPage2={bgHunterPage2}
      page1Extras={hunterPage1Extras}
      page2Extras={hunterPage2Extras}
      suggestionsVisuals={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      /*? Valores iniciais dos atributos */
      inputSangueValue={1}
      inputCoracaoValue={-1}
      inputMenteValue={1}
      inputEspiritoValue={0}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={1}
      inputNoiteValue={1}
      inputPoderValue={0}
      inputLimiarValue={-1}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={false}
      inputMortalisStatusValue={true}
      inputNoiteStatusValue={false}
      inputPoderStatusValue={false}
    />
  );
};

export default FichaCacador;