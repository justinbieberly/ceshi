<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Table border :columns="reservoirData.columns" :data="reservoirData.data" class="temporary_table" size="small"></Table>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            <img :src="modelImg" alt="模型视图">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getRiskZoningData } from '@api/account';
    import Config from '@/config'

    export default {
        name: 'dashboard-risk-zoning',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '风险分区',
                reservoirData: {
                    columns: [
                        {
                            title: '风险分区',
                            width: '94px',
                            align: 'center',
                            key: 'name'
                        },
                        {
                            title: '防火分区',
                            width: '96px',
                            align: 'center',
                            key: 'zoning'
                        },
                        {
                            title: '风险等级',
                            align: 'center',
                            key: 'level',
                            render: (h, params) => {
                                let info = params.row.level;
                                if (info === 1) {
                                    return h('span', '低风险');
                                } else if (info === 2) {
                                    return h('span', '一般风险');
                                } else if (info === 3) {
                                    return h('span', '较大风险');
                                } else if (info === 4) {
                                    return h('span', '重大风险');
                                }
                            }
                        },
                        {
                            title: '图示',
                            width: '70px',
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
                                console.log(params.row)
                                return h('div', {
                                    style: Object.assign({
                                        width: '20px',
                                        height: '20px'
                                    }, color)
                                }, '');
                            }
                        }
                    ],
                    data: []
                },
                modelImg: '/assets/images/u666.svg'
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
            getRiskZoningData()
                .then(async res => {
                    console.log('pageData', res);
                    that.reservoirData.data = res.tableData.data;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
    .temporary_table {
        margin-top: 20px;
    }
</style>
