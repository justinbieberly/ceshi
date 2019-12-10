<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" to="risk_warning_history" style="margin-left: 10px;">历史数据</Button>
                    <CheckboxGroup v-model="checkInfo" @on-change="select" class="fbyj-checkbox">
                        <Checkbox :label="item.id" v-for="(item, key) in checkBox" :key="key" > {{item.name}} </Checkbox>
                    </CheckboxGroup>
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
    import { getRiskEarlyWarning } from '@api/account';

    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
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
                    console.log(that.checkInfo)
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
            select () {
                console.log('异步请求数据 选中了', this.checkInfo)
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
