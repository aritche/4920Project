let authenticated = false;

export function isLoggedIn() {
    return authenticated;
}

export function updateAuthentication(newAuthState) {
    authenticated = newAuthState;
}