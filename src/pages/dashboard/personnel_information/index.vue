<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title='title' icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" @click.prevent="$router.go(-1)">
                        人员目录
                    </Button>
                    <div class="ivu-block">
                        <Tree :data="treeData" :render="renderContent" class="env-air-tree"></Tree>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            右边
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'dashboard-personnel-information',
        data () {
            return {
                title: '人员信息管理',
                treeData: [
                    {
                        'title': '总经理',
                        'children': [
                            {
                                'title': '秘书',
                                'expand': true,
                                'children': [
                                    {
                                        'title': '李秘书',
                                        'phone': '24102438102',
                                        'expand': true
                                    },
                                    {
                                        'title': '邓秘书',
                                        'phone': '24102438102',
                                        'expand': true
                                    }
                                ]
                            },
                            {
                                'title': '助理',
                                'expand': true
                            }
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
        created () {},
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
