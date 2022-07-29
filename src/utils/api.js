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
export function editUser(data) { //编辑用户
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
        method: 'PUT',
        url: `/users/${data.id}/role`,
        data
    })
}
export function getRights(data) { //获取权限列表
    return https({
        method: 'GET',
        url: '/rights/list',
        data
    })
}
export function addRoles(data) { //添加角色
    return https({
        method: 'POST',
        url: 'roles',
        data
    })
}
export function delRoles(data) { //删除角色
    return https({
        method: 'DELETE',
        url: `/roles/${data}`,
        data
    })
}
export function editRoles(data) { //删除角色
    return https({
        method: 'PUT',
        url: `/roles/${data.id}`,
        data
    })
}
export function getTreeRight(data) { //树状权限列表
    return https({
        method: 'GET',
        url: `rights/tree`,
        data
    })
}
export function addTreeRight(data) { //分配角色权限
    return https({
        method: 'POST',
        url: `roles/${data.id}/rights`,
        data
    })
}
export function delRights(data) { //删除指定权限
    return https({
        method: 'DELETE',
        url: `roles/${data.id}/rights/${data.rid}`,
        data
    })
}
export function getGoods(data) { //获取商品列表
    return https({
        method: 'GET',
        url: 'goods',
        params: data
    })
}
export function getGoodsCate(data) { //获取商品分类
    return https({
        method: 'GET',
        url: 'categories',
        params: data
    })
}
export function addGoodStatus(data, sel) { //添加动态或静态参数
    return https({
        method: 'GET',
        url: `categories/${data}/attributes`,
        params: { sel }
    })
}
export function addGoods(data) { //添加商品
    return https({
        method: 'POST',
        url: 'goods',
        data
    })
}
export function delGoodsApi(data) { //删除商品
    return https({
        method: 'DELETE',
        url: `/goods/${data}`,
        data
    })
}
export function delGoodsCate(id) { //删除分类
    return https({
        method: 'DELETE',
        url: `/categories/${id}`,
    })
}
export function addGoodsCate(data) { //添加分类
    return https({
        method: 'POST',
        url: '/categories/',
        data
    })
}
export function getCategoriesList(data) { // 参数列表
    return https({
        url: `/categories/${data.id}/attributes`,
        method: 'GET',
        params: data,
    })
}
export function deleteCategories(data) {
    return https({
        url: `categories/${data.id}/attributes/${data.attrid}`,
        method: 'DELETE',
        data,
    })
}
export function addCategories(data) {
    return https({
        url: `categories/${data.id}/attributes`,
        method: 'POST',
        data,
    })
}
// 编辑提交参数
export function editorCategories(data) {
    return https({
        url: `categories/${data.id}/attributes/${data.attrId}`,
        method: 'PUT',
        data,
    })
}
export function getOrders(data) {
    return https({
        url: '/orders',
        method: 'GET',
        params: data,
    })
}
export function getEchartsApi() { //Ecshop订单列表
    return https({
        url: '/reports/type/1',
        method: 'GET'
    })
}