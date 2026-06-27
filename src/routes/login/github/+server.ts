import type { RequestHandler } from "@sveltejs/kit";
import { getAuthorizationUrl } from "$lib/server/github";

export const GET: RequestHandler = async (event) => {
	const redirectUri = new URL("/login/github/callback", event.url.origin).toString();
	const authorizationUrl = getAuthorizationUrl(redirectUri);

	return new Response(null, {
		status: 302,
		headers: {
			Location: authorizationUrl,
		},
	});
};
