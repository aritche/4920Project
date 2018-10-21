
export function isOnAccountDashboardPage() {
    return sessionStorage.getItem('accountDashboardPage') === 'true';
}

export function setOnAccountDashboardPage(accountDashboardPage) {
    sessionStorage.setItem('accountDashboardPage', accountDashboardPage);
}