import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";
import { expect, test, vi, beforeEach } from "vitest";

import focusTrap, { type ExtendedHTMLElement } from "@/focusTrap";

Object.defineProperty(HTMLElement.prototype, "offsetParent", {
  get() {
    return this.parentNode;
  },
});

const spyAddEventListener = vi.spyOn(document, "addEventListener");
const spyRemoveEventListener = vi.spyOn(document, "removeEventListener");

const TEST_ATTRIBUTES = {
  FIRST_FOCUSABLE: "first-focusable",
  LAST_FOCUSABLE: "last-focusable",
};

const firstFocusableElQuery = `[data-test=${TEST_ATTRIBUTES.FIRST_FOCUSABLE}]`;
const lastFocusableElQuery = `[data-test=${TEST_ATTRIBUTES.LAST_FOCUSABLE}]`;

const TestComponent = defineComponent({
  template: `
    <div v-focus-trap="value" style="position: relative">
      <button data-test="${TEST_ATTRIBUTES.FIRST_FOCUSABLE}" type="button"> Close </button>

      <p> Some content 1 </p>
      <p tabindex="0"> Some content 2 </p>

      <a href="#"> Some link </a>
      <input type="text" data-test="${TEST_ATTRIBUTES.LAST_FOCUSABLE}" />
    </div>
  `,
  directives: { focusTrap },
  data: () => ({
    value: true,
  }),
});

const wrapper = mount(TestComponent, {
  attachTo: document.body,
});

test("sets focus to the first focusable element after mount", () => {
  expect(document.activeElement).toBe(wrapper.get(firstFocusableElQuery).element);
});

test("adds keydown event listener to target element after mount", () => {
  expect(spyAddEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
  expect(
    (wrapper.element as ExtendedHTMLElement)._keydownListener,
  ).not.toBeUndefined();
});

test("sets focus to the last focusable element after tabbing backwards from the first element", async () => {
  await wrapper.trigger("keydown", {
    key: "Tab",
    shiftKey: true,
  });

  expect(document.activeElement).toBe(wrapper.get(lastFocusableElQuery).element);
});

test("sets focus to the first focusable element after tabbing forwards from the last element", async () => {
  await wrapper.find(lastFocusableElQuery).trigger("focus");
  await wrapper.trigger("keydown", {
    key: "Tab",
  });

  expect(document.activeElement).toBe(wrapper.get(firstFocusableElQuery).element);
});

test("sets '_returnFocusToElement' property on target element after value has been updated to 'true'", async () => {
  await wrapper.setData({ value: false });
  expect(
    (wrapper.element as ExtendedHTMLElement)._returnFocusToElement,
  ).toBeUndefined();

  await wrapper.setData({ value: true });
  expect(
    (wrapper.element as ExtendedHTMLElement)._returnFocusToElement,
  ).not.toBeUndefined();
  console.log((wrapper.element as ExtendedHTMLElement)._returnFocusToElement)
});

test("removes keydown event listener from target element after unmount", () => {
  wrapper.unmount();

  expect(spyRemoveEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
  expect(
    (wrapper.element as ExtendedHTMLElement)._keydownListener,
  ).toBeUndefined();
});
