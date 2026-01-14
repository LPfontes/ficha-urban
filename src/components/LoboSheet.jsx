// src/components/WolfSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';
// Assumindo que as imagens existem
import bgPage1 from '../assets/imagens/lobo.webp';
import bgPage2 from '../assets/imagens/lobo2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["selvagem", "inquieto", "violento"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas casuais", "roupas escuras", "roupas sujas", "roupas táticas"];
const SUGGESTIONS_EQUIPMENT = ["Uma bolsa de viagem com seus pertences pessoais", "um celular de merda", "Revólver de cano curto", "Beretta 9mm", "Faca dobrável", "Facão", "Taco de baseball"];

const FichaLobo = (props) => {
  const page1Extras = (
    <>
      {/* Movimentos */}
      <AbsoluteInput id="lobo-move-1" top={815} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="lobo-move-2" top={986} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="lobo-move-3" top={901} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="lobo-move-4" top={1119} left={76} width={17} height={17} type="checkbox" className="check-move" />
    
    </>
  );
const page2Extras = (
    <>
      {renderCheckboxes(365, 196, 5, 0, 48, 14, 14, "check-territorio")}
      {renderCheckboxes(365, 497, 3, 0, 48, 14, 14, "check-territorio")}
      {renderCheckboxes(365, 665, 2, 0, 48, 14, 14, "check-territorio")}


      {renderCheckboxes(796, 244, 2, 0, 24, 14, 14, "check-trasformaçao")}
      {renderCheckboxes(796, 316, 4, 0, 24, 14, 14, "check-trasformaçao")}

      {renderCheckboxes(796, 474, 3, 0, 23, 14, 14, "check-trasformaçao")}
      {renderCheckboxes(796, 569, 1, 0, 23, 14, 14, "check-trasformaçao")}
      {renderCheckboxes(796, 617, 2, 0, 24, 14, 14, "check-trasformaçao")}

      {renderCheckboxes(76, 866, 1, 0, 24, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 926, 2, 0, 40, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 1005, 2, 0, 20, 14, 14, "check-equipamento-inicial")}
    </>
  );
  return (
    <BaseSheet 
      {...props}
      sheetType="lobo"
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisual={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={1}
      inputCoracaoValue={-1}
      inputMenteValue={0}
      inputEspiritoValue={1}
      equipmentsTop={855}
      equipmentButtonTop={817}
      checkcorrupcaoGap1={130}
      checkcorrupcaoGap2={130}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={0}
      inputNoiteValue={1}
      inputPoderValue={-1}
      inputLimiarValue={1}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={false}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={true}
      inputPoderStatusValue={false}
    />
  );
};

export default FichaLobo;
