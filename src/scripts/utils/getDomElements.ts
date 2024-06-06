export const getDomElements = (doc: Document) => {
  const tds = doc.querySelectorAll("td");
  const selects = doc.querySelectorAll("select");

  return {
    tds,
    selects,
  };
};

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
