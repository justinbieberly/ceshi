<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Tabs type="card" class="ivu-mt"  @on-click="changeTabs" >
                        <TabPane label="培训档案">
                            <div class="ivu-block">
                                <div class="ivu-block">
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
                            </div>
                        </TabPane>
                        <TabPane label="从业人员">
                        </TabPane>
                        <TabPane label="外来人员">
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
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getTrainingRecordsMenu, getTrainingTableByParam } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-console',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '教育培训',
                menuList: [],
                btnArr: [],
                pageSize: 5,
                total: 12,
                loading: false,
                formItem: {
                    category: undefined,
                    fileType: undefined,
                    dateRange: undefined,
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
                            title: '操作',
                            align: 'center',
                            key: 'action'
                        }
                    ],
                    data: [],
                    loading: false
                },
                modal: {
                    modal1: {
                        status: false,
                        id: undefined,
                        loading: false,
                        title: '是否删除当前记录?'
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
            getTrainingRecordsMenu().then(async res => {
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
                        // this.getItemDataById(item.id)
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
            getTableDataById (id = 0) {
                let param = {
                    id: id
                }
                getTrainingTableByParam(param).then(async res => {
                    this.setFormData(res)
                })
            },
            changeTabs (index) {
                // 点击tab分页 如果只在一个页面 页面数据会混淆
                // let that = this;
                if (index === 0) {
                } else if (index === 1) {
                } else if (index === 2) {
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
</style>
