<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options" shadow class="temporary_table_nopadding">
                    <Tabs type="card" class="ivu-mt" @on-click="tabsChange">
                        <TabPane label="中控室值班">
                            <div class="ivu-block kzs-menu-smail-btn">
                                <Button to="#" size="small" style="font-size: 10px" v-if="isExport"
                                        @click="exportData">
                                    <Icon type="md-arrow-round-down" />
                                    导出
                                </Button>
                                <div v-if="!isExport && !isBack">
                                    <Button to="#" size="small" style="font-size: 10px"
                                            @click="showRightTable(1)">值班情况</Button>
                                    <Button to="#" size="small" style="font-size: 10px"
                                            @click="showRightTable(2)">未打卡记录</Button>
                                </div>
                                <Button size="small" style="font-size: 10px" v-if="isExport || isPunchCardLog" @click="back">
                                    <Icon type="ios-arrow-back" />
                                    返回
                                </Button>
                            </div>
                            <Table border :columns="onDutyTable.columns" :data="onDutyTable.data" class="ivu-mt"></Table>
                        </TabPane>
                        <TabPane label="报警故障信号">
                            <div class="ivu-block ivu-border ivu-p-8 ivu-mb-8"  v-for="(items, key) in alarmFaultSignal" :key="key">
                                <div class="ivu-text-center ivu-text-color">{{ items.name }}</div>
                                <div class="ivu-block ivu-text-color ivu-font-size-small">
                                    <div class="ivu-block ">
                                        <span>时间:</span>
                                        <span class="tzsb-info-value">{{ items.dateTime }}</span>
                                    </div>
                                    <div class="ivu-inline-block half-width" v-for="(item, k) in items.data" :key="k">
                                        <span>{{ item.name }}:</span>
                                        <span class="tzsb-info-value">{{ item.value }}</span>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block" v-if="onDutySituation">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.condition" placeholder="名字/序号/..." size="small" style="width: 120px" />
                    </FormItem>
                    <FormItem label="异常事宜">
                        <Select v-model="formItem.abnormalMatters" size="small"  style="width:120px">
                            <Option value="all">全部</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="时间">
                        <DatePicker type="daterange" size="small" placement="bottom-end" placeholder="请选择日期"
                                    style="width: 120px" v-model="formItem.dateRange"></DatePicker>
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-ml ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="doQuery" class="ivu-ml">重置查询</Button>
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
                <Table border :columns="onDutyTable.columns1" :data="onDutyTable.data1" class="ivu-mt" ref="table"></Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
            <div class="ivu-block" v-else-if="isPunchCardLog">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="值班人员">
                        <Input v-model="formItem.condition" placeholder="名字/序号/..." size="small" style="width: 150px" />
                    </FormItem>
                    <FormItem label="岗位">
                        <Select v-model="formItem.abnormalMatters" size="small"  style="width:150px">
                            <Option value="all">全部</Option>
                        </Select>
                        </FormItem>
                    <FormItem label="">
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-ml ivu-query-btn" style="margin-left: 50px;">查询结果</Button>
                        <Button size="small" @click="doQuery" class="ivu-ml">重置查询</Button>
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
                <Table border :columns="onDutyTable.columns2" :data="onDutyTable.data2" class="ivu-mt"></Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
            <img :src="modelImg" alt="模型视图" v-else>
        </div>
        <Modal
                v-model="modal.state"
                :title="modal.title"
                width="400">
            <div class="ivu-text-center">
                <audio controls="controls" :src="modal.voiceUrl"></audio>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getConsoleRoomData, getOnDutySituation, getPunchCardLog } from '@api/account';
    import Config from '@/config';
    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '控制室值班管理',
                modelImg: '/assets/images/u3190.svg',
                loading: false,
                isExport: false,
                onDutySituation: false,
                isPunchCardLog: false,
                isBack: false,
                isAlarmFailure: false,
                pageSize: 100,
                total: 0,
                formItem: {
                    abnormalMatters: undefined,
                    dateRange: undefined,
                    condition: undefined,
                    showNum: 1,
                    sortWay: undefined

                },
                alarmFaultSignal: [],
                onDutyTable: {
                    columns: [
                        {
                            title: '打卡时间',
                            key: 'duty_time',
                            align: 'center',
                            render: (h, params) => {
                                let date = new Date(params.row.duty_time * 1000);
                                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                return h('div', hours + ': ' + minutes);
                            }
                        },
                        {
                            title: '值班人员',
                            key: 'duty_user',
                            align: 'center'
                        },
                        {
                            title: '状态',
                            key: 'status',
                            render: (h, params) => {
                                if (params.row.status === 0) {
                                    return h('div', {
                                        style: {
                                            display: 'inline-block',
                                            color: '#d40303',
                                            width: '100%'
                                        }
                                    }, '异常')
                                } else {
                                    return h('div', '正常')
                                }
                            },
                            align: 'center'
                        }
                    ],
                    data: [],
                    columns1: [
                        {
                            title: '序号',
                            key: 'id',
                            width: '70px',
                            align: 'center'
                        },
                        {
                            title: '日期',
                            key: 'date',
                            width: '110px',
                            align: 'center'
                        },
                        {
                            title: '时间',
                            key: 'time',
                            width: '100px',
                            align: 'center'
                        },
                        {
                            title: '异常事宜',
                            width: '100px',
                            key: 'abnormal_matters',
                            align: 'center'
                        },
                        {
                            title: '发现人',
                            width: '100px',
                            key: 'discover',
                            align: 'center'
                        },
                        {
                            title: '处理结果',
                            key: 'processing_results',
                            align: 'center'
                        },
                        {
                            title: '语音记录',
                            width: '100px',
                            key: 'voice_recording',
                            align: 'center',
                            render: (h, params) => {
                                return h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.opendVoice(params.row.voice_recording)
                                        }
                                    }
                                }, '预览');
                            }
                        },
                        {
                            title: '备注',
                            key: 'note',
                            align: 'center'
                        }
                    ],
                    data1: [],
                    columns2: [
                        {
                            title: '序号',
                            key: 'id',
                            align: 'center'
                        },
                        {
                            title: '值班人员',
                            key: 'personnel',
                            align: 'center'
                        },
                        {
                            title: '打卡时间',
                            key: 'time',
                            align: 'center',
                            render: (h, params) => {
                                let date = new Date(params.row.time * 1000);
                                let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                let year = date.getFullYear();
                                return h('div', year + '-' + mouth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds);
                            }
                        }
                    ],
                    data2: []
                },
                modal: {
                    state: false,
                    title: '语音记录详情',
                    voiceUrl: ''
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
            let that = this;
            getConsoleRoomData()
                .then(async res => {
                    that.onDutyTable.data = res.tableData.onDutyData
                    that.alarmFaultSignal = res.alarmFaultSignal
                }).catch(err => {
                    console.log('err: ', err)
                })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            showRightTable (state) {
                let that = this
                if (state === 1) {
                    // 值班情况
                    that.loading = true
                    that.isExport = true
                    that.onDutySituation = true
                    getOnDutySituation()
                        .then(async res => {
                            that.onDutyTable.data1 = res.tableData.data
                            that.loading = false
                        }).catch(err => {
                            console.log('err: ', err)
                        })
                } else {
                    that.isBack = true
                    that.isPunchCardLog = true
                    getPunchCardLog()
                        .then(async res => {
                            that.loading = false
                            that.onDutyTable.data2 = res.tableData.data
                        }).catch(err => {
                            console.log('err: ', err)
                        })
                }
            },
            setPageSize () {
                this.pageSize = parseInt(this.formItem.showNum);
                console.log('reset page size', this.pageSize);
                // 只能 请求API限制
            },
            doQuery () {
                console.log('do query');
                let screening = {
                    alarm_type: this.formItem.select,
                    // dateRange: this.formItem.dateRange
                    dateRange: [
                        this.formItem.dateRange.map(function (value, index, array) {
                            return new Date(value).getTime();
                        })
                    ]
                }
                console.log('screening', screening);
                // 只能 请求API筛选处理
            },
            changePage () {
            },
            opendVoice (url) {
                this.modal.state = true
                this.modal.voiceUrl = url
            },
            exportData () {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    original: false,
                    columns: this.onDutyTable.columns1.filter((col, index) => col.key !== 'voice_recording'),
                    data: this.onDutyTable.data1.filter((col, index) => col.key !== 'voice_recording')
                });
            },
            back () {
                // 返回
                this.isExport = false
                this.isBack = false
                this.onDutySituation = false
                this.isPunchCardLog = false
                this.modelImg = '/assets/images/u3190.svg'
            },
            tabsChange (value) {
                if (value === 0) {
                    this.modelImg = '/assets/images/u3190.svg'
                } else {
                    this.isPunchCardLog = false
                    this.onDutySituation = false
                    this.isPunchCardLog = false
                    this.isExport = false
                    this.modelImg = '/assets/images/u3906.png'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
