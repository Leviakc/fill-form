import { califica, evaluacion } from "./consts/regex";
import { evaluationForm } from "./singleForm/evaluationForm";
import "./content.css";
import { globalEvaluationForm } from "./globalForm/globalEvaluationForm";

export const main = () => {
  if (califica.test(window.location.href)) {
    console.log("Estas en la pagina de califica");
    globalEvaluationForm();
  }

  if (evaluacion.test(window.location.href)) {
    console.log("Estas en la pagina de evalaucion");
    evaluationForm();
  }
};

main();
