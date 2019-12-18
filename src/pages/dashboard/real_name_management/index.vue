<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" @click.prevent="getRecodeOfInOut" v-if="!isTable">
                        进出记录
                    </Button>
                    <Button slot="extra" size="small" v-if="isTable" style="margin-right: 8px;"
                            @click="exportData" >
                        <Icon type="md-arrow-round-down" />
                        导出
                    </Button>
                    <Button slot="extra" size="small" @click.prevent="back" v-if="isTable">
                        <Icon type="ios-arrow-back" />
                        返回
                    </Button>
                    <Table border :columns="table.tableLeft.columns" :data="table.tableLeft.data" ref="table"></Table>
                    <div class="ivu-block ivu-mt-16">
                        <div style="line-height: 1.8;">报警信息</div>
                        <div class="ivu-block ivu-border ivu-p-8 ivu-mb-8 ivu-bg-gray" v-for="(item, key) in alarmInformation" :key="key">
                            <div class="left-item ivu-font-size-small">
                                <div class="ivu-inline-block bjxx-item">
                                    <span class="ivu-inline-block">姓名:</span>
                                    <span class="ivu-inline-block tzsb-info-value">{{ item.name }}</span>
                                </div>
                                <div class="ivu-inline-block bjxx-item">
                                    <span class="ivu-inline-block">性别:</span>
                                    <span class="ivu-inline-block tzsb-info-value">{{ item.sex }}</span>
                                </div>
                                <div class="ivu-inline-block bjxx-item time-full">
                                    <span class="ivu-inline-block">时间:</span>
                                    <span class="ivu-inline-block tzsb-info-value">{{ item.time }}</span>
                                </div>
                                <div class="ivu-inline-block bjxx-item">
                                    <span class="ivu-inline-block">状态:</span>
                                    <span class="ivu-inline-block tzsb-info-value">{{ item.status }}</span>
                                </div>
                                <div class="ivu-inline-block bjxx-item">
                                    <span class="ivu-inline-block">人员:</span>
                                    <span class="ivu-inline-block tzsb-info-value">{{ item.type }}</span>
                                </div>
                                <div class="ivu-block ivu-theme-color">置顶：{{ item.info }}</div>
                            </div>
                            <div class="right-item">
                                <img :src="item.header" alt="">
                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div v-if="isTable" class="ivu-block user-full-screen ivu-overflow-auto">
                <div class="ivu-block">
                    <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                          class="real-time-form ivu-inline-block user-full-screen">
                        <div class="ivu-form-item" style="line-height: 32px;">
                            功能操作
                        </div>
                        <FormItem label="输入搜索">
                            <Input v-model="formItem.input" placeholder="证件号码/名称" size="small" style="width: 120px"></Input>
                        </FormItem>
                        <FormItem label="进出状态">
                            <Select v-model="formItem.status"
                                    class="ivu-nomal-select"
                                    size="small">
                                <Option value="1">进入</Option>
                                <Option value="0">离开</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="人员类型">
                            <Select v-model="formItem.type" size="small"
                                    class="ivu-nomal-select"
                                    style="width: 80px; margin-right: 20px;">
                                <Option value="1">内部</Option>
                                <Option value="0">外部</Option>
                            </Select>
                            <Button type="primary" size="small" @click="doQuery" class="ivu-query-btn">查询结果</Button>
                            <i-link to="/dashboard/real_time_monitor">
                                <Button style="margin-left: 8px" size="small" >重置查询</Button>
                            </i-link>
                        </FormItem>
                        <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
                            <Select v-model="formItem.showNum" size="small"
                                    placeholder="显示条数"
                                    @on-change="setPageSize" style="width: 110px;margin-top: 4px;">
                                <Option value="20">20条/页</Option>
                                <Option value="50">50条/页</Option>
                                <Option value="100">100条/页</Option>
                            </Select>
                            <Select v-model="formItem.sortWay" size="small"
                                    placeholder="排序方式"
                                    style="width: 110px;margin-left: 10px; margin-top: 4px;">
                                <Option value="errorInfo">报警内容</Option>
                            </Select>
                        </div>
                    </Form>
                    <Table border  :loading="table.tableRight.loading" :columns="table.tableRight.columns"
                           :data="table.tableRight.data" size="small" >
                        <template slot-scope="{ row }" slot="photo" >
                            <Button size="small" type="primary" @click="preview(0, row)">预览</Button>
                        </template>
                        <template slot-scope="{ row }" slot="detail">
                            <Button size="small" type="info" @click="preview(1, row)">查看</Button>
                        </template>
                    </Table>
                </div>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="page.total" :page-size="page.pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
            <img :src="imgModel" alt="" v-else>
        </div>
        <Modal v-model="modalInfo.status" width="360">
            <p slot="header" style="color:#3095ff;text-align:center" >
                <span>查看用户照片</span>
            </p>
            <div class="ivu-block ivu-text-center user-full-img">
                <img :src="modalInfo.userPhoto" alt="">
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getRealNameManagement, getRecordOfInOut } from '@api/account';
    import Config from '@/config';
    export default {
        name: 'dashboard-real-name-management',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '实名进出管理',
                imgModel: '/assets/images/u5870.svg',
                isTable: false,
                alarmInformation: [],
                modalInfo: {
                    userPhoto: '',
                    status: false
                },
                formItem: {
                    input: '',
                    status: '',
                    type: '',
                    sortWay: '',
                    showNum: 1

                },
                page: {
                    total: 12,
                    pageSize: 2
                },
                table: {
                    tableLeft: {
                        columns: [
                            {
                                title: '类型',
                                align: 'center',
                                width: '120px',
                                key: 'type'
                            },
                            {
                                title: '人数',
                                align: 'center',
                                key: 'count'
                            },
                            {
                                title: '内部人员',
                                align: 'center',
                                key: 'insiders'
                            }
                        ],
                        data: []
                    },
                    tableRight: {
                        loading: false,
                        columns: [
                            {
                                title: '序号',
                                align: 'center',
                                width: '65',
                                key: 'id'
                            },
                            {
                                title: '姓名',
                                align: 'center',
                                width: '80',
                                key: 'userName'
                            },
                            {
                                title: '性别',
                                width: '65',
                                align: 'center',
                                key: 'sex'
                            },
                            {
                                title: '工号',
                                align: 'center',
                                width: '100',
                                key: 'workNumber'
                            },
                            {
                                title: '预留电话',
                                width: '150',
                                align: 'center',
                                key: 'phone'
                            },
                            {
                                title: '证件号码',
                                width: '150',
                                align: 'center',
                                key: 'cardID'
                            },
                            {
                                title: '进出状态',
                                align: 'center',
                                width: '65',
                                key: 'state'
                            },
                            {
                                title: '登记一道门时间',
                                align: 'center',
                                width: '150',
                                key: 'logADoor'
                            },
                            {
                                title: '登记二道门时间',
                                align: 'center',
                                width: '150',
                                key: 'logBDoor'
                            },
                            {
                                title: '在园时间',
                                align: 'center',
                                width: '150',
                                key: 'gardenTime'
                            },
                            {
                                title: '人员类型',
                                align: 'center',
                                width: '65',
                                key: 'type'
                            },
                            {
                                title: '备注',
                                align: 'center',
                                width: '150',
                                key: 'note'
                            },
                            {
                                title: '照片',
                                align: 'center',
                                width: '65',
                                key: 'photo',
                                slot: 'photo'
                            },
                            {
                                title: '详细信息',
                                align: 'center',
                                width: '65',
                                fixed: 'right',
                                key: 'detail',
                                slot: 'detail'
                            }
                        ],
                        data: []
                    }
                }
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
            let that = this
            getRealNameManagement().then(async res => {
                that.alarmInformation = res.alarmInformation
                that.table.tableLeft.data = res.data
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            setPageSize () {
                this.pageSize = parseInt(this.formItem.showNum);
                console.log('reset page size', this.pageSize);
                // 只能 请求API限制
            },
            doQuery () {
                console.log('do query');
                console.log(this.formItem);
                // 只能 请求API筛选处理
            },
            changePage () {
                console.log('api change page')
            },
            getRecodeOfInOut () {
                let that = this
                getRecordOfInOut().then(async res => {
                    that.table.tableRight.data = res.tableData.data
                })
                that.isTable = true
            },
            preview (state, row) {
                if (state === 1) {
                    // 跳转 到用户详情页面
                    this.$router.push({
                        name: 'dashboard-personnel-information',
                        params: {
                            showIds: row.id
                        }
                    })
                } else {
                    // 查看照片
                    this.modalInfo.userPhoto = row.photo
                    this.modalInfo.status = true
                }
            },
            back () {
                this.isTable = false
            },
            exportData () {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    original: false,
                    columns: this.table.tableRight.columns.filter((col, index) => index < 12),
                    data: this.table.tableRight.data
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bjxx-item {
        width: 80%;
    }
    .left-item {
        float: left;
        width: 74%;
    }
    .right-item {
        float: left;
        width: 68px;
        height: 68px;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
            align-items: center;
        }
    }
</style>
