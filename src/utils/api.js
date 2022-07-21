import https from './request'
export function login(data) { //登录
    return https({
        method: 'POST',
        url: '/login',
        data
    })
}
export function menulist(data) { // 获取菜单列表
    return https({
        method: 'GET',
        url: '/menus',
        data
    })
}
export function getUsers(data) { //获取用户列表
    return https({
        method: 'GET',
        url: '/users',
        params: data
    })
}
export function delUser(data) { // 删除用户
    return https({
        method: 'DELETE',
        url: '/users/' + data
    })
}
export function userStatus(data) { //改变用户状态
    console.log(data);
    return https({
        method: 'PUT',
        url: `users/${data.id}/state/${data.mg_state}`,
        data
    })
}
export function addUser(data) { //添加用户
    return https({
        method: 'POST',
        url: '/users',
        data
    })
}
export function editUser(data) { //编辑用户，按id搜索
    return https({
        method: 'PUT',
        url: `users/${data.id}`,
        data
    })
}
export function getRoles(data) { //获取角色列表
    return https({
        method: 'GET',
        url: '/roles',
        data
    })
}
export function setUserRoles(data) { //修改分配角色
    return https({
        methods: 'PUT',
        url: `users/${data.id}/?role=${data.rid}`,
        data
    })
}