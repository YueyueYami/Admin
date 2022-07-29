<style lang="scss" scoped>
    .card {
        margin-top: 20px;

        .box {
            width: 100%;
            height: 600px;
        }
    }
</style>
<template>
    <div>
        <MBX level1="数据统计" level2="数据报表"></MBX>
        <el-card class="card">
            <div class="box" ref="reports"></div>
        </el-card>
    </div>
</template>

<script>
    import { getEchartsApi } from '../../utils/api';
    import * as echarts from 'echarts'
    export default {
        data() {
            return {
                options: {
                    title: {
                        text: '用户来源'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#E9EEF3'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        boundaryGap: false
                    }],
                    yAxis: [{
                        type: 'value'
                    }]
                }
            }
        },
        mounted() {
            this.getEcharts()
        },
        created() {},
        methods: {
            getEcharts() {
                getEchartsApi().then(res => {
                    let myChart = echarts.init(this.$refs.reports)
                    myChart.setOption({ ...this.options, ...res.data.data })
                    window.addEventListener('resize', () => {
                        myChart.resize()
                    })
                })
            }
        },
    }
</script>