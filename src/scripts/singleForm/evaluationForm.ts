import { handleAutoSelection } from "../globalForm/handleAutoFormSelection.js";
import { Links, getDomElements } from "../utils/getDomElements.js";
import {
  getLocalStorage,
  removeLocalStorageItem,
} from "../utils/setLocalStorage.js";
import { createSelectionElement } from "../utils/newFormDomElement.js";
import { replaceSubmitButton } from "../utils/replaceSubmitButton.js";
import { handleFormSelection } from "./handleFormSelection.js";

export const evaluationForm = () => {
  const storageLinks: Links = getLocalStorage();
  // console.log(storageLinks);

  const { tds } = getDomElements(document);

  let singleFormTable: HTMLTableCellElement =
    "" as unknown as HTMLTableCellElement;

  tds.forEach((td) => {
    if (td.innerText.includes("Apreciable estudiante:")) {
      singleFormTable = td;
    }
  });

  const submitButton = document.querySelector("input[type=submit]");
  const formElement = submitButton?.closest("form");
  const newSubmitButton = replaceSubmitButton(submitButton) as HTMLInputElement;

  const newElement = createSelectionElement("tr", newSubmitButton);

  if (!document.querySelector("#select-values-form")) {
    singleFormTable.parentElement?.insertAdjacentElement(
      "afterend",
      newElement,
    );
  }

  if (storageLinks.length > 0) {
    const storageLink = storageLinks.at(0);
    handleAutoSelection(storageLink!);
    removeLocalStorageItem(storageLink!);
    newSubmitButton.click();
  }

  const select = document.getElementById("select-values-form");

  select?.addEventListener("change", handleFormSelection);

  formElement?.addEventListener("submit", (e) => {
    e.preventDefault();
    // Avoid the value of the created select element to be sent
    document.querySelector("#td-select-saes-form")?.remove();
    formElement.submit();
  });
};
