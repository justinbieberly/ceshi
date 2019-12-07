<template>
    <i-link class="i-layout-header-logo i-header-logo" to="/" >
        <img src="@/assets/images/logo-small.png">
        <div class="logo-words-desc" v-if="!isMobile">
            <span>张家港龙亿智慧仓库</span>
            <span>安全管理系统</span>
        </div>
    </i-link>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        name: 'iHeaderLogo',
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ])
        }
    }
</script>
<style lang="scss" scoped>
    .i-header-logo {
        padding: 8px 10px;
        img {
            float: left;
        }
        .logo-words-desc {
            float: left;
        }
        span {
            display: block;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            color: #ffffff;
        }

    }
</style>
