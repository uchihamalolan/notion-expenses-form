import { type RequestHandler, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
	event.cookies.delete("session_token", { path: "/" });
	throw redirect(302, "/login");
};
