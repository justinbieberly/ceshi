<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Tabs type="card" class="ivu-mt"  @on-click="changeTabs" >
                        <TabPane label="应急预案">
                            <div style="width: 100%" class="hzyj-btn ivu-btn ivu-btn-primary"
                                    v-for="(item, key) in menuList"
                                    :key="key"
                                    :type="btnArr[key].state"
                                 :class="{ 'ivu-btn-selected': btnArr[key].state }"
                                 @click="selectThisBtn(key)">
                                <div class="ivu-block hzjjya-list">
                                    <div class="ivu-inline-block">{{ item.title }}</div>
                                    <div class="ivu-inline-block">{{ item.createAt}}</div>
                                    <div class="ivu-inline-block do-action-btn">
                                        <Icon type="ios-add-circle" size="18" @click="modalAction(1, '')"/>
                                        <Icon type="ios-close-circle" size="18" @click="modalAction(2, item.id, key)"/>
                                        <Icon type="md-create" size="18" @click="modalAction(3, item, key)"/>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="预案演练">
                            <div style="width: 100%" class="hzyj-btn ivu-btn ivu-btn-primary"
                                 v-for="(item, key) in menuList"
                                 :key="key"
                                 :type="btnArr[key].state"
                                 :class="{ 'ivu-btn-selected': btnArr[key].state }"
                                 @click="selectThisBtn(key)">
                                <div class="ivu-block hzjjya-list">
                                    <div class="ivu-inline-block">{{ item.title }}</div>
                                    <div class="ivu-inline-block">{{ item.createAt}}</div>
                                    <div class="ivu-inline-block do-action-btn">
                                        <Icon type="ios-add-circle" size="18" @click="modalAction(1, '')"/>
                                        <Icon type="ios-close-circle" size="18" @click="modalAction(2, item.id, key)"/>
                                        <Icon type="md-create" size="18" @click="modalAction(3, item, key)"/>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="应急处理">
                            <div class="ivu-block">
                                <Button type="default" long>SDMS</Button>
                                <div class="ivu-block ivu-mt-16">
                                    <div class="ivu-text-center item-jywz"
                                         v-for="(item, key) in emergency.emergencyRow"
                                         :key="key">
                                        <h3 class="ivu-text-color">{{ item.title }}</h3>
                                        <ButtonGroup v-for="(value, index) in item.data" :key="index"
                                                     class="ivu-mb-8 user-full-screen">
                                            <Button type="primary" class="ivu-btn-custom"
                                                    style="width: 40%">{{ value.name }}</Button>
                                            <Button style="width: 60%">{{ value.number }}</Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
           <div class="ivu-block" v-if="!emergency.isEmergency">
               <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                     class="real-time-form ivu-inline-block user-full-screen">
                   <div class="ivu-form-item" style="line-height: 32px;">
                       功能操作
                   </div>
                   <FormItem label="输入搜索">
                       <Input v-model="formItem.condition" placeholder="文件名/序号/..." size="small"
                              style="width: 120px" />
                   </FormItem>
                   <FormItem label="所属类别">
                       <Select v-model="formItem.category"
                               class="ivu-nomal-select"
                               size="small"  style="width:100px">
                           <Option :value="item.id"
                                   v-for="(item, key) in modal.modal2.categoryList"
                                   :key="key">{{ item.title }}</Option>
                       </Select>
                   </FormItem>
                   <FormItem label="文档格式">
                       <Select v-model="formItem.fileType" size="small"
                               class="ivu-nomal-select"
                               style="width:100px">
                           <Option :value="item.id"
                                   v-for="(item, key) in modal.modal2.fileTypeList"
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
                           <Option :value="item.key" v-for="(item, key) in table.columns"
                                   :key="key"
                                   v-if="key !== table.columns.length - 1">{{ item.title }}</Option>
                       </Select>
                   </div>
               </Form>
               <Table border
                      :loading="table.loading"
                      :columns="table.columns"
                      :data="table.data"
                      class="ivu-mt">
                   <template slot-scope="{ row, index }" slot="action">
                       <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(3, row)">预览</Button>
                       <Button type="primary" size="small" style="margin-right: 5px" @click.native="download(row.file_url)">下载</Button>
                       <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(2, row)">编辑</Button>
                       <Button type="error" size="small" @click="modalTable(3, row)">删除</Button>
                   </template>
               </Table>
               <div class="ivu-block" style="float: right;margin-top: 30px;">
                   <Page :total="total" :page-size="pageSize" show-total show-elevator
                         size="small" @on-change="reloadTable(true, $event)"/>
               </div>
           </div>
            <img :src="emergency.imgModel" alt="" v-else>
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
                    <FormItem label="类别名"   :rules="{required: true, message: 'can not be empty', trigger: 'blur'}">
                        <Input v-model="modal.modal1.input" placeholder="输入别名..."></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <Modal
                v-model="modal.modal2.status"
                :title="modal.modal2.title"
                @on-ok="tableSubmit">
            <div class="ivu-block ivu-p-8">
                <div v-if="modal.modal2.state === 3">
                    <div style="text-align:center">
                        <p>删除当前行会丢失所有数据记录,是否继续?</p>
                    </div>
                </div>
                <Form :model="modal" :label-width="100" :label-colon="true"
                      :hide-required-mark="false"
                      style="width: 350px;margin-right: auto;margin-left: auto;" v-else>
                    <FormItem label="文件名"   :rules="{required: true, message: '文件名不能为空', trigger: 'blur'}">
                        <Input v-model="modal.modal2.fileName" placeholder="请输入文件名..."
                               :disabled="modal.modal2.state === 4"
                               style="width: 180px"></Input>
                    </FormItem>
                    <FormItem label="所属类别"   :rules="{required: true, message: '文件类别不能为空', trigger: 'blur'}">
                        <Select v-model="modal.modal2.category" placeholder="请选择文件类别..."
                                :disabled="modal.modal2.state === 4"
                                style="width: 180px">
                            <Option :value="item.id"
                                    v-for="(item, key) in modal.modal2.categoryList"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="文件格式"   :rules="{required: true, message: '文件格式不能为空', trigger: 'blur'}">
                        <Select v-model="modal.modal2.fileType" placeholder="请选择文件格式..."
                                :disabled="modal.modal2.state === 4"
                                style="width: 180px">
                            <Option :value="item.id"
                                    v-for="(item, key) in modal.modal2.fileTypeList"
                                    :key="key">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="上传选择器"
                              :rules="{required: true, message: '文件必须!', trigger: 'blur'}"
                              v-if="modal.modal2.state !== 4">
                        <Upload :action="uploadFileApi"
                                :on-success="uploadSuccess" @on-error="uploadFailed" ref="uploadEle">
                            <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
                            <span class="ivu-block upload-notice">只能上传word/pdf/视频格式文件，文件不能超过500Mb</span>
                        </Upload>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import {
        getEmergencyResponsePlan, sendEmergencyResponsePlan,
        sendEmergencyTableAction,
        getPreparednessDrill, getEmergencyTreatment
    } from '@api';
    import Config from '@/config';
    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                uploadFileApi: Config.uploadFileApi,
                title: '应急管理',
                menuList: [],
                btnArr: [],
                modal: {
                    modal1: {
                        id: 0,
                        key: undefined,
                        status: false,
                        input: '',
                        state: 1, // 1添加 2编辑
                        title: '添加一个类别'
                    },
                    modal2: {
                        categoryList: [], // 所有的分类
                        fileTypeList: [], // 所有的文件类型
                        status: false,
                        state: 1,
                        id: undefined,
                        title: '添加文件',
                        fileName: '',
                        category: '',
                        fileType: '',
                        fileInfo: '' // 返回id 还是路劲
                    }

                },
                pageSize: 10,
                total: 0,
                tabIndex: 0,
                tabKey: 0,
                formItem: {
                    category: undefined,
                    fileType: undefined,
                    condition: undefined,
                    pageSize: 10,
                    sortWay: undefined
                },
                table: {
                    loading: false,
                    columns: [
                        {
                            title: '序号',
                            key: 'id',
                            width: '70px',
                            align: 'center'
                        },
                        {
                            title: '文件名',
                            key: 'file_name',
                            align: 'center'
                        },
                        {
                            title: '所属类别',
                            key: 'category',
                            width: '170px',
                            align: 'center'
                        },
                        {
                            title: '添加时间',
                            key: 'add_time',
                            width: '170px',
                            align: 'center'
                        },
                        {
                            title: '文件格式',
                            width: '100px',
                            key: 'file_type',
                            align: 'center'
                        },
                        {
                            title: '操作',
                            align: 'center',
                            slot: 'action',
                            key: 'action'
                        }
                    ],
                    data: []
                },
                emergency: { // 应急处理
                    isEmergency: false,
                    imgModel: '/assets/images/u651.svg',
                    emergencyRow: []
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
            this.getEmergencyResponsePlanTableByParam()
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            changeTabs (index) {
                this.clearForm()
                // 点击tab分页 如果只在一个页面 页面数据会混淆
                let that = this;
                that.tabIndex = index
                this.btnArr.some((item, key, arr) => {
                    this.btnArr[key].state = false
                })
                this.btnArr[0].state = true
                let param = {
                    tabIndex: index,
                    mId: this.menuList[index]['id']
                }
                if (index === 0) {
                    // 应急预案
                    that.emergency.isEmergency = false
                    this.getEmergencyResponsePlanTableByParam(param)
                } else if (index === 1) {
                    // 预案演练
                    that.emergency.isEmergency = false
                    this.getPreparednessDrillTableByParam(param)
                } else if (index === 2) {
                    // 预案演练
                    that.emergency.isEmergency = true
                    getEmergencyTreatment()
                        .then(async res => {
                            that.emergency.emergencyRow = res.rowList
                        }).catch(err => {
                            console.log('err: ', err)
                        })
                }
            },
            submit () {
                if (this.modal.modal1.state === 1) {
                    // TODO 异步后台添加
                    let param = {
                        title: this.modal.modal1.input,
                        action: 'insert'
                    }
                    sendEmergencyResponsePlan(param).then(async res => {
                        if (res.state === true) {
                            let info = res.info
                            this.menuList.push({
                                id: info.id,
                                title: info.title,
                                createAt: info.createAt
                            })
                            this.btnArr.push({
                                state: false
                            })
                        }
                        this.$Message.success(res.msg);
                    })
                } else if (this.modal.modal1.state === 2) {
                    let param = {
                        id: this.modal.modal1.id,
                        action: 'update'
                    }
                    sendEmergencyResponsePlan(param).then(async res => {
                        if (res.state === true) {
                            let key = this.modal.modal1.key
                            this.menuList[key].title = this.modal.modal1.input
                        }
                        this.$Message.success(res.msg);
                    })
                } else {
                    let param = {
                        id: this.modal.modal1.id,
                        action: 'delete'
                    }
                    sendEmergencyResponsePlan(param).then(async res => {
                        if (res.state === true) {
                            let key = this.modal.modal1.key
                            this.menuList.splice(key, 1)
                        }
                        this.$Message.success(res.msg);
                    })
                }
            },
            modalAction (state, temp, key = 0) {
                // 操作显示不同的模态框
                if (state === 1) {
                    // add
                    this.modal.modal1.title = '添加类别'
                    this.modal.modal1.state = 1
                    this.modal.modal1.input = ''
                } else if (state === 3) {
                    // edit
                    this.modal.modal1.title = '编辑类别'
                    this.modal.modal1.state = 2
                    this.modal.modal1.input = temp.title
                    this.modal.modal1.id = temp
                    this.modal.modal1.key = key
                } else {
                    // delete
                    this.modal.modal1.id = temp
                    this.modal.modal1.title = '删除类别?'
                    this.modal.modal1.state = 3
                    this.modal.modal1.key = key
                }
                this.modal.modal1.status = true
            },
            selectThisBtn (index) {
                this.tabKey = index
                // 点击按钮切换颜色
                this.btnArr.some((item, key, arr) => {
                    this.btnArr[key].state = false
                })
                this.btnArr[index].state = true
                let tableIndex = parseInt(this.tabIndex)
                let param = {
                    tabIndex: tableIndex,
                    mId: this.menuList[index]['id']
                }
                if (tableIndex === 0) {
                    this.getEmergencyResponsePlanTableByParam(param)
                } else if (tableIndex === 1) {
                    this.getPreparednessDrillTableByParam(param)
                }
            },
            reloadTable (state = true, event) {
                if (state) {
                    this.formItem.page = event === undefined ? 1 : event
                    this.pageSize = parseInt(this.formItem.pageSize)
                } else {
                    this.clearForm()
                }
                this.getEmergencyResponsePlanTableByParam(this.formItem)
            },
            getEmergencyResponsePlanTableByParam (param = null) {
                let that = this
                console.log('param', param)
                that.table.loading = true
                getEmergencyResponsePlan(param).then(async res => {
                    that.table.data = res.tableData.data
                    that.total = res.tableData.total
                    if (param === null) {
                        this.init(res)
                        that.menuList = res.menu
                    }
                    that.table.loading = false
                }).catch(err => {
                    console.log('err: ', err)
                })
            },
            getPreparednessDrillTableByParam (param = null) {
                let that = this
                console.log('param', param)
                that.table.loading = true
                getPreparednessDrill().then(async res => {
                    that.table.data = res.tableData.data
                    if (param === null) {
                        this.init(res)
                        that.menuList = res.menu
                    }
                    that.table.loading = false
                }).catch(err => {
                    console.log('err: ', err)
                })
            },
            modalTable (state, temp) {
                // 右侧的表格 操作添加和编辑模态框
                if (state === 1) {
                    // 添加
                    this.modal.modal2.title = '添加文件'
                    this.modal.modal2.state = 1
                } else if (state === 2) {
                    // 编辑
                    this.modal.modal2.fileName = temp.file_name
                    this.modal.modal2.category = temp.category
                    this.modal.modal2.fileType = temp.file_type
                    this.modal.modal2.title = '编辑文件'
                    this.modal.modal2.state = 2
                } else if (state === 3) {
                    // 预览
                    this.modal.modal2.fileName = temp.file_name
                    this.modal.modal2.category = temp.category
                    this.modal.modal2.fileType = temp.file_type
                    this.modal.modal2.title = '预览'
                    this.modal.modal2.state = 4
                } else {
                    this.modal.modal2.title = '删除当前行数据?'
                    this.modal.modal2.state = 3
                }
                this.modal.modal2.status = true
            },
            tableSubmit () {
                if (this.modal.modal2.state === 1) {
                    let param = {
                        action: 'insert',
                        fileName: this.modal.modal2.fileName,
                        category: this.modal.modal2.category,
                        fileType: this.modal.modal2.fileType,
                        fileInfo: this.modal.modal2.fileInfo
                    }
                    sendEmergencyTableAction(param).then(async res => {
                        if (res.state === true) {
                            console.log('res', res)
                        }
                        this.$Message.success(res.msg);
                    })
                } else if (this.modal.modal2.state === 2) {
                    let param = {
                        action: 'update',
                        id: this.modal.modal2.id,
                        fileName: this.modal.modal2.fileName,
                        category: this.modal.modal2.category,
                        fileType: this.modal.modal2.fileType,
                        fileInfo: this.modal.modal2.fileInfo
                    }
                    sendEmergencyTableAction(param).then(async res => {
                        if (res.state === true) {
                            console.log('res', res)
                        }
                        this.$Message.success(res.msg);
                    })
                } else if (this.modal.modal2.state === 3) {
                    let param = {
                        action: 'delete',
                        id: this.modal.modal2.id
                    }
                    sendEmergencyTableAction(param).then(async res => {
                        if (res.state === true) {
                            console.log('res', res)
                        }
                        this.$Message.success(res.msg);
                    })
                }
                if (this.modal.modal2.state === 4) {
                    return true
                }
                let index = this.tabIndex
                let key = this.tabKey
                let param = {
                    tabIndex: index,
                    mId: this.menuList[key]['id']
                }
                if (index === 0) {
                    this.getEmergencyResponsePlanTableByParam(param)
                } else if (index === 1) {
                    this.getPreparednessDrillTableByParam(param)
                }
            },
            uploadSuccess (response, file, fileList) {
                this.$Message.success('文件上传成功!');
                // TODO 上传完成之后需要处理
                this.modal.modal2.fileInfo = response.id
                console.log(response, file, fileList)
            },
            uploadFailed (response, file, fileList) {
                console.log(response, file, fileList)
                // TODO 上传失败之后需要处理
                this.$refs.uploadEle.clearFiles()
                this.$Message.error('文件上传失败!');
            },
            init (data) {
                // 初始化函数 将页面需要的数据注入到变量里面帮助页面渲染
                this.modal.modal2.categoryList = data.tableData.categoryListL
                this.modal.modal2.fileTypeList = data.tableData.fileType
                data.menu.some((item, key, arr) => {
                    if (key === 0) {
                        this.btnArr.push({
                            state: true
                        })
                    } else {
                        this.btnArr.push({
                            state: false
                        })
                    }
                })
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
            clearForm () {
                this.formItem = {
                    category: undefined,
                    fileType: undefined,
                    condition: undefined,
                    pageSize: 10,
                    sortWay: undefined
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .hzyj-btn{
        width: 100%;
        line-height: 32px;
        margin-bottom: 10px;
        background-color: #3a3a3a;
        border: 1px solid #828282;
    }
    .hzjjya-list {
        width: 100%;
        font-size: 12px;
        div:nth-child(1) {
            width: 50%;
            text-align: left;
        }

        div:nth-child(2) {
            width: 23%;
        }

        div:nth-child(3) {
            margin-left: 10px;
        }
        .do-action-btn {
            z-index: 6;
            i {
                margin-right: 3px;
                display: inline-block;
            }
        }
    }
    .upload-notice {
        font-size: 12px;
        color: #9c9c9c;
        line-height: 14px;
        margin-top: 5px;
    }

    .item-jywz {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 8px;
        h3 {
            text-align: left;
        }
    }
</style>
