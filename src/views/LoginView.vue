<style lang="scss" scoped>
    .box {
        height: 100%;
        width: 100%;
        background-color: #2d4c6a;
        overflow: hidden;
    }

    .login {
        width: 500px;
        height: 300px;
        background-color: #fff;
        border-radius: 5px;
        margin: 200px auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .input {
            width: 400px;
            margin: 10px auto;
        }

        .btn {
            margin: 20px auto;
        }
    }
</style>
<template>
    <div class="box">
        <div class="login">
            <h2>电商后台管理</h2>
            <el-input class="input" placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="username">
            </el-input>
            <el-input class="input" placeholder="请输入密码" prefix-icon="el-icon-key" v-model="password">
            </el-input>
            <div class="btn">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { login } from '../utils/api'
    import { Message } from 'element-ui'
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                if (this.username == '' || this.password == '') {
                    Message.error('请输入用户名和密码')
                    return
                }
                login({ username: this.username, password: this.password }).then(res => {
                    this.$router.push('/home')
                })
            },
            reset() {
                this.username = ''
                this.password = ''
            }
        }
    }
</script>