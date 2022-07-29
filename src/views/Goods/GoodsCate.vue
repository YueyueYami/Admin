<style lang="scss" scoped>
    .card {
        margin-top: 20px;

        .btn {
            margin-bottom: 20px;
        }

        .ipt {
            width: 90%;
        }

        .casca {
            width: 90%;
        }
    }
</style>
<style>
    .el-radio {
        height: 100%;
        width: 80%;
        position: absolute;
    }

    .el-radio__inner {
        display: none;
    }
</style>
<template>
    <div class="goodscate">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 主体卡片 -->
        <el-card class="card">
            <!-- 添加按钮 -->
            <el-row>
                <el-col>
                    <el-button class="btn" type="primary" @click="addGoodsCateDia">添加分类</el-button>
                </el-col>
            </el-row>
            <el-table :data="goodsCateList" style="width: 100%" row-key="cat_id">
                <el-table-column type="index" label="索引" width="60">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.index }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cat_name" label="分类名称">
                </el-table-column>
                <el-table-column prop="cat_deleted" label="是否有效">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.cat_deleted }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cat_level" label="排序">
                    <template slot-scope="scope">
                        <div>
                            <el-tag type="primary" v-if="scope.row.cat_level==0">一级</el-tag>
                            <el-tag type="success" v-if="scope.row.cat_level==1">二级</el-tag>
                            <el-tag type="warning" v-if="scope.row.cat_level==2">三级</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-button size="mini" icon="el-icon-edit" type="primary">编辑</el-button>
                            <el-button size="mini" @click="delCate(scope.row.cat_id)" icon="el-icon-delete" type="danger">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 30]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <!-- 弹出框 -->
            <el-dialog title="收货地址" :visible.sync="addCateDia">
                <div>
                    <el-form :model="form">
                        <el-form-item label="活动名称">
                            <el-input class="ipt" v-model="form.cat_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="父级分类">
                            <el-cascader ref="cascader" class="casca" v-model="chackArr" :options="allGoodsCate" :props="propsOpt" @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addCateDia = false">取 消</el-button>
                    <el-button type="primary" @click="addGoodsCate">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import { getGoodsCate, delGoodsCate, addGoodsCate } from '../../utils/api'
    export default {
        data() {
            return {
                chackArr: [], // 级联选中的分类id
                goodsCateList: [], //服务器获取的分页后商品分类列表
                allGoodsCate: [], //服务器获取的所有商品分类列表
                queryInfo: {
                    pagenum: 1,
                    pagesize: 5,
                },
                total: 0, //服务器获取的数据总数
                addCateDia: false, //弹出框的显示与隐藏
                propsOpt: { //级联选择器配置
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    checkStrictly: true,
                    value: 'cat_id'
                },
                form: {
                    cat_name: '',
                    cat_pid: 0,
                    cat_level: 0
                }
            }
        },
        methods: {
            addGoodsCate() { // 点击确定添加分类
                addGoodsCate(this.form)
                this.getGoodsCateList()
                this.form = {
                    cat_name: '',
                    cat_pid: 0,
                    cat_level: 0
                }
                this.addCateDia = false
                this.chackArr = []
                this.getGoodsCateList()
            },
            addGoodsCateDia() { //打开添加分类弹框
                this.addCateDia = true
                //请求全部分类
                getGoodsCate().then(res => {
                    this.allGoodsCate = res.data.data
                })
            },
            handleChange(val) { //级联选择器选择后
                console.log(val);
                this.$refs.cascader.dropDownVisible = false
                if (val.length == 0) {
                    console.log(1);
                    this.form.cat_pid = 0
                    this.form.level = 0
                } else if (val.length == 1) {
                    this.form.cat_pid = val[val.length - 1]
                    this.form.level = 1
                } else {
                    this.form.cat_pid = val[val.length - 1]
                    this.form.level = 2
                }
            },
            delCate(id) { //删除当前行的分类
                delGoodsCate(id)
                this.getGoodsCateList()
            },
            handleSizeChange(val) { //改变每页数量
                this.queryInfo.pagesize = val
                this.getGoodsCateList()
            },
            handleCurrentChange(val) { //修改页码数
                this.queryInfo.pagenum = val
                this.getGoodsCateList()
            },
            getGoodsCateList() { //获取分类列表
                getGoodsCate(this.queryInfo).then(res => {
                    this.total = res.data.data.total
                    res.data.data.result.forEach((item, index) => {
                        item.index = index + 1
                    })
                    console.log(res.data.data.result)
                    this.goodsCateList = res.data.data.result
                })
            }
        },
        created() {
            this.getGoodsCateList()
        }
    };
</script>