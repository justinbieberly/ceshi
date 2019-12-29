<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-img ivu-overflow-auto user-full-screen"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.condition" placeholder="文件名/序号/..." size="small"
                               style="width: 150px" />
                    </FormItem>
                    <FormItem label="所属类别">
                        <Select v-model="formItem.fileType" size="small"
                                class="ivu-nomal-select"
                                style="width:150px">
                            <Option value="10">类别一</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="文件格式">
                        <Select v-model="formItem.fileType" size="small"
                                class="ivu-nomal-select"
                                style="width:150px">
                            <Option value="10">文件格式</Option>
                        </Select>
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-ml-40 ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="doQuery" class="ivu-ml">重置查询</Button>
                    </FormItem>
                    <div class="ivu-inline-block ivu-no-lable" style="float: right">
                        <FormItem>
                            <Button size="small" class="ivu-mr-16" to="education_training">
                                <Icon type="ios-arrow-back" />
                                返回
                            </Button>
                            <Button size="small" @click="modalTable(1)" class="ivu-mr-16">添加</Button>
                            <Select v-model="formItem.showNum" size="small"
                                    placeholder="显示条数"
                                    @on-change="setPageSize" style="width: 110px;">
                                <Option value="20">20条/页</Option>
                                <Option value="50">50条/页</Option>
                                <Option value="100">100条/页</Option>
                            </Select>
                            <Select v-model="formItem.sortWay" size="small"
                                    placeholder="排序方式"
                                    style="width: 110px;margin-left: 10px;">
                                <Option value="errorInfo">报警内容</Option>
                            </Select>
                        </FormItem>
                    </div>
                </Form>
                <Table border :columns="table.columns" :data="table.data" :loading="table.loading" class="ivu-mt">
                    <template slot-scope="{ row, index }" slot="status">
                        <Switch size="large" :value="row.status?true:false" @on-change="tableSubmit(true)">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </Switch>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(4, row)">预览</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click.native="download(row.file_url)">下载</Button>
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
                    <FormItem label="文件名">
                        <Input v-model="modal.modal2.fileName" placeholder="输入文件名..." style="width: 250px"></Input>
                    </FormItem>
                    <FormItem label="所属类别">
                        <Select v-model="modal.modal2.category"
                                style="width:250px">
                            <Option value="30">所属类别</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="文件格式">
                        <Select v-model="modal.modal2.fileType"
                                style="width:250px">
                            <Option value="30">文件格式</Option>
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
                              v-else>
                        <img :src="modal.modal2.filePath" alt="" width="250px">
                    </FormItem>
                    <div style="clear: both"></div>
                </Form>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getOutsidersTableData } from '@api';
    import Config from '@/config';

    export default {
        name: 'dashboard-outsiders',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '外来人员',
                pageSize: 10,
                total: 12,
                loading: false,
                formItem: {
                    category: undefined,
                    fileType: undefined,
                    condition: undefined,
                    showNum: 1,
                    sortWay: undefined
                },
                table: {
                    columns: [
                        {
                            title: '序号',
                            width: '200px',
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
                            key: 'category'
                        },
                        {
                            title: '添加时间',
                            align: 'center',
                            key: 'createdAt'
                        },
                        {
                            title: '文件格式',
                            align: 'center',
                            key: 'fileType'
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
                            slot: 'action',
                            key: 'action'
                        }
                    ],
                    data: [],
                    loading: false
                },
                modal: {
                    modal2: {
                        fileTypeList: [], // 所有的文件类型
                        status: false,
                        state: 1,
                        title: '添加文件',
                        fileName: '',
                        category: '',
                        fileType: '',
                        filePath: '' // 返回id 还是路劲
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
            let that = this;
            getOutsidersTableData().then(async res => {
                that.table.data = res.tableData.data
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
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
            tableSubmit (state = false) {
                if (state === true) {
                    this.$Message.success('操作成功');
                } else if (this.modal.modal2.state === 1) {
                    console.log(this.formDynamic)
                    this.$Message.success('添加成功');
                } else if (this.modal.modal2.state === 2) {
                    this.$Message.success('编辑成功');
                } else if (this.modal.modal2.state === 3) {
                    this.$Message.success('删除成功');
                }
            },
            modalTable (state, temp) {
                // 右侧的表格 操作添加和编辑模态框
                if (state === 1) {
                    // 添加 操作
                    // 获取所有该写如的字段
                    this.setModalFormItem({}, false)
                    this.modal.modal2.title = '添加文件'
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
                this.modal.modal2.fileName = state ? temp.fileName : ''
                this.modal.modal2.category = state ? temp.category : ''
                this.modal.modal2.fileType = state ? temp.fileType : ''
                this.modal.modal2.filePath = state ? temp.resource : ''
            },
            download () {
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
