<template>
    <i-link class="i-layout-header-logo logo-content" :class="{ 'i-layout-header-logo-stick': !isMobile }" to="/">
        <img :src="logo.logoPath" v-if="isMobile">
        <img :src="logo.logoPath" v-else-if="headerTheme === 'light'">
        <img :src="logo.logoPath" v-else>
        <span class="logo-words-desc" v-if="!isMobile">
           <span v-for="(item, key) in logo.logoDesc" :key="key" :name="key" > {{ item }} </span>
        </span>
    </i-link>
</template>
<script>
    import { mapState } from 'vuex';
    import Config from '@/config';
    export default {
        name: 'iHeaderLogo',
        data () {
            return {
                logo: {
                    logoPath: '',
                    logoDesc: []
                }
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'headerTheme'
            ])
        },
        created () {
            this.logo.logoPath = Config.logo.logoPath
            this.logo.logoDesc = Config.logo.logoDesc.split('\n')
        }
    }
</script>

<style lang="scss" scoped>
    .logo-content {
        padding: 8px 10px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            height: 90%;
            float: left;
            line-height: 100%;
        }

        .logo-words-desc {
            float: left;
            margin-left: 8px;
            span {
                display: block;
                line-height: 17px;
                text-align: left;
            }
        }
    }
</style>
