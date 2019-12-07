<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow >
                    <Tree :data="listRow" show-checkbox multiple></Tree>
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
    import { Get3dModelInfo } from '@api/account';

    export default {
        name: 'dashboard-console',
        data () {
            return {
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
            Get3dModelInfo()
                .then(async res => {
                    that.listRow = res.list;
                    console.log('res', res);
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
    .i-admin-left-menu {
        height: 100vh;
    }
</style>
