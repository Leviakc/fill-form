import type { ValueCheck } from "../utils/changeInputValues";
import { getFormLinks } from "../utils/getDomElements";
import { getLocalStorage, removeLocalStorage } from "../utils/localStorage";
import { createSelectionElement } from "../utils/newFormDomElement";
import { handleAutoFormSelection } from "./handleAutoFormSelection";

export const globalEvaluationForm = () => {
  const storageLinks = getLocalStorage();

  if (storageLinks.length > 0) {
    handleAutoFormSelection(storageLinks.at(0)!);
  }

  const multipleFormTable = document.querySelectorAll("th")[0].closest("table");

  const newElement = createSelectionElement("div");

  if (!document.querySelector("#select-values-form")) {
    multipleFormTable?.insertAdjacentElement("beforebegin", newElement);
  }

  const buttonSubmitt = document.querySelector(".extension-form__button");
  const select = document.getElementById(
    "select-values-form",
  ) as HTMLSelectElement;

  buttonSubmitt?.addEventListener("click", (e) => {
    e.preventDefault();
    removeLocalStorage("forms-link");
    const value = select.value as ValueCheck;
    if (value === "") return;

    const { linksArray } = getFormLinks(multipleFormTable, value);

    if (linksArray.length === 0) return;
    const link = linksArray.at(0);
    if (!link) return;
    handleAutoFormSelection(link);
  });
};
