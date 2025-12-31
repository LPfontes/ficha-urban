// src/components/ImpSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Imagens específicas do Diabrete
import bgPage1 from '../assets/imagens/diabrete.webp';
import bgPage2 from '../assets/imagens/diabrete2.webp';

const SUGGESTIONS_COMPORTAMENTO = ["atormentado", "encantador", "frenético", "astuto"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas chamativas", "roupas formais", "roupas pouco elegantes", "uniforme"];
const SUGGESTIONS_EQUIPMENT = ["Uma casa ou apartamento de luxo", "um carro ou van", "um smartphone", "Um presente sentimental de um membro da família", "Um objeto ritualístico que o vincula a este reino (por exemplo, o primeiro dólar gasto no seu negócio)"];

const FichaDiabrete = (props) => {
  
  const page1Extras = (
    <>
      {/* Movimentos Específicos do Desperto */}
      <AbsoluteInput id="diabrete-move-1" top={911} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="diabrete-move-2" top={1068} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="diabrete-move-3" top={1178} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput id="diabrete-move-4" top={1263} left={76} width={17} height={17} type="checkbox" className="check-move" />

    </>
  );

  const page2Extras = (
      <>
        {renderCheckboxes(365, 291, 5, 0, 24, 14, 14, "check-seu-estabelecimento")}
        {renderCheckboxes(365, 445, 1, 0, 24, 14, 14, "check-seu-estabelecimento")}
        {renderCheckboxes(365, 493, 1, 0, 24, 14, 14, "check-seu-estabelecimento")}
        {renderCheckboxes(365, 541, 3, 0, 24, 14, 14, "check-seu-estabelecimento")}
        {renderCheckboxes(365, 674, 3, 0, 23, 14, 14, "check-seu-estabelecimento")}
        {renderCheckboxes(365, 769, 2, 0, 24, 14, 14, "check-seu-estabelecimento")}

        {renderCheckboxes(796, 668, 2, 0, 24, 14, 14, "check-seu-pagamento")}
        {renderCheckboxes(796, 740, 4, 0, 24, 14, 14, "check-seu-pagamento")}
        {renderCheckboxes(996, 641, 5, 0, 24, 14, 14, "check-seu-pagamento")}
        {renderCheckboxes(996, 785, 1, 0, 24, 14, 14, "check-seu-pagamento")}

        
      </>
    );

  return (
    <BaseSheet 
      {...props}
      sheetType="diabrete"
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisual={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      equipmentsTop={900}
      equipmentButtonTop={860}
     /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={-1}
      inputCoracaoValue={1}
      inputMenteValue={1}
      inputEspiritoValue={0}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={0}
      inputNoiteValue={1}
      inputPoderValue={-1}
      inputLimiarValue={1}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={true}
      inputMortalisStatusValue={false}
      inputNoiteStatusValue={false}
      inputPoderStatusValue={false}

      checkcorrupcaoGap1={130}
      checkcorrupcaoGap2={84}
    />
  );
};

export default FichaDiabrete;