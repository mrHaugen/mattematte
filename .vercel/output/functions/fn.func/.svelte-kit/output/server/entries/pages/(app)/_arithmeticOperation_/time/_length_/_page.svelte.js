import { J as store_get, L as ensure_array_like, M as attr, N as stringify, I as escape_html, K as unsubscribe_stores, E as pop, B as push } from "../../../../../../chunks/index.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { B as BackButton } from "../../../../../../chunks/BackButton.js";
const Confetti_svelte_svelte_type_style_lang = "";
const AnswerButton_svelte_svelte_type_style_lang = "";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const arithmeticOperation = store_get($$store_subs ??= {}, "$page", page).params.arithmeticOperation;
  arithmeticOperation.charAt(0).toUpperCase() + arithmeticOperation.slice(1);
  const tablesArray = [
    { name: "one", value: 1 },
    { name: "two", value: 2 },
    { name: "three", value: 3 },
    { name: "four", value: 4 },
    { name: "five", value: 5 },
    { name: "six", value: 6 },
    { name: "seven", value: 7 },
    { name: "eight", value: 8 },
    { name: "nine", value: 9 }
  ];
  let storedValue = [];
  let selectedTables = storedValue;
  BackButton($$payload, { url: `/${arithmeticOperation}` });
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(tablesArray);
    $$payload.out += `<div class="flex w-full max-w-sm flex-col items-center"><h1 class="text-center text-2xl font-extrabold" aria-label="Use checkboxes below to select tables to practise. Start excercise with start-button at bottom.">Velg tabeller</h1> <p class="mt-1 text-center text-sm font-semibold text-slate-400">Hvilke tabeller vil du øve på?</p> <div class="grid grid-cols-3 gap-3 py-8"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let table = each_array[$$index];
      $$payload.out += `<label${attr("for", table.name)} class="cursor-pointer"><input${attr("checked", selectedTables.includes(table.value), true)}${attr("value", table.value)}${attr("id", table.name)}${attr("aria-describedby", `the $${stringify(table.name)} times table`)}${attr("name", table.name)} type="checkbox" class="peer sr-only"> <span aria-hidden="true" class="btn btn-white flex h-20 w-20 text-3xl font-extrabold text-slate-400 peer-checked:border-emerald-600 peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:hover:bg-emerald-400 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2">${escape_html(table.value)}</span></label>`;
    }
    $$payload.out += `<!--]--></div> <button class="btn btn-primary w-full py-3 text-xl"${attr("disabled", selectedTables.length === 0, true)}>Start</button></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
