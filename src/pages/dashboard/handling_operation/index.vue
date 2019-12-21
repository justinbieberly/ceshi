<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu ">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <div class="ivu-block ivu-mt-16">
                        <div class="ivu-block ivu-border box" v-for="(item, key) in listArr" :key="key">
                            <div class="left-border"></div>
                            <div class="content">
                                <span>{{ item.title }}</span>
                                <span>{{ item.time }}</span>
                            </div>
                            <div class="right-img">
                                <img :src="item.source" alt="">
                            </div>
                        </div>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <img :src="modelImg" alt="">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getHandlingOperation } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-handling-operation',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '装卸作业',
                listArr: [],
                modelImg: '/assets/images/vbg.png'
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
            getHandlingOperation().then(async res => {
                that.listArr = res.listArr
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
    .box {
        width: 100%;
        height: 120px;
        margin-bottom: 16px;
        .left-border {
            width: 2px;
            height: 100%;
            float: left;
            background-color: #47ecef;
        }
        .content {
            width: 50%;
            float: left;
            height: 100%;
            span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 12px;
            }
            span:first-child {
                margin-top: 28%;
            }
        }
        .right-img {
            float: left;
            width: 49%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            img {
                width: 90%;
                height: 90%;
                vertical-align: middle;
                align-items: center;
            }
        }
    }
</style>
