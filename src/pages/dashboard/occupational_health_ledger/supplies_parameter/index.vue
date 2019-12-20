<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.condition" placeholder="序号/名字/..." size="small"
                               style="width: 150px" />
                    </FormItem>
                    <FormItem label="领用时间">
                        <DatePicker type="daterange" placement="bottom-end"
                                    placeholder="请选择领用时间"
                                    size="small"
                                    style="width: 150px"></DatePicker>
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-ml-40 ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="doQuery" class="ivu-ml">重置查询</Button>
                    </FormItem>
                    <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
                        <FormItem>
                            <Button size="small" @click="modalTable(1)" class="ivu-ml">添加</Button>
                            <Button size="small" to="/dashboard/occupational_health_ledger" class="ivu-ml">
                                <Icon type="ios-arrow-back" />
                                返回
                            </Button>
                        </FormItem>
                        <Select v-model="formItem.showNum" size="small"
                                placeholder="显示条数"
                                @on-change="setPageSize" style="width: 110px;margin-top: 4px;">
                            <Option value="20">20条/页</Option>
                            <Option value="50">50条/页</Option>
                            <Option value="100">100条/页</Option>
                        </Select>
                        <Select v-model="formItem.sortWay" size="small"
                                placeholder="排序方式"
                                style="width: 110px;margin-left: 10px; margin-top: 4px;">
                            <Option value="errorInfo">报警内容</Option>
                        </Select>
                    </div>
                </Form>
                <Table border :columns="table.columns" :data="table.data" :loading="table.loading" class="ivu-mt">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(2, row)">编辑</Button>
                        <Button type="error" size="small" @click="modalTable(3, row)">删除</Button>
                    </template>
                </Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
        </div>
        <Modal
                :width="modal.state === 3?350:900"
                v-model="modal.status"
                :title="modal.title"
                @on-ok="modalSubmit">
            <div class="ivu-block ivu-p-8">
                <div v-if="modal.state === 3">
                    <div style="text-align:center">
                        <p>删除当前行会丢失所有数据记录,是否继续?</p>
                    </div>
                </div>
                <Form :model="formItem"
                      :label-width="100"
                      :label-colon="true"
                      :hide-required-mark="false"
                      :show-message="false"
                      style="margin-right: auto;margin-left: auto;width: 90%" v-else>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入姓名!', trigger: 'blur'}"
                            label="领用人">
                        <Input v-model="formItem.user"
                               placeholder="请输入姓名..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="岗位">
                        <Input v-model="formItem.jobs"
                               placeholder="请输入岗位信息..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="领用日期">
                        <DatePicker type="date"
                                    v-model="formItem.recipientsTime"
                                    placeholder="请选择日期..." style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="卫生口罩">
                        <Input v-model="formItem.masks"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="防尘口罩">
                        <Input v-model="formItem.dustMask"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="防毒口罩">
                        <Input v-model="formItem.respirator"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="乳胶手套">
                        <Input v-model="formItem.latexGloves"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="防滑手套">
                        <Input v-model="formItem.antiSlipGloves"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="绝缘鞋">
                        <Input v-model="formItem.insulatedShoes"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="雨鞋">
                        <Input v-model="formItem.rainShoes"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="翻毛鞋">
                        <Input v-model="formItem.suedeShoes"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="毛巾">
                        <Input v-model="formItem.towel"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="围裙">
                        <Input v-model="formItem.apron"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="工作服">
                        <Input v-model="formItem.overalls"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="护目镜">
                        <Input v-model="formItem.goggles"
                               type="number"
                               placeholder="请输入数量..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="发放人">
                        <Input v-model="formItem.distributionUser"
                               placeholder="请输入发放人..."></Input>
                    </FormItem>
                    <FormItem
                            class="half-width ivu-float-left"
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="备注">
                        <Input v-model="formItem.note" maxlength="100"
                               show-word-limit type="textarea" placeholder="输入备注信息..."/>
                    </FormItem>
                    <div style="clear: both"></div>
                </Form>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getSuppliesParameter } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-supplies-parameter',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '用品台账',
                modelImg: '/assets/images/vbg.png',
                pageSize: 5,
                total: 12,
                loading: false,
                // 存放selected下拉选择框的数据
                selectInfo: {
                    department: [],
                    isHealth: [],
                    medicalType: []
                },
                formItem: {
                    user: '',
                    jobs: '',
                    recipientsTime: '',
                    masks: '',
                    dustMask: '',
                    respirator: '',
                    latexGloves: '',
                    antiSlipGloves: '',
                    insulatedShoes: '',
                    rainShoes: '',
                    towel: '',
                    apron: '',
                    overalls: '',
                    goggles: '',
                    distributionUser: '',
                    note: ''
                },
                modal: {
                    status: false,
                    title: '添加台账信息',
                    state: 1
                },
                table: {
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            width: '80px',
                            key: 'id'
                        },
                        {
                            title: '领用人',
                            align: 'center',
                            width: '80px',
                            key: 'user'
                        },
                        {
                            title: '岗位',
                            align: 'center',
                            width: '140px',
                            key: 'jobs'
                        },
                        {
                            title: '领用日期',
                            align: 'center',
                            width: '120px',
                            key: 'recipientsTime'
                        },
                        {
                            title: '卫生口罩',
                            align: 'center',
                            width: '120px',
                            key: 'masks'
                        },
                        {
                            title: '防尘口罩',
                            align: 'center',
                            width: '120px',
                            key: 'dustMask'
                        },
                        {
                            title: '防毒口罩',
                            align: 'center',
                            width: '120px',
                            key: 'respirator'
                        },
                        {
                            title: '乳胶手套',
                            align: 'center',
                            width: '120px',
                            key: 'latexGloves'
                        },
                        {
                            title: '防滑手套',
                            align: 'center',
                            width: '100px',
                            key: 'antiSlipGloves'
                        },
                        {
                            title: '绝缘鞋',
                            align: 'center',
                            width: '100px',
                            key: 'insulatedShoes'
                        },
                        {
                            title: '雨鞋',
                            align: 'center',
                            width: '100px',
                            key: 'rainShoes'
                        },
                        {
                            title: '翻毛鞋',
                            align: 'center',
                            width: '100px',
                            key: 'suedeShoes'
                        },
                        {
                            title: '毛巾',
                            align: 'center',
                            width: '100px',
                            key: 'towel'
                        },
                        {
                            title: '围裙',
                            align: 'center',
                            width: '100px',
                            key: 'apron'
                        },
                        {
                            title: '工作服',
                            align: 'center',
                            width: '100px',
                            key: 'overalls'
                        },
                        {
                            title: '护目镜',
                            align: 'center',
                            width: '100px',
                            key: 'goggles'
                        },
                        {
                            title: '发放人',
                            align: 'center',
                            width: '100px',
                            key: 'distributionUser'
                        },
                        {
                            title: '备注',
                            align: 'center',
                            width: '100px',
                            key: 'note'
                        },
                        {
                            title: '操作',
                            align: 'center',
                            fixed: 'right',
                            width: '140px',
                            slot: 'action',
                            key: 'action'
                        }
                    ],
                    data: [],
                    loading: false
                }
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'isTablet',
                'isDesktop',
                'screenHeight',
                'menuCollapse'
            ])
        },
        created () {
            // let that = this;
            getSuppliesParameter().then(async res => {
                this.table.data = res.tableData
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            uploadSuccess (response, file, fileList) {
                this.$Message.success('文件上传成功!');
                // TODO 上传完成之后需要处理
                console.log(response, file, fileList)
            },
            uploadFailed (response, file, fileList) {
                console.log(response, file, fileList)
                // TODO 上传失败之后需要处理
                this.$refs.uploadEle.clearFiles()
                this.$Message.error('文件上传失败!');
            },
            setPageSize () {
                this.pageSize = parseInt(this.formItem.showNum);
                console.log('reset page size', this.pageSize);
                // TODO 只能 请求API限制  分页 限制每页显示数量
            },
            doQuery () {
                console.log('do query');
                // TODO 只能 请求API筛选处理 查询
            },
            changePage () {
                // TODO 翻页
            },
            getSelectItem (data) {
                let categoryList = []
                let fileType = []
                data.some((item, key, arr) => {
                    if (categoryList.indexOf(item.category) === -1) {
                        categoryList.push(item.category)
                    }
                    if (fileType.indexOf(item.file_type) === -1) {
                        fileType.push(item.file_type)
                    }
                })
                this.modal.modal2.categoryList = categoryList
                this.modal.modal2.fileTypeList = fileType
            },
            download (url) {
                if (!url) {
                    return
                }
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                // download 属性定义了下载链接的地址而不是跳转路径
                link.setAttribute('download', '文件.jpg')
                document.body.appendChild(link)
                link.click()
            },
            modalTable (state, temp) {
                // 右侧的表格 操作添加和编辑模态框
                if (state === 1) {
                    // 添加 操作
                    // 获取所有该写如的字段
                    this.setFormItemValue(temp, false)
                    this.modal.title = '添加台账'
                    this.modal.state = 1
                } else if (state === 2) {
                    // 编辑
                    this.setFormItemValue(temp)
                    this.modal.title = '编辑文件'
                    this.modal.state = 2
                } else if (state === 3) {
                    this.modal.title = '删除当前行数据?'
                    this.modal.state = 3
                }
                this.modal.status = true
            },
            modalSubmit () {
                if (this.modal.state === 1) {
                    console.log(this.formDynamic)
                    this.$Message.success('添加成功');
                } else if (this.modal.state === 2) {
                    this.$Message.success('编辑成功');
                } else if (this.modal.state === 3) {
                    this.$Message.success('删除成功');
                }
            },
            setFormItemValue (temp, state = true) {
                // state == false 会清空当前表单
                this.formItem.user = state ? temp.user : ''
                this.formItem.jobs = state ? temp.jobs : ''
                this.formItem.recipientsTime = state ? temp.recipientsTime : ''
                this.formItem.masks = state ? temp.masks : ''
                this.formItem.dustMask = state ? temp.dustMask : ''
                this.formItem.respirator = state ? temp.respirator : ''
                this.formItem.latexGloves = state ? temp.latexGloves : ''
                this.formItem.antiSlipGloves = state ? temp.antiSlipGloves : ''
                this.formItem.insulatedShoes = state ? temp.insulatedShoes : ''
                this.formItem.rainShoes = state ? temp.rainShoes : ''
                this.formItem.towel = state ? temp.towel : ''
                this.formItem.apron = state ? temp.apron : ''
                this.formItem.overalls = state ? temp.overalls : ''
                this.formItem.goggles = state ? temp.goggles : ''
                this.formItem.distributionUser = state ? temp.distributionUser : ''
                this.formItem.note = state ? temp.note : ''
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
