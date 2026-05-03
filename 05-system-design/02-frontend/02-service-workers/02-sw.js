self.addEventListener("install", (event) => {
    event.waitUntil(async () => {
        const cache = await caches.open("v1");
        await cache.addAll([
            "style.css"
        ]);
    });
});