<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" to="risk_warning_history" style="margin-left: 10px;">历史数据</Button>
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
            <img :src="modelImg" alt="模型视图">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getSpecialManagement } from '@api/account';
    import 'echarts-liquidfill';

    const echarts = require('echarts');
    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                title: '特种设备管理',
                infoData: [],
                modelImg: '/assets/images/u2539.svg'
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
                    console.log(res)
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
                    timeVal = Math.floor(times / 3600) + ' h \n' + Math.floor(times / 60) + ' min';
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
