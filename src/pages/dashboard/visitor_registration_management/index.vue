<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen ivu-overflow-auto" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.input" placeholder="证件号码/名称" size="small" style="width: 120px"></Input>
                    </FormItem>
                    <FormItem label="人员类型" >
                        <Select v-model="formItem.type" size="small"
                                class="ivu-nomal-select"
                                style="width: 120px">
                            <Option :value="item.id"
                                    v-for="(item, key) in typeList"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <Select v-model="formItem.sex" size="small"
                                class="ivu-nomal-select"
                                style="width: 120px; margin-right: 20px;">
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                        <Button type="primary" size="small" @click="reloadTable"
                                class="ivu-query-btn"
                                style="margin-right: 16px;">查询结果</Button>
                        <Button style="margin-right: 16px;" size="small"
                                @click="reloadTable(false)">重置查询</Button>
                        <Button type="primary" size="small"
                                @click="registrationLog"
                                v-if="!table.isLog">登记记录</Button>
                        <Button  size="small" v-if="table.isLog" style="margin-right: 8px;"
                                @click="exportData" >
                            <Icon type="md-arrow-round-down" />
                            导出
                        </Button>
                        <Button  size="small" @click.prevent="back" v-if="table.isLog">
                            <Icon type="ios-arrow-back" />
                            返回
                        </Button>
                    </FormItem>
                    <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
                        <Select v-model="formItem.pageSize" size="small"
                                placeholder="显示条数"
                                @on-change="reloadTable" style="width: 110px;margin-top: 4px;">
                            <Option value="20">20条/页</Option>
                            <Option value="50">50条/页</Option>
                            <Option value="100">100条/页</Option>
                        </Select>
                        <Select v-model="formItem.sortWay" size="small"
                                placeholder="排序方式"
                                @on-change="reloadTable"
                                style="width: 110px;margin-left: 10px; margin-top: 4px;">
                            <Option :value="item.key"
                                    v-for="(item, key) in table.columns"
                                    v-if="key < (table.columns.length - 3)"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </div>
                </Form>
                <Table border  :loading="table.loading" :columns="table.columns"
                       :data="table.data" size="small" ref="table">
                    <template slot-scope="{ row }" slot="photo" >
                        <Button size="small" type="primary" @click="preview(1, row)">预览</Button>
                    </template>
                    <template slot-scope="{ row }" slot="action">
                        <div  v-if="!table.isLog">
                            <Button size="small" type="primary" @click="authorization(0, row)" style="margin-right: 10px;">单次授权</Button>
                            <Button size="small" type="primary" @click="preview(2, row)"  style="margin-right: 10px;">多次授权</Button>
                            <Button size="small" type="primary" @click="authorization(2, row)">拒绝授权</Button>
                        </div>
                        <div v-else>
                            <Button size="small" type="primary" >{{ row.action }}</Button>
                        </div>
                    </template>
                </Table>
            </div>
            <div class="ivu-block" style="float: right;margin-top: 30px;">
                <Page :total="page.total" :page-size="page.pageSize"
                      show-total show-elevator size="small"
                      @on-change="reloadTable(true, $event)"/>
            </div>
            <Modal v-model="modalInfo.status" width="360">
                <p slot="header" style="color:#3095ff;text-align:center" v-if="!modalInfo.isDate">
                    <span>查看用户照片</span>
                </p>
                <p slot="header" style="color:#3095ff;text-align:center" v-else>
                    <span>选择授权日期</span>
                </p>
                <div class="ivu-block ivu-text-center user-full-img" v-if="!modalInfo.isDate">
                    <img :src="modalInfo.userPhoto" alt="">
                </div>
                <div class="ivu-block ivu-text-center" v-else>
                    <DatePicker v-model="modalInfo.dateData" type="date" multiple
                                placeholder="选择日期..." style="width: 300px" ></DatePicker>
                </div>
                <div slot="footer" v-if="modalInfo.isDate">
                    <Button type="primary" size="large" long @click="authorization(1, modalInfo.cacheData)">确定</Button>
                </div>
            </Modal>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex'
    import { getVisitorRegistration, getRegistrationLog, sendVisitorRegistration } from '@api'

    export default {
        name: 'dashboard-visitor-registration-management',
        data () {
            return {
                title: '访客登记管理',
                page: {
                    loading: false,
                    total: 0,
                    pageSize: 10
                },
                modalInfo: {
                    status: false,
                    isDate: false,
                    dateData: undefined,
                    userPhoto: '',
                    cacheData: undefined
                },
                typeList: [],
                formItem: {
                    input: undefined,
                    type: undefined,
                    sex: undefined,
                    page: 1,
                    pageSize: 10,
                    sortWay: undefined

                },
                table: {
                    isLog: false,
                    loading: false,
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            width: '65',
                            key: 'id'
                        },
                        {
                            title: '姓名',
                            align: 'center',
                            width: '100',
                            key: 'userName'
                        },
                        {
                            title: '人员类型',
                            align: 'center',
                            width: '100',
                            key: 'userType'
                        },
                        {
                            title: '性别',
                            align: 'center',
                            width: '65',
                            key: 'sex'
                        },
                        {
                            title: '预留电话',
                            align: 'center',
                            width: '150',
                            key: 'phone'
                        },
                        {
                            title: '证件类型',
                            align: 'center',
                            width: '100',
                            key: 'certificateType'
                        },
                        {
                            title: '证件号码',
                            align: 'center',
                            width: '180',
                            key: 'certificateNum'
                        },
                        {
                            title: '所属单位',
                            align: 'center',
                            width: '100',
                            key: 'unit'
                        },
                        {
                            title: '被访人部门',
                            align: 'center',
                            width: '100',
                            key: 'intervieweeDepart'
                        },
                        {
                            title: '被访人姓名',
                            align: 'center',
                            width: '100',
                            key: 'intervieweeName'
                        },
                        {
                            title: '申请进入时间',
                            align: 'center',
                            width: '120',
                            key: 'enterTime'
                        },
                        {
                            title: '访问事由',
                            align: 'center',
                            width: '150',
                            key: 'AccessFor'
                        },
                        {
                            title: '备注',
                            align: 'center',
                            width: '150',
                            key: 'note'
                        },
                        {
                            title: '照片',
                            align: 'center',
                            width: '105',
                            key: 'photo',
                            slot: 'photo'
                        },
                        {
                            title: '操作',
                            align: 'center',
                            width: '280',
                            fixed: 'right',
                            slot: 'action',
                            key: 'action'
                        }
                    ],
                    data: []
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
            this.getVisitorRegistrationTableByParam()
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            reloadTable (state = true, event) {
                if (state) {
                    this.formItem.page = event === undefined ? 1 : event
                    this.pageSize = parseInt(this.formItem.pageSize);
                } else {
                    this.formItem = {
                        input: undefined,
                        type: undefined,
                        sex: undefined,
                        page: 1,
                        pageSize: 10,
                        sortWay: undefined
                    }
                }
                if (this.table.isLog === false) {
                    this.getVisitorRegistrationTableByParam(this.formItem)
                } else {
                    this.getRegistrationLogTableByParam(this.formItem)
                }
            },
            authorization (state, row) {
                // 操作授权
                let param = {
                    id: row.id
                }
                if (state === 0) {
                    Object.assign(param, {
                        type: 'once'
                    })
                } else if (state === 1) {
                    let dateTime = []
                    this.modalInfo.dateData.map(function (value, index, array) {
                        dateTime.push(new Date(value).getTime())
                    })
                    Object.assign(param, {
                        dateTime: dateTime
                    })
                    this.modalInfo.status = false
                } else {
                    Object.assign(param, {
                        type: 'refused'
                    })
                }
                sendVisitorRegistration(param).then(async res => {
                    if (res.state === true) {
                        // todo >
                    }
                    this.$Message.success(res.msg)
                })
            },
            preview (state, row) {
                if (state === 1) {
                    // 预览
                    this.modalInfo.isDate = false
                    this.modalInfo.userPhoto = row.photoUrl
                } else {
                    // 选择授权时间
                    this.modalInfo.cacheData = row
                    this.modalInfo.isDate = true
                }
                this.modalInfo.status = true
            },
            registrationLog () {
                // 展示登记记录
                this.table.loading = true
                this.table.isLog = true
                this.getRegistrationLogTableByParam()
            },
            back () {
                this.getVisitorRegistrationTableByParam()
                this.table.isLog = false
            },
            exportData () {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    original: false,
                    columns: this.table.columns, // filter((col, index) => index < 12),
                    data: this.table.data
                });
            },
            getVisitorRegistrationTableByParam (param = null) {
                this.table.loading = true
                getVisitorRegistration(param).then(async res => {
                    if (param === null) {
                        this.typeList = res.tableData.typeList
                    }
                    this.table.data = res.tableData.data
                    this.page.total = res.tableData.total
                    this.table.loading = false
                })
            },
            getRegistrationLogTableByParam (param) {
                this.table.loading = true
                getRegistrationLog(param).then(async res => {
                    this.table.data = res.tableData.data
                    this.page.total = res.tableData.total
                    this.table.loading = false
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
