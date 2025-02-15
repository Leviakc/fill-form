import { CALIFICA, EVALUACION, INFORMACION_SEMESTRAL } from "./consts/regex";
import { evaluationForm } from "./singleForm/evaluationForm";
import "./content.css";
import { globalEvaluationForm } from "./globalForm/globalEvaluationForm";
import { $, $$ } from "./utils/helpers";
import { setLocalStorage } from "./utils/localStorage";
import type { Links } from "./utils/getDomElements";

const main = () => {
	if (CALIFICA.test(window.location.href)) {
		globalEvaluationForm();
	}

	if (EVALUACION.test(window.location.href)) {
		evaluationForm();
	}

	if (INFORMACION_SEMESTRAL.test(window.location.href)) {
		const $input = $<HTMLInputElement>("input[type=submit]");
		const $links = Array.from($$<HTMLAnchorElement>("div#subnav table a")!);
		const $a = $links.find((link) => link.textContent === "Calificaciones");
		if ($a && $input) {
			setLocalStorage($a.href as unknown as Links, "forms-link");
			$input?.click();
		}
	}
};

main();
