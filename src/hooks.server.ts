import { type Handle, redirect } from "@sveltejs/kit";
import { ALLOWED_GITHUB_USER, SESSION_SECRET } from "$env/static/private";
import { decrypt } from "$lib/server/crypto";

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get("session_token");
	let user = null;

	if (sessionToken) {
		const username = decrypt(sessionToken, SESSION_SECRET);
		if (username === ALLOWED_GITHUB_USER) {
			user = { username };
		}
	}

	event.locals.user = user;

	const path = event.url.pathname;

	// Define public routes
	const isPublicRoute =
		path === "/login" ||
		path.startsWith("/login/github") ||
		path === "/manifest.json" ||
		path === "/service-worker.js" ||
		path === "/favicon.ico" ||
		path.startsWith("/icon-");

	// Redirect unauthenticated requests on private routes
	if (!user && !isPublicRoute) {
		throw redirect(302, "/login");
	}

	// Redirect authenticated users away from the login page
	if (user && path === "/login") {
		throw redirect(302, "/");
	}

	return resolve(event);
};
