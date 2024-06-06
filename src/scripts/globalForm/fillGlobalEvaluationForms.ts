import values from "../../../public/values.json";

interface FormData {
  [key: string]: string | { [key: string]: string };
}

export const getHtml = async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  return doc;
};

export type ValueCheck = "1" | "2" | "3";

export const fillGlobalEvaluationForms = async (
  link: string,
  value: ValueCheck,
) => {
  const doc = await getHtml(link);

  const action = doc.querySelector("form")?.getAttribute("action");

  let url: string[] | string = window.location.href.split("/");
  url.pop();
  url = url.join("/");

  const viewState = (
    doc.querySelector('input[name="__VIEWSTATE"]') as HTMLInputElement
  ).value;
  const viewStateGenerator = (
    doc.querySelector('input[name="__VIEWSTATEGENERATOR"]') as HTMLInputElement
  ).value;
  const eventValidation = (
    doc.querySelector('input[name="__EVENTVALIDATION"]') as HTMLInputElement
  ).value;

  const form = new FormData();
  form.append("__EVENTTARGET", "");
  form.append("__EVENTARGUMENT", "");
  form.append("__VIEWSTATE", viewState);
  form.append("__VIEWSTATEGENERATOR", viewStateGenerator);
  form.append("__EVENTVALIDATION", eventValidation);
  form.append("ctl00$mainCopy$Aceptar", "Aceptar");

  const typedValues: FormData = values[value] as unknown as FormData; // Casting to the defined type
  for (const key in typedValues) {
    form.append(key, typedValues[key] as string);
  }

  try {
    const response = await fetch(`${url}/${action}`, {
      method: "POST",
      body: form,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!response.ok) throw new Error("Error");

    console.log("Formulario enviado correctamente");
  } catch (error) {
    console.log(error);
  }
};
