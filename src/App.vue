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
</style>