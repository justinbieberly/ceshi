<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" to="hazard_history" style="margin-left: 10px;">历史记录</Button>
                    <div class="ivu-block">
                        <div id="chartLineBox" style="width: 100%;height: 300px;" class="ivu-inline-block"> </div>
                        <div id="chartLineBox1" style="width: 100%;height: 300px; margin-top: 70px;" class="ivu-inline-block"> </div>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <img :src="modelImg" alt="">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getHazardRegistration } from '@api';
    import Config from '@/config';
    const echarts = require('echarts');
    export default {
        name: 'dashboard-handling-operation',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '隐患处置',
                echartsData: {
                    overview: {
                        legend: ['已处理', '未处理'],
                        data: []
                    },
                    classification: {
                        legend: [],
                        data: []
                    }
                },
                modelImg: '/assets/images/vbg.png'
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
            getHazardRegistration().then(async res => {
                let overviewData = [
                    {
                        name: '已处理',
                        value: res.echarts.overview.deal
                    },
                    {
                        name: '未处理',
                        value: res.echarts.overview.unDeal
                    }
                ]
                setTimeout(function () {
                    that.drawPieChart('chartLineBox', that.echartsData.overview.legend, overviewData, 1)
                    that.drawPieChart('chartLineBox1', res.echarts.classification.legend, res.echarts.classification.data, 2)
                }, 500)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            drawPieChart (elementId, legend, data, state) {
                let titleStr = '隐患详情'
                if (state === 2) {
                    titleStr = '隐患分类'
                }
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.setOption({
                    title: {
                        text: titleStr,
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
                        itemWidth: 14,
                        // left: 'left',
                        bottom: 'bottom',
                        data: legend,
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            center: ['48%', '50%'],
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
