<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  :padding="0" shadow >
                    <CellGroup>
                        <Cell :title="item.name +'：' + item.value" v-for="(item, key) in pageData.storageInfo" :key="key" :name="key"/>
                    </CellGroup>
                </Card>
                <div class="reservoir_table">
                    <Table border :columns="reservoirData.columns" :data="reservoirData.data" size="small"></Table>
                </div>
            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <i-link to="/dashboard/goods_stored_detail">
                <img :src="modelImg" alt="模型视图">
            </i-link>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getGoodsStored } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-goods-stored',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '货物存储',
                modelImg: '/assets/images/u393.svg',
                pageData: {},
                reservoirData: {
                    columns: [
                        {
                            title: '库区名称',
                            sortable: true,
                            align: 'center',
                            key: 'name'
                        },
                        {
                            title: '最大库存量(L)',
                            sortable: true,
                            align: 'center',
                            key: 'stock'
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
            getGoodsStored()
                .then(async res => {
                    console.log('pageData', res);
                    that.pageData = res;
                    that.reservoirData.data = res.storageTable.data;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
    .reservoir_table {
        margin-top: 60px;
    }
</style>
