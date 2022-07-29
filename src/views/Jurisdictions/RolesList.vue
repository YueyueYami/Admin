<style lang="scss" scoped>
    .roles {
        width: 100%;
        height: 100%;
        background-color: #e9eef3;

        .card {
            margin-top: 20px;

            .table {

                .tags {
                    padding: 20px;
                }

                .el-row {
                    margin-bottom: 20px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                .el-col {
                    border-radius: 4px;
                }

                .bg-purple-dark {
                    background: #99a9bf;

                }

                .bg-purple {
                    background: #d3dce6;
                    display: flex;

                }

                .bg-purple-light {
                    background: #e5e9f2;
                }

                .grid-content {
                    border-radius: 4px;
                    min-height: 36px;

                }

                .row-bg {
                    padding: 10px 0;
                    background-color: #f9fafc;

                }
            }
        }
    }
</style>
<style>
    .ff {
        display: flex;
    }
</style>
<template>
    <div class="roles">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card">
            <el-button type="primary" @click="dialogFormVisible=!dialogFormVisible">添加角色</el-button>
            <el-table :data="roleslist" style="width: 100%;margin-top:20px;" border class="table">
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div class="tags">
                            <el-row v-for="item in scope.row.children" :key="item.id">
                                <el-col :span="4">
                                    <el-tag closable type="" @close="delRights(item.id,scope.row.id)">
                                        {{item.authName}}
                                    </el-tag>
                                </el-col>
                                <el-col :span="20">
                                    <el-row v-for="ele in item.children" :key="ele.id">
                                        <el-col :span="6">
                                            <el-tag closable type="success" @close="delRights(ele.id,scope.row.id)">
                                                {{ele.authName}}
                                            </el-tag>
                                        </el-col>
                                        <el-col :span="18">
                                            <el-row v-for="ela in ele.children" :key="ela.id">
                                                <el-col :span="24">
                                                    <el-tag closable type="warning" @close="delRights(ela.id,scope.row.id)">
                                                        {{ela.authName}}
                                                    </el-tag>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="delRoles(scope.row.id)">删除</el-button>
                        <el-button size="mini" type="primary" @click="openDisRights(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
            <el-form :model="rolesFrom">
                <el-form-item label="角色名称">
                    <el-input v-model="rolesFrom.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="rolesFrom.roleDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoles">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑角色" :visible.sync="dialogFormVisible1">
            <el-form :model="editRoles">
                <el-form-item label="角色名称">
                    <el-input v-model="editRoles.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="editRoles.roleDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="editRole">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="分配角色权限" :visible.sync="dialogFormVisible2">
            <el-tree ref="tree" default-expand-all :data="treeRight" show-checkbox node-key="id" :default-checked-keys="defaultChecKeys" :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addRoleRight">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getRoles, addRoles, delRoles, editRoles, getTreeRight, addTreeRight, delRights } from '../../utils/api'
    export default {
        data() {
            return {
                roleslist: [],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                rolesFrom: {
                    roleName: '',
                    roleDesc: ''
                },
                editRoles: {
                    id: '',
                    roleName: '',
                    roleDesc: ''
                },
                treeRight: [],
                defaultProps: {
                    children: 'children',
                    label: 'authName',
                },
                id: '',
                defaultChecKeys: []
            }
        },
        methods: {
            getRoleslist() { //获取角色列表
                getRoles().then(res => {
                    console.log(res.data.data)
                    this.roleslist = res.data.data
                })
            },
            addRoles() { //添加角色
                addRoles(this.rolesFrom).then(res => {
                    this.dialogFormVisible = false
                    this.getRoleslist()
                })
            },
            delRoles(id) { //删除角色
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delRoles(id).then(res => {
                        this.getRoleslist()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            openEdit(row) { //编辑角色弹框
                this.editRoles = {
                    id: row.id,
                    roleName: row.roleName,
                    roleDesc: row.roleDesc
                }
                this.dialogFormVisible1 = true
            },
            editRole() { //编辑角色
                editRoles(this.editRoles).then(res => {
                    this.dialogFormVisible1 = false
                    this.getRoleslist()
                })
            },
            openDisRights(row) { //分配权限弹框
                this.dialogFormVisible2 = true
                this.id = row.id
                getTreeRight().then(res => {
                    console.log(res.data.data);
                    this.treeRight = res.data.data
                })
                this.getRender(row, this.defaultChecKeys)
            },
            addRoleRight() { //分配角色权限
                let allCheck = this.$refs.tree.getCheckedKeys()
                let allRights = this.$refs.tree.getHalfCheckedKeys()
                let data = {
                    id: this.id,
                    rids: [...allCheck, ...allRights].join(',')
                }
                addTreeRight(data).then(res => {
                    this.getRoleslist()
                    this.dialogFormVisible2 = false
                })
            },
            getRender(row, key) { //回显的函数
                if (!row.children) {
                    return key.push(row.id)
                }
                row.children.forEach(item => {
                    this.getRender(item, key)
                })
            },
            delRights(rid, id) {
                let data = {
                    id: id,
                    rid: rid
                }
                delRights(data).then(res => {
                    this.getRoleslist()
                })
            }
        },
        created() {
            this.getRoleslist()
        }
    }
</script>