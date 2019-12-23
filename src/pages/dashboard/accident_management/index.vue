<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small"
                            @click="exportData"
                            style="margin-left: 10px;">
                        <Icon type="md-arrow-round-down" />
                        导出
                    </Button>
                    <div class="ivu-block ivu-mt">
                        <div class="regime-btn ivu-btn ivu-btn-default ivu-font-size-small"
                             v-for="(value, index) in menuList"
                             :key="index"
                             :class="{ 'ivu-btn-selected': btnArr[index].state }"
                             @click="selectThisBtn(index)">
                            <div class="ivu-inline-block">{{ value.title }}</div>
                            <div class="ivu-inline-block">{{ value.time }}</div>
                            <div class="ivu-inline-block do-action-btn">
                                <Icon type="ios-add-circle" size="18" @click.stop="actionBtn(1, '')"/>
                                <Icon type="ios-close-circle" size="18" @click.stop="actionBtn(3, value.id)"/>
                                <Icon type="md-create" size="18" @click.stop="actionBtn(2, value.id)"/>
                            </div>
                        </div>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block content">
                <div class="ivu-text-center ivu-text-color new-content">
                    <h3>{{ formItem.title }}</h3>
                </div>
                <Form :model="formItem" :label-width="130"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <FormItem label="事故名称">
                        <Input type="text" v-model="formItem.name"
                               style="width: 250px"
                               :disabled="state === 1"
                               placeholder="请输入事故名称..."></Input>
                    </FormItem>
                    <FormItem label="事故部门">
                        <Select v-model="formItem.department"  :disabled="state === 1" style="width:250px">
                            <Option value="2">部门选择项</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="事故当事人">
                        <Input v-model="formItem.partiesConcerned"
                               style="width: 250px"
                               :disabled="state === 1"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入事故当事人..."></Input>
                    </FormItem>
                    <FormItem label="当事人联系方式">
                        <Input v-model="formItem.partiesContact"
                               style="width: 250px"
                               :disabled="state === 1"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入当事人联系方式..."></Input>
                    </FormItem>
                    <FormItem label="事故负责人">
                        <Input type="text" v-model="formItem.head"
                               style="width: 250px"
                               :disabled="state === 1"
                               placeholder="请输入事故负责人..."></Input>
                    </FormItem>
                    <FormItem label="报告人">
                        <Input type="text" v-model="formItem.reporter"
                               style="width: 250px"
                               :disabled="state === 1"
                               placeholder="请输入报告人..."></Input>
                    </FormItem>
                    <FormItem label="事故发生地点">
                        <Input type="text" v-model="formItem.place"
                               style="width:640px"
                               :disabled="state === 1"
                               placeholder="请输入事故发生地点..."></Input>
                    </FormItem>
                    <FormItem label="事故发生时间">
                        <DatePicker type="date" v-model="formItem.startTime"
                                    :disabled="state === 1"
                                    placeholder="选择开始时间..."
                                    style="width: 120px"></DatePicker>
                        <DatePicker type="date" v-model="formItem.endTime"
                                    :disabled="state === 1"
                                    placeholder="选择结束时间..."
                                    style="width: 120px; margin-left: 10px;"></DatePicker>
                    </FormItem>
                    <FormItem label="事故的详细经过">
                        <Select v-model="formItem.type"  :disabled="state === 1" style="width:250px">
                            <Option value="---">事故类别</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="事故的详细经过">
                        <Input v-model="formItem.detailPass" type="textarea"
                               style="width:640px"
                               :disabled="state === 1"
                               :rows="4" placeholder="事故的详细经过..." />
                    </FormItem>
                    <FormItem label="事故的原因分析">
                        <Input v-model="formItem.causeAnalysis"
                               :disabled="state === 1"
                               type="textarea"
                               style="width:640px"
                               :rows="4" placeholder="事故的原因分析..." />
                    </FormItem>
                    <FormItem label="事故处理结果及预防采取措施">
                        <Input v-model="formItem.measures"
                               :disabled="state === 1"
                               type="textarea"
                               style="width:640px"
                               :rows="4" placeholder="事故处理结果及预防采取措施..." />
                    </FormItem>
                    <FormItem label="上传选择器" v-if="state!==1">
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
                        </Upload>
                    </FormItem>
                    <div class="ivu-block ivu-text-center">
                        <Button type="primary" @click="submit">确定</Button>
                    </div>
                </Form>
            </div>
        </div>
        <Modal
                width="350"
                v-model="modal.status"
                :title="modal.title" >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>是否删除当前事故记录?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal.loading" @click="submit">删除</Button>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getAccidentManagement, getAccidentDetailByParam } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-accident-management',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '事故管理',
                menuList: [],
                formItem: {
                    state: 1,
                    title: '新建事故记录',
                    name: '',
                    department: '',
                    partiesConcerned: '',
                    partiesContact: '',
                    head: '',
                    reporter: '',
                    place: '',
                    startTime: '',
                    endTime: '',
                    type: '',
                    detailPass: '',
                    causeAnalysis: '',
                    measures: ''
                },
                btnArr: [],
                modal: {
                    status: false,
                    id: undefined,
                    loading: false,
                    title: '是否删除当前记录?'
                },
                state: 1
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
            getAccidentManagement().then(async res => {
                that.menuList = res.menu
                this.setMenuClass(res.menu)
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
            setMenuClass (data) {
                let tempArr = []
                data.some((item, key, arr) => {
                    if (key === 0) {
                        // 默认第一个选中
                        this.getItemDataById(item.id)
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
            modalAction (state, temp, key = 0) {
                // 操作显示不同的模态框
                if (state === 1) {
                    // add
                    this.modal.title = '添加类别'
                    this.modal.state = 1
                    this.modal.input = ''
                } else if (state === 2) {
                    // edit
                    this.modal.title = '编辑类别'
                    this.modal.state = 2
                    this.modal.input = temp.title
                    this.modal.id = temp
                } else {
                    // delete
                    // TODO 此处已经传入了id 根据id删除
                    this.modal.id = temp
                    this.modal.title = '删除类别?'
                    this.modal.state = 3
                    this.modal.key = key
                }
                this.modal.status = true
            },
            selectThisBtn (key) {
                // 点击按钮切换颜色
                let that = this
                that.btnArr.some((item, key, arr) => {
                    that.btnArr[key].state = false
                })
                that.btnArr[key].state = true
                // todo 更换右侧表单的数据
                let id = that.menuList[key].id
                setTimeout(() => {
                    that.getItemDataById(id)
                }, 500)
                this.state = 1
            },
            actionBtn (state, id) {
                if (state === 1) {
                    this.formItem.title = '新建事故记录'
                    this.setFormData({}, false)
                    this.state = 2
                } else if (state === 2) {
                    this.getItemDataById(id)
                    this.formItem.title = '编辑事故记录'
                    this.state = 3
                } else if (state === 3) {
                    this.modal.id = id
                    this.modal.status = true
                    this.state = 1
                }
                this.formItem.state = state
            },
            getItemDataById (id = 0) {
                let param = {
                    id: id
                }
                getAccidentDetailByParam(param).then(async res => {
                    this.setFormData(res)
                })
            },
            setFormData (data, state = true) {
                this.formItem.name = state ? data.name : ''
                this.formItem.department = state ? data.department : ''
                this.formItem.partiesConcerned = state ? data.partiesConcerned : ''
                this.formItem.partiesContact = state ? data.partiesContact : ''
                this.formItem.head = state ? data.head : ''
                this.formItem.reporter = state ? data.reporter : ''
                this.formItem.place = state ? data.place : ''
                this.formItem.time = state ? data.time : ''
                this.formItem.type = state ? data.type : ''
                this.formItem.detailPass = state ? data.detailPass : ''
                this.formItem.causeAnalysis = state ? data.causeAnalysis : ''
                this.formItem.measures = state ? data.measures : ''
            },
            submit () {
                // todo   by id
                if (this.state === 1) {
                    this.modal.loading = true
                    this.menuList.some((value, index, arr) => {
                        if (value.id === this.modal.id) {
                            this.menuList.splice(index, 1);
                        }
                    })
                    this.$Message.success('删除成功!')
                    this.modal.loading = false
                    this.modal.status = false
                } else if (this.state === 2) {
                    this.$Message.success('添加成功!')
                } else if (this.state === 3) {
                    this.$Message.success('编辑成功!')
                }
            },
            exportData () {
                this.$Message.success('导出成功')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .regime-btn {
        width: 100%;
        margin-bottom: 8px;
        overflow: hidden;
        div:first-child {
            width: 40%;
            line-height: 32px;
            text-align: left;
        }
        div:nth-child(2) {
            width: 35%;
        }
    }
    .content {
        width: 85%;
        margin-left: auto;
        margin-right: auto;
    }
    .new-content {
        line-height: 65px;
    }
</style>
