<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Tabs type="card" style="margin-top: 20px;">
                        <TabPane label="可燃气体监测">
                            <Tree :data="data5" :render="renderContent" class="env-air-tree ivu-text-color i-ctr-hj"></Tree>
                        </TabPane>
                        <TabPane label="环境温度监测">
                            <Tree :data="data6" :render="renderContent" class="env-air-tree ivu-text-color i-ctr-hj"></Tree>
                        </TabPane>
                    </Tabs>
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
    import { getEnvironmentalMonitoring } from '@api/account';
    import Config from '@/config';
    export default {
        name: 'dashboard-environmental-monitoring',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '环境监测',
                modelImg: '/assets/images/u957.svg',
                data5: [],
                data6: [],
                buttonProps: {
                    type: 'text', // R让按钮不在页面上显示
                    size: 'small'
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
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        created () {
            let that = this;
            getEnvironmentalMonitoring()
                .then(async res => {
                    console.log(res);
                    that.data5 = that.dealTableData(res.airTableData);
                    that.data6 = that.dealTableData(res.temperTableData)
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
            renderContent (h, { root, node, data }) {
                let errStyle = {
                    display: 'inline-block',
                    width: '100%'
                };
                let bgColor = {
                    backgroundColor: '#c1cdc0'
                }
                let state = 'none'
                if (node.node.errorLevel === 1) {
                    // 警告级别的错误
                    Object.assign(errStyle, {
                        color: '#cec15c'
                    });
                    bgColor = {
                        backgroundColor: '#6891d7'
                    }
                    state = 'block'
                } else if (node.node.errorLevel === 2) {
                    // 故障 错误
                    Object.assign(errStyle, {
                        color: '#ce0f0d'
                    });
                    bgColor = {
                        backgroundColor: '#6891d7'
                    }
                    state = 'block'
                }
                return h('span', {
                    class: ['ivu-tree-title'],
                    style: errStyle
                }, [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'left'
                            // width: '72%'
                        }
                    }, [
                        h('span', {
                            style: Object.assign({
                                width: '15px',
                                height: '15px',
                                borderRadius: '2px',
                                display: 'inline-block',
                                backgroundColor: '#c1cdc0',
                                marginTop: '4px',
                                marginRight: '8px'
                            }, bgColor)
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '10px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-information-circle'
                            }),
                            style: {
                                width: '32px',
                                display: state,
                                fontSize: '19px',
                                lineHeight: '23px'
                            }
                        })
                    ])
                ]);
            },
            dealTableData (data) {
                let dataTemp = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = {};
                    Object.assign(temp, data[i]);
                    let dataChildTemp = [];
                    for (let n = 0; n < data[i].children.length; n++) {
                        let childrenTemp = {};
                        Object.assign(childrenTemp, {
                            disabled: true
                        }, data[i].children[n]);
                        dataChildTemp.push(childrenTemp)
                    }
                    temp.children = dataChildTemp;
                    dataTemp.push(temp)
                }
                return dataTemp;
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
