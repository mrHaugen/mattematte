

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.8bc10196.js","_app/immutable/chunks/disclose-version.f90a6af0.js","_app/immutable/chunks/runtime.883192d8.js","_app/immutable/chunks/render.84e86e6c.js","_app/immutable/chunks/svelte-head.b1e15c9c.js","_app/immutable/chunks/stores.750c04d4.js","_app/immutable/chunks/singletons.be1c919b.js","_app/immutable/chunks/store.047f9889.js"];
export const stylesheets = [];
export const fonts = [];
