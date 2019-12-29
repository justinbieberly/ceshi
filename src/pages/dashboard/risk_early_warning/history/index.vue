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
                    <FormItem label="报警类型">
                        <Select v-model="formItem.select" size="small"
                                placeholder="请选择类型"
                                class="ivu-nomal-select"
                                style="width: 130px">
                            <Option :value="item.id"
                                    v-for="(item, key) in alarmType" :key="key">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="报警日期">
                        <DatePicker type="daterange" size="small" placement="bottom-end"
                                    placeholder="请选择日期" style="width: 200px"
                                    v-model="formItem.dateRange"></DatePicker>
                        <Button type="primary" size="small" @click="reloadTable"
                                class="ivu-query-btn ivu-ml-40">查询结果</Button>
                        <Button style="margin-left: 18px" size="small" @click="reloadTable(false)" >重置查询</Button>
                    </FormItem>
                    <div class="ivu-inline-block ivu-no-lable" style="float: right">
                        <FormItem>
                            <Button style="margin-right: 16px;" size="small" to="/dashboard/risk_early_warning">
                                <Icon type="ios-arrow-back" />
                                返回
                            </Button>
                            <Select v-model="formItem.pageSize" size="small"
                                    placeholder="显示条数"
                                    @on-change="reloadTable" style="width: 110px; margin-right: 16px;">
                                <Option value="20">20条/页</Option>
                                <Option value="50">50条/页</Option>
                                <Option value="100">100条/页</Option>
                            </Select>
                            <Select v-model="formItem.sortWay" size="small"
                                    @on-change="reloadTable"
                                    placeholder="排序方式"
                                    style="width: 110px;margin-left: 10px;">
                                <Option :value="item.key" v-for="(item, key) in reservoirData.columns" :key="key">{{ item.title }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </Form>
                <Table border  :loading="reservoirData.loading" :columns="reservoirData.columns" :data="reservoirData.data" size="small" ></Table>
            </div>
            <div class="ivu-block" style="float: right;margin-top: 30px;">
                <Page :total="total" :page-size="pageSize" show-total show-elevator size="small" @on-change="reloadTable(true, $event)"/>
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getRiskHistory } from '@api';

    export default {
        name: 'dashboard-risk-warning-history',
        data () {
            return {
                title: '风险预警',
                pageSize: 10,
                total: 0,
                alarmType: [],
                formItem: {
                    dateRange: undefined,
                    select: undefined,
                    page: 1,
                    pageSize: 10
                },
                reservoirData: {
                    loading: false,
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            key: 'id'
                        },
                        {
                            title: '编号',
                            align: 'center',
                            key: 'serial_number'
                        },
                        {
                            title: '报警日期',
                            align: 'center',
                            key: 'time',
                            render: (h, params) => {
                                let date = new Date(params.row.time * 1000);
                                let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                let year = date.getFullYear();
                                return h('div', year + '-' + mouth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds);
                            }
                        },
                        {
                            title: '报警类型',
                            align: 'center',
                            key: 'alarmType'
                        },
                        {
                            title: '报警地点',
                            align: 'center',
                            key: 'alarm_location'
                        },
                        {
                            title: '报警描述',
                            align: 'center',
                            key: 'alarm_desc'
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
            this.getRiskHistoryTableByParam()
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            reloadTable (state = true, event) {
                if (state) {
                    this.formItem.page = event === undefined ? 1 : event
                    this.pageSize = parseInt(this.formItem.pageSize)
                } else {
                    this.formItem = {
                        dateRange: undefined,
                        select: undefined,
                        page: 1,
                        pageSize: 10
                    }
                }
                this.getRiskHistoryTableByParam(this.formItem)
            },
            getRiskHistoryTableByParam (param = null) {
                if (param !== null && param.dateRange) {
                    param.dateRange.map(function (value, index, array) {
                        if (value) {
                            param.dateRange[index] = new Date(value).getTime()
                        }
                    })
                }
                let that = this;
                this.reservoirData.loading = true
                getRiskHistory(param).then(async res => {
                    that.total = res.tableData.total;
                    that.reservoirData.data = res.tableData.data;
                    that.alarmType = res.tableData.alarmType;
                    this.reservoirData.loading = false
                }).catch(err => {
                    this.$log.capsule('iView', 'Error', 'error');
                    console.log('err: ', err)
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
