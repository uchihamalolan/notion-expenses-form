/// <reference types="@sveltejs/kit" />
import { build, files, version } from "$service-worker";

const CACHE_NAME = `cache-${version}`;
const ASSETS = [...build, ...files];

// biome-ignore lint/suspicious/noExplicitAny: self typing in service worker is complex
self.addEventListener("install", (event: any) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(ASSETS))
			// biome-ignore lint/suspicious/noExplicitAny: self typing is complex
			.then(() => (self as any).skipWaiting()),
	);
});

// biome-ignore lint/suspicious/noExplicitAny: self typing in service worker is complex
self.addEventListener("activate", (event: any) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== CACHE_NAME) {
					await caches.delete(key);
				}
			}
			// biome-ignore lint/suspicious/noExplicitAny: self typing is complex
			await (self as any).clients.claim();
		}),
	);
});

// biome-ignore lint/suspicious/noExplicitAny: self typing in service worker is complex
self.addEventListener("fetch", (event: any) => {
	// Skip non-GET requests and requests to external APIs (like Notion or GitHub OAuth)
	if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
		return;
	}

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}
			return fetch(event.request);
		}),
	);
});
