import { handleAutoSelection } from "../globalForm/handleAutoFormSelection.js";
import { getDomElements } from "../utils/getDomElements.js";
import {
  getLocalStorage,
  removeLocalStorageItem,
} from "../utils/localStorage.js";
import { createSelectionElement } from "../utils/newFormDomElement.js";
import { replaceSubmitButton } from "../utils/replaceSubmitButton.js";
import { handleFormSelection } from "./handleFormSelection.js";

export const evaluationForm = () => {
  const storageLinks = getLocalStorage();

  const { tds } = getDomElements(document);

  let singleFormTable: HTMLTableCellElement =
    "" as unknown as HTMLTableCellElement;

  tds.forEach((td) => {
    if (td.innerText.includes("Apreciable estudiante:")) {
      singleFormTable = td;
    }
  });

  const submitButton = document.querySelector("input[type=submit]");
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

    const newLocalStorage = getLocalStorage();
    if (newLocalStorage.length > 0) {
      chrome.runtime.sendMessage({ action: "data", data: newLocalStorage[0] });
    }
    newSubmitButton.click();
  }

  const select = document.getElementById("select-values-form");

  select?.addEventListener("change", handleFormSelection);
};
