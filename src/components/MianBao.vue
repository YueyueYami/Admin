<style lang="scss" scoped>

</style>

<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        props: {
            level1: {
                type: String,
                default: '管理'
            },
            level2: {
                type: String,
                default: '列表'
            }
        },
    }
</script>