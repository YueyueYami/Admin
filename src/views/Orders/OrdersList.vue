<style>
    .casc {
        width: 80%;
    }

    .ipt {
        width: 80%;
    }
</style>
<style lang="scss" scoped>
    .card {
        margin-top: 20px;
    }

    .boxs {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
<template>
    <div>
        <MBX level1="订单管理" level2="订单列表"></MBX>
        <el-card class="card">
            <!-- 搜索框 -->
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 表格列表 -->
            <el-table :data="OrdersData" style="width: 100%">
                <el-table-column type="index" label="#" width="70" align="center">
                </el-table-column>
                <el-table-column prop="order_number" label="订单编号" align="center">
                </el-table-column>
                <el-table-column prop="order_price" label="订单价格" align="center">
                </el-table-column>
                <el-table-column label="是否付款" align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-tag v-if="scope.row.pay_status==0" type="danger">未付款</el-tag>
                            <el-tag v-else type="danger">已付款</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="is_send" label="是否发货" align="center">
                </el-table-column>
                <el-table-column label="下单时间" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.create_time*1000 | dateFormat }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template>
                        <div>
                            <el-button size="mini" @click="addPlaceDia" icon="el-icon-edit" type="primary">地址</el-button>
                            <el-button size="mini" @click="editLogistics" icon="el-icon-location-information" type="danger">物流</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <!-- 编辑地址弹出框 -->
        <el-dialog title="收货地址" :visible.sync="PlaceDia">
            <div class="boxs">
                省市县/区:<el-cascader class="casc" v-model="ckArr" :options="city" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
            </div>
            <div class="boxs">
                详细地址:<el-input class="ipt" v-model="placeData" autocomplete="off"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="PlaceDia = false">取 消</el-button>
                <el-button type="primary" @click="PlaceDia = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 物流弹出框 -->
        <el-dialog title="物流信息" :visible.sync="editLogisticsDia">
            <div>
                <el-timeline :reverse="false">
                    <el-timeline-item v-for="(activity, index) in activities" :icon="activity.icon" :size="activity.size" :key="index" :timestamp="activity.timestamp" :color="activity.color">
                        {{activity.context}}
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editLogisticsDia = false">取 消</el-button>
                <el-button type="primary" @click="editLogisticsDia = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { getOrders } from '../../utils/api.js'
    import city from '../../pic/city.js'
    import wuliu from '../../pic/WuLiu.js'
    export default {
        data() {
            return {
                activities: wuliu.data,
                PlaceDia: false, //编辑地址弹出框
                editLogisticsDia: false, //编辑物流弹出框
                OrdersData: [],
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                placeData: '', //详细地址
                city,
                ckArr: [],
                total: 0
            }
        },
        methods: {
            editLogistics() {
                this.editLogisticsDia = true
            },
            handleChange(val) {
                console.log(val);
            },
            addPlaceDia() { //点击编辑按钮，打开弹出框
                this.PlaceDia = true
            },
            handleSizeChange(val) { // 每页数据改变
                this.queryInfo.pagesize = val
                this.getOrderList()
            },
            handleCurrentChange(val) { //页数改变
                this.queryInfo.pagenum = val
                this.getOrderList()
            },
            getOrderList() { //获取订单列表
                getOrders(this.queryInfo).then(res => {
                    console.log(res)
                    this.OrdersData = res.data.data.goods
                    this.total = res.data.data.total
                })
            }
        },
        created() {
            this.getOrderList()
        },
    }
</script>