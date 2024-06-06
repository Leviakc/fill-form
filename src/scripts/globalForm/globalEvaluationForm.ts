import {
  fillGlobalEvaluationForms,
  type ValueCheck,
} from "./fillGlobalEvaluationForms";

export const globalEvaluationForm = () => {
  const multipleFormTable = document.querySelectorAll("th")[0].closest("table");
  const imgs = multipleFormTable?.querySelectorAll("img");
  const links: string[] = [];

  imgs?.forEach((img) => {
    const link = img.parentElement?.getAttribute("href")!;
    links.push(encodeURI(link));
  });

  if (links.length === 0) return;

  const newDiv = document.createElement("div");

  newDiv.innerHTML = `
    <td colspan="3">
      <div class="extension-form__div m-2">
      <p class="extension-form__p">Enviar formularios con: </p>
      <select name="select" class="extension-form__select" id="select-values-forms">
        <option value="" selected style=""></option>
        <option value="1">NUNCA</option>
        <option value="2">A VECES</option>
        <option value="3">SIEMPRE</option>
      </select>
      <button class="extension-form__button" type="submit">Enviar</button>
      </div>
    </td>
`;

  multipleFormTable?.insertAdjacentElement("beforebegin", newDiv);

  const buttonSubmitt = document.querySelector(".extension-form__button");
  buttonSubmitt?.addEventListener("click", (e) => {
    e.preventDefault();

    const select = document.getElementById(
      "select-values-forms",
    ) as HTMLSelectElement;
    const value = select.value;

    links.forEach((link) => {
      if (value === "") return;
      fillGlobalEvaluationForms(link, value as ValueCheck);
    });
  });
};