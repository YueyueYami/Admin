<style lang="scss" scoped>
    .rights {
        width: 100%;
        height: 100%;
        background-color: #e9eef3;

        .card {
            margin-top: 20px;
            height: calc(100vh - 140px);
        }
    }
</style>
<template>
    <div class="rights">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card">
            <el-table :data="rightlist" style="width: 100%" height="650px">
                <el-table-column type="index" label="#" width="80" align="center">
                </el-table-column>
                <el-table-column prop="authName" label="权限名称" align="center">
                </el-table-column>
                <el-table-column prop="path" label="权限路径" align="center">
                </el-table-column>
                <el-table-column prop="level" label="权限等级" align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-tag v-if="scope.row.level==0">一级</el-tag>
                            <el-tag type="success" v-if="scope.row.level==1">二级</el-tag>
                            <el-tag type="info" v-if="scope.row.level==2">三级</el-tag>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import { getRights } from '../../utils/api'
    export default {
        data() {
            return {
                rightlist: []
            }
        },
        methods: {
            getRights() {
                getRights().then(res => {
                    console.log(res.data.data);
                    this.rightlist = res.data.data
                })
            }
        },
        created() {
            this.getRights()
        }
    };
</script>