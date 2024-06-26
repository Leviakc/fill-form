import type { ValueCheck } from "../utils/changeInputValues";
import { getFormLinks } from "../utils/getDomElements";
import { getLocalStorage } from "../utils/setLocalStorage";
import { createSelectionElement } from "../utils/newFormDomElement";
import { handleAutoFormSelection } from "./handleAutoFormSelection";

export const globalEvaluationForm = () => {
  const storageLinks = getLocalStorage();

  // console.log(storageLinks);
  if (storageLinks.length > 0) {
    handleAutoFormSelection(storageLinks.at(0)!);
  }

  const multipleFormTable = document.querySelectorAll("th")[0].closest("table");

  const newElement = createSelectionElement("div");

  if (!document.querySelector("#select-values-form")) {
    multipleFormTable?.insertAdjacentElement("beforebegin", newElement);
  }

  const buttonSubmitt = document.querySelector(".extension-form__button");
  // select-values-form
  const select = document.getElementById(
    "select-values-form",
  ) as HTMLSelectElement;

  buttonSubmitt?.addEventListener("click", (e) => {
    e.preventDefault();
    const value = select.value as ValueCheck;
    if (value === "") return;

    const { linksArray } = getFormLinks(multipleFormTable, value);

    if (linksArray.length === 0) return;
    // console.log(linksArray.at(0));
    const link = linksArray.at(0);
    if (!link) return;
    handleAutoFormSelection(link);
  });
};
