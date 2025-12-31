// src/components/FaeSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';
// Imagens específicas da Fada
import bgPage1 from '../assets/imagens/feerico.webp';
import bgPage2 from '../assets/imagens/feerico2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["agressivo", "charmoso", "calmo", "paranoico", "antiquado", "confuso", "fraco", "volátil", "alienígena", "excêntrico", "sedutor", "indomável"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas de marca", "roupas casuais de negócios", "roupas esquecíveis", "uniformizado", "roupas manchadas de sangue", "roupas escuras", "roupas cotidianas", "roupas vintage", "roupas coloridas", "roupas caras", "roupas bagunçadas", "roupas reveladoras"];
const SUGGESTIONS_EQUIPMENT = ["Um pequeno apartamento", "um carro usado", "um smartphone", "Beretta 9mm", "Taser", "Canivete", "Seu kit (detalhe)", "Uma casa ou apartamento confortável", "um carro decente", "Uma relíquia da sua terra natal", "Um símbolo da sua corte (sol, lua, tempestade, inverno, primavera etc.)"];

const FichaFeerico = (props) => {
  
  const page1Extras = (
    <>
      <AbsoluteInput id="feerico-move-1" top={838} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="feerico-move-2" top={948} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="feerico-move-3" top={1034} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="feerico-move-4" top={1144} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="feerico-move-5" top={1229} left={76} width={17} height={17} type="checkbox" className="check-move" />

    </>
  );
  const page2Extras = (
    <>
    {renderCheckboxes(362, 148, 1, 0, 0, 18, 18, "check-poderes-feericos")}
    {renderCheckboxes(362, 257, 1, 0, 0, 18, 18, "check-poderes-feericos")}
    {renderCheckboxes(362, 389, 1, 0, 0, 18, 18, "check-poderes-feericos")}
    {renderCheckboxes(362, 500, 1, 0, 0, 18, 18, "check-poderes-feericos")}
    {renderCheckboxes(362, 632, 1, 0, 0, 18, 18, "check-poderes-feericos")}

    {renderCheckboxes(794, 229, 4, 0, 24, 18, 18, "check-corte")}
    {renderCheckboxes(794, 350, 1, 0, 24, 18, 18, "check-corte")}
    {renderCheckboxes(794, 398, 3, 0, 23, 18, 18, "check-corte")}

    {renderCheckboxes(794, 492, 1, 0, 24, 18, 18, "check-corte")}

    {renderCheckboxes(794, 540, 2, 0, 24, 18, 18, "check-corte")}

    {renderCheckboxes(794, 613, 1, 0, 24, 18, 18, "check-corte")}
    </>
  );

  return (
    <BaseSheet 
      {...props}
      sheetType="feerico"
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisual={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      equipmentButtonTop={781}
      equipmentsTop={820}
      checkcorrupcaoGap1={84}
      checkcorrupcaoGap2={84}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={-1}
      inputCoracaoValue={1}
      inputMenteValue={0}
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

export default FichaFeerico;