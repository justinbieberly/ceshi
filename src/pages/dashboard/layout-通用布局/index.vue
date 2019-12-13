<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    left
                </Card>
            </Card>
        </div>
        <div class="content-layout-right" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            右边
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                title: '临时存储'
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
        created () {},
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
</style>
