<template>
    <i-link class="i-layout-header-logo" :class="{ 'i-layout-header-logo-stick': !isMobile }" to="/">
        <img :src="logoPath" v-if="isMobile">
        <img :src="logoPath" v-else-if="headerTheme === 'light'">
        <img :src="logoPath" v-else>
    </i-link>
</template>
<script>
    import { mapState } from 'vuex';
    import Config from '@/config';

    export default {
        name: 'iHeaderLogo',
        data () {
            return {
                logoPath: ''
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'headerTheme'
            ])
        },
        created () {
            this.logoPath = Config.logoPath
        }
    }
</script>
