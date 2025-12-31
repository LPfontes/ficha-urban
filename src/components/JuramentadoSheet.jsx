// src/components/FaeSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Imagens específicas da Fada
import bgPage1 from '../assets/imagens/juramentado.webp';
import bgPage2 from '../assets/imagens/juramentado2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["astuto", "emotivo", "obsessivo", "estoico"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas casuais", "roupas desgrenhadas", "roupas caras", "roupas ritualísticas"];
const SUGGESTIONS_EQUIPMENT = ["Uma casa ou apartamento luxuoso", "um carro requintado", "um smartphone caro", "Beretta 9mm", "Faca de caça", "Espingarda de cano serrado"];

const FichaJuramentado = () => {
  
  const page1Extras = (
    <>
      <AbsoluteInput top={620} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={897} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1031} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1092} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1202} left={76} width={17} height={17} type="checkbox" className="check-move" />
    </>
  );
const page2Extras = (
    <>
      {renderCheckboxes(365, 225, 5, 0, 24, 14, 14, "check-seu-juramento-mestres")}
      {renderCheckboxes(627, 226, 5, 0, 24, 14, 14, "check-seu-juramento-encarregado")}
      {renderCheckboxes(365, 526, 4, 0, 24, 14, 14, "check-seu-votos")}
      {renderCheckboxes(717, 527, 4, 0, 24, 14, 14, "check-seu-votos")}


      {renderCheckboxes(365, 724, 4, 0, 24, 14, 14, "check-sua-arma-lendaria")}
      {renderCheckboxes(788, 724, 1, 0, 24, 14, 14, "check-sua-arma-lendaria")}
      {renderCheckboxes(788, 772, 1, 0, 24, 14, 14, "check-sua-arma-lendaria")}
          
      {renderCheckboxes(76, 866, 1, 0, 24, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 908, 2, 0, 20, 14, 14, "check-equipamento-inicial")}
    </>
  );
  return (
    <BaseSheet 
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisual={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      checkcorrupcaoGap1={83}
      checkcorrupcaoGap2={83}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={1}
      inputCoracaoValue={0}
      inputMenteValue={1}
      inputEspiritoValue={-1}
      equipmentsTop={950}
      equipmentButtonTop={914}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={-1}
      inputNoiteValue={0}
      inputPoderValue={1}
      inputLimiarValue={1}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={false}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={false}
      inputPoderStatusValue={true}
    />
  );
};

export default FichaJuramentado;