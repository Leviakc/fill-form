import type { Link, Links } from "./getDomElements";

type StorageName = "saes-forms" | "forms-link";

export const getLocalStorage = (
	storageName: StorageName = "saes-forms",
): Links | [] => {
	const saesLinks = localStorage.getItem(storageName);
	return saesLinks ? (JSON.parse(saesLinks) as Links) : [];
};

export const setLocalStorage = (
	links: Links,
	storageName: StorageName = "saes-forms",
) => {
	localStorage.setItem(storageName, JSON.stringify(links));
};

export const removeLocalStorageItem = (currentItem: Link) => {
	const items = getLocalStorage() as Links;

	if (items.length === 1) {
		removeLocalStorage("saes-forms");
		return;
	}

	const newLinks = items.filter((item) => item.link !== currentItem.link);
	setLocalStorage(newLinks);
};

export const removeLocalStorage = (storageName: StorageName) => {
	localStorage.removeItem(storageName);
};
