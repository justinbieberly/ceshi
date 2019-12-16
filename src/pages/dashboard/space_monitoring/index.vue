<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small"  @click="spaceMonitoringShow">显示所选</Button>
                    <Button slot="extra" size="small" style="margin-left: 10px;"  @click="spaceMonitoringShow(1)">显示全部</Button>
                    <div class="ivu-block ivu-p-8">
                        <Tree :data="treeData" show-checkbox class="env-air-tree" ref="tree"></Tree>
                    </div>
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
    import { getSpaceMonitoring } from '@api/account';
    import Config from '@/config';
    export default {
        name: 'dashboard-space-monitoring-show',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '空间监测',
                modelImg: '/assets/images/u957.svg',
                treeData: [],
                buttonProps: {
                    type: 'primary',
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
            getSpaceMonitoring()
                .then(async res => {
                    that.treeData = res.tableData;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
            dealTableData (data) {
                let dataTemp = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = {};
                    Object.assign(temp, {
                        rander: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
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
                                        marginRight: '62px'
                                    }
                                })
                            ]);
                        }
                    }, data[i]);
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
            },
            spaceMonitoringShow (type = 1) {
                if (type === 1) {
                    // 显示全部 to="space_monitoring_show"
                    this.$router.push('space_monitoring_show')
                } else {
                    // 显示选中的
                    let checkedNodes = this.$refs.tree.getCheckedNodes();
                    let parameter = [];
                    for (let i = 0; i < this.$refs.tree.getCheckedNodes().length; i++) {
                        let temp = {
                            id: checkedNodes[i].id
                        };
                        parameter.push(temp)
                    }
                    this.$router.push({
                        name: 'dashboard-space-monitoring-show',
                        params: {
                            showIds: parameter
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
