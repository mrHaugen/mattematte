

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.ddae7151.js","_app/immutable/chunks/disclose-version.f90a6af0.js","_app/immutable/chunks/runtime.883192d8.js","_app/immutable/chunks/slot.54e3fe60.js"];
export const stylesheets = [];
export const fonts = [];
