<style lang="scss" scoped>
    .goods {
        width: 100%;
        height: 100%;
        background-color: #e9eef3;

        .card {
            margin-top: 20px;
            height: calc(100vh - 140px);
            overflow: auto;

            .table {
                margin-top: 20px;
                height: 100%;
            }

            .page {
                margin-top: 20px;
            }
        }
    }
</style>
<template>
    <div class="goods">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card">
            <!-- 搜索框以及添加按钮 -->
            <el-row type="flex" justify="" :gutter="20">
                <el-col :span="8">
                    <el-input v-model="content" placeholder="商品名称" class="input-with-select">
                        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="addgoods">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="goodslist" style="width: 100%" class="table">
                <el-table-column type="index" label="#" align="center">
                </el-table-column>
                <el-table-column prop="goods_name" label="商品名称" align="center">
                </el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)" width="140" align="center">
                </el-table-column>
                <el-table-column prop="goods_number" label="商品数量" width="140" align="center">
                </el-table-column>
                <el-table-column prop="goods_weight" label="商品重量" width="140" align="center">
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{new Date(scope.row.add_time).toLocaleString()}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                        <el-button @click="delGoods(scope.row.goods_id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5,10, 20, 30, 50]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import { getGoods, delGoodsApi } from '../../utils/api.js'
    export default {
        data() {
            return {
                content: '',
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                goodslist: [],
                total: 0,
            }
        },
        methods: {
            search() {
                this.queryInfo.query = this.content
                this.getGoodsList()
            },
            delGoods(id) { //删除商品
                delGoodsApi(id).then(res => {
                    this.getGoodsList()
                })
            },
            handleSizeChange(val) { //每页条数改变
                this.queryInfo.pagesize = val
                this.getGoodsList()
            },
            handleCurrentChange(val) { //当前页改变
                this.queryInfo.pagenum = val
                this.getGoodsList()
            },
            getGoodsList() { //获取商品列表
                getGoods(this.queryInfo).then(res => {
                    console.log(res.data.data);
                    this.total = res.data.data.total
                    this.goodslist = res.data.data.goods
                })
            },
            addgoods() { //添加商品
                this.$router.push('/addgoods')
            }
        },
        created() {
            this.getGoodsList()
        }
    }
</script>