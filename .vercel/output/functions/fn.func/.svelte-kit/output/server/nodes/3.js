

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(info)/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.04055a8e.js","_app/immutable/chunks/disclose-version.f90a6af0.js","_app/immutable/chunks/runtime.883192d8.js","_app/immutable/chunks/slot.54e3fe60.js"];
export const stylesheets = [];
export const fonts = [];
