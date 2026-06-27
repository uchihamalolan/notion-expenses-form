import { error, type RequestHandler, redirect } from "@sveltejs/kit";
import { ALLOWED_GITHUB_USER, SESSION_SECRET } from "$env/static/private";
import { encrypt } from "$lib/server/crypto";
import { getAccessToken, getUserProfile } from "$lib/server/github";

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get("code");

	if (!code) {
		throw error(400, "OAuth code not provided");
	}

	try {
		const redirectUri = new URL("/login/github/callback", event.url.origin).toString();
		const accessToken = await getAccessToken(code, redirectUri);
		const profile = await getUserProfile(accessToken);

		if (profile.login.toLowerCase() !== ALLOWED_GITHUB_USER.toLowerCase()) {
			throw error(403, `Access denied. User ${profile.login} is not authorized.`);
		}

		// Encrypt session token
		const sessionToken = encrypt(profile.login, SESSION_SECRET);

		// Set cookie
		event.cookies.set("session_token", sessionToken, {
			path: "/",
			httpOnly: true,
			secure: event.url.protocol === "https:",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 30, // 30 days
		});
	} catch (err) {
		const errorVal = err as Error;
		console.error("Authentication callback error:", errorVal);
		throw error(500, errorVal.message || "Failed to authenticate with GitHub");
	}

	throw redirect(302, "/");
};
