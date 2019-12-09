<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Table border :columns="reservoirData.columns" :data="reservoirData.data" class="temporary_table" ></Table>
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

    export default {
        name: 'dashboard-risk-zoning',
        data () {
            return {
                title: '风险分区',
                reservoirData: {
                    columns: [
                        {
                            title: '库房',
                            width: '94px',
                            key: 'name'
                        },
                        {
                            title: '防火分区',
                            width: '66px',
                            key: 'zoning'
                        },
                        {
                            title: '风险等级',
                            key: 'level',
                            render: (h, params) => {
                                let info = params.row.level;
                                if (info === 1) {
                                    params.row.cellClassName = {
                                        graphic: 'cell-other-color'
                                    }
                                    return h('span', '低风险');
                                } else if (info === 2) {
                                    params.row.cellClassName = {
                                        graphic: 'cell-c-color'
                                    }
                                    return h('span', '一般风险');
                                } else if (info === 3) {
                                    params.row.cellClassName = {
                                        graphic: 'cell-b-color'
                                    }
                                    return h('span', '较大风险');
                                } else if (info === 4) {
                                    params.row.cellClassName = {
                                        graphic: 'cell-a-color'
                                    }
                                    return h('span', '重大风险');
                                }
                            }
                        },
                        {
                            title: '图示',
                            width: '50px',
                            key: 'graphic'
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
        margin-top: 40px;
    }
</style>
