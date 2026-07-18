

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.2a2deb3d.js","_app/immutable/chunks/disclose-version.f90a6af0.js","_app/immutable/chunks/runtime.883192d8.js","_app/immutable/chunks/svelte-head.b1e15c9c.js","_app/immutable/chunks/slot.54e3fe60.js"];
export const stylesheets = ["_app/immutable/assets/0.18c9dccf.css"];
export const fonts = [];
