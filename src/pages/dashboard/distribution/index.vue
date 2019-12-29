<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Table border :columns="reservoirData.columns"
                           :data="reservoirData.data"
                           size="small"
                           class="temporary_table fb-table" ></Table>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img father-position" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block child-position user-note-box">
                <Button type="default" size="small">
                    一级
                    <i class="user-square-in-btn cell-a-color"></i>
                </Button>
                <Button type="default" size="small">
                    二级
                    <i class="user-square-in-btn cell-b-color"></i>
                </Button>
                <Button type="default" size="small">
                    三级
                    <i class="user-square-in-btn cell-c-color"></i>
                </Button>
                <Button type="default" size="small">
                    四级
                    <i class="user-square-in-btn cell-other-color"></i>
                </Button>
            </div>
            <img :src="modelImg" alt="模型视图">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getDistributionData } from '@api';
    import Config from '@/config';
    export default {
        name: 'dashboard-distribution',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '分布状况',
                modelImg: '/assets/images/u666.svg',
                reservoirData: {
                    columns: [
                        {
                            title: '库房',
                            width: '86px',
                            align: 'center',
                            key: 'name'
                        },
                        {
                            title: '防火分区',
                            width: '85px',
                            align: 'center',
                            key: 'partition'
                        },
                        {
                            title: '危险源',
                            align: 'center',
                            type: 'html',
                            key: 'hazards'
                        },
                        {
                            title: '图示',
                            width: '50px',
                            key: 'graphic',
                            render: (h, params) => {
                                let color = {}
                                let info = params.row.level;
                                if (info === 1) {
                                    color = {
                                        backgroundColor: '#3f3a94 !important'
                                    }
                                } else if (info === 2) {
                                    color = {
                                        backgroundColor: '#fdf003 !important'
                                    }
                                } else if (info === 3) {
                                    color = {
                                        backgroundColor: '#fc8a03 !important'
                                    }
                                } else if (info === 4) {
                                    color = {
                                        backgroundColor: '#fb1010 !important'
                                    }
                                }
                                return h('div', {
                                    style: Object.assign({
                                        width: '18px',
                                        height: '18px'
                                    }, color)
                                }, '');
                            }
                        }
                    ],
                    data: []
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
            getDistributionData()
                .then(async res => {
                    that.reservoirData.data = res.tableData.data;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
    .temporary_table {
        margin-top: 2   0px;
    }
</style>
