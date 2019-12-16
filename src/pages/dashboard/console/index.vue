<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow >
                    <Tree :data="listRow" show-checkbox multiple @on-check-change="show"></Tree>
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
    import { get3dModelInfo } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-console',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '三维模型',
                modelImg: '/assets/images/u87.svg',
                listRow: []
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
            get3dModelInfo()
                .then(async res => {
                    that.listRow = res.list;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
            show (info) {
                console.log('点击了')
                console.log(info);
                // TODO info里面包含了所有数据  请求API显示
            }
        }
    }
</script>
<style lang="scss" scoped>
    .i-admin-left-menu {
        height: 100vh;
    }
</style>
