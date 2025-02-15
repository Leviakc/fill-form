import {
	getLocalStorage,
	removeLocalStorage,
	removeLocalStorageItem,
} from "../utils/localStorage.js";
import { createSelectionElement } from "../utils/newFormDomElement.js";
import { handleFormSelection } from "./handleFormSelection.js";
import { $, $$ } from "../utils/helpers.ts";

export const evaluationForm = () => {
	const storageLinks = getLocalStorage();
	const formLink = getLocalStorage("forms-link");
	let submitButton: HTMLInputElement | null = null;
	let newSubmitButton: HTMLInputElement | null = null;

	const $tds = $$("td");

	let singleFormTable: HTMLTableCellElement | null = null;

	$tds.forEach((td) => {
		if (td.innerText.includes("Apreciable estudiante:")) {
			singleFormTable = td;
		}
	});

	if (!$("#select-values-form")) {
		submitButton = $("input[type=submit]");
		newSubmitButton = submitButton?.cloneNode(true) as HTMLInputElement;
		submitButton?.remove();
		newSubmitButton?.setAttribute("class", "extension-form__button");
		// newSubmitButton = replaceSubmitButton(submitButton) as HTMLInputElement;

		const newElement = createSelectionElement("tr", newSubmitButton);

		singleFormTable!.parentElement?.insertAdjacentElement(
			"afterend",
			newElement,
		);
	}

	if (storageLinks.length > 0) {
		const storageLink = storageLinks[0];
		handleFormSelection(null, storageLink.value);

		removeLocalStorageItem(storageLink);

		const newLocalStorage = getLocalStorage();
		if (newLocalStorage.length > 0) {
			chrome.runtime.sendMessage({ action: "data", data: newLocalStorage[0] });
		}
		newSubmitButton?.click();
	}

	const $select = $<HTMLSelectElement>("#select-values-form");

	$select?.addEventListener("change", handleFormSelection);
	newSubmitButton?.addEventListener("click", () => {
		if (formLink) {
			chrome.runtime.sendMessage({ action: "goFormPage", data: formLink });
			removeLocalStorage("forms-link");
		}
	});
};
