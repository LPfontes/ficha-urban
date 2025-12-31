// src/components/VampSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';
import bgPage1 from '../assets/imagens/sanguessuga.webp';
import bgPage2 from '../assets/imagens/sanguessuga2.webp';

const SUGGESTIONS_COMPORTAMENTO = [
    "antiquado", 
    "selvagem", 
    "sedutor", 
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
    "roupas discretas", 
    "roupas formais", 
    "roupas comuns", 
    "roupas vintage"
];

const SUGGESTIONS_EQUIPMENT = [
    "Uma casa ou apartamento isolado",
    "Um carro confortável",
    "Um smartphone",
    "Pistolas Double Eagle Duplas (3-ferimentos, médio, barulhentas)",
    "Espada (3-ferimento, curto, sangrenta)",
    "Pistola Walther PPK (2-ferimentos, curto/médio, recarga, ocultável)"
];
const FichaSanguessuga = () => {
  const page1Extras = (
    <>
      {/* Movimentos (Ajuste as posições) */}
      <AbsoluteInput top={839} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={996} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1082} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1191} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1253} left={76} width={17} height={17} type="checkbox" className="check-move" />
    </>
  );
const page2Extras = (
    <>
      {renderCheckboxes(796, 279, 5, 0, 24, 14, 14, "check-seu-porto")}
      {renderCheckboxes(796, 436, 5, 0, 48, 14, 14, "check-seu-porto")}
      {renderCheckboxes(796, 713, 5, 0, 48, 14, 14, "check-seu-porto")}
      {renderCheckboxes(1005, 304, 1, 0, 0, 14, 14, "check-seu-porto")}
      {renderCheckboxes(1005, 351, 2, 0, 24, 14, 14, "check-seu-porto")}

      {renderCheckboxes(76, 849, 1, 0, 20, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 891, 2, 0, 21, 14, 14, "check-equipamento-inicial")}
      
    </>
  );
  return (
    <BaseSheet 
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisuals={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      equipmentsTop={1015}
      equipmentButtonTop={972}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={1}
      inputCoracaoValue={1}
      inputMenteValue={0}
      inputEspiritoValue={-1}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={1}
      inputNoiteValue={1}
      inputPoderValue={-1}
      inputLimiarValue={0}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={false}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={true}
      inputPoderStatusValue={false}
    />
  );
};

export default FichaSanguessuga;
