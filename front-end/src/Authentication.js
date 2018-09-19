
export function isLoggedIn() {
    return sessionStorage.getItem('authenticated') === 'true';
}

export function updateAuthentication(newAuthState, newUserId = -1) {
    sessionStorage.setItem('authenticated', newAuthState);
    sessionStorage.setItem('userId', newUserId);
}

export function getLoggedInUser() {
    return sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')) : -1;
}

export function logout() {
    sessionStorage.setItem('authenticated', false);
    sessionStorage.removeItem('userId');
}