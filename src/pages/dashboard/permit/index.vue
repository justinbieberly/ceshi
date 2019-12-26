<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-img ivu-overflow-auto user-full-screen"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="ivu-block ">
                <Form :model="formItem" :label-width="70"  inline :label-colon="true"
                      class="real-time-form ivu-inline-block user-full-screen">
                    <div class="ivu-block">
                        <div class="ivu-form-item" style="line-height: 32px;">
                            功能操作
                        </div>
                        <div class="ivu-inline-block ivu-form-item ivu-no-lable" style="float: right">
                            <FormItem>
                                <Button size="small" @click="back" class="ivu-ml ivu-mr-16">
                                    <Icon type="ios-arrow-back" />
                                    返回
                                </Button>
                            </FormItem>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                    <div class="ivu-block">
                        <div class="ivu-block permit-ctrl">
                            <Row>
                                <Col :xs="24" :sm="24" :md="12" :lg="item.list.length>6?24:12" v-for="(item, index) in checkAllGroupList" :key="index">
                                    <div class="permit-content">
                                        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                                            <Checkbox
                                                    :indeterminate="indeterminateList[index]"
                                                    :value="checkAllList[index]"
                                                    @click.prevent.native="handleCheckAll(index)">{{ item.title }}</Checkbox>
                                        </div>
                                        <CheckboxGroup :value="checkGroupObj[index]" @on-change="checkAllGroupChange">
                                            <Checkbox :label="value" v-for="(value, key) in item.list" :key="key"></Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    // import { get3dModelInfo } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-permit',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                formItem: {},
                indeterminateList: [
                    true,
                    false,
                    true,
                    true,
                    false,
                    true
                ],
                checkAllList: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ],
                checkAllGroupList: [
                    {
                        title: '重大危险源监测预警',
                        list: ['货物存储', '临时存储', '分布状况', '环境监测', '用电监测', '空间监测']
                    },
                    {
                        title: '安全风险分区',
                        list: ['风险分区', '风险预警', '特种设备管理', '控制室值班', '应急管理']
                    },
                    {
                        title: '人员在岗在位管理系统',
                        list: ['人员信息管理', '实名进出管理', '访客登记管理', '车辆登记检查']
                    },
                    {
                        title: '系统设置',
                        list: ['数据统计', '预留页面', '操作日志', '用户管理', '权限分配', '删除和修改']
                    },
                    {
                        title: '企业生产全流程管理',
                        list: ['制度管理', '证书管理', '职业健康台账', '安全设备台账', ' 日常巡查', '隐患处置', '装卸作业', '事故管理', '教育培训']
                    },
                    {
                        title: 'App权限',
                        list: ['巡查任务', '值班打卡', '隐患登记', '登记处置', ' 人员登记', '车辆登记', '事故登记', '特种作业']
                    }
                ],
                checkGroupObj: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: []
                },
                title: '权限操作'
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
            // let that = this;
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            back () {
            },
            handleCheckAll (index) {
                if (this.indeterminateList[index]) {
                    this.checkAllList[index] = false;
                } else {
                    this.checkAllList[index] = !this.checkAllList[index];
                }
                this.indeterminateList[index] = false;
                if (this.checkAllList[index]) {
                    this.checkGroupObj[index] = this.checkAllGroupList[index]['list'];
                } else {
                    this.checkGroupObj[index] = [];
                }
            },
            checkAllGroupChange (data) {
                // let dataLength = this.checkAllGroupList[1]['list'].length
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .permit-content {
        padding: 10px 10px;
        margin: 0 20px 40px 20px;
        background-color: #3A3A3A;
        color: #cfcfcf;
    }
</style>
