<style lang="scss" scoped>
    .home {
        height: 100%;
        width: 100%;

        .container {
            height: 100%;

            .el-header {
                background-color: #B3C0D1;
                color: #333;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .el-aside {
                background-color: #D3DCE6;
                color: #333;
                text-align: center;
            }

            .el-main {
                background-color: #E9EEF3;
                color: #333;
                text-align: center;
            }
        }
    }
</style>

<template>
    <div class="home">
        <el-container class="container">
            <el-header height="80px">
                <h2>公司logo</h2>
                <h1>企业后台管理系统</h1>
                <el-button type="primary">退出登录</el-button>
            </el-header>
            <el-container>
                <el-aside width="260px">
                    <ul>
                        <li v-for="(item, index) in menulist" :key="index">{{item.authName}}</li>
                    </ul>
                </el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import { menulist } from '../utils/api'
    export default {
        name: 'HomeView',
        data() {
            return {
                menulist: []
            }
        },
        methods: {},
        created() {
            menulist().then(res => {
                console.log(res.data.data)
                this.menulist = res.data.data
            })
        }
    }
</script>