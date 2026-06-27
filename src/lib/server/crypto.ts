import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

/**
 * Encrypts a string using AES-256-GCM.
 * @param text The text to encrypt.
 * @param secret The secret key (should be at least 32 characters).
 */
export function encrypt(text: string, secret: string): string {
	const key = crypto.createHash("sha256").update(secret).digest();
	const iv = crypto.randomBytes(IV_LENGTH);
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	const authTag = cipher.getAuthTag().toString("hex");
	return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an encrypted string using AES-256-GCM.
 * @param encryptedText The encrypted text in the format "iv:authTag:encryptedContent".
 * @param secret The secret key (should be at least 32 characters).
 */
export function decrypt(encryptedText: string, secret: string): string | null {
	try {
		const parts = encryptedText.split(":");
		if (parts.length !== 3) return null;
		const [ivHex, authTagHex, encrypted] = parts;
		const key = crypto.createHash("sha256").update(secret).digest();
		const iv = Buffer.from(ivHex, "hex");
		const authTag = Buffer.from(authTagHex, "hex");
		const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
		decipher.setAuthTag(authTag);
		let decrypted = decipher.update(encrypted, "hex", "utf8");
		decrypted += decipher.final("utf8");
		return decrypted;
	} catch (_e) {
		return null;
	}
}
