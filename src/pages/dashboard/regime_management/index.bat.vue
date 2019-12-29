<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow >
                    <div class="ivu-block ivu-mb-16"
                         v-for="(item, key) in treeData" :key="key" :name="key">
                        <h4>{{ item.title }}</h4>
                        <div class="ivu-block">
                            <Tree :data="item.children"
                                  @on-select-change="getDocById"
                                  class="ivu-theme-tree"></Tree>
                        </div>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getRegimeManagement } from '@api';
    import Config from '@/config';

    export default {
        name: 'dashboard-regime-management',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '制度管理',
                modelImg: '/assets/images/vbg.png',
                treeData: [
                    {
                        title: '安全风险管理类',
                        expand: true,
                        children: [
                            {
                                title: '安全风险识别',
                                expand: true,
                                children: []
                            },
                            {
                                title: '安全风分级',
                                expand: true,
                                children: []
                            },
                            {
                                title: '安全风管控',
                                expand: true,
                                children: []
                            }
                        ],
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                class: 'ivu-tree-title',
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                },
                                on: {
                                    click: () => {
                                        console.log('选中了父级标签')
                                    }
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('span', {
                                        style: {
                                        }
                                    }, 13)
                                ])
                            ]);
                        }
                    }
                ]
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
            getRegimeManagement().then(async res => {
                this.treeData = this.dealTreeData(res.regimeData)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            getDocById (selectedArr, data) {
                console.log('当前id', data)
            },
            dealTreeData (data) {
                // 将请求到的treedata 在这里处理 赋值给顶级
                let dataTemp = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = {};
                    Object.assign(temp, {
                        rander: (h, { root, node, data }) => {
                            return h('span', {
                                class: 'ivu-tree-title',
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                },
                                on: {
                                    click: () => {
                                        console.log('选中了父级标签')
                                    }
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('span', {
                                        style: {
                                        }
                                    }, 13)
                                ])
                            ]);
                        }
                    }, data[i]);
                    dataTemp.push(temp)
                }
                return dataTemp;
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
