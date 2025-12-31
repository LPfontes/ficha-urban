// src/components/VeteranSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Imagens específicas do Veterano
import bgPage1 from '../assets/imagens/veterano.webp';
import bgPage2 from '../assets/imagens/veterano2.webp';

const SUGGESTIONS_COMPORTAMENTO = [
    "charmoso", 
    "grosseiro", 
    "profissional", 
    "reservado"
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
    "roupas sujas", 
    "roupas formais", 
    "roupas de uniforme"
];

const SUGGESTIONS_EQUIPMENT = [
    "Um apartamento",
    "Um escoderijo em um armazém",
    "Um carro pratico",
    "Uma camionhonete velha",
    "Um smartphone",
    "Uma oficina(detalhes)",
    "Beretta 9mm (2-ferimentos, médio, barulhenta, ocultável)",
    "Espingarda (3-ferimentos, curto/médio, barulhenta, recarga, sangrenta)",
    "Revólver Magnum (3-ferimentos, médio, barulhenta, recarga)",
];
const FichaVeterano = (props) => {
  
  const page1Extras = (
    <>
      {/* Movimentos (Ajuste as posições) */}
      <AbsoluteInput id="veterano-move-1" top={772} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="veterano-move-2" top={800} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="veterano-move-3" top={906} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="veterano-move-4" top={991} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="veterano-move-5" top={1077} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="veterano-move-6" top={1282} left={76} width={17} height={17} type="checkbox" className="check-move" />
    </>
  );
const page2Extras = (
    <>
      {renderCheckboxes(76, 869, 3, 0, 41, 14, 14, "check-equipamento-inicial")}
      
    </>
  );
  return (
    <BaseSheet 
      {...props}
      sheetType="veterano"
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisuals={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      equipmentsTop={685}
      equipmentButtonTop={651}
      checkcorrupcaoGap2={108}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={-1}
      inputCoracaoValue={1}
      inputMenteValue={1}
      inputEspiritoValue={0}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={1}
      inputNoiteValue={0}
      inputPoderValue={0}
      inputLimiarValue={0}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={true}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={false}
      inputPoderStatusValue={false}
    />
  );
};

export default FichaVeterano;