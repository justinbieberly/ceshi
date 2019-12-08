<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <a href="#" slot="extra" @click.prevent="$router.go(-1)">
                        <Icon type="ios-arrow-back" />
                        返回
                    </a>
                    <Table border :columns="columns" :data="data">
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
                            漏电,温度曲线
                            <div id="chartLineBox" style="width: 90%;height: 70vh;"> </div>
                        </TabPane>
                        <TabPane label="电压、电流曲线">电压、电流曲线</TabPane>
                        <TabPane label="负载曲线">负载曲线</TabPane>
                        <TabPane label="能耗图">能耗图</TabPane>
                        <TabPane label="历史数据">历史数据</TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    const echarts = require('echarts');
    export default {
        name: 'dashboard-electricity-history',
        data() {
            return {
                title: '电气综合监控装置',
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
                        slot: 'detail'
                    }
                ],
                data: [
                    {
                        name: '电气综合监控装置 400A',
                        time: '2019.08.24   22:00:31 警报',
                        detail: [
                            [
                                {
                                    title: '通道编号-1',
                                    value: '4074mA'
                                },
                                {
                                    title: 'A相电压',
                                    value: '4074mA'
                                },
                                {
                                    title: '功率因数',
                                    value: '0.819'
                                },
                                {
                                    title: '电能',
                                    value: '5907.28KWh'
                                },
                                {
                                    title: '过压',
                                    value: '否'
                                }
                            ],
                            [
                                {
                                    title: '通道编号-2',
                                    value: '2000mA'
                                },
                                {
                                    title: 'B相电压',
                                    value: '23.4V'
                                },
                                {},
                                {},
                                {
                                    title: '过压',
                                    value: '否'
                                }
                            ]
                        ]
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
        mounted () {
            let myChart = echarts.init(document.getElementById('chartLineBox'));
            // 指定图表的配置项和数据
            let data = [];
            let option = {
                title: {
                    text: '漏电曲线'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: data
                }]
            };
            myChart.setOption(option);
        },
        created () {},
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
</style>
