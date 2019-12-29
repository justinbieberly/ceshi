<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow >
                    <div class="ivu-block">
                        <div class="ivu-block">
                            <div class="regime-btn ivu-btn ivu-btn-default ivu-font-size-small"
                                 v-for="(value, index) in menuList"
                                 :key="index"
                                 :class="{ 'ivu-btn-selected': btnArr[index].state }"
                                 @click="selectThisBtn(index)">
                                <div class="ivu-inline-block">{{ value.title }}</div>
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
                    <div class="ivu-inline-block ivu-no-lable" style="float: right">
                        <FormItem>
                            <Button size="small" class="ivu-mr-16"  @click="exportData" >
                                <Icon type="md-arrow-round-down" />
                                导出数据</Button>
                            <RadioGroup v-model="formItem.timeRange" type="button"
                                        @on-change="setTimeRange"
                                        size="small" class="ivu-mr-16">
                                <Radio label="今年"></Radio>
                                <Radio label="最近7天"></Radio>
                                <Radio label="最近30天"></Radio>
                            </RadioGroup>
                            <DatePicker type="daterange" placement="bottom-end"
                                        class="ivu-mr-16"
                                        v-model="formItem.dateTime"
                                        @on-change="setTimeRange(true)"
                                        placeholder="请选择时间范围" size="small"
                                        style="width: 200px">

                            </DatePicker>
                        </FormItem>
                    </div>
                </Form>
                <div class="ivu-mt-16 ivu-block data-charts">
                    <div class="ivu-inline-block" v-if="state === 0">
                        <div id="chartLineBox1" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 0">
                        <div id="chartLineBox2" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 1" :class="{ 'ivu-hidden': state != 1 }">
                        <div id="chartLineBox3" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 1" :class="{ 'ivu-hidden': state != 1 }">
                        <div id="chartLineBox4" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 2">
                        <div id="chartLineBox5" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 2">
                        <div id="chartLineBox6" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 3">
                        <div id="chartLineBox7" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 3">
                        <div id="chartLineBox8" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 3">
                        <div id="chartLineBox9" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                    <div class="ivu-inline-block" v-if="state === 3">
                        <div id="chartLineBox10" style="width: 100%;height: 60vh;" class="ivu-inline-block"> </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getDataStatisticsMenu, getDataStatisticsCharts } from '@api';
    import Config from '@/config';
    const echarts = require('echarts');

    export default {
        name: 'dashboard-console',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '数据统计',
                menuList: [],
                btnArr: [],
                formItem: {
                    id: '',
                    timeRange: '',
                    dateTime: ''
                },
                charts: {
                    left: {},
                    right: {}
                },
                state: 0
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
            getDataStatisticsMenu().then(async res => {
                that.menuList = res.menu
                console.log(' that.menuList', that.menuList)
                this.setMenuClass(res.menu)
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            setMenuClass (data) {
                let tempArr = []
                data.some((item, key, arr) => {
                    if (key === 0) {
                        // 默认第一个选中
                        let param = {
                            id: item.id
                        }
                        this.formItem.id = item.id
                        this.getChartsDataByParam(param)
                        tempArr.push({
                            state: true
                        })
                    } else {
                        tempArr.push({
                            state: false
                        })
                    }
                })
                this.btnArr = tempArr
            },
            selectThisBtn (key) {
                // 点击按钮切换颜色
                let that = this
                that.btnArr.some((item, key, arr) => {
                    that.btnArr[key].state = false
                })
                that.btnArr[key].state = true
                // todo 更换右侧表单的数据
                let id = that.menuList[key].id
                this.formItem.id = id
                this.state = key
                setTimeout(() => {
                    let param = {
                        id: id
                    }
                    this.getChartsDataByParam(param)
                }, 100)
            },
            exportData () {
                this.$Message.success('导出成功')
            },
            getChartsDataByParam (param) {
                getDataStatisticsCharts(param).then(async res => {
                    if (this.state === 3) {
                        let charts = res.charts
                        this.drawStackedBarCharts(
                            'chartLineBox7',
                            {
                                text: charts.library.title,
                                textStyle: {
                                    color: '#cfcfcf'
                                }
                            },
                            charts.library.legendData,
                            charts.library.xAxisData,
                            charts.library.seriesData
                        )

                        this.drawStackedBarCharts(
                            'chartLineBox8',
                            {
                                text: charts.libraryA.title,
                                textStyle: {
                                    color: '#cfcfcf'
                                }
                            },
                            charts.libraryA.legendData,
                            charts.libraryA.xAxisData,
                            charts.libraryA.seriesData
                        )

                        this.drawStackedBarCharts(
                            'chartLineBox9',
                            {
                                text: charts.libraryB.title,
                                textStyle: {
                                    color: '#cfcfcf'
                                }
                            },
                            charts.libraryB.legendData,
                            charts.libraryB.xAxisData,
                            charts.libraryB.seriesData
                        )

                        this.drawStackedBarCharts(
                            'chartLineBox10',
                            {
                                text: charts.libraryC.title,
                                textStyle: {
                                    color: '#cfcfcf'
                                }
                            },
                            charts.libraryC.legendData,
                            charts.libraryC.xAxisData,
                            charts.libraryC.seriesData
                        )
                    } else {
                        let leftCharts = res.charts.left
                        let rightCharts = res.charts.right
                        if (this.state === 0) {
                            this.drawOneCurveEcharts(
                                'chartLineBox1',
                                {
                                    text: leftCharts.title,
                                    textStyle: {
                                        color: '#cfcfcf'
                                    }
                                },
                                leftCharts.legendData,
                                leftCharts.xAxisData,
                                leftCharts.seriesData
                            )
                            this.drawPieEcharts(
                                'chartLineBox2',
                                rightCharts.legendData,
                                rightCharts.seriesData
                            )
                        } else if (this.state === 1) {
                            this.drawManyCurveEcharts(
                                'chartLineBox3',
                                {
                                    text: leftCharts.title,
                                    textStyle: {
                                        color: '#cfcfcf'
                                    }
                                },
                                leftCharts.legendData,
                                leftCharts.xAxisData,
                                leftCharts.seriesData
                            )
                            this.drawManyCurveEcharts(
                                'chartLineBox4',
                                {
                                    text: rightCharts.title,
                                    textStyle: {
                                        color: '#cfcfcf'
                                    }
                                },
                                rightCharts.legendData,
                                rightCharts.xAxisData,
                                rightCharts.seriesData
                            )
                        } else if (this.state === 2) {
                            this.drawBarEcharts(
                                'chartLineBox5',
                                {
                                    text: leftCharts.title,
                                    textStyle: {
                                        color: '#cfcfcf'
                                    }
                                },
                                leftCharts.xAxisData,
                                leftCharts.seriesData
                            )
                            this.drawBarEcharts(
                                'chartLineBox6',
                                {
                                    text: rightCharts.title,
                                    textStyle: {
                                        color: '#cfcfcf'
                                    }
                                },
                                rightCharts.xAxisData,
                                rightCharts.seriesData
                            )
                        }
                    }
                })
            },
            drawOneCurveEcharts (elementId, title, legendData, xAxisData, seriesData) {
                let myChart1 = echarts.init(document.getElementById(elementId));
                myChart1.clear()
                myChart1.setOption({
                    title: title,
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legendData,
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
                        data: xAxisData,
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
                    series:
                        {
                            data: seriesData,
                            type: 'line'
                        }
                })
            },
            drawManyCurveEcharts (elementId, title, legendData, xAxisData, seriesData) {
                let myChart1 = echarts.init(document.getElementById(elementId));
                myChart1.clear()
                myChart1.setOption({
                    title: title,
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legendData,
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
                        data: xAxisData,
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
                    series: seriesData
                })
            },
            drawPieEcharts (elementId, legend, data) {
                let title = '隐患数量'
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.clear()
                myChart.setOption({
                    title: {
                        text: title,
                        subtext: '饼状图',
                        x: 'center',
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        // bottom: 'bottom',
                        data: legend,
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '60%',
                            center: ['53%', '50%'],
                            data: data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })
            },
            drawBarEcharts (elementId, title, legendData, seriesData) {
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.clear()
                myChart.setOption({
                    title: title,
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: legendData,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        lineStyle: {
                            color: '#cfcfcf' // 更改坐标轴颜色
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
                    grid: {
                        top: '15%',
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    series: [
                        {
                            name: '数据量',
                            type: 'bar',
                            barWidth: '40%',
                            data: seriesData
                        }
                    ]
                })
            },
            drawStackedBarCharts (elementId, title, legendData, xAxisData, seriesData) {
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.clear()
                myChart.setOption({
                    title: title,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: legendData
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisData,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#cfcfcf'
                                }
                            },
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#cfcfcf' // 更改坐标轴颜色
                                }
                            }
                        }
                    ],
                    series: seriesData
                })
            },
            setTimeRange (data) {
                let param = {
                    id: this.formItem.id
                }
                if (data === '今年') {
                    Object.assign(param, {
                        timeRage: 1
                    })
                } else if (data === '最近7天') {
                    Object.assign(param, {
                        timeRage: 2
                    })
                } else if (data === '最近30天') {
                    Object.assign(param, {
                        timeRage: 3
                    })
                } else if (data === true) {
                    Object.assign(param, {
                        timeRage: [new Date(this.formItem.dateTime[0]).getTime(),
                                   new Date(this.formItem.dateTime[1]).getTime()]
                    })
                }
                this.getChartsDataByParam(param)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .regime-btn {
        width: 100%;
        margin-bottom: 8px;
        overflow: hidden;
        div:first-child {
            width: 40%;
            line-height: 32px;
            text-align: left;
        }
        div:nth-child(2) {
            width: 35%;
        }
    }
    .data-charts {
        div {
            width: 50%;
        }
    }
</style>
