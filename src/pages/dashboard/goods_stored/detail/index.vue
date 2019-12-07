<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="user-cover">
                <Card :title="title" icon="ios-options"  :padding="0" shadow>
                    <a href="#" slot="extra" @click.prevent="$router.go(-1)">
                        <Icon type="ios-arrow-back" />
                        返回
                    </a>
                </Card>
            </Card>

            <Card class="card-user-cover">
                <Card icon="ios-options"  :padding="0" shadow >
                    <p slot="title">
                        <Icon type="ios-information-circle-outline" />
                        {{ roomName }}
                    </p>
                    <CellGroup>
                        <Cell :title="item.name +'：' + item.value" v-for="(item, key) in roomInfo" :key="key" :name="key"  />
                    </CellGroup>
                </Card>
            </Card>

            <Card class="card-user-cover" v-for="(item, key) in storageInfo" :key="key" :name="key" >
                <Card icon="ios-options"  :padding="0" shadow >
                    <p slot="title">
                        <Icon type="ios-information-circle-outline" />
                        {{ item.name }} ：  {{ item.value }}
                    </p>
                    <CellGroup>
                        <div v-for="(childItem, childKey) in item.info" :key="childKey" :name="childKey">
                            <Cell :title="childItem.child_name +'：' + childItem.child_value" v-if="!childItem.split"/>
                            <div v-else>
                                <Cell :title="childItem.child_name +'：'" />
                                <div class="demo-split">
                                    <Split v-model="splitA">
                                        <div slot="left" class="demo-split-pane">
                                            <Cell :title="vv.child_name +'：' + vv.child_value" v-for="(vv, k) in childItem.child_value.split_left" :key="k" :name="k"  />
                                        </div>
                                        <div slot="right" class="demo-split-pane no-padding">
                                            <Split v-model="splitB" mode="vertical">
                                                <div slot="top" class="demo-split-pane">
                                                    <Cell :title="value_3.child_name +'：' + value_3.child_value" v-for="(value_3, key_3) in childItem.child_value.split_right.top" :key="key_3" :name="key_3"  />
                                                </div>
                                                <div slot="bottom" class="demo-split-pane">
                                                    <Cell :title="value_3.child_name +'：' + value_3.child_value" v-for="(value_3, key_3) in childItem.child_value.split_right.bottom" :key="key_3" :name="key_3"  />
                                                </div>
                                            </Split>
                                        </div>
                                    </Split>
                                </div>
                            </div>
                        </div>
                    </CellGroup>
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
    import { getStoredDetail } from '@api/account';

    export default {
        name: 'dashboard-goods-stored-detail',
        data () {
            return {
                title: '货物存储',
                modelImg: '/assets/images/u510.svg',
                roomName: '',
                roomInfo: {},
                storageInfo: [],
                splitA: 0.5,
                splitB: 0.5
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
            getStoredDetail()
                .then(async res => {
                    console.log('storageInfo', res.storageInfo);
                    that.roomName = res.name;
                    that.roomInfo = res.baseInfo;
                    that.storageInfo = res.storageInfo;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
    .user-cover {
        .ivu-card-shadow {
            box-shadow: none !important;
        }
    }
    .ivu-cell {
        white-space: normal;
    }
    .card-user-cover {
        margin-top: 25px;
    }
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 5px;
        font-size: 12px !important;
       .ivu-cell {
            padding: 2px 5px !important;
        }
    }

    .demo-split-pane.no-padding{
        height: 200px;
        padding: 0;
    }
</style>
