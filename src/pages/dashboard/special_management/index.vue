<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" @click="showHistory(true)" style="margin-left: 10px;">历史数据</Button>
                </Card>

                <div class="ivu-block tzsb-er-min father-position" v-for="(item, key) in infoData" :key="key">
                    <div :id="'chartLineBox' + key" style="width: 91px; height: 116px;" class="ivu-inline-block"></div>
                    <div class="ivu-inline-block child-position tzsb-child-info">
                        <div class="tzsb-title">{{ item.title}}</div>
                        <div class="left-content">
                            <div class="tzsb-group" v-for="(left_val, k) in item.info.left" :key="k">
                                <span class="ivu-inline-block">{{ left_val.name }}:</span>
                                <span class="ivu-inline-block tzsb-info-value">{{ left_val.value }}</span>
                            </div>
                        </div>
                        <div class="right-content">
                            <div class="tzsb-group" v-for="(right_val, k) in item.info.right" :key="k">
                                <span class="ivu-inline-block">{{ right_val.name }}:</span>
                                <span class="ivu-inline-block tzsb-info-value">{{ right_val.value }}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            <img :src="modelImg" alt="模型视图" v-if="!isHistory">
            <div v-else>
                <div class="ivu-block">
                    <Form :model="formItem" :label-width="70"  inline :label-colon="true" class="real-time-form ivu-inline-block">
                        <FormItem label="功能操作">
                        </FormItem>
                        <FormItem label="输入搜索">
                            <Input v-model="formItem.condition" placeholder="编号/名称/..." size="small" style="width: 120px" />
                        </FormItem>
                        <FormItem label="充电状态">
                            <Select v-model="formItem.state" size="small"  style="width:100px">
                                <Option :value="item.value" v-for="(item, key) in formItem.stateRow" :key="key">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="时间">
                            <DatePicker type="daterange" size="small" placement="bottom-end" placeholder="请选择日期" style="width: 200px" v-model="formItem.dateRange"></DatePicker>
                            <Button type="primary" size="small" @click="doQuery" class="ivu-ml">查询结果</Button>
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
                                <Option :value="item.key" v-for="(item, key) in reservoirData.columns" :key="key">{{ item.title }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="排序方式">
                            <Button type="primary" size="small" @click="showHistory(false)" class="ivu-ml">返回</Button>
                        </FormItem>
                    </Form>
                    <Table border  :loading="loading" :columns="reservoirData.columns" :data="reservoirData.data" size="small" ></Table>
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
    import { getSpecialManagement, getSpecialManagementHistory } from '@api/account';
    import 'echarts-liquidfill';

    const echarts = require('echarts');
    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                title: '特种设备管理',
                isHistory: false,
                infoData: [],
                modelImg: '/assets/images/u2539.svg',
                loading: false,
                pageSize: 100,
                total: 0,
                formItem: {
                    state: undefined,
                    dateRange: undefined,
                    condition: undefined,
                    showNum: 1,
                    sortWay: undefined,
                    stateRow: [
                        {
                            name: '正常',
                            value: 1
                        },
                        {
                            name: '异常',
                            value: 0
                        }
                    ]

                },
                reservoirData: {
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            key: 'id'
                        },
                        {
                            title: '充电通道',
                            align: 'center',
                            key: 'charging_channels'
                        },
                        {
                            title: '平均充电电压',
                            align: 'center',
                            key: 'avg_voltage'
                        },
                        {
                            title: '平均充电电流',
                            align: 'center',
                            key: 'avg_current'
                        },
                        {
                            title: '平均充电温度',
                            align: 'center',
                            key: 'avg_temperature'
                        },
                        {
                            title: '充电开始',
                            align: 'center',
                            key: 'charging_start',
                            render: (h, params) => {
                                let date = new Date(params.row.charging_start * 1000);
                                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                return h('div', mouth + '-' + day + ' ' + hours + ':' + minutes);
                            }
                        },
                        {
                            title: '充电结束',
                            align: 'center',
                            key: 'charging_end',
                            render: (h, params) => {
                                let date = new Date(params.row.charging_end * 1000);
                                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                return h('div', mouth + '-' + day + ' ' + hours + ':' + minutes);
                            }
                        },
                        {
                            title: '充电时长',
                            align: 'center',
                            key: 'charging_duration',
                            render: (h, params) => {
                                let timeDifference = params.row.charging_end - params.row.charging_start
                                return h('div', Math.floor(timeDifference / 3600) + ' h  ' + Math.floor(Math.floor(timeDifference % 3600) / 60) + ' min');
                            }
                        },
                        {
                            title: '充电状态',
                            align: 'center',
                            key: 'charging_state',
                            render: (h, params) => {
                                if (params.row.charging_state === 1) {
                                    return h('div', '正常');
                                } else {
                                    return h('div', {
                                        style: {
                                            display: 'inline-block',
                                            color: '#d40303',
                                            width: '100%'
                                        }
                                    }, '异常');
                                }
                            }
                        },
                        {
                            title: '充电电量',
                            align: 'center',
                            key: 'charging_electricity'
                        },
                        {
                            title: '月累计电量',
                            align: 'center',
                            key: 'mouth_electricity'
                        }
                    ],
                    data: []
                }
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'menuCollapse'
            ])
        },
        created () {
            let that = this;
            getSpecialManagement()
                .then(async res => {
                    that.infoData = res.rowList
                    for (let i = 0; i < res.rowList.length; i++) {
                        let thisItem = res.rowList[i].echars
                        that.drawEchars('chartLineBox' + i, thisItem.progressValue, thisItem.state, thisItem.time);
                    }
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
            drawEchars (elementId, progressValue, state, times) {
                let color = '#1abc9c'
                if (state === 1) {
                    color = '#1abc9c'
                } else if (state === 2) {
                    color = '#f04844'
                } else if (state === 3) {
                    color = '#2ecc71'
                }
                let timeVal = '√ \n未充电'
                if (times !== 0) {
                    timeVal = Math.floor(times / 3600) + ' h \n' + Math.floor(Math.floor(times % 3600) / 60) + ' min';
                }
                setTimeout(function () {
                    let myChart = echarts.init(document.getElementById(elementId));
                    let data = {
                        name: '',
                        value: progressValue
                    }
                    myChart.setOption({
                        backgroundColor: '#fff',
                        title: {
                            text: data.name,
                            textAlign: 'center'
                        },
                        series: {
                            name: data.name,
                            type: 'pie',
                            clockWise: false,
                            radius: [30, 40],
                            itemStyle: {
                                normal: {
                                    color: color,
                                    shadowColor: color,
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            hoverAnimation: false,
                            center: [50 + '%', '45%'],
                            data: [{
                                value: data.value,
                                label: {
                                    normal: {
                                        formatter: function (params) {
                                            return timeVal;
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            color: '#389af4'
                                        }
                                    }
                                }
                            }, {
                                value: 100 - data.value,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: '#dfeaff'
                                    },
                                    emphasis: {
                                        color: '#dfeaff'
                                    }
                                }
                            }]
                        }
                    }
                    );
                }, 1000)
            },
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
            },
            showHistory (state) {
                if (state === true) {
                    getSpecialManagementHistory()
                        .then(async res => {
                            this.total = res.tableData.data.length;
                            this.reservoirData.data = res.tableData.data;
                            this.formItem.alarm_type = res.tableData.alarm_type;
                        }).catch(err => {
                            console.log('err: ', err)
                        })
                    this.isHistory = true
                    this.$store.commit('admin/layout/updateMenuCollapse', true)
                } else {
                    this.isHistory = false
                    this.$store.commit('admin/layout/updateMenuCollapse', false)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
