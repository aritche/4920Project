let authenticated = false;
let userId = -1;

export function isLoggedIn() {
    return authenticated;
}

export function updateAuthentication(newAuthState, newUserId = -1) {
    authenticated = newAuthState;
    userId = newUserId;
}