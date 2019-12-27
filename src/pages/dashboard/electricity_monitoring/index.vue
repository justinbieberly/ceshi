<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" to="real_time_monitor">实时监测</Button>
                    <Button slot="extra" size="small" to="electricity_history" style="margin-left: 10px;">历史数据</Button>
                    <Tree :data="data5" :render="renderContent" class="ydjc-tree tree-color-gray"></Tree>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img" :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <img :src="modelImg" alt="">
        </div>
        <Modal v-model="modalInfo.modalState" width="360">
            <p slot="header" style="color:#f60;text-align:center" v-if="modalInfo.title_del">
                <Icon type="ios-information-circle"></Icon>
                <span>确认删除？</span>
            </p>
            <p slot="header" style="color:#3095ff;text-align:center" v-if="modalInfo.title_edit">
                <Icon type="md-create" />
                <span>编辑实例</span>
            </p>
            <div style="text-align:center" v-if="modalInfo.title_edit">
                <Input v-model="monitorHelper.name" placeholder="监测名..."  clearable style="width: 300px" >
                    <span slot="prepend">实例名：</span>
                </Input>
                <Input v-model="monitorHelper.value" type="number" Number placeholder="监测总数..."  clearable style="width: 300px;margin-top: 10px;">
                    <span slot="prepend">实例数：</span>
                </Input>
            </div>
            <div style="text-align:center"  v-if="modalInfo.title_del">
                <p>删除之后，下游的所有子栏也会删除</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="removeAll"  v-if="modalInfo.title_del">删除</Button>
                <Button type="primary" size="large" long :loading="modal_loading" @click="updateData()"  v-if="modalInfo.title_edit">更新</Button>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getElectricityMonitoring } from '@api/account';
    import { sendElectricityMonitoring } from '@api/interaction';
    import Config from '@/config';
    export default {
        name: 'dashboard-temporary-storage',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '用电监测',
                modelImg: '/assets/images/u1176.svg',
                modalInfo: {
                    modalState: false,
                    title_edit: false,
                    title_del: false
                },
                modal_loading: false,
                monitorHelper: {
                    thisTemp: undefined,
                    delHelper: {},
                    name: '',
                    value: ''
                },
                data5: [],
                buttonProps: {
                    type: 'text',
                    size: 'small'
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
            console.log('before', that.data5);
            getElectricityMonitoring().then(async res => {
                that.data5 = that.dealTableData(res.tableData);
            }).catch(err => {
                console.log('err: ', err)
            });
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'left'
                            // width: '72%'
                        }
                    }, [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px',
                                lineHeight: '24px'
                            }
                        }),
                        h('span', {
                            class: ['ivu-tree-title']
                        }, data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '10px'
                        }
                    }, [
                        h('span', {
                            style: {
                                width: '25px',
                                display: 'inline-block',
                                textAlign: 'center',
                                fontSize: '16',
                                color: '#cc5151',
                                lineHeight: '20px'
                            }
                        }, data.total),
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
                                    this.modalInfo.modalState = true;
                                    this.modalInfo.title_del = false;
                                    this.modalInfo.title_edit = true;
                                    this.monitorHelper.thisTemp = data;
                                    this.monitorHelper.name = data.title;
                                    this.monitorHelper.value = data.total;
                                }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                let param = {
                    action: 'new node'
                }
                sendElectricityMonitoring(param).then(async res => {
                    if (res.state === true) {
                        const children = data.children || [];
                        children.push({
                            title: 'appended node',
                            id: res.id,
                            total: 0,
                            expand: true
                        });
                        this.$set(data, 'children', children);
                    }
                    this.$Message.success(res.msg);
                }).catch(err => {
                    console.log('err', err)
                })
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                let param = {
                    id: parent.children[index]['id']
                }
                sendElectricityMonitoring(param).then(async res => {
                    if (res.state === true) {
                        parent.children.splice(index, 1);
                    }
                    this.$Message.success(res.msg);
                }).catch(err => {
                    console.log('err', err)
                })
            },
            removeAll () {
                let id = this.monitorHelper.delHelper.id;
                let param = {
                    id: id,
                    isGroup: true
                }
                sendElectricityMonitoring(param).then(async res => {
                    if (res.state === true) {
                        this.modal_loading = true;
                        this.modal_loading = false;
                        this.modalInfo.modalState = false;
                        let delObject = this.data5.find(el => el.id === id);
                        let thisKey = this.data5.indexOf(delObject);
                        this.data5.splice(thisKey, 1);
                    }
                    this.$Message.success(res.msg);
                }).catch(err => {
                    console.log('err', err)
                })
            },
            updateData () {
                let param = {
                    id: this.monitorHelper.thisTemp.id,
                    title: this.monitorHelper.name,
                    total: this.monitorHelper.value
                }
                sendElectricityMonitoring(param).then(async res => {
                    if (res.state === true) {
                        this.modal_loading = true;
                        this.modal_loading = false;
                        this.modalInfo.modalState = false;
                        this.monitorHelper.thisTemp.title = this.monitorHelper.name;
                        this.monitorHelper.thisTemp.total = this.monitorHelper.value;
                    }
                    this.$Message.success(res.msg);
                }).catch(err => {
                    console.log('err', err)
                })
            },
            dealTableData (data) {
                let dataTemp = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = {};
                    Object.assign(temp, {
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    lineHeight: '24px'
                                }
                            }, [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'left'
                                        // width: '73%'
                                    }
                                }, [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px',
                                            lineHeight: '24px'
                                        }
                                    }),
                                    h('span', {
                                        class: ['ivu-tree-title']
                                    }, data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '10px'
                                    }
                                }, [
                                    h('span', {
                                        style: {
                                            width: '25px',
                                            display: 'inline-block',
                                            textAlign: 'center',
                                            fontSize: '16',
                                            color: '#cc5151',
                                            lineHeight: '24px'
                                        }
                                    }, data.total),
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-add-circle',
                                            type: 'text'
                                        }),
                                        style: {
                                            width: '20px',
                                            fontSize: '19px',
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
                                            fontSize: '19px',
                                            marginRight: '4px',
                                            lineHeight: '20px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modalInfo.modalState = true;
                                                this.modalInfo.title_del = true;
                                                this.modalInfo.title_edit = false;
                                                this.monitorHelper.delHelper = {
                                                    id: data.id
                                                }
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
                                            fontSize: '19px',
                                            lineHeight: '20px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modalInfo.modalState = true;
                                                this.modalInfo.title_del = false;
                                                this.modalInfo.title_edit = true;
                                                this.monitorHelper.thisTemp = data;
                                                this.monitorHelper.name = data.title;
                                                this.monitorHelper.value = data.total;
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
