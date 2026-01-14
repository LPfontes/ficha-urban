// src/components/TaintedSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Imagens específicas do Maculado
import bgPage1 from '../assets/imagens/maculado.webp';
import bgPage2 from '../assets/imagens/maculado2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["corporativo", "distante", "paranoico", "instável"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas sujas", "roupas caras", "roupas formais", "roupas da moda"];
const SUGGESTIONS_EQUIPMENT = ["Uma casa ou apartamento", "um carro", "um smartphone", "Cassetete", "Beretta 9mm (curto)", "Espingarda (3-ferimentos)", "Espada"];

const FichaMaculado = (props) => {
  
  const page1Extras = (
    <>
      {/* Movimentos */}
      <AbsoluteInput id="maculado-move-1" top={787} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="maculado-move-2" top={896} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="maculado-move-3" top={982} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="maculado-move-4" top={1235} left={76} width={17} height={17} type="checkbox" className="check-move" />
      
    </>
  );
const page2Extras = (
    <>
      {renderCheckboxes(365, 244, 7, 0, 48, 14, 14, "check-pratono")}
      {renderCheckboxes(365, 497, 3, 0, 48, 14, 14, "check-pratono")}
      {renderCheckboxes(365, 665, 2, 0, 48, 14, 14, "check-pratono")}


      {renderCheckboxes(76, 885, 2, 0, 20, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 947, 1, 0, 40, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 990, 1, 0, 20, 14, 14, "check-equipamento-inicial")}
    </>
  );

  return (
    <BaseSheet 
      {...props}
      sheetType="maculado"
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisual={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      equipmentsTop={900}
      equipmentButtonTop={860}
      checkcorrupcaoGap1={82}
      checkcorrupcaoGap2={106}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={1}
      inputCoracaoValue={1}
      inputMenteValue={-1}
      inputEspiritoValue={0}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={1}
      inputNoiteValue={-1}
      inputPoderValue={0}
      inputLimiarValue={1}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={true}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={false}
      inputPoderStatusValue={false}
    />
  );
};

export default FichaMaculado;