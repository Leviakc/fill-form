import { main } from "../content.js";
import { getDomElements } from "../utils/getDomElements.js";
import { fillFormSaes } from "./fillFormSaes";

export const evaluationForm = () => {
  if (document.querySelector("#select-values-form")) {
    return;
  }

  const { tds } = getDomElements(document);

  let singleFormTable: HTMLTableCellElement =
    "" as unknown as HTMLTableCellElement;

  tds.forEach((td) => {
    if (td.innerText.includes("Apreciable estudiante:")) {
      singleFormTable = td;
    }
  });

  const submitButton = document.querySelector("input[type=submit]");
  const newSubmitButton = submitButton?.cloneNode(true) as Element;

  submitButton?.remove();
  newSubmitButton?.setAttribute("class", "extension-form__button");

  const formElement = submitButton?.closest("form");

  const newTr = document.createElement("tr");

  newTr.innerHTML = `
    <td colspan="3" id="newTrId">
      <div class="extension-form__div">
      <p class="extension-form__p">Llenar formulario con: </p>
      <select name="select" class="extension-form__select" id="select-values-form">
        <option value="" selected style=""></option>
        <option value="1">NUNCA</option>
        <option value="2">A VECES</option>
        <option value="3">SIEMPRE</option>
      </select>
        ${newSubmitButton.outerHTML}
      </div>
    </td>
    `;

  singleFormTable.parentElement?.insertAdjacentElement("afterend", newTr);

  const select = document.getElementById("select-values-form");
  select?.addEventListener("change", fillFormSaes);
  formElement?.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector("#newTrId")?.remove();

    setTimeout(() => {
      main();
    }, 1500);
    formElement.submit();
  });
};
