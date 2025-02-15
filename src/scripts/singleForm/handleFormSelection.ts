import { type ValueCheck, checkedInputValue } from "../utils/changeInputValues";
import { getFormCheckLists } from "../utils/getDomElements";
import { selectFormOptions } from "../utils/selectFormOptions";
import { $$ } from "../utils/helpers";

export const handleFormSelection = (e?: Event | null, value?: ValueCheck) => {
	const target = e?.target as HTMLSelectElement;
	const selectedValue = (target?.value as ValueCheck) ?? value;
	const $tds = $$("td");
	const $selects = $$("select");
	const checkLists = getFormCheckLists($tds);

	selectFormOptions($selects, selectedValue);
	checkedInputValue(checkLists, selectedValue);
};
