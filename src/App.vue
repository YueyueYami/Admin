<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    * {
        list-style: none
    }

    html,
    body,
    #app {
        width: 100%;
        height: 100%;
    }

    .el-cascader__dropdown {
        height: 200px;
    }

    .el-cascader-panel {
        height: 200px;
    }
</style>