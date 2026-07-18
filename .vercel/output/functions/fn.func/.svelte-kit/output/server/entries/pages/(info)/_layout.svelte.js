import { G as slot } from "../../../chunks/index.js";
function _layout($$payload, $$props) {
  $$payload.out += `<div class="flex min-h-svh flex-col items-center px-4 py-20"><div class="card w-full max-w-prose p-6 sm:p-10"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div></div>`;
}
export {
  _layout as default
};
