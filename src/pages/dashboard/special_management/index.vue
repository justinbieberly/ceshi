<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" @click="showHistory(true)" style="margin-left: 10px;">历史数据</Button>
                </Card>

                <div class="ivu-block tzsb-er-min father-position" v-for="(item, key) in infoData" :key="key">
<!--                    <div :id="'chartLineBox' + key" style="width: 91px; height: 116px;" class="ivu-inline-block"></div>-->
                    <div class="ivu-inline-block circle">
                        <Circle :percent="item['echars']['progressValue']"
                                :trail-width="5"
                                :stroke-width="6"
                                :stroke-color="item['echars']['color']"
                                class="special-management"
                                :size="70">
                            <div class="father-position" style="width: 100%;height: 100%;">
                                <Icon type="ios-checkmark" class="child-position"
                                      size="70"
                                      v-if="item['echars']['state'] === 3"
                                      style="color:#5cb85c;left: 0; top: -12%;"></Icon>
                                <div class="child-position"
                                     v-if="item['echars']['state'] === 3"
                                     style="left: 19%; top: 57%;">未充电</div>
                               <div class="child-position"
                                    style="left: 22%; top: 33%;"
                                    v-if="item['echars']['state'] !== 3" v-html="item['echars']['time']">
                                   {{ item['echars']['time'] }}
                               </div>
                            </div>
                        </Circle>
                    </div>
                    <div class="ivu-inline-block child-position tzsb-child-info">
                        <div class="tzsb-title">{{ item.title}}</div>
                        <div class="left-content">
                            <div class="tzsb-group" v-for="(left_val, k) in item.info.left" :key="k">
                                <span class="ivu-inline-block">{{ left_val.name }}:</span>
                                <span class="ivu-inline-block tzsb-info-value">{{ left_val.value }}</span>
                            </div>
                        </div>
                        <div class="right-content">
                            <div class="tzsb-group" v-for="(right_val, k) in item.info.right" :key="k">
                                <span class="ivu-inline-block">{{ right_val.name }}:</span>
                                <span class="ivu-inline-block tzsb-info-value">{{ right_val.value }}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <img :src="modelImg" alt="模型视图" v-if="!isHistory">
            <div v-else>
                <div class="ivu-block">
                    <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                          class="real-time-form ivu-inline-block user-full-screen">
                        <div class="ivu-form-item" style="line-height: 32px;">
                            功能操作
                        </div>
                        <FormItem label="输入搜索">
                            <Input v-model="formItem.condition" placeholder="编号/名称/..."
                                   size="small" style="width: 150px" />
                        </FormItem>
                        <FormItem label="充电状态">
                            <Select v-model="formItem.state" size="small"
                                    class="ivu-nomal-select"
                                    style="width:150px">
                                <Option :value="item.value"
                                        v-for="(item, key) in formItem.stateRow" :key="key">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="时间">
                            <DatePicker type="daterange" size="small" placement="bottom-end"
                                        placeholder="请选择日期" style="width: 150px"
                                        v-model="formItem.dateRange">
                            </DatePicker>
                            <Button type="primary" size="small"
                                    @click="reloadTable"
                                    class="ivu-query-btn ivu-ml-40">查询结果</Button>
                            <Button style="margin-left: 18px" size="small" @click="reloadTable(false)" >重置查询</Button>
                            <Button size="small" @click="showHistory(false)"
                                    style="margin-left: 20px;">
                                <Icon type="ios-arrow-back" />
                                返回
                            </Button>
                        </FormItem>
                        <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
                            <Select v-model="formItem.pageSize" size="small"
                                    placeholder="显示条数"
                                    @on-change="reloadTable" style="width: 110px;margin-top: 4px;">
                                <Option value="20">20条/页</Option>
                                <Option value="50">50条/页</Option>
                                <Option value="100">100条/页</Option>
                            </Select>
                            <Select v-model="formItem.sortWay" size="small"
                                    placeholder="排序方式"
                                    @on-change="reloadTable"
                                    style="width: 110px;margin-left: 10px; margin-top: 4px;">
                                <Option :value="item.key" v-for="(item, key) in reservoirData.columns" :key="key">{{ item.title }}</Option>
                            </Select>
                        </div>
                    </Form>
                    <Table border :loading="reservoirData.loading" :columns="reservoirData.columns" :data="reservoirData.data" size="small" ></Table>
                </div>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :page-size="pageSize"
                          show-total show-elevator size="small"
                          @on-change="reloadTable(true, $event)"/>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getSpecialManagement, getSpecialManagementHistory } from '@api';
    import Config from '@/config';

    export default {
        name: 'dashboard-special-management',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '特种设备管理',
                isHistory: false,
                infoData: [],
                modelImg: '/assets/images/u2539.svg',
                pageSize: 10,
                total: 0,
                formItem: {
                    state: undefined,
                    dateRange: undefined,
                    condition: undefined,
                    pageSize: 10,
                    page: 1,
                    sortWay: undefined,
                    stateRow: [
                        {
                            name: '正常',
                            value: 1
                        },
                        {
                            name: '异常',
                            value: 0
                        }
                    ]

                },
                reservoirData: {
                    loading: false,
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            key: 'id'
                        },
                        {
                            title: '充电通道',
                            align: 'center',
                            key: 'charging_channels'
                        },
                        {
                            title: '平均充电电压',
                            align: 'center',
                            key: 'avg_voltage'
                        },
                        {
                            title: '平均充电电流',
                            align: 'center',
                            key: 'avg_current'
                        },
                        {
                            title: '平均充电温度',
                            align: 'center',
                            key: 'avg_temperature'
                        },
                        {
                            title: '充电开始',
                            align: 'center',
                            key: 'charging_start',
                            render: (h, params) => {
                                let date = new Date(params.row.charging_start * 1000);
                                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                return h('div', mouth + '-' + day + ' ' + hours + ':' + minutes);
                            }
                        },
                        {
                            title: '充电结束',
                            align: 'center',
                            key: 'charging_end',
                            render: (h, params) => {
                                let date = new Date(params.row.charging_end * 1000);
                                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                return h('div', mouth + '-' + day + ' ' + hours + ':' + minutes);
                            }
                        },
                        {
                            title: '充电时长',
                            align: 'center',
                            key: 'charging_duration',
                            render: (h, params) => {
                                let timeDifference = params.row.charging_end - params.row.charging_start
                                return h('div', Math.floor(timeDifference / 3600) + ' h  ' + Math.floor(Math.floor(timeDifference % 3600) / 60) + ' min');
                            }
                        },
                        {
                            title: '充电状态',
                            align: 'center',
                            key: 'charging_state',
                            render: (h, params) => {
                                if (params.row.charging_state === 1) {
                                    return h('div', '正常');
                                } else {
                                    return h('div', {
                                        style: {
                                            display: 'inline-block',
                                            color: '#d40303',
                                            width: '100%'
                                        }
                                    }, '异常');
                                }
                            }
                        },
                        {
                            title: '充电电量',
                            align: 'center',
                            key: 'charging_electricity'
                        },
                        {
                            title: '月累计电量',
                            align: 'center',
                            key: 'mouth_electricity'
                        }
                    ],
                    data: []
                }
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'screenHeight',
                'menuCollapse'
            ])
        },
        created () {
            let that = this;
            getSpecialManagement()
                .then(async res => {
                    let temp = res.rowList
                    for (let i = 0; i < temp.length; i++) {
                        let thisItem = temp[i].echars
                        let color
                        let item = thisItem
                        if (thisItem.state === 1) {
                            color = '#1abc9c'
                        } else if (thisItem.state === 2) {
                            color = '#f04844'
                        } else if (thisItem.state === 3) {
                            color = '#2ecc71'
                        }
                        let hours = Math.floor(item.time / 3600)
                        let minute = Math.floor(Math.floor((item.time - 3600 * hours) % 3600) / 60)
                        Object.assign(item, {
                            color: color,
                            time: hours + ' h <br/>' + minute + ' min'
                        })
                        temp[i]['echars'] = item
                    }
                    that.infoData = temp
                }).catch(err => {
                    this.$log.capsule('iView', 'Error', 'error');
                    console.log('err: ', err)
                })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            reloadTable (state = true, event) {
                if (state) {
                    this.formItem.page = event === undefined ? 1 : event
                    this.pageSize = parseInt(this.formItem.pageSize);
                } else {
                    this.formItem.condition = undefined
                    this.formItem.state = undefined
                    this.formItem.dateRange = undefined
                    this.formItem.page = 1
                    this.formItem.sortWay = undefined
                    this.formItem.pageSize = 10
                    this.pageSize = 10
                }
                let param = {
                    state: this.formItem.state,
                    dateRange: this.formItem.dateRange,
                    condition: this.formItem.condition,
                    page: this.formItem.page,
                    pageSize: this.formItem.pageSize,
                    sortWay: this.formItem.sortWay
                }
                this.getSpecialManagementTableByParam(param)
            },
            getSpecialManagementTableByParam (param = null) {
                if (param !== null) {
                    if (param.dateRange !== undefined) {
                        param.dateRange.map(function (value, index, array) {
                            if (value) {
                                param.dateRange[index] = new Date(value).getTime()
                            }
                        })
                    }
                }
                this.reservoirData.loading = true
                getSpecialManagementHistory(param).then(async res => {
                    this.total = res.tableData.total;
                    this.reservoirData.loading = false
                    this.reservoirData.data = res.tableData.data;
                    this.formItem.alarm_type = res.tableData.alarm_type;
                }).catch(err => {
                    this.$log.capsule('iView', 'Error', 'error');
                    console.log('err: ', err)
                })
            },
            showHistory (state) {
                if (state === true) {
                    this.getSpecialManagementTableByParam()
                    this.isHistory = true
                    this.$store.commit('admin/layout/updateMenuCollapse', true)
                } else {
                    this.isHistory = false
                    this.$store.commit('admin/layout/updateMenuCollapse', false)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .circle {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center; /*垂直居中*/
        .ivu-chart-circle {
            vertical-align: middle;
            margin-left: 6px;
        }
    }
</style>
