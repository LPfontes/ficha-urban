// src/components/VeteranSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Imagens específicas do Veterano
import bgPage1 from '../assets/imagens/oraculo.webp';
import bgPage2 from '../assets/imagensoraculo2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["Distante", "Manipulador", "Paranoico", "Reconfortante"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas casuais", "roupas escuras", "roupas sujas", "roupas táticas"];
const SUGGESTIONS_EQUIPMENT = ["Objetos de adivinhação","Instrumentos ritualísticos","Tomos e grimórios raros"]

const FichaOraculo = () => {
  
  const page1Extras = (
    <>
      <AbsoluteInput top={591} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={820} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1002} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1135} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1292} left={76} width={17} height={17} type="checkbox" className="check-move" />
    </>
  );
const page2Extras = (
    <>
      {renderCheckboxes(365, 282, 4, 0, 24, 14, 14, "check-benfeitor-profecia")}
      {renderCheckboxes(365, 415, 4, 0, 24, 14, 14, "check-benfeitor-forcas")}
      {renderCheckboxes(365, 548, 4, 0, 24, 14, 14, "check-benfeitor-defeitos")}

    
      {renderCheckboxes(76, 885, 1, 0, 24, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 947, 1, 0, 20, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 990, 1, 0, 20, 14, 14, "check-equipamento-inicial")}
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
      equipmentsTop={960}
      equipmentButtonTop={924}
      checkcorrupcaoGap2={129}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={0}
      inputCoracaoValue={-1}
      inputMenteValue={1}
      inputEspiritoValue={1}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={0}
      inputNoiteValue={0}
      inputPoderValue={1}
      inputLimiarValue={0}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={false}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={false}
      inputPoderStatusValue={true}
    />
  );
};

export default FichaOraculo;