<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-img user-full-screen ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="操作人员">
                        <Select v-model="formItem.user" size="small"
                                class="ivu-nomal-select"
                                style="width:150px">
                            <Option value="20">临期20天</Option>
                            <Option value="30">临期30天</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="操作日期">
                        <DatePicker type="date"
                                    size="small"
                                    v-model="formItem.time"
                                    placeholder="请选择日期..."
                                    style="width: 150px"></DatePicker>
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
                <Table border :columns="table.columns" :data="table.data"
                    :loading="table.loading" class="ivu-mt">
                </Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { geToperationLog } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-console',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '操作日志',
                formItem: {
                    user: '',
                    showNum: '',
                    sortWay: '',
                    time: ''
                },
                pageSize: 5,
                total: 12,
                loading: false,
                modelImg: '/assets/images/vbg.png',
                table: {
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            width: '120px',
                            key: 'id'
                        },
                        {
                            title: '编号',
                            align: 'center',
                            key: 'UId'
                        },
                        {
                            title: '操作者',
                            align: 'center',
                            key: 'operator'
                        },
                        {
                            title: '操作日期',
                            align: 'center',
                            key: 'operateTime'
                        },
                        {
                            title: 'IP地址',
                            align: 'center',
                            key: 'ip'
                        },
                        {
                            title: '操作记录',
                            align: 'center',
                            key: 'operateLog'
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
            that.table.loading = true
            geToperationLog().then(async res => {
                that.table.data = res.tableData
                that.table.loading = false
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
