import { type ValueCheck, checkedInputValue } from "../utils/changeInputValues";
import { getDomElements, getFormCheckLists } from "../utils/getDomElements";
import { selectFormOptions } from "../utils/selectFormOptions";

export const fillFormSaes = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selectedValue = target.value as ValueCheck;
  const { tds, selects } = getDomElements(document);
  const checkLists = getFormCheckLists(tds);

  selectFormOptions(selects, selectedValue);
  checkedInputValue(checkLists, selectedValue);
};
