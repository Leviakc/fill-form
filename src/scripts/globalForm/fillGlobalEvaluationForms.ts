import { checkedInputValue, type ValueCheck } from "../utils/changeInputValues";
import { getDomElements, getFormCheckLists } from "../utils/getDomElements";
import { selectFormOptions } from "../utils/selectFormOptions";

export const getHtml = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    return doc;
  } catch (error) {
    console.error(`Error fetching HTML from ${url}:`, error);
    throw error; // Rethrow to handle it in the calling function
  }
};

export const fillGlobalEvaluationForms = async (
  link: string,
  value: ValueCheck,
) => {
  try {
    const doc = await getHtml(link);
    const { tds, selects } = getDomElements(doc);
    const checkLists = getFormCheckLists(tds);
    const form = doc.querySelector("form");

    if (!form) {
      console.error(`No form found at ${link}`);
      return;
    }

    console.log(form.action);

    const submitButton = doc.querySelector(
      "input[type=submit]",
    ) as HTMLInputElement;

    if (!submitButton) {
      console.error(`No submit button found in the form at ${link}`);
      return;
    }

    selectFormOptions(selects, value);
    checkedInputValue(checkLists, value);

    const formData = new FormData(form);

    const idButton = submitButton.getAttribute("id") || "";
    const valueButton = submitButton.getAttribute("value") || "";
    formData.append(idButton, valueButton);

    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log(`Form submitted successfully to ${form.action}`);
    } else {
      console.error(`Form submission failed for ${form.action}`);
    }
  } catch (error) {
    console.error(`Error processing form at ${link}:`, error);
  }
};
