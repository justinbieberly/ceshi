<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small"
                            style="margin-left: 10px;"
                            @click="showError"
                            v-if="showPic">问题设备</Button>
                    <Button slot="extra" size="small"
                            @click="showHistory(false)"
                            v-if="!showPic">
                        <Icon type="ios-arrow-back" />返回
                    </Button>
                    <Button slot="extra" size="small"
                            @click="showHistory"
                            style="margin-left: 10px;"
                            v-if="showPic">历史数据</Button>
                    <div class="ivu-block ivu-mt-16">
                        <div class="regime-btn ivu-btn ivu-btn-default ivu-font-size-small"
                             v-for="(value, index) in menuList"
                             :key="index"
                             :class="{ 'ivu-btn-selected': btnArr[index]['state'] }"
                             @click="selectThisBtn(index)">
                            <div class="ivu-inline-block">
                                <Icon type="md-checkmark" v-if="value.status === 1" size="16" class="ivu-mr-2"/>
                                <Icon type="md-close" size="16" class="ivu-mr-2" v-else/>
                                {{ value.title }}
                            </div>
                            <div class="ivu-inline-block">{{ value.user }}</div>
                            <div class="ivu-inline-block">{{ value.time }}</div>
                        </div>
                        <Button  class="regime-btn ivu-btn ivu-btn-default ivu-font-size-small settimg"
                                 to="/dashboard/new_patrol">
                            <Icon type="md-settings" size="16"/>设置
                        </Button>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div v-if="showPic">
                <img :src="source" alt="">
            </div>
            <div class="ivu-block" v-else>
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.condition" placeholder="编号/名称/执行人..." size="small"
                               style="width: 115px" />
                    </FormItem>
                    <FormItem label="设施状态">
                        <Select v-model="formItem.status"
                                class="ivu-nomal-select"
                                size="small"  style="width:95px">
                            <Option value="1">正常</Option>
                            <Option value="0">异常</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="执行人">
                        <Select v-model="formItem.executor" size="small"
                                class="ivu-nomal-select"
                                style="width:100px">
<!--                            <Option value="item" v-for="(item, key) in modal.modal2.fileTypeList" :key="key">{{ item }}</Option>-->
                        </Select>
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-ml-40 ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="doQuery" class="ivu-ml">重置查询</Button>
                    </FormItem>
                    <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
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
                    <template slot-scope="{ row, index }" slot="prePic">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(1, row)">预览</Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="prePic2">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(2, row)">预览</Button>
                    </template>
                </Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
        </div>
        <Modal
                v-model="modal.modal.status"
                :title="modal.modal.title" >
            <div class="ivu-block ivu-p-8 user-full-img">
                <img :src="modal.modal.source" alt="">
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getRoutineInspectionsMenu, getRoutineTableByParam } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-check-maintenance-record',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '日常巡查',
                btnArr: [],
                pageSize: 5,
                total: 12,
                loading: false,
                formItem: {
                    executor: undefined,
                    status: undefined,
                    condition: undefined,
                    showNum: 1,
                    sortWay: undefined
                },
                table: {
                    columns: [
                        {
                            title: '序号',
                            width: '90',
                            align: 'center',
                            key: 'id'
                        },
                        {
                            title: '任务号',
                            align: 'center',
                            width: '90',
                            key: 'taskNo'
                        },
                        {
                            title: '设备编号',
                            width: '180',
                            align: 'center',
                            key: 'equipmentNo'
                        },
                        {
                            title: '设备分类',
                            width: '150',
                            align: 'center',
                            key: 'equipmentClassify'
                        },
                        {
                            title: '设备数量',
                            align: 'center',
                            width: '90',
                            key: 'equipmentNum'
                        },
                        {
                            title: '检查时间',
                            width: '150',
                            align: 'center',
                            key: 'checkTime'
                        },
                        {
                            title: '执行人',
                            width: '100',
                            align: 'center',
                            key: 'executor'
                        },
                        {
                            title: '地址',
                            align: 'center',
                            width: '130',
                            key: 'address'
                        },
                        {
                            title: '设施状态',
                            align: 'center',
                            width: '90',
                            key: 'facilitiesStatus'
                        },
                        {
                            title: '异常原因/隐患等级',
                            align: 'center',
                            width: '150',
                            key: 'abnormalOrLevel'
                        },
                        {
                            title: '异常描述',
                            align: 'center',
                            width: '150',
                            key: 'abnormalDesc'
                        },
                        {
                            title: '设备异常照片',
                            align: 'center',
                            width: '130',
                            slot: 'prePic',
                            key: 'abnormalPic'
                        },
                        {
                            title: '抄送',
                            align: 'center',
                            width: '90',
                            key: 'cc'
                        },
                        {
                            title: '处理时间',
                            align: 'center',
                            width: '130',
                            key: 'dealTime'
                        },
                        {
                            title: '处理结果描述',
                            align: 'center',
                            width: '90',
                            key: 'dealDesc'
                        },
                        {
                            title: '处理结果照片',
                            align: 'center',
                            width: '130',
                            slot: 'prePic2',
                            key: 'resultsPic'
                        },
                        {
                            title: '负责人',
                            align: 'center',
                            width: '90',
                            key: 'head'
                        },
                        {
                            title: '备注',
                            align: 'center',
                            width: '220',
                            key: 'note'
                        }
                    ],
                    data: [],
                    loading: false
                },
                modal: {
                    modal: {
                        status: false,
                        title: '添加一个类别',
                        source: ''
                    }
                },
                menuList: [],
                source: 'assets/images/u1176.svg',
                showPic: true
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
            let that = this;
            getRoutineInspectionsMenu().then(async res => {
                that.menuList = res.menu
                this.setMenuClass(res.menu)
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            selectThisBtn (key) {
                this.showHistory()
                // 点击按钮切换颜色
                this.btnArr.some((item, key, arr) => {
                    this.btnArr[key].state = false
                })
                this.btnArr[key].state = true
                // todo 更换右侧表单的数据
                this.table.loading = true
                let that = this
                let id = this.menuList[key].id
                setTimeout(() => {
                    that.getTableDataById(id)
                }, 500)
            },
            setMenuClass (data) {
                let tempArr = []
                data.some((item, key, arr) => {
                    if (key === 0) {
                        // 默认第一个选中
                        this.getTableDataById(item.id)
                        tempArr.push({
                            state: true
                        })
                    } else {
                        tempArr.push({
                            state: false
                        })
                    }
                })
                this.btnArr = tempArr
            },
            modalTable (state, temp) {
                if (state === 1) {
                    this.modal.modal.source = temp.abnormalPic
                } else {
                    this.modal.modal.source = temp.resultsPic
                }
                this.modal.modal.title = '数据详情预览'
                this.modal.modal.status = true
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
            getTableDataById (id = 0) {
                let param = {
                    id: id
                }
                getRoutineTableByParam(param).then(async res => {
                    this.table.data = res.tableData
                    this.table.loading = false
                })
            },
            showHistory (state = true) {
                if (state) {
                    if (this.showPic === true) {
                        this.showPic = false
                    }
                } else {
                    this.showPic = true
                }
            },
            showError () {
                console.log('显示问题设备')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .settimg {
        height: 100%;
        margin-top: 6px;
    }
    .regime-btn {
        width: 100%;
        margin-bottom: 8px;
        overflow: hidden;
        .ivu-mr-2 {
            margin-right: 2px;
        }
        div:first-child {
            width: 38%;
            line-height: 32px;
            text-align: left;
            margin-left: -6px;
        }
        div:nth-child(2) {
            width: 16%;
            line-height: 32px;
            text-align: center;
        }
        div:last-child {
            margin-left: 4px;
        }
    }
</style>
