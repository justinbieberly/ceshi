<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-img user-full-screen ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.condition" placeholder="用户名/姓名..." size="small"
                               style="width: 150px" />
                    </FormItem>
                    <FormItem label="所属部门">
                        <Select v-model="formItem.user" size="small"
                                class="ivu-nomal-select"
                                style="width:150px">
                            <Option :value="item.id" v-for="(item, key) in modal.userInfo.departmentList" :key="key">{{ item.title }}</Option>
                        </Select>
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-ml-40 ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="doQuery" class="ivu-ml">重置查询</Button>
                    </FormItem>
                    <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
                        <FormItem>
                            <Button size="small" @click="modalTable(1)" class="ivu-ml ivu-mr-16">添加</Button>
                            <Select v-model="formItem.showNum" size="small"
                                    placeholder="显示条数"
                                    @on-change="setPageSize" style="width: 110px;">
                                <Option value="20">20条/页</Option>
                                <Option value="50">50条/页</Option>
                                <Option value="100">100条/页</Option>
                            </Select>
                            <Select v-model="formItem.sortWay" size="small"
                                    placeholder="排序方式"
                                    style="width: 110px;margin-left: 10px; ">
                                <Option value="errorInfo">报警内容</Option>
                            </Select>
                        </FormItem>
                    </div>
                </Form>
                <Table border :columns="table.columns" :data="table.data"
                       :loading="table.loading" class="ivu-mt">
                    <template slot-scope="{ row, index }" slot="status">
                        <Switch size="large" :value="row.status==1?true:false" @on-change="tableSubmit(true)">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </Switch>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(4, row)">权限设置</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(2, row)">编辑</Button>
                        <Button type="error" size="small" @click="modalTable(3, row)">删除</Button>
                    </template>
                </Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize" show-total show-elevator size="small" @on-change="changePage"/>
                </div>
            </div>
        </div>
        <Modal
                :width="500"
                v-model="modal.modal2.status"
                :title="modal.modal2.title"
                @on-ok="tableSubmit">
            <div class="ivu-block ivu-p-8">
                <div v-if="modal.modal2.state === 3">
                    <div style="text-align:center">
                        <p>删除当前行会丢失所有数据记录,是否继续?</p>
                    </div>
                </div>
                <Form :model="modal" :label-width="120" :label-colon="true"
                      :hide-required-mark="false"
                      :show-message="false"
                      style="width: 450px;margin-right: auto;margin-left: auto;" v-else>
                    <FormItem label="成员账号">
                        <Input v-model="modal.userInfo.account"
                               placeholder="输入成员账号..."
                               style="width: 250px"></Input>
                    </FormItem>
                    <FormItem label="成员姓名">
                        <Input v-model="modal.userInfo.name"
                               placeholder="输入成员姓名..."
                               style="width: 250px"></Input>
                    </FormItem>
                    <FormItem label="手机号码">
                        <Input v-model="modal.userInfo.phone"
                               placeholder="输入手机号码..."
                               style="width: 250px"></Input>
                    </FormItem>
                    <FormItem label="所属部门">
                        <Select v-model="modal.userInfo.departmentId"
                                placeholder="请选择..."
                                style="width:250px">
                            <Option :value="item.id" v-for="(item, key) in modal.userInfo.departmentList" :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="登录密码">
                        <Input v-model="modal.userInfo.password"
                               placeholder="输入登录密码..."
                               style="width: 250px"></Input>
                    </FormItem>
                    <FormItem label="确认密码">
                        <Input v-model="modal.userInfo.rePassword"
                               placeholder="确保两次密码完全一致..."
                               style="width: 250px"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getUserManagementData } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-user-management',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '操作日志',
                formItem: {
                    user: '',
                    showNum: '',
                    sortWay: '',
                    time: ''
                },
                modal: {
                    modal2: {
                        status: false,
                        state: 1,
                        title: '添加成员'
                    },
                    userInfo: {
                        departmentList: [],
                        account: '',
                        name: '',
                        phone: '',
                        departmentId: '',
                        password: ''
                    }
                },
                pageSize: 5,
                total: 12,
                loading: false,
                table: {
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            width: '120px',
                            key: 'id'
                        },
                        {
                            title: '成员账号',
                            align: 'center',
                            key: 'account'
                        },
                        {
                            title: '姓名',
                            align: 'center',
                            key: 'name'
                        },
                        {
                            title: '手机号码',
                            align: 'center',
                            key: 'phone'
                        },
                        {
                            title: '所属部门',
                            align: 'center',
                            key: 'departmentId',
                            render: (h, params) => {
                                return h('span', params.row.name);
                            }
                        },
                        {
                            title: '添加时间',
                            align: 'center',
                            key: 'createAt'
                        },
                        {
                            title: '最后登录',
                            align: 'center',
                            key: 'lastLoginAt'
                        },
                        {
                            title: '是否启用',
                            align: 'center',
                            slot: 'status',
                            key: 'status'
                        },
                        {
                            title: '操作',
                            align: 'center',
                            width: '230',
                            slot: 'action'
                        }
                    ],
                    data: []
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
            that.table.loading = true
            getUserManagementData().then(async res => {
                that.table.data = res.tableData.data
                that.modal.userInfo.departmentList = res.tableData.departmentList
                that.table.loading = false
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            modalTable (state, temp) {
                if (state === 1) {
                    // 添加 操作
                    // 获取所有该写如的字段
                    this.setModalFormItem({}, false)
                    this.modal.modal2.title = '添加成员'
                    this.modal.modal2.state = 1
                } else if (state === 2) {
                    // 编辑
                    this.setModalFormItem(temp)
                    console.log(temp)
                    this.modal.modal2.title = '编辑文件'
                    this.modal.modal2.state = 2
                } else if (state === 3) {
                    this.modal.modal2.title = '删除当前行数据?'
                    this.modal.modal2.state = 3
                } else if (state === 4) {
                    this.setModalFormItem(temp)
                    this.modal.modal2.title = '数据详情预览'
                    this.modal.modal2.state = 4
                }
                this.modal.modal2.status = true
            },
            setModalFormItem (temp, state = true) {
                this.modal.userInfo.account = state ? temp.account : ''
                this.modal.userInfo.name = state ? temp.name : ''
                this.modal.userInfo.phone = state ? temp.phone : ''
                this.modal.userInfo.departmentId = state ? parseInt(temp.departmentId) : ''
                this.modal.userInfo.password = state ? temp.password : ''
            },
            tableSubmit (state = false) {
                if (state) {
                    // todo  edit status
                    this.$Message.success('操作成功!');
                } else {
                    if (this.modal.modal2.state === 1) {
                        console.log(this.modal.userInfo)
                        this.$Message.success('添加成功');
                    } else if (this.modal.modal2.state === 2) {
                        this.$Message.success('编辑成功');
                    } else {
                        this.$Message.success('删除成功');
                    }
                }
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
