<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.input" placeholder="部门/名字/..." size="small"
                               style="width: 150px" />
                    </FormItem>
                    <FormItem label="体检类型">
                        <Select v-model="formItem.medicalType" size="small"
                                class="ivu-nomal-select"
                                style="width:150px">
                            <Option :value="item.id"
                                    v-for="(item, key) in selectInfo.medicalType"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="临期时间">
                        <Select v-model="formItem.periodTime" size="small"
                                class="ivu-nomal-select"
                                style="width:150px">
                            <Option value="10">临期10天</Option>
                            <Option value="20">临期20天</Option>
                            <Option value="30">临期30天</Option>
                        </Select>
                        <Button type="primary" size="small" @click="reloadTable"
                                class="ivu-ml-40 ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="reloadTable(false)" class="ivu-ml">重置查询</Button>
                    </FormItem>
                    <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
                        <FormItem>
                            <Button size="small" @click="modalTable(1)" class="ivu-ml">添加</Button>
                            <Button size="small" to="/dashboard/supplies_parameter" class="ivu-ml">用品台账</Button>
                        </FormItem>
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
                            <Option :value="item.key"
                                    v-for="(item, key) in table.columns"
                                    v-if="key < (table.columns.length - 1)"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </div>
                </Form>
                <Table border :columns="table.columns" :data="table.data" :loading="table.loading" class="ivu-mt">
                    <template slot-scope="{ row, index }" slot="attachment">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(4, row)">预览</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click.native="download(row.file_url)">下载</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(2, row)">编辑</Button>
                        <Button type="error" size="small" @click="modalTable(3, row)">删除</Button>
                    </template>
                </Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading" :page-size="pageSize"
                          show-total show-elevator size="small"
                          @on-change="reloadTable(true, $event)"/>
                </div>
            </div>
        </div>
        <Modal
                :width="550"
                v-model="modal.status"
                :title="modal.title"
                @on-ok="modalSubmit">
            <div class="ivu-block ivu-p-8">
                <div v-if="modal.state === 3">
                    <div style="text-align:center">
                        <p>删除当前行会丢失所有数据记录,是否继续?</p>
                    </div>
                </div>
                <Form :model="formItem"
                      :label-width="100"
                      :label-colon="true"
                      :hide-required-mark="false"
                      :show-message="false"
                      style="margin-right: auto;margin-left: auto;width: 90%" v-else>
                    <FormItem
                            :rules="{required: true, message: '请输入姓名!', trigger: 'blur'}"
                            label="姓名">
                        <Input v-model="formItem.name"
                               :disabled="modal.state === 4"
                               placeholder="请输入姓名..."></Input>
                    </FormItem>
                    <FormItem
                            :rules="{required: true, message: '请输入电话!', trigger: 'blur'}"
                            label="电话">
                        <Input v-model="formItem.phone"
                               :disabled="modal.state === 4"
                               placeholder="请输入电话..."></Input>
                    </FormItem>
                    <FormItem
                            :rules="{required: true, message: '请选择部门信息!', trigger: 'blur'}"
                            label="部门">
                        <Select v-model="formItem.department"
                                :disabled="modal.state === 4"
                                placeholder="请选择部门信息...">
                            <Option :value="item.id"
                                    v-for="(item, key) in selectInfo.department"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                            :rules="{required: true, message: '请选择!', trigger: 'blur'}"
                            label="是否健康">
                        <Select v-model="formItem.isHealth"
                                :disabled="modal.state === 4"
                                placeholder="请选择...">
                            <Option value="否">否</Option>
                            <Option value="是">是</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                            :rules="{required: true, message: '请选择!', trigger: 'blur'}"
                            label="体检类型">
                        <Select v-model="formItem.medicalType"
                                :disabled="modal.state === 4"
                                placeholder="请选择...">
                            <Option :value="item.id"
                                    v-for="(item, key) in selectInfo.medicalType"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                            :rules="{required: true, message: '请选择!', trigger: 'blur'}"
                            label="有效时间">
                        <DatePicker type="date" placeholder="选择开始日期"
                                    :disabled="modal.state === 4"
                                    v-model="formItem.medicalTime"
                                    style="width: 165px"></DatePicker>
                        <DatePicker type="date" placeholder="选择结束日期"
                                    :disabled="modal.state === 4"
                                    v-model="formItem.effectiveTime"
                                    style="width: 165px; margin-left: 20px;"></DatePicker>
                    </FormItem>
<!--                    <FormItem label="上传选择器"-->
<!--                              class="item-copy"-->
<!--                              :rules="{required: true, message: '文件必须!', trigger: 'blur'}">-->
<!--                        <Upload action="//jsonplaceholder.typicode.com/posts/"-->
<!--                                :on-success="uploadSuccess"-->
<!--                                @on-error="uploadFailed"-->
<!--                                ref="uploadEle">-->
<!--                            <Button icon="ios-cloud-upload-outline">选择上传文件</Button>-->
<!--                            <span class="ivu-block upload-notice">只能上传word/pdf/视频格式文件，文件不能超过500Mb</span>-->
<!--                        </Upload>-->
<!--                    </FormItem>-->
                    <div style="clear: both"></div>
                </Form>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getOccupationalHealth, sendOccupationalHealth } from '@api';
    import Config from '@/config';

    export default {
        name: 'dashboard-occupational-health-ledger',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '三维模型',
                modelImg: '/assets/images/vbg.png',
                pageSize: 10,
                total: 12,
                loading: false,
                // 存放selected下拉选择框的数据
                selectInfo: {
                    department: [],
                    isHealth: [],
                    medicalType: []
                },
                formItem: {
                    input: undefined,
                    periodTime: undefined,
                    page: 1,
                    pageSize: 10,
                    sortWay: undefined,
                    id: undefined,
                    name: undefined,
                    phone: undefined,
                    department: undefined,
                    isHealth: undefined,
                    medicalType: undefined,
                    medicalTime: undefined,
                    fileInfo: undefined,
                    effectiveTime: undefined
                },
                modal: {
                    status: false,
                    title: '添加用户信息',
                    id: undefined,
                    state: 1
                },
                table: {
                    columns: [
                        {
                            title: '序号',
                            align: 'center',
                            key: 'id'
                        },
                        {
                            title: '姓名',
                            align: 'center',
                            key: 'name'
                        },
                        {
                            title: '电话',
                            align: 'center',
                            key: 'phone'
                        },
                        {
                            title: '部门',
                            align: 'center',
                            key: 'department'
                        },
                        {
                            title: '是否健康',
                            align: 'center',
                            key: 'isHealth'
                        },
                        {
                            title: '体检类型',
                            align: 'center',
                            key: 'medicalType'
                        },
                        {
                            title: '体检日期',
                            align: 'center',
                            key: 'medicalTime'
                        },
                        {
                            title: '有效日期',
                            align: 'center',
                            key: 'effectiveTime'
                        },
                        {
                            title: '临期时间',
                            align: 'center',
                            key: 'periodTime'
                        },
                        {
                            title: '附件',
                            align: 'center',
                            fixed: 'right',
                            width: '250',
                            slot: 'attachment',
                            key: 'attachment'
                        }
                    ],
                    data: [],
                    loading: false
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
            this.getOccupationalHealthTableByParam()
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            reloadTable (state = true, event) {
                if (state) {
                    this.formItem.page = event === undefined ? 1 : event
                    this.pageSize = parseInt(this.formItem.pageSize);
                } else {
                    this.formItem.input = undefined
                    this.formItem.medicalType = undefined
                    this.formItem.periodTime = undefined
                    this.formItem.page = 1
                }
                let param = {
                    input: this.formItem.input,
                    medicalType: this.formItem.medicalType,
                    periodTime: this.formItem.periodTime,
                    page: this.formItem.page,
                    pageSize: this.formItem.pageSize,
                    sortWay: this.formItem.sortWay
                }
                this.getOccupationalHealthTableByParam(param)
            },
            getOccupationalHealthTableByParam (param = null) {
                this.table.loading = true
                getOccupationalHealth(param).then(async res => {
                    this.table.data = res.tableData.data
                    this.total = res.tableData.total
                    if (param === null) {
                        this.selectInfo.medicalType = res.tableData.medicalType
                        this.selectInfo.department = res.tableData.departmentList
                    }
                    this.table.loading = false
                }).catch(err => {
                    console.log('err', err)
                })
            },
            uploadSuccess (response, file, fileList) {
                this.formItem.fileInfo = response.id
                this.$Message.success('文件上传成功!');
            },
            uploadFailed (response, file, fileList) {
                console.log(response, file, fileList)
                // TODO 上传失败之后需要处理
                this.$refs.uploadEle.clearFiles()
                this.$Message.error('文件上传失败!');
            },
            getSelectItem (data) {
                let categoryList = []
                let fileType = []
                data.some((item, key, arr) => {
                    if (categoryList.indexOf(item.category) === -1) {
                        categoryList.push(item.category)
                    }
                    if (fileType.indexOf(item.file_type) === -1) {
                        fileType.push(item.file_type)
                    }
                })
                this.modal.modal2.categoryList = categoryList
                this.modal.modal2.fileTypeList = fileType
            },
            download (url) {
                if (!url) {
                    return
                }
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                // download 属性定义了下载链接的地址而不是跳转路径
                link.setAttribute('download', '文件.jpg')
                document.body.appendChild(link)
                link.click()
            },
            modalTable (state, temp) {
                // 右侧的表格 操作添加和编辑模态框
                if (state === 1) {
                    // 添加 操作
                    // 获取所有该写如的字段
                    this.setFormItemValue(temp, false)
                    this.modal.title = '添加文件'
                    this.modal.state = 1
                } else if (state === 2) {
                    // 编辑
                    this.formItem.id = temp.id
                    this.setFormItemValue(temp)
                    this.modal.title = '编辑文件'
                    this.modal.state = 2
                } else if (state === 3) {
                    this.modal.title = '删除当前行数据?'
                    this.modal.id = temp.id
                    this.modal.state = 3
                } else if (state === 4) {
                    this.setFormItemValue(temp)
                    this.modal.title = '数据详情预览'
                    this.modal.state = 4
                }
                this.modal.status = true
            },
            modalSubmit () {
                let param
                if (this.modal.state === 1) {
                    param = {
                        action: 'insert',
                        name: this.formItem.name,
                        phone: this.formItem.phone,
                        department: this.formItem.department,
                        isHealth: this.formItem.isHealth,
                        medicalType: this.formItem.medicalType,
                        medicalTime: this.formItem.medicalTime,
                        fileInfo: this.formItem.fileInfo,
                        effectiveTime: this.formItem.effectiveTime
                    }
                    sendOccupationalHealth(param).then(async res => {
                        if (res.state === true) {
                            this.reloadTable()
                        }
                        this.$Message.success(res.msg);
                    })
                } else if (this.modal.state === 2) {
                    param = {
                        action: 'update',
                        id: this.formItem.id,
                        name: this.formItem.name,
                        phone: this.formItem.phone,
                        department: this.formItem.department,
                        isHealth: this.formItem.isHealth,
                        medicalType: this.formItem.medicalType,
                        medicalTime: new Date(this.formItem.medicalTime).getTime(),
                        fileInfo: this.formItem.fileInfo,
                        effectiveTime: new Date(this.formItem.effectiveTime).getTime()
                    }
                    sendOccupationalHealth(param).then(async res => {
                        if (res.state === true) {
                            this.reloadTable()
                        }
                        this.$Message.success(res.msg)
                    })
                } else if (this.modal.state === 3) {
                    param = {
                        action: 'delete',
                        id: this.formItem.id
                    }
                    sendOccupationalHealth(param).then(async res => {
                        if (res.state === true) {
                            this.reloadTable()
                        }
                        this.$Message.success(res.msg);
                    })
                }
            },
            setFormItemValue (temp, state = true) {
                this.formItem.name = state ? temp.name : ''
                this.formItem.phone = state ? temp.phone : ''
                this.formItem.department = state ? temp.department : ''
                this.formItem.isHealth = state ? temp.isHealth : ''
                this.formItem.medicalType = state ? temp.medicalType : ''
                this.formItem.medicalTime = state ? temp.medicalTime : ''
                this.formItem.effectiveTime = state ? temp.effectiveTime : ''
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
