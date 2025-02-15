import type { ValueCheck } from "../utils/changeInputValues";
import { getFormLinks } from "../utils/getDomElements";
import { getLocalStorage, removeLocalStorage } from "../utils/localStorage";
import { createSelectionElement } from "../utils/newFormDomElement";
import { $, $$ } from "../utils/helpers.ts";

export const globalEvaluationForm = () => {
	const storageLinks = getLocalStorage();
	const newElement = createSelectionElement("div");
	const buttonSubmitt = $(".extension-form__button");
	const select = $<HTMLSelectElement>("#select-values-form");
	const multipleFormTable = $$("th")[0].closest("table");

	if (storageLinks.length > 0) {
		window.location.href = storageLinks[0].link;
	}

	if (!$("#select-values-form")) {
		multipleFormTable?.insertAdjacentElement("beforebegin", newElement);
	}

	buttonSubmitt?.addEventListener("click", (e) => {
		e.preventDefault();
		removeLocalStorage("forms-link");
		const value = (select?.value as ValueCheck) ?? "";
		const { linksArray } = getFormLinks(multipleFormTable, value);
		const link = linksArray[0].link;

		if (value === "") return;

		if (linksArray.length === 0) return;
		window.location.href = link;
	});
};
