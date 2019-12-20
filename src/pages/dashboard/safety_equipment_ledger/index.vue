<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Tabs type="card" class="ivu-mt"  @on-click="changeTabs" >
                        <TabPane label="设备种类">
                            <Tree :data="listRow" show-checkbox multiple @on-check-change="sendInfo"></Tree>
                        </TabPane>
                        <TabPane label="设备台账">
                        </TabPane>
                        <TabPane label="维保记录">
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <img :src="sourceLink" alt="">
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getSafetyEquipmentData } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-safety-equipment-ledger',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '安全设备台账',
                sourceLink: '',
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
            getSafetyEquipmentData().then(async res => {
                that.listRow = res.treeData
                that.sourceLink = res.sourceLink
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            changeTabs (index) {
                // 点击tab分页 如果只在一个页面 页面数据会混淆
                // let that = this;
                if (index === 0) {
                    // 设备设施种类
                    this.$router.replace('/dashboard/safety_equipment_ledger')
                } else if (index === 1) {
                    // 设备设施台账
                    this.$router.replace('/dashboard/equipmen_facilities_ledger')
                } else if (index === 2) {
                    // 检测维保记录
                    this.$router.replace('/dashboard/check_maintenance_record')
                }
            },
            sendInfo (info) {
                let param = {
                    id: []
                }
                info.some((value, index, arr) => {
                    param.id.push(value.id)
                })
                // send3dModelInfo(param).then(async res => {
                //     console.log('do some logic', res)
                // }).catch(err => {
                //     console.log('err', err)
                // })
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
