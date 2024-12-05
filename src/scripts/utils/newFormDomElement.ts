// type K extends keyof HTMLElementTagNameMap
type HtmlElementType = keyof HTMLElementTagNameMap;

export const createSelectionElement = (
  htmlElement: HtmlElementType,
  buttonElement?: Element,
) => {
  const newElement = document.createElement(htmlElement);

  const newButton = buttonElement
    ? ""
    : '<button class="extension-form__button" type="submit">Enviar</button>';

  newElement.innerHTML = `
    <td colspan="3" id="td-select-saes-form">
      <div class="extension-form__div ${buttonElement ? "" : "m-2"}">
        <p class="extension-form__p">Enviar ${buttonElement ? "formulario" : "todos los formularios"} con: </p>
        <select name="select" class="extension-form__select" id="select-values-form">
          <option value="" selected style=""></option>
          <option value="1">NUNCA</option>
          <option value="2">A VECES</option>
          <option value="3">SIEMPRE</option>
        </select>
        ${newButton}
      </div>
    </td>
  `;

  if (buttonElement) {
    const divElement = newElement.querySelector(".extension-form__div");
    if (divElement) {
      divElement.appendChild(buttonElement);
    }
  }

  return newElement;
};
