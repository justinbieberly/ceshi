<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
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
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
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
                modelImg: '/assets/images/vbg.png',
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
            getSpaceMonitoring()
                .then(async res => {
                    that.treeData = res.treeData;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
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
