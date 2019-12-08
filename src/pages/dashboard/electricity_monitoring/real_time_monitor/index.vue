<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen" :class="{ 'content-layout-right-pro': this.menuCollapse }">
           <div class="ivu-block">
               <Form :model="formItem" :label-width="70"  inline :label-colon="true" class="real-time-form ivu-inline-block">
                   <FormItem label="功能操作">
                   </FormItem>
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
                       <i-link to="/dashboard/real_time_monitor">
                           <Button style="margin-left: 8px" size="small" >重置查询</Button>
                       </i-link>
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
               <Table border  :loading="loading" :columns="tableColumns" :data="tableData" size="small" ></Table>
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
                tableColumns: [],
                tableData: []
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
        created () {
            let that = this;
            getElectricityRealTime()
                .then(async res => {
                    console.log('res', res);
                    that.tableColumns = that.dealTableData(res.tableData.tableColumns);
                    that.total = res.tableData.tableData.length;
                    that.tableData = res.tableData.tableData;
            }).catch(err => { console.log('err: ', err) });
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
            dealTableData (data) {
                let dataTemp = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = {};
                    // 状态栏目传过来的数字  所以要在这里处理 ，后期有其他也是在这里处理
                    if (data[i].key === 'status') {
                        Object.assign(temp, {
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
                                if (value === parseInt(row.status)) {
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
                        }, data[i]);
                    } else {
                        temp = data[i];
                    }
                    dataTemp.push(temp)
                }
                return dataTemp
            },
            changePage () {
                console.log('api change page')
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
