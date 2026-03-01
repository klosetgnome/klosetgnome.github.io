/*
 * ==========================================
 *  AUTHORISED USERS
 * ==========================================
 *
 *  This is the only part you need to edit.
 *
 *  HOW TO ADD A USER:
 *    1. Open hash-generator.html in your browser
 *    2. Enter the new user's username & password
 *    3. Click "Generate Hash"
 *    4. Copy the ready-to-paste line
 *    5. Paste it below (one line per user)
 *
 *  HOW TO REMOVE A USER:
 *    Delete their line from the list below.
 *
 *  IMPORTANT:
 *    - Keep the square brackets [ ] and the semicolon ;
 *    - Each line needs quotes around the hash and a comma at the end
 *    - The comment after // is optional, just helps you remember who's who
 */

const AUTHORISED_HASHES = [
    
    // Paste new user hashes below this line:
    "77b2764121f8c7b8070ec081191e7ca3e9e30f7d7bad68a7896703a48464325d", // nialfernandes

    
    // Paste new user hashes above this line:

];


/* =======================================================================
 *  ⚠️  STOP — Nothing below here needs editing.
 *  The rest is helper code used by the login system.
 * ======================================================================= */

async function hashCredentials(username, password) {
    const plain = username.toLowerCase().trim() + ":" + password;
    const encoded = new TextEncoder().encode(plain);
    const buffer = await crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function verifyCredentials(username, password) {
    const hash = await hashCredentials(username, password);
    return AUTHORISED_HASHES.includes(hash);
}

function isRemembered() {
    const stored = localStorage.getItem("dev_auth_hash");
    return stored && AUTHORISED_HASHES.includes(stored);
}

function rememberAuth(hash) {
    localStorage.setItem("dev_auth_hash", hash);
}

function forgetAuth() {
    localStorage.removeItem("dev_auth_hash");
}
