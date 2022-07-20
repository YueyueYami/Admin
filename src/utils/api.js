import https from './request'
export function login(data) {
    return https({
        method: 'POST',
        url: '/login',
        data
    })
}
export function menulist(data) {
    return https({
        method: 'GET',
        url: '/menus',
        data
    })
}