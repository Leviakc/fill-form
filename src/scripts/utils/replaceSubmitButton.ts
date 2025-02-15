export const replaceSubmitButton = (submitButton: Element | null) => {
	const newSubmitButton = submitButton?.cloneNode(true) as HTMLButtonElement;

	submitButton?.remove();
	newSubmitButton?.setAttribute("class", "extension-form__button");
	return newSubmitButton;
};
