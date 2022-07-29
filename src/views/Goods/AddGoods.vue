<style lang="scss" scoped>
    .addgood {
        background-color: #e9eef3;

        .alert {
            margin: 20px auto;
        }

        ::v-deep .el-step__title {
            font-size: 14px;
        }

        ::v-deep .ql-editor {
            height: 400px;
        }
    }
</style>

<template>
    <div class="addgood">
        <el-card class="card">
            <!-- 返回上一页的按钮 -->
            <el-button @click="$router.go(-1)" circle type="info" icon="el-icon-arrow-left" size="big"></el-button>
            <!-- 一段消息提示 -->
            <el-alert class="alert" title="请填写商品信息" type="info" show-icon center :closable='false'></el-alert>
            <!-- 添加商品的步骤条 -->
            <el-steps :active="active*1" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- tab栏切换添加表单 -->
            <el-form :model="addGoodsForm" :rules="rules" ref="addGoodsForm">
                <el-tabs @tab-click="ckTabs" tab-position="left" v-model="active" :before-leave="targTabs">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addGoodsForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input type="number" v-model="addGoodsForm.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input type="number" v-model="addGoodsForm.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input type="number" v-model="addGoodsForm.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-cascader class="cascader" v-model="addGoodsForm.goods_cat" :options="goodsCatList" :props="optionRule" @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <el-form-item :label="item.attr_name" v-for="item in manyOpt" :key="item.attr_id">
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox :label="items" v-for="(items, index) in item.attr_vals" :key="index"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item :label="item.attr_name" v-for="item in onlyOpt" :key="item.attr_id">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <el-upload :headers="head" action="http://www.ysqorz.top:8888/api/private/v1/upload" :on-remove="handleRemove" :on-success="handleSuccess" list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
                        <el-button type="primary" @click="addGoods">提交商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import { getGoodsCate, addGoodStatus, addGoods } from '../../utils/api.js'
    export default {
        data() {
            return {
                active: 0, // 当前激活的tab页
                addGoodsForm: { // 添加商品的表单数据
                    goods_name: '',
                    goods_price: '',
                    goods_weight: '',
                    goods_number: '',
                    goods_cat: [],
                    goods_introduce: '',
                    attrs: [],
                    pics: []
                },
                goodsCatList: [], // 商品分类数据
                optionRule: { // 商品分类的选项规则
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children',
                    expandTrigger: 'hover'
                },
                rules: { // 添加商品的表单验证规则
                    goods_name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    goods_weight: [
                        { required: true, message: '请输入商品重量', trigger: 'blur' }
                    ],
                    goods_number: [
                        { required: true, message: '请输入商品数量', trigger: 'blur' }
                    ],
                },
                manyOpt: [], //动态参数的数据
                onlyOpt: [], //静态参数的数据
                head: { //
                    Authorization: sessionStorage.getItem('token')
                }
            }
        },
        methods: {
            addGoods() {
                let many = this.manyOpt.map(item => {
                    return {
                        attr_id: item.attr_id,
                        attr_vals: item.attr_vals
                    }
                })
                let only = this.onlyOpt.map(item => {
                    return {
                        attr_id: item.attr_id,
                        attr_vals: item.attr_vals
                    }
                })
                let addGoodForm = {
                    goods_cat: this.addGoodsForm.goods_cat.join(','),
                    goods_name: this.addGoodsForm.goods_name,
                    goods_price: this.addGoodsForm.goods_price,
                    goods_weight: this.addGoodsForm.goods_weight,
                    goods_number: this.addGoodsForm.goods_number,
                    goods_introduce: this.addGoodsForm.goods_introduce,
                    attrs: [...many, ...only],
                    pics: this.addGoodsForm.pics
                }
                console.log(addGoodForm)
                addGoods(addGoodForm).then(res => {
                    this.$router.push('/goods')
                })
            },
            handleRemove() { //删除上传
                console.log('删除')
            },
            handleSuccess(val) { //上传成功
                let pic = { pic: val.data.tmp_path }
                this.addGoodsForm.pics.push(pic)
            },
            targTabs(newtab, oldtab) { //如果不选择商品分类，则不能进入下一步
                if (newtab != 0 && this.addGoodsForm.goods_cat.length !== 3) {
                    this.$message.error('请选择商品分类')
                    return false
                }
            },
            ckTabs(val) {
                if (val.name == 1) { //等于1请求动态参数
                    const id = this.addGoodsForm.goods_cat[this.addGoodsForm.goods_cat.length - 1]
                    console.log(id)
                    addGoodStatus(id, 'many').then(res => {
                        res.data.data.forEach(item => {
                            item.attr_vals = item.attr_vals.split(',')
                        })
                        this.manyOpt = res.data.data
                    })
                } else if (val.name == 2) { //等于2请求静态参数
                    const id = this.addGoodsForm.goods_cat[this.addGoodsForm.goods_cat.length - 1]
                    addGoodStatus(id, 'only').then(res => {
                        console.log(res.data.data)
                        this.onlyOpt = res.data.data
                        console.log(this.onlyOpt)
                    })
                }
            },
            handleChange() {} //选择商品分类的回调函数
        },
        created() {
            getGoodsCate().then(res => {
                this.goodsCatList = res.data.data
            })
        }
    }
</script>