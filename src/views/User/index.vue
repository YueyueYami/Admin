<style lang="scss" scoped>
    .user {
        width: 100%;
        height: 100%;
        background-color: #e9eef3;

        .card {
            margin-top: 20px;

            .ipt {
                width: 40%;
                margin-right: 10px;
            }

            .table {
                margin: 20px auto;
            }
        }
    }
</style>

<template>
    <div class="user">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/users'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card">
            <el-input class="ipt" v-model="page.query" @clear="search" clearable placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button type="primary" @click="addusershow">添加用户</el-button>
            <el-table class="table" :data="userlist" style="width: 100%" border>
                <el-table-column type="index" width="50" label="#" fixed="left">
                </el-table-column>
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <el-table-column prop="role_name" label="角色">
                </el-table-column>
                <el-table-column prop="flag" label="状态">
                    <template slot-scope="scope">
                        <el-switch @change='ckstatus(scope.row)' v-model="scope.row.mg_state">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                        <el-button @click="set(scope.row)" type="text" size="small">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="pagesizeck" @current-change="pagenumck" :current-page="page.pagenum" :page-sizes="[2,5,10]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加弹出框 -->
        <el-dialog title="添加用户信息" :visible.sync="dialogFormVisible">
            <div slot="footer" class="dialog-footer">
                <el-form :model="addUserinfo" :rules="rules" ref="addUserinfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addUserinfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addUserinfo.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addUserinfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="addUserinfo.mobile"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addUserinfo')">立即添加</el-button>
                        <el-button @click="resetForm('addUserinfo')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible1">
            <div slot="footer" class="dialog-footer">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="editInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="editInfo.mobile"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="editSubmit('editInfo')">立即修改</el-button>
                        <el-button @click="editReset('editInfo')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- 分配角色 -->
        <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisible2">
            <p>当前用户：{{editInfo.username}}</p>
            <p>当前用户角色：{{editInfo.role_name}}</p>
            <el-select v-model="roles" placeholder="请选择活动区域" @change="ckRoles">
                <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roleslist" :key="i"></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="setRoles">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { getUsers, delUser, userStatus, addUser, editUser, getRoles, setUserRoles } from '../../utils/api'
    export default {
        data() {
            const mobleReg = (rule, value, callback) => {
                const reg = /^1[3456789]\d{9}$/
                if (!reg.test(value)) {
                    return callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            }
            return {
                userid: '',
                userlist: [],
                total: 0,
                page: { //分页
                    query: '',
                    pagenum: 1,
                    pagesize: 5,
                },
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                addUserinfo: { //添加时的用户信息
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                id: '',
                rid: '',
                editInfo: { //修改时当前行的用户信息
                    username: '',
                    email: '',
                    mobile: '',
                    role_name: ''
                },
                rules: { //正则验证
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { validator: mobleReg, message: '中国手机号', trigger: 'blur' }
                    ]
                },
                roles: '',
                roleslist: []
            }
        },
        methods: {
            getuser() { //获取用户列表和角色列表
                getUsers(this.page).then(res => {
                    this.userlist = res.data.data.users
                    this.total = res.data.data.total
                })
                getRoles().then(res => {
                    this.roleslist = res.data.data
                })
            },
            pagesizeck(val) { //每页显示条数
                this.page.pagesize = val
                this.getuser()
            },
            pagenumck(val) { //分页按钮点击事件
                this.page.pagenum = val
                this.getuser()
            },
            ckstatus(row) { //改变状态
                let data = {
                    id: row.id,
                    mg_state: row.mg_state
                }
                userStatus(data).then(res => {
                    console.log(res)
                })
            },
            del(row) { //删除用户
                this.$confirm('此操作将永久删除该用户名, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delUser(row.id).then(res => {
                        this.getuser()
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addusershow() { //添加用户弹出框
                this.dialogFormVisible = !this.dialogFormVisible
            },
            submitForm(val) { //提交添加
                this.$refs[val].validate((valid) => {
                    if (valid) {
                        addUser(this.addUserinfo)
                        this.addUserinfo = {
                            username: '',
                            password: '',
                            email: '',
                            mobile: ''
                        }
                        this.dialogFormVisible = false
                        this.getuser()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(val) { //重置添加
                this.$refs[val].resetFields()
            },
            edit(row) { //编辑用户弹出框
                this.dialogFormVisible1 = !this.dialogFormVisible1
                this.id = row.id
                this.editInfo = {
                    username: row.username,
                    email: row.email,
                    mobile: row.mobile,
                    role_name: row.role_name
                }
            },
            editSubmit() { //点击提交编辑用户信息
                let data = {
                    id: this.id,
                    email: this.editInfo.email,
                    mobile: this.editInfo.mobile
                }
                editUser(data).then(res => {
                    this.dialogFormVisible1 = !this.dialogFormVisible1
                    this.editInfo = {
                        username: '',
                        email: '',
                        mobile: ''
                    }
                    this.getuser()
                })
            },
            search() { //点击按钮搜索
                this.getuser()
            },
            set(row) {
                this.dialogFormVisible2 = true
                this.id = row.id
                this.editInfo = {
                    username: row.username,
                    role_name: row.role_name
                }
            },
            ckRoles(val) {
                this.rid = val
            },
            setRoles() {
                let data = {
                    id: this.id,
                    rid: this.rid
                }
                console.log(data);
                setUserRoles(data).then(res => {
                    this.dialogFormVisible2 = false
                    this.getuser()
                })
            }
        },
        created() {
            this.getuser() //获取用户列表
        },
    }
</script>