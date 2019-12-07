<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen" :class="{ 'content-layout-right-pro': this.menuCollapse }">
           <div class="ivu-block">
               <span>功能操作</span>
               <Form :model="formItem" :label-width="70"  inline :label-colon="true" class="real-time-form">
                   <FormItem label="输入搜索">
                       <Input v-model="formItem.input" placeholder="序号/名称" size="small"></Input>
                   </FormItem>
                   <FormItem label="监测状态">
                       <Select v-model="formItem.select" size="small">
                           <Option value="1">正常</Option>
                           <Option value="0">异常</Option>
                       </Select>
                   </FormItem>
                   <FormItem>
                       <Button type="primary" size="small" @click="doQuery">查询结果</Button>
                       <Button style="margin-left: 8px" size="small" to="/dashboard/real_time_monitor">重置查询</Button>
                   </FormItem>
                   <div class="ivu-inline-block" style="float: right">
                       <FormItem>
                           <Button style="margin-left: 8px" size="small" to="/dashboard/electricity_monitoring">
                               <Icon type="ios-arrow-back" />
                               返回
                           </Button>
                       </FormItem>
                       <FormItem label="显示条数">
                           <Select v-model="formItem.showNum" size="small" @on-change="setPageSize">
                               <Option value="20">20条/页</Option>
                               <Option value="50">50条/页</Option>
                               <Option value="100">100条/页</Option>
                           </Select>
                       </FormItem>
                       <FormItem label="排序方式">
                           <Select v-model="formItem.sortWay" size="small">
                               <Option value="id">序号</Option>
                               <Option value="name">回路名称</Option>
                               <Option value="time">监测时间</Option>
                               <Option value="status">状态</Option>
                               <Option value="dataInfo">监测数据</Option>
                               <Option value="errorInfo">报警内容</Option>
                           </Select>
                       </FormItem>
                   </div>
               </Form>
           </div>
            <Table border  :loading="loading" :columns="tableColumns" :data="tableData" size="small" ></Table>
            <div class="ivu-block" style="float: right;margin-top: 30px;">
                <Page :total="4" :page-size="pageSize" show-total show-elevator size="small" />
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'dashboard-real-time-monitoring',
        data () {
            return {
                title: '实时监测',
                loading: false,
                pageSize: 100,
                formItem: {
                    input: undefined,
                    select: undefined,
                    sortWay: undefined,
                    showNum: 1

                },
                tableColumns: [
                    {
                        title: '序号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '回路名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '监测时间',
                        align: 'center',
                        key: 'time'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        filters: [
                            {
                                label: '正常',
                                value: '1'
                            },
                            {
                                label: '异常',
                                value: '0'
                            }
                        ],
                        filterMethod (value, row) {
                            console.log(row);
                            console.log(value);
                        },
                        render: (h, params) => {
                            let status = '异常';
                            if (params.row.status === 1) {
                                status = '正常'
                            }
                            return h('div', status);
                        }
                    },
                    {
                        title: '监测数据',
                        align: 'center',
                        key: 'dataInfo'
                    },
                    {
                        title: '报警内容',
                        align: 'center',
                        key: 'errorInfo'
                    }
                ],
                tableData: [
                    {
                        id: 1,
                        name: '电气综合监控装置',
                        time: '2019.08.24   20：50',
                        status: 0,
                        dataInfo: '漏电通道1：397mA',
                        errorInfo: '漏电通道1：3422mA'
                    },
                    {
                        id: 2,
                        name: '电气综合监控装置',
                        time: '2019.08.24   20：50',
                        status: 1,
                        dataInfo: '漏电通道1：397mA',
                        errorInfo: ''
                    },
                    {
                        id: 3,
                        name: '电气综合监控装置',
                        time: '2019.08.24   20：50',
                        status: 1,
                        dataInfo: '漏电通道1：397mA',
                        errorInfo: ''
                    },
                    {
                        id: 4,
                        name: '电气综合监控装置',
                        time: '2019.08.24   20：50',
                        status: 1,
                        dataInfo: '漏电通道1：397mA',
                        errorInfo: ''
                    }
                ]
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'isTablet',
                'isDesktop',
                'menuCollapse'
            ])
        },
        created () {},
        methods: {
            setPageSize () {
                console.log('reset page size');
                this.pageSize = parseInt(this.formItem.showNum)
            },
            doQuery () {
                console.log('do query');
                console.log(this.formItem);
                // 只能 请求API筛选处理
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
