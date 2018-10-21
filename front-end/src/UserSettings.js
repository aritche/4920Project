
export function isOnAccountDashboardPage() {
    return sessionStorage.getItem('accountDashboardPage') !== 'false';
}

export function setOnAccountDashboardPage(accountDashboardPage) {
    sessionStorage.setItem('accountDashboardPage', accountDashboardPage);
}