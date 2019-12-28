<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title='title' icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" @click="showTable" v-if="!isTable">
                        人员目录
                    </Button>
                    <Button slot="extra" size="small" v-if="isTable" style="margin-right: 8px;"
                            @click="exportData" >
                        <Icon type="md-arrow-round-down" />
                        导出
                    </Button>
                    <Button slot="extra" size="small" @click.prevent="back" v-if="isTable" >
                        <Icon type="ios-arrow-back" />
                        返回
                    </Button>
                    <div class="ivu-block">
                        <Tree :data="treeData" :render="renderContent" class="tree-color-gray ydjc-tree ryxxgl-tree"></Tree>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right ivu-overflow-auto" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block" :class="{ 'ivu-hidden':isTable }">
                <div class="ivu-block half-width ivu-float-left ivu-text-center echart-box">
                    <div id="chartLineBox" style="width: 80%;height: 300px;" class="ivu-inline-block"> </div>
                </div>
                <div class="ivu-block half-width ivu-float-left ivu-text-center echart-box">
                    <div id="chartLineBox1" style="width: 80%;height: 300px;" class="ivu-inline-block"> </div>
                </div>
                <div class="ivu-block half-width ivu-float-left ivu-text-center echart-box">
                    <div id="chartLineBox2" style="width: 100%;height: 300px;" class="ivu-inline-block"> </div>
                </div>
                <div class="ivu-block half-width ivu-float-left ivu-text-center echart-box">
                    <div id="chartLineBox3" style="width: 100%;height: 300px;" class="ivu-inline-block"> </div>
                </div>
            </div>
            <div class="ivu-block ivu-hidden" :class="{ 'ivu-show':isTable }">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-form-item" style="line-height: 32px;">
                        功能操作
                    </div>
                    <FormItem label="输入搜索">
                        <Input v-model="formItem.condition" placeholder="编号/名称/..." size="small" style="width: 120px" />
                    </FormItem>
                    <FormItem label="在职状态">
                        <Select v-model="formItem.status" size="small"
                                class="ivu-nomal-select"
                                style="width:100px">
                            <Option value="1" >在职</Option>
                            <Option value="0" >离职</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <Select v-model="formItem.sex" size="small"
                                class="ivu-nomal-select"
                                style="width:100px">
                            <Option value="1" >男</Option>
                            <Option value="2" >女</Option>
                        </Select>
                        <Button type="primary" size="small" @click="doQuery"
                                class="ivu-ml ivu-query-btn">查询结果</Button>
                        <Button size="small" @click="doQuery" class="ivu-ml">重置查询</Button>
                        <Button size="small" @click="modalTable(0)" class="ivu-ml">添加</Button>
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
                <Table border :columns="table.columns" :data="table.data" :loading="loading" class="ivu-mt" ref="table">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="modalTable(1, row)">预览</Button>
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
                :fullscreen="tableModal.state === 1"
                v-model="tableModal.status"
                :title="tableModal.title"
                @on-ok="tableSubmit">
            <div v-if="tableModal.state === 1" class="ivu-block">
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="14">
                        <div class="ivu-block">
                            <Row>
                                <Col class="ivu-p-8" :xs="24" :sm="8" :md="8" :lg="6" :offset="1" v-for="(item, key) in userDetail.info" :key="key">
                                    <Row>
                                        <Col :xs="12" :sm="12" :md="12" :lg="8">{{ item.name }}:</Col>
                                        <Col :xs="12" :sm="12" :md="12" :lg="16">{{ item.value }}</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="10">
                        <div class="ivu-block">
                            <Row>
                                <Col :xs="12" :sm="12" :md="12" :lg="8" class="user-info-img" v-for="(item, key) in userDetail.certificate" :key="key">
                                    <div>{{ item.name }}</div>
                                    <img :src="item.value" alt="">
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
            <div v-else-if="tableModal.state === 2 || this.tableModal.state === 0" class="ivu-p-8 ">
                <Form :model="formItem" :label-width="160" :label-colon="true">
                    <FormItem label="姓名">
                        <Input v-model="formItem.userName" placeholder="请输入用户名..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <Input v-model="formItem.phone" placeholder="请输入电话号码..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="部门">
                        <Input v-model="formItem.department" placeholder="请输入部门信息..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="岗位">
                        <Input v-model="formItem.jobs" placeholder="请输入岗位信息..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="身份证号码">
                        <Input v-model="formItem.IdCard" placeholder="请输入身份证号码..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="学 历">
                        <Input v-model="formItem.education" placeholder="请输入学历信息..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="身份证有效期">
                        <DatePicker type="date"
                                    placeholder="请输入身份证有效期..."
                                    class="form-item-width"
                                    v-model="formItem.IdCardLife">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="农行卡">
                        <Input v-model="formItem.bankCard" placeholder="请输入农行卡号..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="入职时间">
                        <DatePicker type="date"
                                    placeholder="请输入入职时间..."
                                    class="form-item-width"
                                    v-model="formItem.joinTime">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="家庭住址">
                        <Input v-model="formItem.address" placeholder="请输入家庭住址..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="能否胜任">
                        <Select v-model="formItem.competent" class="form-item-width" placeholder="请选择...">
                            <Option value="1" >能</Option>
                            <Option value="0" >否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="社保编号">
                        <Input v-model="formItem.socialSecurity" placeholder="请输入社保编号..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="驾 驶 证">
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">上传证件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="驾 驶 证号">
                        <Input v-model="formItem.driverLicense" placeholder="请输入驾驶证信息..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="驾驶证有效期">
                        <DatePicker type="date"
                                    placeholder="请输入驾驶证有效期..."
                                    class="form-item-width"
                                    v-model="formItem.driverLicenseLife">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="公积金账号">
                        <Input v-model="formItem.accumulationAccount" placeholder="请输入公积金账号..." class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="养老金申请时间">
                        <DatePicker type="date"
                                    placeholder="请输入养老金申请时间..."
                                    class="form-item-width"
                                    v-model="formItem.enInsuranceTime">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="从业资格证">
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">上传证件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="从业资格证号">
                        <Input v-model="formItem.userName" placeholder="请输入..."  class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="从业资格证有效期">
                        <DatePicker type="date"
                                    placeholder="请选择从业资格证有效期..."
                                    class="form-item-width"
                                    v-model="formItem.QualificationsLife">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="公积金缴纳时间">
                        <DatePicker type="date"
                                    placeholder="请选择公积金缴纳时间..."
                                    class="form-item-width"
                                    v-model="formItem.accumulationTime">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="合同起始日期">
                        <DatePicker type="date"
                                    placeholder="请选择合同起始日期..."
                                    class="form-item-width"
                                    v-model="formItem.contractBeginAt">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="合同终止日期">
                        <DatePicker type="date"
                                    placeholder="请选择合同终止日期..."
                                    class="form-item-width"
                                    v-model="formItem.contractEndAt">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="暂住证">
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">上传证件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="暂住证号">
                        <Input v-model="formItem.TemporaryPermit" placeholder="请输入..."  class="form-item-width"></Input>
                    </FormItem>
                    <FormItem label="暂住证有效期">
                        <DatePicker type="date"
                                    placeholder="请选择合同终止日期..."
                                    class="form-item-width"
                                    v-model="formItem.TemporaryPermitExpre">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="任职状态">
                        <Select v-model="formItem.status" class="form-item-width" placeholder="请选择...">
                            <Option value="1" >在职</Option>
                            <Option value="0" >离职</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否黑名单">
                        <Select v-model="formItem.blacklist" class="form-item-width" placeholder="请选择...">
                            <Option value="1" >是</Option>
                            <Option value="0" >否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="背景调查">
                        <Input v-model="formItem.referenceCheck" placeholder="请输入背景调查结果..."
                               type="textarea" :autosize="{minRows: 2,maxRows: 5}" class="form-item-width"></Input>
                    </FormItem>
                </Form>
            </div>
            <div v-else-if="tableModal.state === 3">
                <div style="text-align:center" >
                    <p>是否删除当前用户？</p>
                </div>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getPersonnelInformation, getPersonnelList, getUserInfoById } from '@api/account';
    import Config from '@/config';
    const echarts = require('echarts');
    export default {
        name: 'dashboard-personnel-information',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '人员信息管理',
                formData: {
                    name: undefined,
                    phone: undefined
                },
                modalInfo: {
                    monitorHelper: {
                        delHelper: {},
                        name: '',
                        value: ''
                    },
                    title: '新增人员信息',
                    status: false,
                    modal_loading: false,
                    isMenu: false,
                    state: 1
                },
                tableModal: {
                    loading: false,
                    status: false,
                    state: 2, // 1查看2 编辑 3 删除  0 添加
                    cache: undefined,
                    title: '添加用户'
                },
                treeData: [],
                heplerCount: {
                    total: 0,
                    departmentNum: 0,
                    sexNum: 0 // 统计男性
                },
                echarsData: {
                    numberEchars: {
                        legend: [],
                        data: []
                    },
                    sexEchars: {
                        legend: ['男性', '女性'],
                        data: []
                    },
                    ageEchars: {
                        xAxis: ['18-25岁', '26-30岁', '31-35岁', '36-40岁', '41-45岁', '46-60岁'],
                        data: [0, 0, 0, 0, 0]
                    },
                    workEchars: {
                        xAxis: ['0-1年', '1-3年', '3-5年', '5-10年', '10-15年', '15年以上'],
                        data: [0, 0, 0, 0, 0]
                    }
                },
                isTable: false,
                loading: false,
                pageSize: 10,
                total: 0,
                formItem: {
                    condition: '',
                    status: '',
                    sex: '',
                    showNum: '',
                    sortWay: ''
                },
                table: {
                    loading: true,
                    columns: [
                        {
                            title: '序号',
                            key: 'id',
                            width: '70px',
                            align: 'center'
                        },
                        {
                            title: '部门',
                            key: 'department',
                            width: '200px',
                            align: 'center'
                        },
                        {
                            title: '姓名',
                            key: 'userName',
                            width: '100px',
                            align: 'center'
                        },
                        {
                            title: '岗位',
                            key: 'jobs',
                            width: '200px',
                            align: 'center'
                        },
                        {
                            title: '电话',
                            width: '170px',
                            key: 'phone',
                            align: 'center'
                        },
                        {
                            title: '学历',
                            width: '100px',
                            key: 'education',
                            align: 'center'
                        },
                        {
                            title: '婚姻状况',
                            width: '70px',
                            key: 'marital',
                            align: 'center'
                        },
                        {
                            title: '入职时间',
                            width: '140px',
                            key: 'joinTime',
                            align: 'center'
                        },
                        {
                            title: '申请养老时间',
                            width: '140px',
                            key: 'enInsuranceTime',
                            align: 'center'
                        },
                        {
                            title: '社保编号',
                            width: '200px',
                            key: 'socialSecurity',
                            align: 'center'
                        },
                        {
                            title: '公积金账号',
                            width: '200px',
                            key: 'accumulationAccount',
                            align: 'center'
                        },
                        {
                            title: '公积金缴纳时间',
                            width: '140px',
                            key: 'accumulationTime',
                            align: 'center'
                        },
                        {
                            title: '合同起始日期',
                            width: '140px',
                            key: 'contractBeginAt',
                            align: 'center'
                        },
                        {
                            title: '合同终止日期',
                            width: '140px',
                            key: 'contractEndAt',
                            align: 'center'
                        },
                        {
                            title: '身份证号码',
                            width: '200px',
                            key: 'IdCard',
                            align: 'center'
                        },
                        {
                            title: '身份证有效期',
                            width: '140px',
                            key: 'IdCardLife',
                            align: 'center'
                        },
                        {
                            title: '家庭住址',
                            width: '200px',
                            key: 'address',
                            align: 'center'
                        },
                        {
                            title: '驾驶证',
                            width: '150px',
                            key: 'driverLicense',
                            align: 'center'
                        },
                        {
                            title: '驾驶证有效期',
                            width: '104px',
                            key: 'driverLicenseLife',
                            align: 'center'
                        },
                        {
                            title: '从业资格有效期',
                            width: '140px',
                            key: 'QualificationsLife',
                            align: 'center'
                        },
                        {
                            title: '暂住证',
                            width: '150px',
                            key: 'TemporaryPermit',
                            align: 'center'
                        },
                        {
                            title: '农行卡号',
                            width: '200px',
                            key: 'bankCard',
                            align: 'center'
                        },
                        {
                            title: '是否胜任',
                            width: '70px',
                            key: 'competent',
                            align: 'center',
                            render: (h, params) => {
                                let status = params.row.competent
                                if (status === 1) {
                                    return h('span', '是')
                                }
                                return h('span', '否')
                            }
                        },
                        {
                            title: '背景调查',
                            width: '200px',
                            key: 'referenceCheck',
                            align: 'center'
                        },
                        {
                            title: '任职状态',
                            width: '70px',
                            key: 'status',
                            align: 'center',
                            render: (h, params) => {
                                let status = params.row.competent
                                if (status === 1) {
                                    return h('span', '在职')
                                }
                                return h('span', '离职')
                            }
                        },
                        {
                            title: '黑名单',
                            width: '80px',
                            key: 'blacklist',
                            align: 'center',
                            render: (h, params) => {
                                let status = params.row.competent
                                if (status === 1) {
                                    return h('span', '是')
                                }
                                return h('span', '否')
                            }
                        },
                        {
                            title: '操作',
                            width: '200px',
                            key: 'action',
                            slot: 'action',
                            align: 'center',
                            fixed: 'right'
                        }
                    ],
                    data: []
                },
                userDetail: {
                    info: [],
                    certificate: []
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
            let that = this
            getPersonnelInformation()
                .then(async res => {
                    that.treeData = that.dealTableData(res.tableData.data);
                    this.getEcharsData(res.tableData.data)
                    this.drawPieChart('chartLineBox', this.echarsData.numberEchars.legend, this.echarsData.numberEchars.data, 0)
                    this.drawPieChart('chartLineBox1', this.echarsData.sexEchars.legend, this.echarsData.sexEchars.data, 1)
                    this.drawBarChart('chartLineBox2', this.echarsData.ageEchars.xAxis, this.echarsData.ageEchars.data, 0)
                    this.drawBarChart('chartLineBox3', this.echarsData.workEchars.xAxis, this.echarsData.ageEchars.data, 1)
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
            renderContent (h, { root, node, data }) {
                return h('span', {
                    class: ['ivu-tree-title'],
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'left'
                            // width: '75%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-person'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h('span', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    marginLeft: '20px'
                                }
                            }, data.phone)
                        ])
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '18px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add-circle',
                                type: 'text'
                            }),
                            style: {
                                width: '20px',
                                fontSize: '20px',
                                marginRight: '4px',
                                lineHeight: '20px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-close-circle',
                                type: 'text'
                            }),
                            style: {
                                width: '20px',
                                fontSize: '20px',
                                marginRight: '4px',
                                lineHeight: '20px'
                            },
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'md-create',
                                type: 'text'
                            }),
                            style: {
                                width: '20px',
                                fontSize: '20px',
                                lineHeight: '20px'
                            },
                            on: {
                                click: () => {
                                    this.modalInfo.status = true;
                                    this.modalInfo.state = 3;
                                    if (data.phone === undefined) {
                                        this.modalInfo.isMenu = true
                                        this.modalInfo.title = '编辑组信息';
                                        this.formData.name = data.title;
                                    } else {
                                        this.modalInfo.title = '编辑人员信息';
                                        this.formData.name = data.title;
                                        this.formData.phone = data.phone;
                                        this.modalInfo.isMenu = false
                                    }
                                    this.modalInfo.monitorHelper.thisTemp = data;
                                    this.modalInfo.monitorHelper.name = data.title;
                                    this.modalInfo.monitorHelper.value = data.phone;
                                }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'user name',
                    phone: '000-0000-0000',
                    expand: true
                });
                this.$set(data, 'children', children);
                // TODO 新增一个节点
                this.$Message.success('添加成功!');
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
                // TODO 删除一个节点
                this.$Message.success('删除成功！');
            },
            removeAll () {
                this.modalInfo.status = true;
                setTimeout(() => {
                    this.modalInfo.modal_loading = false;
                    this.modalInfo.status = false;
                    let id = this.modalInfo.monitorHelper.delHelper.id;
                    let delObject = this.treeData.find(el => el.id === id);
                    let thisKey = this.treeData.indexOf(delObject);
                    this.treeData.splice(thisKey, 1);
                    // TODO 删除一个父级节点
                    this.$Message.success('删除成功！');
                }, 500);
            },
            dealTableData (data) {
                // 植入表头的操作方法
                let dataTemp = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = {};
                    Object.assign(temp, {
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                class: ['ivu-tree-title'],
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'left'
                                        // width: '75%'
                                    }
                                }, [
                                    h('span', [
                                        h('Icon', {
                                            props: {
                                                type: 'ios-person'
                                            },
                                            style: {
                                                marginRight: '8px'
                                            }
                                        }),
                                        h('span', data.title)
                                    ]),
                                    h('span', [
                                        h('span', {
                                            style: {
                                                display: 'inline-block',
                                                marginLeft: '20px'
                                            }
                                        }, data.phone)
                                    ])
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '18px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-add-circle',
                                            type: 'text'
                                        }),
                                        style: {
                                            width: '20px',
                                            fontSize: '20px',
                                            marginRight: '4px',
                                            lineHeight: '20px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    }),
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-close-circle',
                                            type: 'text'
                                        }),
                                        style: {
                                            width: '20px',
                                            fontSize: '20px',
                                            marginRight: '4px',
                                            lineHeight: '20px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modalInfo.status = true
                                                this.modalInfo.state = 2
                                                this.modalInfo.title = '是否删除?'
                                                this.modalInfo.monitorHelper.delHelper = data;
                                            }
                                        }
                                    }),
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'md-create',
                                            type: 'text'
                                        }),
                                        style: {
                                            width: '20px',
                                            fontSize: '20px',
                                            lineHeight: '20px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modalInfo.status = true;
                                                this.modalInfo.state = 3;
                                                this.modalInfo.title = '编辑组信息';
                                                this.formData.name = data.name;
                                                this.formData.phone = data.phone;
                                                this.modalInfo.isMenu = true
                                                this.formData.name = data.title
                                                this.modalInfo.monitorHelper.thisTemp = data;
                                            }
                                        }
                                    })
                                ])
                            ]);
                        }
                    }, data[i]);
                    dataTemp.push(temp)
                }
                return dataTemp;
            },
            updateData () {
                this.modalInfo.status = true;
                setTimeout(() => {
                    this.modalInfo.modal_loading = false;
                    this.modalInfo.status = false;
                    if (this.modalInfo.isMenu) {
                        this.modalInfo.monitorHelper.thisTemp.title = this.formData.name;
                    } else {
                        this.modalInfo.monitorHelper.thisTemp.title = this.formData.name;
                        this.modalInfo.monitorHelper.thisTemp.phone = this.formData.phone;
                    }
                    // TODO 更新一个父级节点
                    this.$Message.success('更新成功！');
                }, 500);
            },
            recursiveChildren (data) {
                if (data['children'] !== undefined) {
                    let children = data['children']
                    children.some((value, key, arr) => {
                        let res = this.recursiveChildren(value)
                        if (res !== undefined) {
                            if (parseInt(res['sex']) === 1) {
                                this.heplerCount.sexNum++
                            }
                            this.heplerCount.departmentNum++
                            this.heplerCount.total++
                            this.identifyAge(res)
                            this.identifyWorkTime(res)
                        }
                    })
                } else {
                    return data
                }
            },
            getEcharsData (data) {
                // 筛选出图标数据
                let department = [] // 部门的echars图
                let departmentData = []
                let sexData = {
                    male: 0,
                    female: 0
                }
                data.some((item, key, arr) => {
                    if (item.title !== '总经理') {
                        department.push(item.title)
                        // 统计人数
                        this.heplerCount.departmentNum = 0
                        this.heplerCount.sexNum = 0
                        this.recursiveChildren(item)
                        departmentData.push({
                            name: item.title,
                            value: this.heplerCount.departmentNum
                        })
                        sexData.male += this.heplerCount.sexNum
                    }
                })
                this.echarsData.numberEchars.legend = department
                this.echarsData.numberEchars.data = departmentData
                sexData.female = this.heplerCount.total - sexData.male
                this.echarsData.sexEchars.data = [
                    {
                        name: '男性',
                        value: sexData.male
                    },
                    {
                        name: '女性',
                        value: sexData.female
                    }
                ]
            },
            identifyAge (data) {
                // 辨别年龄
                let key = 0
                if (data.age >= 18 && data.age <= 25) {
                    key = 0
                } else if (data.age >= 26 && data.age <= 30) {
                    key = 1
                } else if (data.age >= 31 && data.age <= 35) {
                    key = 2
                } else if (data.age >= 36 && data.age <= 40) {
                    key = 3
                } else if (data.age >= 41 && data.age <= 45) {
                    key = 4
                } else if (data.age >= 45 && data.age <= 60) {
                    key = 5
                } else {
                    console.log('用户信息:', data)
                    console.log('当前年龄不能匹配', data.age)
                }
                this.echarsData.ageEchars.data[key] += 1
            },
            identifyWorkTime (data) {
                // 辨别在职时长
                let key = 0
                if (data.workTime >= 0 && data.workTime <= 1) {
                    key = 0
                } else if (data.workTime > 1 && data.workTime <= 3) {
                    key = 1
                } else if (data.workTime > 3 && data.workTime <= 5) {
                    key = 2
                } else if (data.workTime > 5 && data.workTime <= 10) {
                    key = 3
                } else if (data.workTime > 10 && data.workTime <= 15) {
                    key = 4
                } else if (data.workTime > 15) {
                    key = 5
                } else {
                    console.log('用户信息:', data)
                    console.log('当前工作时长不能匹配', data.workTime)
                }
                this.echarsData.workEchars.data[key] += 1
            },
            drawPieChart (elementId, legend, data, state) {
                let title = '人员数量'
                if (state === 1) {
                    title = '男女比例'
                }
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.setOption({
                    title: {
                        text: title,
                        subtext: '饼状图',
                        x: 'center',
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        // bottom: 'bottom',
                        data: legend,
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            center: ['53%', '50%'],
                            data: data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })
            },
            drawBarChart (elementId, legend, data, state) {
                let title = '年龄分布'
                if (state === 1) {
                    title = '在职时长'
                }
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.setOption({
                    title: {
                        text: title,
                        x: 'center',
                        textStyle: {
                            color: '#cfcfcf'
                        }
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: legend,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        lineStyle: {
                            color: '#cfcfcf' // 更改坐标轴颜色
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#cfcfcf'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cfcfcf' // 更改坐标轴颜色
                            }
                        }
                    },
                    grid: {
                        top: '15%',
                        left: '3%',
                        right: '4%',
                        bottom: '0%',
                        containLabel: true
                    },
                    series: [
                        {
                            name: '数据量',
                            type: 'bar',
                            barWidth: '45%',
                            data: data
                        }
                    ]
                })
            },
            tableSubmit () {
                if (this.tableModal.state === 1) {
                } else if (this.tableModal.state === 2) {
                    this.$Message.success('编辑成功');
                } else if (this.tableModal.state === 3) {
                    this.$Message.success('删除成功');
                } else if (this.tableModal.state === 0) {
                    this.$Message.success('添加成功');
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
            },
            showTable () {
                // 显示人员名录的表格
                this.table.loading = true
                this.isTable = true
                getPersonnelList().then(async res => {
                    this.table.data = res.tableData.data
                })
            },
            modalTable (state, temp) {
                let that = this
                // 操作用户信息
                if (state === 1) {
                    // 预览
                    this.tableModal.title = '用户信息预览'
                    this.tableModal.state = 1
                    getUserInfoById().then(async res => {
                        that.userDetail.info = res.baseInfo
                        console.log('res.baseInfo', res.baseInfo)
                        that.userDetail.certificate = res.certificate
                    })
                } else if (state === 2) {
                    // 编辑信息
                    this.tableModal.title = '编辑用户'
                    this.tableModal.state = 2
                } else if (state === 3) {
                    this.tableModal.title = '删除当前行数据?'
                    this.tableModal.state = 3
                } else {
                    this.tableModal.title = '添加用户'
                    this.tableModal.state = 0
                }
                this.tableModal.status = true
            },
            back () {
                this.isTable = false
            },
            exportData () {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    original: false,
                    columns: this.table.columns.filter((col, index) => index < 26),
                    data: this.table.data
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .form-item-width {
        width: 200px;
    }
    .ivu-block {
        .echart-box {
            height: 300px;
        }
        .echart-box:nth-child(1) {
            border-right: 1px solid #7e7e7e;
        }
        .echart-box:nth-child(2) {
            border-bottom: 1px solid #7e7e7e;
        }
        .echart-box:nth-child(3) {
            border-top: 1px solid #7e7e7e;
        }
        .echart-box:nth-child(4) {
            border-left: 1px solid #7e7e7e;
        }
    }
    .user-info-img {
        div {
            line-height: 2;
            font-size: 16px;
            font-weight: 600;
        }
        img {
            width: 55%;
            height: 55%;
        }
    }
</style>
