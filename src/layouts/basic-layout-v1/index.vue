<template>
    <Layout class="i-layout">
        <Layout class="i-layout-inside">
            <transition name="fade-quick">
                <Header class="i-layout-header i-layout-header-height" >
                    <i-header-logo />
                    <i-menu-nav />
                    <i-header-user />
                </Header>
            </transition>

            <Content class="i-layout-content i-gray" >
                <div class="i-layout-content-main">
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                </div>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    import iMenuNav from './menu-nav';
    import iHeaderLogo from './header-logo';
    import iHeaderUser from './header-user';
    export default {
        name: 'BasicLayout',
        components: { iHeaderLogo, iMenuNav, iHeaderUser },
        data () {
            return {
                showDrawer: false,
                ticking: false,
                headerVisible: true,
                oldScrollTop: 0,
                loadRouter: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .i-layout-header{
        background: #262626;
    }
    .i-layout-header-height{
        height: 86px;
        padding: 15px 0;
    }
    .i-layout-content-main {
        margin: 10px 0 !important;
        color: #ffffff;
    }
</style>
