<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow >
                    <Tree :data="listRow" show-checkbox multiple @on-check-change="sendInfo"></Tree>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <img :src="modelImg" alt="模型视图">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { get3dModelInfo } from '@api/account';
    import { send3dModelInfo } from '@api/interaction';
    import Config from '@/config';

    export default {
        name: 'dashboard-console',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '三维模型',
                modelImg: '/assets/images/vbg.png',
                listRow: []
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
        created () {
            let that = this;
            get3dModelInfo()
                .then(async res => {
                    that.listRow = res.list;
                }).catch(err => { console.log('err: ', err) })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            /*
             * @title 选中之后的钩子操作
             * @author iEfoam
             * @return Miexd
             */
            sendInfo (info) {
                let param = {
                    id: []
                }
                info.some((value, index, arr) => {
                    param.id.push(value.id)
                })
                send3dModelInfo(param).then(async res => {
                    // TODO 当结果返回之后的逻辑处理
                    console.log('do some logic', res)
                }).catch(err => {
                    console.log('err', err)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
