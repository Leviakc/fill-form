import type { ValueCheck } from "./changeInputValues";

export const selectFormOptions = (
  selects: NodeListOf<HTMLSelectElement>,
  selectedValue: ValueCheck,
) => {
  selects.forEach((select) => {
    const td =
      select.parentElement?.parentElement?.querySelector("td")?.innerText;

    if (td?.startsWith("9")) {
      return (select.value = "1");
    }

    return (select.value = selectedValue);
  });
};
