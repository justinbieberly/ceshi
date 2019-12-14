<template>
    <main class="body-content-main">
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
                title: '访客登记管理'
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
