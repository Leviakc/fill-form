import { CALIFICA, EVALUACION } from "./consts/regex";
import { evaluationForm } from "./singleForm/evaluationForm";
import "./content.css";
import { globalEvaluationForm } from "./globalForm/globalEvaluationForm";

const main = () => {
  if (CALIFICA.test(window.location.href)) {
    globalEvaluationForm();
  }

  if (EVALUACION.test(window.location.href)) {
    evaluationForm();
  }
};

main();
