/*
 * credentials.js — Client-side credential store
 * 
 * Each entry is a SHA-256 hash of "username:password" (lowercase username).
 * Generate new hashes using hash-generator.html
 * 
 * To add a user:   Push a new hash string into the array.
 * To revoke a user: Remove their hash from the array.
 */

const AUTHORISED_HASHES = [
    // Example: username "demo" / password "password123"
    // Generated from: sha256("demo:password123")
    "5c5d10886e6e3ea48747810b90cfbb4a7cbc1ba53e21b5b57e29e4a2c77d68ea",
];

/**
 * Hash a username:password pair with SHA-256
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>} hex-encoded hash
 */
async function hashCredentials(username, password) {
    const plain = username.toLowerCase().trim() + ":" + password;
    const encoded = new TextEncoder().encode(plain);
    const buffer = await crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/**
 * Check if a username/password pair matches any authorised hash
 * @param {string} username
 * @param {string} password
 * @returns {Promise<boolean>}
 */
async function verifyCredentials(username, password) {
    const hash = await hashCredentials(username, password);
    return AUTHORISED_HASHES.includes(hash);
}

/**
 * Check if the user has previously authenticated (localStorage)
 * @returns {boolean}
 */
function isRemembered() {
    const stored = localStorage.getItem("dev_auth_hash");
    return stored && AUTHORISED_HASHES.includes(stored);
}

/**
 * Persist the authenticated hash to localStorage
 * @param {string} hash
 */
function rememberAuth(hash) {
    localStorage.setItem("dev_auth_hash", hash);
}

/**
 * Clear stored authentication
 */
function forgetAuth() {
    localStorage.removeItem("dev_auth_hash");
}
