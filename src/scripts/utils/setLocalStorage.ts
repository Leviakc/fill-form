import { Link, Links } from "./getDomElements";

export const getLocalStorage = () => {
  const saesLinks = localStorage.getItem("saes-forms");
  return saesLinks ? (JSON.parse(saesLinks) as Links) : [];
};

export const setLocalStorage = (links: Links) => {
  localStorage.setItem("saes-forms", JSON.stringify(links));
};

export const removeLocalStorageItem = (currentItem: Link) => {
  const items = getLocalStorage();

  if (items.length === 1) {
    localStorage.removeItem("saes-forms");
    return;
  }

  const newLinks = items.filter((item) => item.link !== currentItem.link);
  setLocalStorage(newLinks);
};
