import { L as ensure_array_like, M as attr, N as stringify, J as store_get, I as escape_html, K as unsubscribe_stores, O as bind_props, E as pop, B as push } from "../../../../chunks/index.js";
import { B as BackButton } from "../../../../chunks/BackButton.js";
import { p as page } from "../../../../chunks/stores.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  const times = [0.5, 1, 2, 5, 10, 20];
  function timeLabel(time) {
    if (time === 0.5)
      return { value: "30", unit: "sekunder" };
    return {
      value: String(time),
      unit: time === 1 ? "minutt" : "minutter"
    };
  }
  const each_array = ensure_array_like(times);
  BackButton($$payload, { url: "/" });
  $$payload.out += `<!----> <div class="w-full max-w-sm"><h1 class="text-center text-2xl font-extrabold" aria-label="Use links below to select duration of excercise">Challenge</h1> <p class="mb-6 mt-1 text-center text-sm font-semibold text-slate-400">Hvor lenge vil du øve?</p> <div class="grid grid-cols-2 gap-3"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let time = each_array[$$index];
    $$payload.out += `<a${attr("href", `/${stringify(store_get($$store_subs ??= {}, "$page", page).params.arithmeticOperation)}/time/${stringify(time)}`)} class="btn btn-white flex-col py-4"><span class="text-3xl font-extrabold">${escape_html(timeLabel(time).value)}</span> <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">${escape_html(timeLabel(time).unit)}</span></a>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
