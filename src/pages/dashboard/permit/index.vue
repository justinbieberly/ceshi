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
                                        <CheckboxGroup :value="checkGroupObj[index]" @on-change="checkAllGroupChange($event, index)">
                                            <Checkbox :label="value.title" v-for="(value, key) in item.list" :key="key"></Checkbox>
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
    import { getPermitList, getPermitById } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-permit',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                formItem: {},
                indeterminateList: {
                    0: false,
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false
                },
                checkAllList: {
                    0: false,
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false
                },
                checkAllGroupList: [],
                checkGroupObj: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: []
                },
                backUrl: '',
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
            let that = this;
            let params = this.$route.params;
            if (Object.keys(params).length === 0) {
                this.$Message.error('非法访问,请传入相应的参数!')
                return
            }
            this.backUrl = params.backUrl
            getPermitList().then(async res => {
                that.checkAllGroupList = res
                getPermitById(params).then(async response => {
                    response.some((value, index, arr) => {
                        let temp = []
                        value['list'].some((item, key, arr) => {
                            temp.push(item.title)
                        })
                        this.checkGroupObj[index] = temp
                    })
                })
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
        },
        methods: {
            back () {
                this.$router.replace(this.backUrl)
            },
            handleCheckAll (index) {
                if (this.indeterminateList[index]) {
                    this.checkAllList[index] = false;
                } else {
                    this.checkAllList[index] = !this.checkAllList[index];
                }
                this.indeterminateList[index] = false;
                if (this.checkAllList[index]) {
                    let list = this.checkAllGroupList[index]['list']
                    let temp = []
                    list.some((value, index, arr) => {
                        temp.push(value.title)
                    })
                    this.checkGroupObj[index] = temp;
                } else {
                    this.checkGroupObj[index] = [];
                }
            },
            checkAllGroupChange (data, index) {
                let dataLength = this.checkAllGroupList[index]['list'].length
                if (data.length === dataLength) {
                    this.indeterminateList[index] = false;
                    this.checkAllList[index] = true;
                } else if (data.length > 0) {
                    this.indeterminateList[index] = true;
                    this.checkAllList[index] = false;
                } else {
                    this.indeterminateList[index] = false;
                    this.checkAllList[index] = false;
                }
            },
            updatePermit () {
                // todo api change user permit
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
