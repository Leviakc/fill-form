import {
  checkLists,
  inputSpanValues,
  selects,
  tds,
} from "../consts/domElements";

tds.forEach((td) => {
  const regex = /^[1-9]/;
  const tdParent = td.parentElement;

  if (regex.test(td.innerHTML)) {
    if (tdParent?.querySelector("select")) {
      return selects.push(
        tdParent.querySelector("select") as HTMLSelectElement,
      );
    }

    checkLists.push(
      tdParent
        ?.closest("table")
        ?.nextElementSibling?.querySelectorAll("input")!,
    );
  }
});

type ValueCheck = "" | "1" | "2" | "3";

export function checkedInputValue(value: ValueCheck) {
  checkLists.forEach((checkList) => {
    const buttonSpan = checkList[0]!
      .closest("table")
      ?.nextElementSibling!.querySelector("input")!;
    console.log(buttonSpan.getAttribute("name"));

    checkList.forEach((input) => {
      if (value === "") {
        input.checked = false;
        buttonSpan!.checked = false;
      }

      if (value === "1") {
        input.checked = false;
        buttonSpan!.checked = true;
      }
      if (value === "2") {
        const random = Math.random() >= 0.5;
        random ? (input.checked = true) : (input.checked = false);
        buttonSpan!.checked = false;
      }
      if (value === "3") {
        input.checked = true;
        buttonSpan!.checked = false;
      }
    });
  });
}

export const fillFormSaes = (e: Event) => {
  const target = e.target as HTMLSelectElement;

  selects.forEach((select) => {
    const td =
      select.parentElement?.parentElement?.querySelector("td")?.innerText;

    inputSpanValues.push(select?.getAttribute("name") as string)!;

    if (td?.startsWith("9")) {
      return (select.value = "1");
    }

    return (select.value = target.value);
  });

  checkedInputValue(target.value as ValueCheck);
};
