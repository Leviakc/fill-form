/**
 * A utility function that simplifies `document.querySelector` and maintains type inference.
 *
 * @template T - A tag name from `HTMLElementTagNameMap` or `SVGElementTagNameMap` for precise typing.
 * @template E - A fallback generic for arbitrary elements if the selector is not a standard tag name.
 * @param {T | string} selector - A CSS selector string to match elements in the DOM.
 * @returns {HTMLElementTagNameMap[T] | SVGElementTagNameMap[T] | E | null} The first matched element or `null` if no match is found.
 *
 * @example
 * const div = $('div'); // HTMLDivElement | null
 * const svg = $('svg'); // SVGSVGElement | null
 * const custom = $('.custom'); // Element | null
 */
function $<T extends keyof HTMLElementTagNameMap>(
	selector: T,
): HTMLElementTagNameMap[T] | null;
function $<T extends keyof SVGElementTagNameMap>(
	selector: T,
): SVGElementTagNameMap[T] | null;
function $<E extends Element = Element>(selector: string): E | null;
function $(selector: string): Element | null {
	return document.querySelector(selector);
}

/**
 * A utility function that simplifies `document.querySelectorAll` and maintains type inference.
 *
 * @template T - A tag name from `HTMLElementTagNameMap` or `SVGElementTagNameMap` for precise typing.
 * @template E - A fallback generic for arbitrary elements if the selector is not a standard tag name.
 * @param {T | string} selector - A CSS selector string to match elements in the DOM.
 * @returns {NodeListOf<HTMLElementTagNameMap[T]> | NodeListOf<SVGElementTagNameMap[T]> | NodeListOf<E>}
 * A `NodeListOf` containing all matched elements.
 *
 * @example
 * const divs = $$('div'); // NodeListOf<HTMLDivElement>
 * const svgs = $$('svg'); // NodeListOf<SVGSVGElement>
 * const customElements = $$('.custom'); // NodeListOf<Element>
 */
function $$<T extends keyof HTMLElementTagNameMap>(
	selector: T,
): NodeListOf<HTMLElementTagNameMap[T]>;
function $$<T extends keyof SVGElementTagNameMap>(
	selector: T,
): NodeListOf<SVGElementTagNameMap[T]>;
function $$<E extends Element = Element>(selector: string): NodeListOf<E>;
function $$(selector: string): NodeListOf<Element> {
	return document.querySelectorAll(selector);
}

export { $, $$ };
