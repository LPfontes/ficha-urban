// src/components/AwakeSheet.jsx
import React from 'react';
import AbsoluteInput from './AbsoluteInput';
// Importa o BaseSheet (Wrapper) e o helper de checkboxes
import BaseSheet, { renderCheckboxes } from './BaseSheet';

// Importe as imagens
import bgPage1 from '../assets/imagens/desperto.webp';
import bgPage2 from '../assets/imagens/desperto2.webp';


const SUGGESTIONS_COMPORTAMENTO = ["agressivo", "charmoso", "calmo", "paranoico"];
const SUGGESTIONS_VISUAL = ["andrógino", "conformado", "mutável", "não conformista", "Asiático ou sul-asiático", "negro", "hispânico/latino", "indígena", "do Oriente Médio", "branco", "roupas de marca", "roupas casuais de negócios", "roupas esquecíveis", "uniformizado"];
const SUGGESTIONS_EQUIPMENT = ["Um pequeno apartamento", "um carro usado", "um smartphone", "Beretta 9mm (2-ferimentos, médio, barulhenta, ocultável)", "Taser (ferimento-a, toque)", "Canivete (2-ferimentos, toque, ocultável)", "Seu kit (detalhe)"];

const FichaDesperto = () => {
  
  const page1Extras = (
    <>
      {/* Movimentos Específicos do Desperto */}
      <AbsoluteInput top={620} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={754} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={815} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={973} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1130} left={76} width={17} height={17} type="checkbox" className="check-move" />
      <AbsoluteInput top={1215} left={76} width={17} height={17} type="checkbox" className="check-move" />
    </>
  );

  // --- Extras da Página 2: Relacionamentos e Checks de Equipamento ---
  const page2Extras = (
    <>
      {/* Seus Relacionamentos Mortais */}
      {renderCheckboxes(365, 171, 6, 0, 24, 14, 14,"check-relacionamento-morto")}

      {/* Checks de Equipamento (Extras do Desperto) */}
      {renderCheckboxes(76, 882, 1, 0, 0, 15, 15,"check-equipamento")}
      {renderCheckboxes(76, 924, 3, 0, 21, 15, 15,"check-equipamento")}
    </>
  );

  return (
    <BaseSheet 
      // Imagens
      bgPage1={bgPage1}
      bgPage2={bgPage2}
      page1Extras={page1Extras}
      page2Extras={page2Extras}
      suggestionsVisual={SUGGESTIONS_VISUAL}
      suggestionsComportamento={SUGGESTIONS_COMPORTAMENTO}
      suggestionsEquipment={SUGGESTIONS_EQUIPMENT}
      equipmentsTop={750}
      equipmentButtonTop={695}
      checkcorrupcaoGap1={84}
      checkcorrupcaoGap2={84}
      /*? Valores iniciais dos atributos e círculos */
      inputSangueValue={0}
      inputCoracaoValue={1}
      inputMenteValue={-1}
      inputEspiritoValue={1}
      /*? Valores iniciais dos círculos */
      inputMortalisValue={1}
      inputNoiteValue={0}
      inputPoderValue={1}
      inputLimiarValue={-1}
      /*? Valores iniciais dos círculos de status */
      inputLimiarStatusValue={false}
      inputMortalisStatusValue={true}
      inputNoiteStatusValue={false}
      inputPoderStatusValue={false}
    />
  );
};

export default FichaDesperto;