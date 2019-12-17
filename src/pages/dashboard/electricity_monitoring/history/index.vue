<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen ivu-overflow-auto" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <Card :bordered="false">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" @click.prevent="$router.go(-1)">
                        <Icon type="ios-arrow-back" />
                        返回
                    </Button>
                    <Table border :columns="tables.table1.columns" :data="tables.table1.data">
                        <template slot-scope="{ row, index }" slot="detail">
                            <div class="ivu-inline-block electricity-box" v-for="(item, key) in row.detail" :key="key" :name="key" >
                                <div class="ivu-text-center"> 漏电通道 </div>
                                <div class="ivu-block user-electricity-span" v-for="(info, key) in item" :key="key" :name="key" >
                                    <span>{{ info.title}}</span>
                                    <span v-if=" info.title">：</span>
                                    <span>{{ info.value }}</span>
                                </div>
                            </div>
                        </template>
                    </Table>

                    <Tabs type="card" style="margin-top: 20px;">
                        <TabPane label="漏电,温度曲">
                            <div id="chartLineBox" style="width: 45%;height: 70vh;" class="ivu-inline-block"> </div>
                            <div id="chartLineBox1" style="width: 45%;height: 70vh;" class="ivu-inline-block"> </div>
                        </TabPane>
                        <TabPane label="电压、电流曲线">电压、电流曲线</TabPane>
                        <TabPane label="负载曲线">
                            <div id="chartLineBox5" style="width: 95%;height: 70vh;" class="ivu-inline-block"> </div>
                        </TabPane>
                        <TabPane label="能耗图">能耗图</TabPane>
                        <TabPane label="历史数据">
                            <Table border :columns="tables.table2.columns" :data="tables.table2.data">
                                <template slot-scope="{ row, index }" slot="detail">
                                    <div class="ivu-inline-block electricity-box" v-for="(item, key) in row.detail" :key="key" :name="key" >
                                        <div class="ivu-text-center"> 漏电通道 </div>
                                        <div class="ivu-block user-electricity-span" v-for="(info, key) in item" :key="key" :name="key" >
                                            <span>{{ info.title}}</span>
                                            <span v-if=" info.title">：</span>
                                            <span>{{ info.value }}</span>
                                        </div>
                                    </div>
                                </template>
                            </Table>
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getElectricityHistory } from '@api/account';
    const echarts = require('echarts');
    export default {
        name: 'dashboard-electricity-history',
        data () {
            return {
                title: '电气综合监控装置',
                tables: {
                    table1: {
                        columns: [
                            {
                                title: '回路名称',
                                width: '200px',
                                align: 'center',
                                key: 'name'
                            },
                            {
                                title: '监测时间',
                                width: '200px',
                                align: 'center',
                                key: 'time'
                            },
                            {
                                title: '监测数据',
                                align: 'left',
                                slot: 'detail'
                            }
                        ],
                        data: []
                    },
                    table2: {
                        columns: [
                            {
                                title: '监测时间',
                                width: '200px',
                                align: 'center',
                                key: 'time'
                            },
                            {
                                title: '监测数据',
                                slot: 'detail'
                            }
                        ],
                        data: []
                    }
                },
                echartsData: {
                    chartLineBox: {
                        data: []
                    },
                    chartLineBox1: {
                        nameRow: [],
                        xAxis: [],
                        data: []
                    }
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
            getElectricityHistory()
                .then(async res => {
                    console.log('res', res);
                    that.tables.table1.data = res.historyTableData.table1;
                    that.tables.table2.data = res.historyTableData.table2;
                    that.echartsData.chartLineBox = res.echartsData.chartLineBox;
                    that.echartsData.chartLineBox1 = res.echartsData.chartLineBox1;
                    that.drawLDEchars();
                    that.drawTemEchars();
                    that.drawFZEchars();
                }).catch(err => { console.log('err: ', err) })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            drawLDEchars () {
                // 漏电曲线
                let myChart = echarts.init(document.getElementById('chartLineBox'));
                myChart.setOption({
                    title: {
                        text: '漏电曲线',
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) { // 页面显示
                            let parameter = params[0];
                            let date = new Date(parameter.name * 1000);
                            let infoNum = parameter.data.value[1];
                            let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                            let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                            let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                            return hours + ':' + minutes + ' ' + mouth + '-' + day + '<br/>漏电通道1:' + infoNum
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'time',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    },
                    series: [{
                        name: '漏电曲线',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: this.echartsData.chartLineBox.data
                    }]
                });
            },
            drawTemEchars () {
                // 温度曲线  -- 该曲线必须保证每个时间点有时间 是一对一的
                let myChart1 = echarts.init(document.getElementById('chartLineBox1'));
                myChart1.setOption({
                    title: {
                        text: '温度曲线',
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: this.echartsData.chartLineBox1.nameRow,
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.echartsData.chartLineBox1.xAxis,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    },
                    series: this.echartsData.chartLineBox1.data
                })
            },
            drawDYEchars () {
                console.log('45454')
            },
            drawDLEchars () {
                console.log('45454')
            },
            drawFZEchars () {
                // 负载曲线
                let myChart = echarts.init(document.getElementById('chartLineBox5'));
                myChart.setOption({
                    title: {
                        text: '负载曲线',
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) { // 页面显示
                            let parameter = params[0];
                            let date = new Date(parameter.name * 1000);
                            let infoNum = parameter.data.value[1];
                            let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                            let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                            let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                            return hours + ':' + minutes + ' ' + mouth + '-' + day + '<br/>负载曲线:' + infoNum
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'time',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    },
                    series: [{
                        name: '漏电曲线',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: this.echartsData.chartLineBox.data
                    }]
                });
            },
            drawHNEchars () {
                console.log('45454')
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
