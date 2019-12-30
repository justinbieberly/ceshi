<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Tabs type="card" class="ivu-mt"  @on-click="changeTabs"  value="wbjl">
                        <TabPane label="设备种类">
                        </TabPane>
                        <TabPane label="设备台账">
                        </TabPane>
                        <TabPane label="维保记录"  name="wbjl">
                            <div class="ivu-block">
                                <div class="regime-btn ivu-btn ivu-btn-default ivu-font-size-small"
                                     v-for="(value, index) in menuList"
                                     :key="index"
                                     :class="{ 'ivu-btn-selected': btnArr[index]['state'] }"
                                     @click="selectThisBtn(index)">
                                    <div class="ivu-inline-block">{{ value.title }}</div>
                                    <div class="ivu-inline-block do-action-btn">
                                        <Icon type="ios-add-circle" size="18" @click.stop="modalAction(1, '', index)"/>
                                        <Icon type="ios-close-circle" size="18" @click.stop="modalAction(3, value.id, index)"/>
                                        <Icon type="md-create" size="18" @click.stop="modalAction(2, value, index)"/>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.input" placeholder="文件名/序号/..." size="small"
                               style="width: 150px" />
                    </FormItem>
                    <FormItem label="所属类别">
                        <Select v-model="formItem.category"
                                class="ivu-nomal-select"
                                size="small"  style="width:150px">
                                <Option :value="item.id" v-for="(item, key) in modal.modal2.categoryList"
                                        :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="文档格式">
                        <Select v-model="formItem.fileType" size="small"
                                class="ivu-nomal-select"
                                style="width:150px">
                            <Option :value="item.id" v-for="(item, key) in modal.modal2.fileTypeList"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                        <Button type="primary" size="small" @click="reloadTable"
                                class="ivu-ml-40 ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="reloadTable(false)" class="ivu-ml">重置查询</Button>
                        <Button size="small" @click="modalTable(1)" class="ivu-ml">添加</Button>
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
                            <Option :value="item.key"
                                    v-for="(item, key) in table.columns"
                                    v-if="key < (table.columns.length - 1)"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </div>
                </Form>
                <Table border :columns="table.columns" :data="table.data" :loading="table.loading" class="ivu-mt">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(4, row)">预览</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click.native="download(row.file_url)">下载</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(2, row)">编辑</Button>
                        <Button type="error" size="small" @click="modalTable(3, row)">删除</Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="category">
                        <span>{{ modal.modal2.categoryList[row.category]?modal.modal2.categoryList[row.category]['title']:'' }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="fileType">
                        <span>{{ modal.modal2.fileTypeList[row.fileType]?modal.modal2.fileTypeList[row.fileType]['title']:'' }}</span>
                    </template>
                </Table>
                <div class="ivu-block" style="float: right;margin-top: 30px;">
                    <Page :total="total" :loading="loading"
                          :page-size="pageSize" show-total
                          show-elevator size="small" @on-change="reloadTable(true, $event)"/>
                </div>
            </div>
        </div>
        <Modal
                v-model="modal.modal1.status"
                :title="modal.modal1.title"
                @on-ok="submit">
            <div class="ivu-block ivu-p-8">
                <div v-if="modal.modal1.state === 3">
                    <div style="text-align:center">
                        <p>删除当前类别会丢失所有表单数据,是否继续?</p>
                    </div>
                </div>
                <Form :model="modal.modal1" :label-width="80" :label-colon="true" :hide-required-mark="false" v-else>
                    <FormItem label="类别名"   :rules="{required: true, message: '请输入类名', trigger: 'blur'}">
                        <Input v-model="modal.modal1.input" placeholder="输入别名..."></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <Modal
                width="500"
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
                      style="margin-right: auto;margin-left: auto;" v-else>
                    <FormItem label="文件名">
                        <Input v-model="formItem.fileName"
                               :disabled="modal.modal2.state === 4"
                               placeholder="请输入文件名..."
                               style="width: 240px" />
                    </FormItem>
                    <FormItem label="所属类别">
                        <Select v-model="formItem.category"
                                :disabled="modal.modal2.state === 4"
                                class="ivu-nomal-select"
                                placeholder="请输选择类别..."
                                style="width: 240px">
                                <Option :value="item.id"
                                        v-for="(item, key) in modal.modal2.categoryList"
                                        :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="维保人">
                        <Input v-model="formItem.applicant"
                               :disabled="modal.modal2.state === 4"
                               placeholder="请输入维保人..."
                               style="width: 240px" />
                    </FormItem>
                    <FormItem label="维保日期">
                        <DatePicker
                                v-model="formItem.maintenanceDate"
                                :disabled="modal.modal2.state === 4"
                                type="date"
                                placeholder="请选择维保日期..."
                                style="width: 240px"></DatePicker>
                    </FormItem>
                    <FormItem label="维保单位">
                        <Input v-model="formItem.maintenanceUnit"
                               :disabled="modal.modal2.state === 4"
                               placeholder="请输入维保单位..."
                               style="width: 240px" />
                    </FormItem>
                    <FormItem label="文件格式">
                        <Select v-model="formItem.fileType"
                                :disabled="modal.modal2.state === 4"
                                class="ivu-nomal-select"
                                placeholder="请输选择文件格式..."
                                style="width: 240px">
                            <Option :value="item.id" v-for="(item, key) in modal.modal2.fileTypeList"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="上传选择器"
                              class="item-copy"
                              v-if="modal.modal2.state !== 4"
                              :rules="{required: true, message: '文件必须!', trigger: 'blur'}">
                        <Upload action="//jsonplaceholder.typicode.com/posts/"
                                :on-success="uploadSuccess"
                                @on-error="uploadFailed"

                                ref="uploadEle">
                            <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
                            <span class="ivu-block upload-notice">只能上传word/pdf/视频格式文件，文件不能超过500Mb</span>
                        </Upload>
                    </FormItem>
                    <FormItem label="图片详情"
                              class="item-copy"
                              v-else>
                        <img :src="formItem.fileInfo" alt="" style="width: 240px; height: 240px;">
                    </FormItem>
                    <div style="clear: both"></div>
                </Form>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import {
        getMaintenanceRecordMenu, sendMaintenanceRecordMenu,
        getMaintenanceRecordTable, sendMaintenanceRecordTable
    } from '@api';
    import Config from '@/config';

    export default {
        name: 'dashboard-check-maintenance-record',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '检测维保记录',
                btnArr: [],
                pageSize: 10,
                total: 12,
                loading: false,
                formItem: {
                    category: undefined,
                    input: undefined,
                    pageSize: 10,
                    page: 1,
                    sortWay: undefined,
                    id: '',
                    fileName: '',
                    applicant: '',
                    maintenanceDate: '',
                    maintenanceUnit: '',
                    fileType: '',
                    fileInfo: '' // 返回\路劲
                },
                table: {
                    columns: [
                        {
                            title: '序号',
                            width: '90',
                            align: 'center',
                            key: 'id'
                        },
                        {
                            title: '文件名',
                            align: 'center',
                            key: 'fileName'
                        },
                        {
                            title: '所属类别',
                            align: 'center',
                            key: 'category',
                            slot: 'category'
                        },
                        {
                            title: '维保人',
                            width: '100',
                            align: 'center',
                            key: 'applicant'
                        },
                        {
                            title: '维保日期',
                            align: 'center',
                            width: '150',
                            key: 'maintenanceDate'
                        },
                        {
                            title: '维保单位',
                            width: '180',
                            align: 'center',
                            key: 'maintenanceUnit'
                        },
                        {
                            title: '添加时间',
                            width: '150',
                            align: 'center',
                            key: 'createdAt'
                        },
                        {
                            title: '文件格式',
                            align: 'center',
                            width: '90',
                            slot: 'fileType',
                            key: 'fileType'
                        },
                        {
                            title: '操作',
                            fixed: 'right',
                            align: 'center',
                            width: '220',
                            slot: 'action',
                            key: 'action'
                        }
                    ],
                    data: [],
                    loading: false
                },
                modal: {
                    modal1: {
                        status: false,
                        title: '添加一个类别',
                        input: '',
                        key: 0, // 父级的索引
                        index: 0, // 自身的索引
                        state: 1
                    },
                    modal2: {
                        categoryList: [], // 所有的分类
                        fileTypeList: [], // 所有的文件类型
                        status: false,
                        state: 1,
                        title: '添加文件'
                    }
                },
                menuList: []
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
            getMaintenanceRecordMenu().then(async res => {
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
            selectThisBtn (key) {
                // 点击按钮切换颜色
                this.btnArr.some((item, key, arr) => {
                    this.btnArr[key].state = false
                })
                this.btnArr[key].state = true
                // todo 更换右侧表单的数据
                this.table.loading = true
                let id = this.menuList[key].id
                let param = {
                    menuId: id
                }
                this.getMaintenanceRecordTableByParam(param)
            },
            modalAction (state, temp, key = 0) {
                // 操作显示不同的模态框
                if (state === 1) {
                    // add
                    this.modal.modal1.title = '添加类别'
                    this.modal.modal1.state = 1
                    this.modal.modal1.input = ''
                } else if (state === 2) {
                    // edit
                    this.modal.modal1.title = '编辑类别'
                    this.modal.modal1.state = 2
                    this.modal.modal1.input = temp.title
                    this.modal.modal1.id = temp.id
                } else {
                    // delete
                    // TODO 此处已经传入了id 根据id删除
                    this.modal.modal1.id = temp
                    this.modal.modal1.title = '删除类别?'
                    this.modal.modal1.state = 3
                    this.modal.modal1.key = key
                }
                this.modal.modal1.status = true
            },
            submit () {
                let param
                if (this.modal.modal1.state === 1) {
                    param = {
                        action: 'insert'
                    }
                    sendMaintenanceRecordMenu(param).then(async res => {
                        if (res.state === true) {
                            this.menuList.push({
                                id: 520,
                                title: this.modal.modal1.input
                            })
                            this.btnArr.push({
                                state: false
                            })
                        }
                        this.$Message.success(res.msg);
                    })
                } else if (this.modal.modal1.state === 2) {
                    param = {
                        action: 'update',
                        id: this.modal.modal1.id,
                        title: this.modal.modal1.input
                    }
                    sendMaintenanceRecordMenu(param).then(async res => {
                        if (res.state === true) {
                            let key = this.modal.modal1.key
                            this.menuList[key].title = this.modal.modal1.input
                        }
                        this.$Message.success(res.msg);
                    })
                } else {
                    param = {
                        action: 'delete',
                        id: this.modal.modal1.id
                    }
                    sendMaintenanceRecordMenu(param).then(async res => {
                        let key = this.modal.modal1.key
                        this.menuList.splice(key, 1)
                        // 清除按钮里面对应的数据
                        this.btnArr.splice(key, 1)
                        this.$Message.success(res.msg)
                    })
                }
            },
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
            reloadTable (state = true, event) {
                if (state) {
                    this.formItem.page = event === undefined ? 1 : event
                    this.pageSize = parseInt(this.formItem.pageSize);
                } else {
                    this.formItem.category = undefined
                    this.formItem.input = undefined
                    this.formItem.fileType = undefined
                }
                let param = {
                    input: this.formItem.input,
                    category: this.formItem.category,
                    fileType: this.formItem.fileType,
                    page: this.formItem.page,
                    pageSize: this.formItem.pageSize,
                    sortWay: this.formItem.sortWay
                }
                this.getMaintenanceRecordTableByParam(param)
            },
            setMenuClass (data) {
                let tempArr = []
                data.some((item, key, arr) => {
                    if (key === 0) {
                        // 默认第一个选中
                        let param = {
                            menuId: item.id,
                            isFirst: true
                        }
                        this.getMaintenanceRecordTableByParam(param)
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
            modalTable (state, temp) {
                // 右侧的表格 操作添加和编辑模态框
                if (state === 1) {
                    // 添加 操作
                    // 获取所有该写如的字段
                    this.setFormItemValue(temp, false)
                    this.modal.modal2.title = '添加文件'
                    this.modal.modal2.state = 1
                } else if (state === 2) {
                    // 编辑
                    this.setFormItemValue(temp)
                    this.modal.modal2.title = '编辑文件'
                    this.modal.modal2.state = 2
                } else if (state === 3) {
                    this.modal.modal2.title = '删除当前行数据?'
                    this.modal.modal2.state = 3
                } else if (state === 4) {
                    this.setFormItemValue(temp)
                    this.modal.modal2.title = '数据详情预览'
                    this.modal.modal2.state = 4
                }
                this.modal.modal2.status = true
            },
            tableSubmit () {
                let param
                if (this.modal.modal2.state === 1) {
                    param = {
                        action: 'insert',
                        fileName: this.formItem.fileName,
                        category: this.formItem.category,
                        applicant: this.formItem.applicant,
                        maintenanceDate: this.formItem.maintenanceDate,
                        maintenanceUnit: this.formItem.maintenanceUnit,
                        fileInfo: this.formItem.fileInfo
                    }
                    sendMaintenanceRecordTable(param).then(async res => {
                        if (res.state === true) {
                            this.reloadTable()
                        }
                        this.$Message.success(res.msg);
                    })
                } else if (this.modal.modal2.state === 2) {
                    param = {
                        action: 'update',
                        id: this.formItem.id,
                        fileName: this.formItem.fileName,
                        category: this.formItem.category,
                        applicant: this.formItem.applicant,
                        maintenanceDate: this.formItem.maintenanceDate,
                        maintenanceUnit: this.formItem.maintenanceUnit,
                        fileInfo: this.formItem.fileInfo
                    }
                    sendMaintenanceRecordTable(param).then(async res => {
                        if (res.state === true) {
                            this.reloadTable()
                        }
                        this.$Message.success(res.msg);
                    })
                } else if (this.modal.modal2.state === 3) {
                    param = {
                        action: 'insert',
                        id: this.formItem.id
                    }
                    sendMaintenanceRecordTable(param).then(async res => {
                        if (res.state === true) {
                            this.reloadTable()
                        }
                        this.$Message.success(res.msg);
                    })
                }
            },
            uploadSuccess (response, file, fileList) {
                this.$Message.success('文件上传成功!');
                // TODO 上传完成之后需要处理
                console.log(response, file, fileList)
            },
            uploadFailed (response, file, fileList) {
                console.log(response, file, fileList)
                // TODO 上传失败之后需要处理
                this.$refs.uploadEle.clearFiles()
                this.$Message.error('文件上传失败!');
            },
            getMaintenanceRecordTableByParam (param) {
                this.table.loading = true
                getMaintenanceRecordTable(param).then(async res => {
                    this.table.data = res.table.data
                    this.total = res.table.total
                    if (param.isFirst === true) {
                        this.modal.modal2.categoryList = res.table.categoryList
                        this.modal.modal2.fileTypeList = res.table.fileTypeList
                    }
                    this.table.loading = false
                })
            },
            setFormItemValue (temp, state = true) {
                this.formItem.id = state ? temp.id : ''
                this.formItem.fileName = state ? temp.fileName : ''
                this.formItem.category = state ? temp.category : ''
                this.formItem.applicant = state ? temp.applicant : ''
                this.formItem.maintenanceDate = state ? temp.maintenanceDate : ''
                this.formItem.maintenanceUnit = state ? temp.maintenanceUnit : ''
                this.formItem.fileType = state ? temp.fileType : ''
                this.formItem.fileInfo = state ? temp.source : ''
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
            width: 80%;
            line-height: 32px;
            text-align: left;
        }
    }
</style>
