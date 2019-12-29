<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-img user-full-screen ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="content-layout-right user-full-screen ivu-overflow-auto" :class="{ 'content-layout-right-pro': this.menuCollapse }"
                 ref="right">
                <div class="ivu-block">
                    <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                          class="real-time-form ivu-inline-block user-full-screen">
                        <div class="ivu-form-item" style="line-height: 32px;">
                            功能操作
                        </div>
                        <FormItem label="输入搜索">
                            <Input v-model="formItem.input"
                                   placeholder="序号/编码" size="small"
                                   style="width: 200px"></Input>
                        </FormItem>
                        <FormItem label="设施类型">
                            <Select v-model="formItem.type"
                                    size="small"
                                    class="ivu-nomal-select"
                                    style="width: 150px">
                                <Option value="1">正常</Option>
                                <Option value="0">异常</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="临期时间">
                            <Select v-model="formItem.periodTime"
                                    size="small"
                                    class="ivu-nomal-select"
                                    style="width: 150px">
                                <Option value="1">临期10天</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" size="small" @click="doQuery" class="ivu-query-btn">查询结果</Button>
                            <Button style="margin-left: 18px" size="small">重置查询</Button>
                        </FormItem>
                        <div class="ivu-inline-block" style="float: right">
                            <FormItem>
                                <Button style="margin-left: 8px" size="small" to="/dashboard/safety_equipment_ledger">
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
                    <Table border
                           :span-method="handleSpan"
                           :loading="table.loading"
                           :columns="table.columns"
                           :data="table.data" size="small" >
                        <template slot-scope="{ row }" slot="instructions" >
                            <Button size="small" type="primary" @click="preview(1, row)">查看</Button>
                            <Button size="small" type="primary" @click="preview(2, row)">下载</Button>
                            <Button size="small" type="primary" @click="preview(3, row)">更改</Button>
                        </template>
                        <template slot-scope="{ row }" slot="drawings" >
                            <Button size="small" type="primary" @click="preview(1, row)">查看</Button>
                            <Button size="small" type="primary" @click="preview(2, row)">下载</Button>
                            <Button size="small" type="primary" @click="preview(3, row)">更改</Button>
                        </template>
                    </Table>
                </div>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    // import { get3dModelInfo } from '@api';

    export default {
        name: 'dashboard-console',
        data () {
            return {
                loading: false,
                pageSize: 10,
                total: 0,
                formItem: {
                    input: undefined,
                    type: undefined,
                    periodTime: undefined,
                    sortWay: undefined,
                    showNum: 1

                },
                table: {
                    columns: [
                        {
                            title: '设',
                            width: '50px',
                            align: 'center',
                            key: 'row1'
                        },
                        {
                            title: '备',
                            width: '50px',
                            align: 'center',
                            key: 'row2'
                        },
                        {
                            title: '名',
                            width: '120px',
                            align: 'center',
                            key: 'row3'
                        },
                        {
                            title: '称',
                            width: '120px',
                            align: 'center',
                            key: 'row4'
                        },
                        {
                            title: '设备编码',
                            width: '200px',
                            align: 'center',
                            key: 'coding'
                        },
                        {
                            title: '规则型号',
                            width: '200px',
                            align: 'center',
                            key: 'model'
                        },
                        {
                            title: '生产厂商',
                            width: '200px',
                            align: 'center',
                            key: 'manufacturers'
                        },
                        {
                            title: '出厂日期',
                            width: '200px',
                            align: 'center',
                            key: 'productionDate'
                        },
                        {
                            title: '有效日期',
                            width: '200px',
                            align: 'center',
                            key: 'effectiveDate'
                        },
                        {
                            title: '临期时间',
                            width: '200px',
                            align: 'center',
                            key: 'periodTime'
                        },
                        {
                            title: '注意事项',
                            width: '200px',
                            align: 'center',
                            key: 'attention'
                        },
                        {
                            title: '使用说明书',
                            width: '200px',
                            align: 'center',
                            key: 'instructions'
                        },
                        {
                            title: '图纸',
                            width: '200px',
                            align: 'center',
                            key: 'drawings'
                        }
                    ],
                    data: [
                        {
                            row1: '安全设备设施分类',
                            row2: '安防设施',
                            row3: '视频监控设备'
                        },
                        {
                            row1: '门禁系统设备'
                        },
                        {
                            row1: '车辆系统设备'
                        },
                        {
                            row1: '消防设施',
                            row2: '消防供配电设施',
                            row3: '电箱'
                        },
                        {
                            row1: '火灾自动报警系统',
                            row2: '防爆感烟探测器'
                        },
                        {
                            row1: '防爆手动报警按钮'
                        },
                        {
                            row1: '防爆声光报警器'
                        },
                        {
                            row1: '防爆接线箱'
                        },
                        {
                            row1: '电器火灾监控系统'
                        },
                        {
                            row1: '消防栓灭火系统',
                            row2: '消防栓箱'
                        },
                        {
                            row1: '泡沫灭火系统',
                            row2: '泡沫罐'
                        },
                        {
                            row1: '防排烟系统',
                            row2: '防爆轴流通风机'
                        },
                        {
                            row1: '应急照明和疏散只指示标志',
                            row2: '防爆应急LED工厂灯'
                        },
                        {
                            row1: '疏散指示标志'
                        },
                        {
                            row1: '消防水源',
                            row2: '水源'
                        },
                        {
                            row1: '水房'
                        },
                        {
                            row1: '便携措施',
                            row2: '灭火器'
                        },
                        {
                            row1: '黄沙箱'
                        },
                        {
                            row1: '微信消防站'
                        },
                        {
                            row1: '其他措施',
                            row2: '防撞装置'
                        },
                        {
                            row1: '人体静电释放器'
                        },
                        {
                            row1: '安全警示标志'
                        },
                        {
                            row1: '门'
                        },
                        {
                            row1: '窗'
                        },
                        {
                            row1: '叉车'
                        },
                        {
                            row1: '防爆风机'
                        },
                        {
                            row1: '堆高机'
                        }
                    ]
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
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            handleSpan ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0 && columnIndex === 0) {
                    return [999, 1];
                } else if (rowIndex === 0 && columnIndex === 1) {
                    return [3, 1];
                } else if (rowIndex === 0 && columnIndex === 2) {
                    return [1, 2];
                } else if (rowIndex === 1 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 2 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 3 && columnIndex === 0) {
                    return [16, 1];
                } else if (rowIndex === 4 && columnIndex === 0) {
                    return [4, 1];
                } else if (rowIndex === 8 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 12 && columnIndex === 0) {
                    return [2, 1];
                } else if (rowIndex === 14 && columnIndex === 0) {
                    return [2, 1];
                } else if (rowIndex === 16 && columnIndex === 0) {
                    return [3, 1];
                } else if (rowIndex === 19 && columnIndex === 0) {
                    return [8, 1];
                } else if (rowIndex === 19 && columnIndex === 1) {
                    return [1, 2];
                } else if (rowIndex === 20 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 21 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 22 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 23 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 24 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 25 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 26 && columnIndex === 0) {
                    return [1, 2];
                }
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
