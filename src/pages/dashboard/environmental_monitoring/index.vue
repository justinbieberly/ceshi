<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Tabs type="card" style="margin-top: 40px;">
                        <TabPane label="可燃气体监测">
                            <Tree :data="data5" :render="renderContent" class="env-air-tree"></Tree>
                        </TabPane>
                        <TabPane label="环境温度监测">
                            <Tree :data="data6" :render="renderContent" class="env-air-tree"></Tree>
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            <img :src="modelImg" alt="">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getEnvironmentalMonitoring } from '@api/account';
    export default {
        name: 'dashboard-environmental-monitoring',
        data () {
            return {
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
                'menuCollapse'
            ])
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
                // 页面渲染引擎
                if (node.node.checked) {
                    // 存在故障
                    let errStyle = {
                        display: 'inline-block',
                        width: '100%'
                    };
                    if (node.node.errorLevel === 1) {
                        // 警告级别的错误
                        Object.assign(errStyle, {
                            color: '#cec15c'
                        });
                    } else if (node.node.errorLevel === 2) {
                        // 故障 错误
                        Object.assign(errStyle, {
                            color: '#ce0f0d'
                        });
                    }
                    return h('span', {
                        style: errStyle
                    }, [
                        h('span', {
                            style: {
                                width: '60%',
                                height: '100%',
                                display: 'flex',
                                lineHeight: '24px',
                                float: 'left',
                                marginRight: '8px'
                            }
                        }, [
                            h('span', {
                                style: {
                                    width: '15px',
                                    height: '15px',
                                    display: 'inline-block',
                                    backgroundColor: '#6891d7',
                                    marginTop: '4px',
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '62px'
                            }
                        }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-information-circle'
                                }),
                                style: {
                                    width: '32px',
                                    fontSize: '20px',
                                    lineHeight: '23px'
                                }
                            })
                        ])
                    ]);
                } else {
                    // 不存在
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [h('span', {
                        style: {
                            width: '60%',
                            height: '100%',
                            display: 'flex',
                            lineHeight: '24px',
                            float: 'left',
                            marginRight: '8px'
                        }
                    }, [h('span', {
                        style: {
                            width: '15px',
                            height: '15px',
                            display: 'inline-block',
                            backgroundColor: '#c1cdc0',
                            marginTop: '4px',
                            marginRight: '8px'
                        }
                    }), h('span', data.title)
                    ])
                    ]);
                }
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
