<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Table border :columns="reservoirData.columns" :data="reservoirData.data"
                           size="small"
                           class="temporary_table" ></Table>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img father-position" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block child-position user-note-box">
                <Button type="default" size="small">
                    超量
                    <i class="user-square-in-btn cell-a-color"></i>
                </Button>
                <Button type="default" size="small">
                    警戒
                    <i class="user-square-in-btn cell-b-color"></i>
                </Button>
                <Button type="default" size="small">
                    正常
                    <i class="user-square-in-btn cell-other-color"></i>
                </Button>
            </div>
            <img :src="modelImg" alt="模型视图">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getTemporaryStorage } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '临时存储',
                modelImg: '/assets/images/u666.svg',
                reservoirData: {
                    columns: [
                        {
                            title: '名称',
                            width: '66px',
                            align: 'center',
                            key: 'name'
                        },
                        {
                            title: '状态',
                            width: '66px',
                            align: 'center',
                            key: 'state',
                            render: (h, params) => {
                                let info = params.row.state;
                                if (info === 1) {
                                    return h('span', '正常');
                                } else if (info === 2) {
                                    return h('span', '警戒');
                                } else if (info === 3) {
                                    return h('span', '超量');
                                }
                            }
                        },
                        {
                            title: '描述',
                            align: 'center',
                            key: 'desc'
                        },
                        {
                            title: '图示',
                            align: 'center',
                            width: '66px',
                            key: 'graphic',
                            render: (h, params) => {
                                let color = {}
                                let info = params.row.state;
                                if (info === 1) {
                                    color = {
                                        backgroundColor: '#3f3a94 !important'
                                    }
                                } else if (info === 2) {
                                    color = {
                                        backgroundColor: '#fc8a03 !important'
                                    }
                                } else if (info === 3) {
                                    color = {
                                        backgroundColor: '#fb1010 !important'
                                    }
                                }
                                console.log(params.row)
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
            getTemporaryStorage()
                .then(async res => {
                    console.log('pageData', res);
                    that.pageData = res;
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
