import {
  checkLists,
  inputSpanValues,
  selects,
  tds,
} from "../consts/domElements";
import { main } from "../content.js";
import { fillFormSaes } from "./fillFormSaes";

export const evaluationForm = () => {
  let singleFormTable: HTMLTableCellElement =
    "" as unknown as HTMLTableCellElement;

  tds.forEach((td) => {
    if (td.innerText.includes("Apreciable estudiante:")) {
      singleFormTable = td;
    }
  });

  const submitButton = document.querySelector("input[type=submit]");
  submitButton?.setAttribute("class", "extension-form__button");
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
        ${submitButton?.outerHTML}
      </div>
    </td>
    `;

  singleFormTable.parentElement?.insertAdjacentElement("afterend", newTr);
  const select = document.getElementById("select-values-form");
  select?.addEventListener("change", fillFormSaes);
  formElement?.addEventListener("submit", (e) => {
    e.preventDefault();

    formElement.submit();
    setTimeout(() => {
      main();

      checkLists.length = 0;
      selects.length = 0;
      inputSpanValues.length = 0;
    }, 1500);
  });
};
