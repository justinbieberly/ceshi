<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen" :class="{ 'content-layout-right-pro': this.menuCollapse }"
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
                                style="width: 200px">
                            <Option :value="item.id"
                                    v-for="(item, key) in formItem.alarm_type" :key="key">{{ item.name }}</Option>
                            <Option value="0">异常</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="报警日期">
                        <DatePicker type="daterange" size="small" placement="bottom-end"
                                    placeholder="请选择日期" style="width: 150px"
                                    v-model="formItem.dateRange"></DatePicker>
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-query-btn ivu-ml-40">查询结果</Button>
                        <Button style="margin-left: 18px" size="small" >重置查询</Button>
                    </FormItem>
                    <div class="ivu-inline-block" style="float: right">
                        <FormItem>
                            <Button style="margin-left: 8px" size="small" to="/dashboard/risk_early_warning">
                                <Icon type="ios-arrow-back" />
                                返回
                            </Button>
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
                    </div>
                </Form>
                <Table border  :loading="loading" :columns="reservoirData.columns" :data="reservoirData.data" size="small" ></Table>
            </div>
            <div class="ivu-block" style="float: right;margin-top: 30px;">
                <Page :total="total" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getRiskHistory } from '@api/account';
    export default {
        name: 'dashboard-risk-warning-history',
        data () {
            return {
                title: '风险预警',
                loading: false,
                pageSize: 100,
                total: 0,
                formItem: {
                    alarm_type: [],
                    dateRange: undefined,
                    select: undefined,
                    showNum: 1

                },
                reservoirData: {
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
                            key: 'alarm_type'
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
            let that = this;
            getRiskHistory()
                .then(async res => {
                    that.total = res.tableData.data.length;
                    that.reservoirData.data = res.tableData.data;
                    that.formItem.alarm_type = res.tableData.alarm_type;
            }).catch(err => { console.log('err: ', err) });
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            setPageSize () {
                this.pageSize = parseInt(this.formItem.showNum);
                console.log('reset page size', this.pageSize);
                // 只能 请求API限制
            },
            doQuery () {
                console.log('do query');
                let screening = {
                    alarm_type: this.formItem.select,
                    // dateRange: this.formItem.dateRange
                    dateRange: [
                        this.formItem.dateRange.map(function (value, index, array) {
                            return new Date(value).getTime();
                        })
                    ]
                }
                console.log('screening', screening);
                // 只能 请求API筛选处理
            },
            changePage () {
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
