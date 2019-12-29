<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow >
                    <Button slot="extra" size="small" style="margin-right: 8px;"
                        @click="exportData">
                        <Icon type="md-arrow-round-down" />
                        导出
                    </Button>
                    <Button slot="extra" size="small" to="hazard_registration" style="margin-left: 10px;">
                        <Icon type="ios-arrow-back" />
                        返回
                    </Button>

                    <div class="ivu-block ivu-mt-16">
                        <div class="ivu-block ivu-border box" v-for="(item, key) in listArr" :key="key">
                            <div class="left-border"></div>
                            <div class="content">
                                <span>{{ item.title }}</span>
                                <span>{{ item.time }}</span>
                            </div>
                            <div class="right-img">
                                <img :src="item.source" alt="">
                            </div>
                        </div>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.condition" placeholder="名字/地点/..." size="small"
                               style="width: 120px" />
                    </FormItem>
                    <FormItem label="隐患类别">
                        <Select v-model="formItem.type" size="small"
                                class="ivu-nomal-select"
                                style="width:110px">
                            <Option value="all">全部</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="时间">
                        <DatePicker type="daterange"
                                    v-model="formItem.dateRange"
                                    placement="bottom-end"
                                    placeholder="请选择时间范围..."
                                    size="small"
                                    style="width: 140px"></DatePicker>
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
                <Table border :columns="table.columns" :data="table.data" :loading="table.loading" class="ivu-mt" ref="table">
                    <template slot-scope="{ row, index }" slot="abnormalSource">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(1, row)">预览</Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="dealResource">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(2, row)">预览</Button>
                    </template>
                </Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
        </div>
        <Modal
                width="350"
                v-model="modal.status"
                :title="modal.title">
            <div class="ivu-block ivu-p-8">
                <div class="ivu-block ivu-text-center user-full-img">
                    <img :src="modal.source" alt="">
                </div>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getHazardHistory } from '@api';
    import Config from '@/config';

    export default {
        name: 'dashboard-console',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '隐患处置',
                listArr: [],
                pageSize: 10,
                total: 12,
                modal: {
                    status: false,
                    title: '试试',
                    source: ''
                },
                loading: false,
                formItem: {
                    condition: '',
                    type: '',
                    dateRange: undefined,
                    showNum: 1,
                    sortWay: undefined
                },
                table: {
                    // 页面系显示的表头 默认是NULL 需要用户传过来
                    columns: [
                        {
                            title: '序号',
                            width: '80',
                            align: 'center',
                            key: 'id'
                        },
                        {
                            title: '设备编号',
                            width: '150',
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
                            title: '设备名称',
                            width: '150',
                            align: 'center',
                            key: 'equipmentName'
                        },
                        {
                            title: '检查时间',
                            width: '150',
                            align: 'center',
                            key: 'checkTime'
                        },
                        {
                            title: '执行人',
                            width: '150',
                            align: 'center',
                            key: 'executor'
                        },
                        {
                            title: '地址',
                            width: '150',
                            align: 'center',
                            key: 'address'
                        },
                        {
                            title: '设施状态',
                            width: '100',
                            align: 'center',
                            key: 'status'
                        },
                        {
                            title: '异常原因/隐患等级',
                            width: '150',
                            align: 'center',
                            key: 'reasonLevel'
                        },
                        {
                            title: '异常描述',
                            width: '200px',
                            align: 'center',
                            key: 'abnormalDesc'
                        },
                        {
                            title: '设备异常照片',
                            width: '120',
                            align: 'center',
                            slot: 'abnormalSource',
                            key: 'abnormalSource'
                        },
                        {
                            title: '抄送',
                            width: '120',
                            align: 'center',
                            key: 'cc'
                        },
                        {
                            title: '处理时间',
                            width: '120',
                            align: 'center',
                            key: 'dealTime'
                        },
                        {
                            title: '处理结果描述',
                            width: '120',
                            align: 'center',
                            key: 'dealDesc'
                        },
                        {
                            title: '处理结果照片',
                            width: '120',
                            align: 'center',
                            slot: 'dealResource',
                            key: 'dealResource'
                        },
                        {
                            title: '负责人',
                            width: '120',
                            align: 'center',
                            key: 'head'
                        },
                        {
                            title: '备注',
                            width: '200px',
                            align: 'center',
                            key: 'note'
                        }
                    ],
                    data: [],
                    loading: false
                },
                modelImg: '/assets/images/vbg.png'
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
            let that = this
            getHazardHistory().then(async res => {
                that.listArr = res.listArr
                that.table.data = res.tableData.data
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
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
            modalTable (state, temp) {
                if (state === 1) {
                    this.modal.title = '设备异常照片预览'
                    this.modal.source = temp.abnormalSource
                } else {
                    this.modal.title = '处理结果照片预览'
                    this.modal.source = temp.dealResource
                }
                this.modal.status = true
            },
            exportData () {
                this.$refs.table.exportCsv({
                    filename: '隐患处置历史记录表',
                    original: false,
                    columns: this.table.columns, // filter((col, index) => index < 12),
                    data: this.table.data
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .box {
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
        .left-border {
            width: 2px;
            height: 100%;
            float: left;
            background-color: #47ecef;
        }
        .content {
            width: 50%;
            float: left;
            height: 100%;
            span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 12px;
            }
            span:first-child {
                margin-top: 23%;
            }
        }
        .right-img {
            float: left;
            width: 49%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            img {
                width: 90%;
                height: 90%;
                vertical-align: middle;
                align-items: center;
            }
        }
    }
</style>
