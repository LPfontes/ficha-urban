// src/components/WizardSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Imagens específicas do Mago
import bgPage1 from '../assets/imagens/mago.webp';
import bgPage2 from '../assets/imagens/mago2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["pressionado", "distante", "desgrenhado", "sinistro"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas arcaicas", "roupas casuais", "roupas caras", "roupas rituais"];
const SUGGESTIONS_EQUIPMENT = ["Um bom apartamento ou uma casa simples", "um carro ruim", "um martphone decente", "um santuário (detalhe)", "Revólver de cano curto (2-fer)", "Glock 9mm (2-fer)", "Espada (3-fer)"];

const FichaMago = () => {
  
  const page1Extras = (
    <>
      {renderCheckboxes(77, 1116, 4, 0, 24, 14, 14, "check-seu-protegido")}
      {renderCheckboxes(77, 1249, 4, 0, 24, 14, 14, "check-seu-protegido")}
    </>
  );
const page2Extras = (
    <>
      <AbsoluteInput id="mago-move-1" top={148} left={363} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="mago-move-2" top={257} left={363} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="mago-move-3" top={366} left={363} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="mago-move-4" top={524} left={363} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="mago-move-5" top={681} left={363} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="mago-move-6" top={766} left={363} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="mago-move-7" top={852} left={363} width={17} height={17} type="checkbox" className="check-move" />

      {renderCheckboxes(76, 883, 1, 0, 20, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 945, 1, 0, 20, 14, 14, "check-equipamento-inicial")}
      {renderCheckboxes(76, 987, 1, 0, 20, 14, 14, "check-equipamento-inicial")}

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
      equipmentsTop={990}
      equipmentButtonTop={956}
      checkcorrupcaoGap1={83}
      checkcorrupcaoGap2={106}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={0}
      inputCoracaoValue={-1}
      inputMenteValue={1}
      inputEspiritoValue={1}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={0}
      inputNoiteValue={-1}
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

export default FichaMago;