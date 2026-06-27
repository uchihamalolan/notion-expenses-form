import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";

/**
 * Returns the GitHub OAuth authorization URL.
 */
export function getAuthorizationUrl(redirectUri: string): string {
	const params = new URLSearchParams({
		client_id: GITHUB_CLIENT_ID,
		redirect_uri: redirectUri,
		scope: "read:user",
		state: Math.random().toString(36).substring(2, 15), // simple CSRF prevention
	});
	return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

/**
 * Exchanges the OAuth code for a GitHub Access Token.
 */
export async function getAccessToken(code: string, redirectUri: string): Promise<string> {
	const response = await fetch("https://github.com/login/oauth/access_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			client_id: GITHUB_CLIENT_ID,
			client_secret: GITHUB_CLIENT_SECRET,
			code,
			redirect_uri: redirectUri,
		}),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`GitHub token exchange failed: ${response.status} ${text}`);
	}

	const data = (await response.json()) as {
		access_token?: string;
		error?: string;
		error_description?: string;
	};
	if (data.error || !data.access_token) {
		throw new Error(data.error_description || data.error || "Failed to retrieve access token");
	}

	return data.access_token;
}

/**
 * Retrieves the authenticated user's profile from GitHub.
 */
export async function getUserProfile(accessToken: string): Promise<{ login: string }> {
	const response = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"User-Agent": "Notion-Expenses-PWA", // User-Agent is required by GitHub API
		},
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Failed to fetch GitHub profile: ${response.status} ${text}`);
	}

	return (await response.json()) as { login: string };
}
