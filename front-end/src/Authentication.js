
export function isLoggedIn() {
    return sessionStorage.getItem('authenticated') === 'true';
}

export function updateAuthentication(newAuthState, newUserId = -1, newUserType) {
    sessionStorage.setItem('authenticated', newAuthState);
    sessionStorage.setItem('userId', newUserId);
    sessionStorage.setItem('userType', newUserType);
}

export function getLoggedInUser() {
    return sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId'), 10) : -1;
}

export function getLoggedInUserType() {
    return sessionStorage.getItem('userType');
}

export function logout() {
    sessionStorage.setItem('authenticated', false);
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userType');
}