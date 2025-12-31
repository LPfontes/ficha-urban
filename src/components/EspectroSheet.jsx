// src/components/SpectreSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';
// Imagens específicas do Espectro
import bgPage1 from '../assets/imagens/espectro.webp';
import bgPage2 from '../assets/imagens/espectro2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["agressivo", "charmoso", "calmo", "paranoico", "antiquado", "confuso", "fraco", "volátil"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas de marca", "roupas casuais de negócios", "roupas esquecíveis", "uniformizado", "roupas manchadas de sangue", "roupas escuras", "roupas cotidianas", "roupas vintage"];
const SUGGESTIONS_EQUIPMENT = ["Um pequeno apartamento", "um carro usado", "um smartphone", "Beretta 9mm (2-ferimentos, médio, barulhenta, ocultável)", "Taser (ferimento-a, toque)", "Canivete (2-ferimentos, toque, ocultável)", "Seu kit (detalhe)"];

const FichaEspectro = () => {
  
  const page1Extras = (
    <>
     {/* Movimentos Específicos do Desperto */}
      <AbsoluteInput top={865} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={975} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1085} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1145} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1279} left={76} width={17} height={17} type="checkbox" className="check-move" />

    </>
  );
  const page2Extras = (
    <>
          {renderCheckboxes(525, 78, 1, 0, 0, 21, 21, "trauma-check")}
          {renderCheckboxes(550, 78, 1, 0, 0, 21, 21, "trauma-check")}
          {renderCheckboxes(575, 78, 1, 0, 0, 21, 21, "trauma-check")}
          {renderCheckboxes(600, 78, 1, 0, 0, 21, 21, "trauma-check")}
          {renderCheckboxes(625, 78, 1, 0, 0, 21, 21, "trauma-check")}

          {renderCheckboxes(796, 244, 8, 0, 24, 14, 14, "check-ancora")}
          {renderCheckboxes(796, 836, 1, 0, 24, 14, 14, "check-seguindo-adiante")}
          {renderCheckboxes(796, 884, 1, 0, 24, 14, 14, "check-seguindo-adiante")}
          {renderCheckboxes(796, 932, 1, 0, 24, 14, 14, "check-seguindo-adiante")}
          {renderCheckboxes(796, 957, 1, 0, 24, 14, 14, "check-seguindo-adiante")}

          {renderCheckboxes(796, 1017, 3, 0, 48, 14, 14, "check-assobracao")}

  
          
    </>
  );
  return (
    <BaseSheet 
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      suggestionsVisual={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      equipmentsTop={835}
      equipmentsLeft={365}
      equipmentButtonTop={799}
      equipmentButtonLeft={560}
      equipmentWidth={400}
      equipmentButtonWidth={60}
      equipmentHeight={40}
      buttonEquipmentFontSize={14}
      buttonEquipmentText="+"
      checkcorrupcaoGap1={151}
      page2Extras={page2Extras}
     /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={1}
      inputCoracaoValue={0}
      inputMenteValue={-1}
      inputEspiritoValue={1}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={0}
      inputNoiteValue={1}
      inputPoderValue={1}
      inputLimiarValue={-1}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={false}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={true}
      inputPoderStatusValue={false}
    />
  );
};

export default FichaEspectro;