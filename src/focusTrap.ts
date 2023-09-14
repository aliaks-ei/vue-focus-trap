import type { Directive } from "vue";

export type ExtendedHTMLElement = HTMLElement & {
  _keydownListener?: EventListener;
  _returnFocusToElement?: HTMLElement | null;
};

// List of tabbable elements (based on https://allyjs.io/data-tables/focusable.html)
const TABBABLE_ELEMENTS = [
  "a[href]",
  "a[xlink\\:href]", // SVG <a> elements
  "area[href]",
  "audio[controls]",
  "button:not([disabled]):not([aria-hidden])",
  "embed",
  "iframe",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "object",
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "video[controls]",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])',
];

// Returns an array of tabbable nodes inside the element
const getTabbableNodes = (el: HTMLElement): HTMLElement[] => {
  const nodes = el.querySelectorAll(TABBABLE_ELEMENTS.join(", "));

  return Array.from(nodes) as HTMLElement[];
};

// Tries to set focus to the first tabbable node inside the element
const setFocusToFirstNode = (el: HTMLElement) => {
  const tabbableNodes = getTabbableNodes(el);

  tabbableNodes[0]?.focus();
};

const retainFocus = (el: HTMLElement, event: KeyboardEvent) => {
  let tabbableNodes = getTabbableNodes(el);

  // If no tabbable nodes, return immediately
  if (!tabbableNodes.length) return;

  // Filters nodes which are hidden to prevent focus leak outside the modal
  tabbableNodes = tabbableNodes.filter((node) => {
    return node.offsetParent !== null;
  });

  if (!el.contains(document.activeElement)) {
    tabbableNodes[0]?.focus();
    return;
  }

  const focusedItemIndex = tabbableNodes.indexOf(
    document.activeElement as HTMLElement,
  );

  /**
   * If the Shift key is being pressed while tabbing (moving backwards)
   * and the currently focused item is the first one, move focus to the last item
   **/
  if (event.shiftKey && focusedItemIndex === 0) {
    tabbableNodes[tabbableNodes.length - 1]?.focus();
    event.preventDefault();
  }

  /**
   * If the Shift key is not being pressed (moving forwards)
   * and the currently focused item is the last one, move focus to the first item
   **/
  if (
    !event.shiftKey &&
    tabbableNodes.length > 0 &&
    focusedItemIndex === tabbableNodes.length - 1
  ) {
    tabbableNodes[0]?.focus();
    event.preventDefault();
  }
};

// Handles keydown event for focus trap
const handleKeyDownEvent = (el: HTMLElement, event: KeyboardEvent) => {
  if (event.key === "Tab") {
    retainFocus(el, event);
  }
};

// Adds a keydown listener to document and stores it on the element
const addKeyDownListener = (
  el: ExtendedHTMLElement,
  listener: EventListener,
) => {
  document.addEventListener("keydown", listener);
  el._keydownListener = listener;
};

// Removes the keydown listener from document and deletes it from the element
const removeKeyDownListener = (el: ExtendedHTMLElement) => {
  if (el._keydownListener) {
    document.removeEventListener("keydown", el._keydownListener);

    delete el._keydownListener;
  }
};

// Directive definition
export default {
  mounted(el, binding) {
    if (binding.value) {
      const listener = handleKeyDownEvent.bind(null, el) as EventListener;

      addKeyDownListener(el, listener);
      setFocusToFirstNode(el);
    }
  },
  updated(el, binding) {
    removeKeyDownListener(el);

    if (binding.value) {
      const listener = handleKeyDownEvent.bind(null, el) as EventListener;
      el._returnFocusToElement = document.activeElement as HTMLElement | null;

      addKeyDownListener(el, listener);
      setFocusToFirstNode(el);
    } else {
      el._returnFocusToElement?.focus();
    }
  },
  unmounted(el) {
    removeKeyDownListener(el);

    delete el._returnFocusToElement;
  },
} as Directive<ExtendedHTMLElement, boolean>;
