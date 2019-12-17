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
                       <Input v-model="formItem.input" placeholder="序号/名称" size="small" style="width: 150px"></Input>
                   </FormItem>
                   <FormItem label="监测状态">
                       <Select v-model="formItem.select" size="small" style="width: 150px">
                           <Option value="1">正常</Option>
                           <Option value="0">异常</Option>
                       </Select>
                   </FormItem>
                   <FormItem>
                       <Button type="primary" size="small" @click="doQuery" class="ivu-query-btn">查询结果</Button>
                       <Button style="margin-left: 18px" size="small">重置查询</Button>
                   </FormItem>
                   <div class="ivu-inline-block" style="float: right">
                       <FormItem>
                           <Button style="margin-left: 8px" size="small" to="/dashboard/electricity_monitoring">
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
    import { getElectricityRealTime } from '@api/account';
    export default {
        name: 'dashboard-real-time-monitoring',
        data () {
            return {
                title: '实时监测',
                loading: false,
                pageSize: 100,
                total: 0,
                formItem: {
                    input: undefined,
                    select: undefined,
                    sortWay: undefined,
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
                                    value: 1
                                },
                                {
                                    label: '异常',
                                    value: 0
                                }
                            ],
                            filterMethod (value, row) {
                                if (value === row.status) {
                                    return true;
                                }
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
            getElectricityRealTime()
                .then(async res => {
                    that.total = res.tableData.data.length;
                    that.reservoirData.data = res.tableData.data;
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
                console.log(this.formItem);
                // 只能 请求API筛选处理
            },
            changePage () {
                console.log('api change page')
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
