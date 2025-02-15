import { ValueCheck } from "./changeInputValues";
import { getLocalStorage, setLocalStorage } from "./localStorage";

export type Link = { link: string; value: ValueCheck };

export type Links = Link[];

export const getFormCheckLists = (tds: NodeListOf<HTMLTableCellElement>) => {
	const checkLists: NodeListOf<HTMLInputElement>[] = [];

	tds.forEach((td) => {
		const regex = /^[1-9]/;
		const tdParent = td.parentElement;

		if (regex.test(td.innerHTML) && !tdParent?.querySelector("select")) {
			checkLists.push(
				tdParent
					?.closest("table")
					?.nextElementSibling?.querySelectorAll("input")!,
			);
		}
	});
	return checkLists;
};

export const getFormLinks = (
	table: HTMLTableElement | null,
	value: ValueCheck,
) => {
	const imgs = table?.querySelectorAll("img");
	const links: Links = [];

	imgs?.forEach((img) => {
		const link = img.parentElement?.getAttribute("href")!;

		const url =
			window.location.href.split("/").slice(0, -1).join("/") + "/" + link;
		const urlEncoded = encodeURI(url);
		const formObj = {
			link: urlEncoded,
			value,
		};
		links.push(formObj);
	});

	setLocalStorage(links);
	const linksArray = getLocalStorage();

	return {
		linksArray,
	};
};
