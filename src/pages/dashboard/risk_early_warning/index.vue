<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" to="risk_warning_history" style="margin-left: 10px;">历史数据</Button>
                    <CheckboxGroup v-model="checkInfo" @on-change="select" class="fbyj-checkbox">
                        <Checkbox :label="item.id" v-for="(item, key) in checkBox" :key="key" > {{item.name}} </Checkbox>
                    </CheckboxGroup>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <img :src="modelImg" alt="模型视图">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getRiskEarlyWarning, sendRiskEarlyWarning } from '@api';
    import Config from '@/config';
    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '风险预警',
                modelImg: '/assets/images/u2224.svg',
                checkBox: [],
                checkInfo: []
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'isTablet',
                'screenHeight',
                'isDesktop',
                'menuCollapse'
            ])
        },
        created () {
            let that = this;
            getRiskEarlyWarning()
                .then(async res => {
                    that.checkBox = res.navList;
                    that.checkInfo = res.checked;
                }).catch(err => { console.log('err: ', err) })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            select () {
                sendRiskEarlyWarning(this.checkInfo).then(async res => {
                    if (res.state === true) {
                        this.$log.capsule('iView', 'Do SomeThing', 'success');
                        console.log(res)
                    }
                }).catch(err => {
                    this.$log.capsule('iView', 'Error', 'error');
                    console.log('err: ', err)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .fbyj-checkbox {
        margin-top: 15px;
        .ivu-checkbox-group-item {
            display: block !important;
            padding: 8px 32px;
        }
    }
</style>
