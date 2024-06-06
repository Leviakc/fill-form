export type ValueCheck = "" | "1" | "2" | "3";

export function checkedInputValue(
  checkLists: NodeListOf<HTMLInputElement>[],
  value: ValueCheck,
) {
  checkLists.forEach((checkList) => {
    const buttonSpan = checkList[0]!
      .closest("table")
      ?.nextElementSibling!.querySelector("input")!;

    checkList.forEach((input) => {
      if (value === "") {
        input.checked = false;
      }

      if (value === "1") {
        input.checked = false;
        buttonSpan!.checked = true;
        return;
      }

      if (value === "2") {
        const random = Math.random() >= 0.5;
        random ? (input.checked = true) : (input.checked = false);
      }

      if (value === "3") {
        input.checked = true;
      }

      buttonSpan!.checked = false;
    });
  });
}
