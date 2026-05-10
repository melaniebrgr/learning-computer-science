addResourcesToCache = async (resources) => {
	const cache = await caches.open('v2');
	await cache.addAll(resources);
};


self.addEventListener('install', (event) => {
	event.waitUntil(
		addResourcesToCache([
			'index.html',
			'style.css',
		])
	);
});