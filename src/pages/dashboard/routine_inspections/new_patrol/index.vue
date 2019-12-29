<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }}</div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options" shadow class="temporary_table_nopadding">
                    <div class="ivu-block ivu-mt-16">
                        <div class="pat-btn ivu-btn ivu-btn-default ivu-font-size-small"
                             v-for="(value, index) in menuList"
                             :key="index"
                             :class="{ 'ivu-btn-selected': btnArr[index]['state'] }"
                             @click="selectThisBtn(index)">
                            <span class="p-title ivu-block">{{ value.title }}</span>
                            <div class="ivu-block p-info">
                                <div class="p-items">
                                    <span>{{ value.taskName }}</span>
                                </div>
                                <div class="p-items">
                                    <span>{{ value.equipmentNum }}台设备</span>
                                </div>
                                <div class="p-items">
                                    <span>{{ value.frequency }}</span>
                                </div>
                                <div class="p-items">
                                    <span>{{ value.executor }}</span>
                                </div>
                                <div class="p-items">
                                    <span>执行时段:</span>
                                    <span>{{ value.periodTime }}</span>
                                </div>
                            </div>
                        </div>

                        <Button class="regime-btn ivu-btn ivu-btn-default ivu-font-size-small p-new" @click="addTask">
                            <Icon type="md-add-circle" size="16" class="ivu-mr-8"/>
                            新增
                        </Button>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block">
                <Form :model="formItem" :label-width="70" inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.input"
                               placeholder="编号/名称" size="small"
                               style="width: 120px"></Input>
                    </FormItem>
                    <FormItem label="设备类别">
                        <Select v-model="formItem.type"
                                size="small"
                                class="ivu-nomal-select"
                                style="width: 120px">
                        </Select>
                        <Button type="primary" size="small" @click="doQuery" class="ivu-query-btn ivu-ml-16">查询结果
                        </Button>
                        <Button style="margin-left: 18px" size="small">重置查询</Button>
                        <!--                        <Button style="margin-left: 16px" size="small" >-->
                        <!--                            保存-->
                        <!--                        </Button>-->
                    </FormItem>
                    <div class="ivu-inline-block" style="float: right">
                        <div class="ivu-form-item-content ivu-inline-block ivu-mr-16">
                            <Button size="small" to="/dashboard/routine_inspections">
                                <Icon type="ios-arrow-back"/>
                                返回
                            </Button>
                            <Button style="margin-left: 16px"
                                    @click="modalMock(1)"
                                    size="small">
                                添加设备
                            </Button>
                        </div>
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
                    </div>
                </Form>
            </div>
            <div class="ivu-block user-full-screen">
                <Transfer
                        :data="transfer.data"
                        class="patrol-transfer"
                        @on-change="handleChange"
                        @on-selected-change="cacheChoose"
                        :render-format="transferRender"
                        :target-keys="transfer.targetKeys">
                    <div :style="{float: 'right', margin: '5px'}" class="patrol-btn-source">
                        <Button size="small" style="margin-right: 10px;"
                                @click="modalMock(1)">添加
                        </Button>
                        <Button size="small" style="margin-right: 10px;"
                                @click="modalMock(2)">修改
                        </Button>
                    </div>
                </Transfer>
                <div style="clear: both"></div>
                <div class="ivu-block" style="margin-top: 30px;width: 100%">
                    <div class="ivu-inline-block page-width">
                        <Page :total="total" :page-size="pageSize" show-total show-elevator size="small"
                              @on-change="changePage"/>
                    </div>
                    <div class="ivu-inline-block page-width">
                        <Page :total="total" :page-size="pageSize" show-total show-elevator size="small"
                              @on-change="changePage"/>
                    </div>
                </div>
            </div>
        </div>
        <Modal
                width="400"
                v-model="modal.modal1.status"
                @on-ok="submitAdd"
                :title="modal.modal1.title">
            <div class="ivu-block ivu-p-8 user-full-img">
                <Form :model="formItem" :label-width="100" inline :label-colon="true"
                      class="real-time-form ivu-inline-block">
                    <FormItem label="任务名">
                        <Input v-model="formItem.taskName"
                               placeholder="请输入任务名..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="设备数量">
                        <Input v-model="formItem.equipmentNum"
                               placeholder="请输入设备数量..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="频率">
                        <Input v-model="formItem.frequency"
                               placeholder="请输入频率..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="执行人">
                        <Input v-model="formItem.executor"
                               placeholder="请输入执行人..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="执行时间段">
                        <DatePicker type="daterange"
                                    v-model="formItem.periodTime"
                                    placement="bottom-end"
                                    placeholder="请输入执行时间段..."
                                    size="small"
                                    style="width: 200px">
                        </DatePicker>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <Modal
                width="400"
                v-model="modal.modal2.status"
                @on-ok="submitEquipment"
                :title="modal.modal2.title">
            <div class="ivu-block ivu-p-8 user-full-img">
                <Form :model="formItem" :label-width="100" inline :label-colon="true"
                      class="real-time-form ivu-inline-block">
                    <FormItem label="设施编号">
                        <Input v-model="formItem.facilitiesNum"
                               placeholder="请输入设施编号..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="设施类别">
                        <Select v-model="formItem.facilitiesClassfiy"
                                size="small"
                                style="width:200px"
                                placeholder="请输入任务名...">
                            <Option value="item">333</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="设施名称">
                        <Input v-model="formItem.facilitiesName"
                               placeholder="请输入设施名称..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="设施地址">
                        <Input v-model="formItem.facilitiesAddress"
                               placeholder="请输入设施地址..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="安装日期">
                        <DatePicker type="date" size="small"
                                    v-model="formItem.installTime"
                                    placeholder="请选择安装日期..." style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="有效日期">
                        <DatePicker type="date" size="small"
                                    v-model="formItem.effectiveTime"
                                    placeholder="请选择有效日期..." style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="注意事项">
                        <Input v-model="formItem.attention"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入注意事项..." size="small"
                               style="width: 200px"></Input>
                    </FormItem>
                    <FormItem label="选择3D模型">
                        <Select v-model="formItem.model"
                                size="small"
                                style="width:200px"
                                placeholder="请选择3D模型...">
                            <Option value="item">333</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getNewRoutineMenu, getNewRoutineByParam } from '@api';
    import Config from '@/config';

    export default {
        name: 'dashboard-new-patrol',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '日常巡查新增',
                btnArr: [],
                pageSize: 10,
                total: 12,
                loading: false,
                menuList: [],
                formItem: {
                    taskName: '',
                    executor: '',
                    equipmentNum: '',
                    frequency: '',
                    periodTime: '',
                    input: '',
                    type: '',
                    showNum: '',
                    sortWay: '',
                    facilitiesNum: '',
                    facilitiesClassfiy: '',
                    facilitiesName: '',
                    facilitiesAddress: '',
                    installTime: '',
                    effectiveTime: '',
                    attention: '',
                    model: ''
                },
                table: {
                    columns: [],
                    data: [],
                    loading: false
                },
                modal: {
                    modal1: {
                        status: false,
                        title: '新增日常查询任务'
                    },
                    modal2: {
                        status: false,
                        state: 1,
                        title: '添加任务'
                    }
                },
                transfer: {
                    cache: {},
                    data: [],
                    targetKeys: []
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
            getNewRoutineMenu().then(async res => {
                this.menuList = res.menu
                this.setMenuClass(res.menu)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            selectThisBtn (key) {
                // 点击按钮切换颜色
                this.btnArr.some((item, key, arr) => {
                    this.btnArr[key].state = false
                })
                this.btnArr[key].state = true
                // todo 更换右侧表单的数据
                this.table.loading = true
                let that = this
                let id = this.menuList[key].id
                setTimeout(() => {
                    that.getTableDataById(id)
                }, 500)
            },
            setMenuClass (data) {
                let tempArr = []
                data.some((item, key, arr) => {
                    if (key === 0) {
                        // 默认第一个选中
                        this.getTableDataById(item.id)
                        tempArr.push({
                            state: true
                        })
                    } else {
                        tempArr.push({
                            state: false
                        })
                    }
                })
                this.btnArr = tempArr
            },
            getTableDataById (id = 0) {
                let param = {
                    id: id
                }
                getNewRoutineByParam(param).then(async res => {
                    let data = []
                    this.transfer.targetKeys = []
                    res.tableData.some((value, index, arr) => {
                        let temp = {}
                        Object.assign(temp, {
                            key: index,
                            label: 'lable',
                            description: 'desc',
                            disabled: false,
                            data: value
                        })
                        if (value.selected === 1) {
                            // 选中
                            this.transfer.targetKeys.push(index)
                        }
                        data.push(temp)
                    })
                    this.transfer.data = data
                })
            },
            submitAdd () {
                // todo 提交后端添加
                let periodTimeArr = this.formItem.periodTime
                let periodTime = []
                periodTimeArr.some((value, index, arr) => {
                    let date = new Date(value);
                    let year = date.getFullYear()
                    let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                    periodTime.push(
                        year + '.' + mouth + '.' + day
                    )
                })
                this.menuList.push({
                    id: 123,
                    title: '任务?',
                    taskName: this.formItem.taskName,
                    executor: this.formItem.executor,
                    equipmentNum: this.formItem.equipmentNum,
                    frequency: this.formItem.frequency,
                    periodTime: periodTime[0] + '-' + periodTime[1]
                })
                this.btnArr.push({
                    state: false
                })
                console.log(this.menuList)
                this.$Message.success('添加成功!')
            },
            setPageSize () {
                this.pageSize = parseInt(this.formItem.showNum);
                console.log('reset page size', this.pageSize);
                // TODO 只能 请求API限制  分页 限制每页显示数量
            },
            doQuery () {
                console.log('do query');
                // TODO 只能 请求API筛选处理 查询
            },
            changePage () {
                // TODO 翻页
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                this.transfer.targetKeys = newTargetKeys;
                // todo 数据提交
                this.$Message.success('操作成功!')
            },
            addTask () {
                this.modal.modal1.status = true
            },
            transferRender (item) {
                let data = item.data
                return '<div class=\'transfer-item ivu-inline-block\'>' +
                    '<span>' + data.id + '</span>' +
                    '<span>' + data.no + '</span>' +
                    '<span>' + data.classification + '</span>' +
                    '<span>' + data.name + '</span>' +
                    '<span>' + data.address + '</span>' +
                    '<span>' + data.installTime + '</span>' +
                    '<span>' + data.effectiveTime + '</span>' +
                    '</div>'
            },
            modalMock (state) {
                if (state === 1) {
                    this.setTableForm({}, false)
                    this.modal.modal2.state = 1
                } else {
                    if (Object.keys(this.transfer.cache).length === 0) {
                        this.$Message.error('至少选择一项!')
                        return false
                    }
                    this.setTableForm(this.transfer.cache.data)
                    this.modal.modal2.state = 2
                }
                this.modal.modal2.status = true
            },
            submitEquipment () {
                if (this.modal.modal2.state === 1) {
                    console.log(this.formItem)
                    // todo 数据添加
                    let formData = this.formItem
                    this.transfer.data.push({
                        key: 9999,
                        label: 'lable',
                        description: 'The desc of content ',
                        disabled: false,
                        data: {
                            id: 520,
                            no: formData.facilitiesNum,
                            classification: formData.facilitiesClassfiy,
                            name: formData.facilitiesName,
                            address: formData.facilitiesAddress,
                            installTime: this.dateTimeFormat(formData.installTime),
                            effectiveTime: this.dateTimeFormat(formData.effectiveTime),
                            attention: formData.attention,
                            model: formData.model
                        }
                    })
                    this.$Message.success('添加成功')
                } else {
                    this.$Message.success('编辑成功')
                }
            },
            cacheChoose (sourceSelectedKeys, targetSelectedKeys) {
                // 缓存用户当前点击的第一条 sourceSelectedKeys 左边选中 targetSelectedKeys右边
                let data = this.transfer.data
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    if (item.key === sourceSelectedKeys[0]) {
                        this.transfer.cache = item
                        break
                    }
                }
            },
            setTableForm (data, state = true) {
                this.formItem.facilitiesNum = state ? data.no : ''
                this.formItem.facilitiesClassfiy = state ? data.classification : ''
                this.formItem.facilitiesName = state ? data.name : ''
                this.formItem.facilitiesAddress = state ? data.address : ''
                this.formItem.installTime = state ? data.installTime : ''
                this.formItem.effectiveTime = state ? data.effectiveTime : ''
                this.formItem.attention = state ? data.attention : ''
                this.formItem.model = state ? data.model : ''
            },
            dateTimeFormat (temp) {
                let date = new Date(temp);
                let year = date.getFullYear()
                let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                return year + '/' + mouth + '/' + day
            }
        }
    }
</script>
<style lang="scss" scoped>
    .page-width {
        width: 49%;
        text-align: right;
    }

    .pat-btn {
        width: 100%;
        height: 90px;
        margin-bottom: 8px;
        text-align: left;
        overflow: hidden;

        .p-title {
            width: 100%;
            font-size: 14px;
        }

        .p-info {
            width: 100%;

            .p-items {
                width: 50%;
                display: block;
                float: left;
                margin-bottom: 6px;

                span {
                    display: inline-block;
                }
            }

            .p-items:last-child {
                width: 100%;

                span:first-child {
                    width: 25%;
                }
            }
        }
    }

    .p-new {
        margin-top: 6px;
        width: 100%;
    }
</style>
