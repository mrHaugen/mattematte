export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.2571f885.js","app":"_app/immutable/entry/app.5ea57293.js","imports":["_app/immutable/entry/start.2571f885.js","_app/immutable/chunks/index-client.b95ed134.js","_app/immutable/chunks/runtime.883192d8.js","_app/immutable/chunks/singletons.be1c919b.js","_app/immutable/entry/app.5ea57293.js","_app/immutable/chunks/runtime.883192d8.js","_app/immutable/chunks/render.84e86e6c.js","_app/immutable/chunks/svelte-head.b1e15c9c.js","_app/immutable/chunks/disclose-version.f90a6af0.js","_app/immutable/chunks/if.6ccad922.js","_app/immutable/chunks/proxy.b5510480.js","_app/immutable/chunks/this.64c6a156.js","_app/immutable/chunks/props.a2d8653d.js","_app/immutable/chunks/store.047f9889.js","_app/immutable/chunks/index-client.b95ed134.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js'))
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(info)/om",
				pattern: /^\/om\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(info)/personvern",
				pattern: /^\/personvern\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/v2",
				pattern: /^\/v2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(app)/[arithmeticOperation]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"arithmeticOperation","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/[arithmeticOperation]/time/[length]",
				pattern: /^\/([^/]+?)\/time\/([^/]+?)\/?$/,
				params: [{"name":"arithmeticOperation","optional":false,"rest":false,"chained":false},{"name":"length","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
