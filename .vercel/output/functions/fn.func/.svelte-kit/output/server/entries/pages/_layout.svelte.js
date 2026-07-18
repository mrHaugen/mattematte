import { F as head, G as slot } from "../../chunks/index.js";
const app = "";
function _layout($$payload, $$props) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>mattematte.no</title>`;
    $$payload2.out += `<script defer="" data-domain="mattematte.no" src="https://plausible.io/js/script.js"><\/script><!---->`;
  });
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!---->`;
}
export {
  _layout as default
};
