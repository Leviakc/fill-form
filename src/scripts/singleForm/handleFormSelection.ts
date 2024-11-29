import { type ValueCheck, checkedInputValue } from "../utils/changeInputValues";
import { getDomElements, getFormCheckLists } from "../utils/getDomElements";
import { selectFormOptions } from "../utils/selectFormOptions";

export const handleFormSelection = (e?: Event | null, value?: ValueCheck) => {
  const target = e?.target as HTMLSelectElement;
  const selectedValue = (target?.value as ValueCheck) ?? value;

  const { tds, selects } = getDomElements(document);
  const checkLists = getFormCheckLists(tds);

  selectFormOptions(selects, selectedValue);
  checkedInputValue(checkLists, selectedValue);
};
