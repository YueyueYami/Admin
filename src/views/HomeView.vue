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
                background-color: #545c64;
                color: #333;
                text-align: center;
            }

            .el-main {
                background-color: #E9EEF3;
                color: #333;
                padding: 10px;
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
                <el-aside width="240px">
                    <el-menu router default-active="user" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-submenu :index="item.path" v-for="(item, index) in menulist" :key="index">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <el-menu-item :index="items.path" v-for="(items, index) in item.children" :key="index">{{items.authName}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
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
                this.menulist = res.data.data
            })
        }
    }
</script>