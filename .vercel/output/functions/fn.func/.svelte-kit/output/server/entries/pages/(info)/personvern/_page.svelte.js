import { B as BackButton } from "../../../../chunks/BackButton.js";
function _page($$payload) {
  BackButton($$payload, { url: "/" });
  $$payload.out += `<!----> <div class="flex flex-col space-y-4"><h1 class="text-2xl font-extrabold">Personvernerklæring for mattematte.no</h1> <div class="space-y-4 leading-relaxed text-slate-600"><p>Vi benytter plausible.io for å hente inn <span class="font-bold">anonymisert aggregert statistikk</span> om bruk av nettsiden.</p> <p>mattematte.no samler ikke inn noen opplysninger som kan identifisere deg som bruker.</p> <p>mattematte.no er utviklet av Brage Haugen.</p> <p class="pt-2">Har du spørmål kan du kontakte meg på post@1618.no eller +47 924 90 968.</p></div></div>`;
}
export {
  _page as default
};
