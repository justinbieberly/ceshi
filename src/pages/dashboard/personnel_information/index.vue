<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }" ref="contentMenu">
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title='title' icon="ios-options"  shadow class="temporary_table_nopadding">
                    <Button slot="extra" size="small" @click.prevent="$router.go(-1)">
                        人员目录
                    </Button>
                    <div class="ivu-block">
                        <Tree :data="treeData" :render="renderContent" class="tree-color-black ryxxgl-tree"></Tree>
                    </div>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            <div class="ivu-block" v-if="!isTable">
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
            <div class="ivu-block" v-else>
                table
            </div>
        </div>
        <Modal v-model="modalInfo.status" width="360">
            <p slot="header" style="color:#f60;text-align:center" v-if="modalInfo.state === 2">
                <Icon type="ios-information-circle"></Icon>
                <span>{{ modalInfo.title}}</span>
            </p>
            <p slot="header" class="ivu-text-center" v-else>
                <span>{{ modalInfo.title}}</span>
            </p>
            <div style="text-align:center"  v-if="modalInfo.state === 2">
                <p>删除之后，下游的所有子栏也会删除</p>
                <p>是否继续删除？</p>
            </div>
            <div style="text-align:center" v-else>
                <div v-if="modalInfo.isMenu">
                    <Input v-model="formData.name" placeholder="组名..."  clearable style="width: 300px" >
                        <span slot="prepend">组名：</span>
                    </Input>
                </div>
                <div class="ivu-block" v-else>
                    <Input v-model="formData.name" placeholder="监用户名..."  clearable style="width: 300px" >
                        <span slot="prepend">用户名：</span>
                    </Input>
                    <Input v-model="formData.phone" type="number" Number placeholder="联系方式..."  clearable style="width: 300px;margin-top: 10px;">
                        <span slot="prepend">联系方式：</span>
                    </Input>
                </div>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modalInfo.modal_loading" @click="removeAll"  v-if="modalInfo.state === 2">删除</Button>
                <Button type="primary" size="large" long :loading="modalInfo.modal_loading" @click="updateData()"  v-else>提交</Button>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getPersonnelInformation } from '@api/account';
    const echarts = require('echarts');
    export default {
        name: 'dashboard-personnel-information',
        data () {
            return {
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
                treeData: [
                    {
                        id: '10065',
                        'title': '总经理',
                        expand: true,
                        'children': [
                            {
                                'title': '秘书',
                                'expand': true,
                                'children': [
                                    {
                                        'id': '1001',
                                        'title': '李秘书',
                                        'phone': '24102438102',
                                        'expand': true
                                    },
                                    {
                                        'id': '1002',
                                        'title': '邹秘书',
                                        'phone': '24102438102',
                                        'expand': true
                                    }
                                ]
                            },
                            {
                                'title': '助理',
                                'expand': true
                            }
                        ]
                    }
                ],
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
                isTable: false
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'isTablet',
                'isDesktop',
                'menuCollapse'
            ])
        },
        created () {
            let that = this
            getPersonnelInformation()
                .then(async res => {
                    that.treeData = that.dealTableData(res.tableData.data);
                    this.getEcharsData(res.tableData.data)
                    this.drawPieChart('chartLineBox', this.echarsData.numberEchars.legend, this.echarsData.numberEchars.data)
                    this.drawPieChart('chartLineBox1', this.echarsData.sexEchars.legend, this.echarsData.sexEchars.data)
                    this.drawBarChart('chartLineBox2', this.echarsData.ageEchars.xAxis, this.echarsData.ageEchars.data)
                    this.drawBarChart('chartLineBox3', this.echarsData.workEchars.xAxis, this.echarsData.ageEchars.data)
                }).catch(err => {
                    console.log('err: ', err)
                })
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
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
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
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
                        console.log(this.formData.name)
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
                console.log('numberEchars', this.echarsData.numberEchars)
                console.log('sexEchars', this.echarsData.sexEchars)
                console.log('ageEchars', this.echarsData.ageEchars)
                console.log('workEchars', this.echarsData.workEchars)
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
            drawPieChart (elementId, legend, data) {
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.setOption({
                    title: {
                        text: '人员数量',
                        subtext: '饼状图',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        // bottom: 'bottom',
                        data: legend
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
            drawBarChart (elementId, legend, data) {
                let myChart = echarts.init(document.getElementById(elementId));
                myChart.setOption({
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: legend
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid: {
                        // top: '0',
                        left: '3%',
                        right: '4%',
                        bottom: '0',
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    .ivu-block {
        .echart-box {
            height: 300px;
        }
        .echart-box:nth-child(1) {
            border-right: 1px solid #c9c1cb;
        }
        .echart-box:nth-child(2) {
            border-bottom: 1px solid #c9c1cb;
        }
        .echart-box:nth-child(3) {
            border-top: 1px solid #c9c1cb;
        }
        .echart-box:nth-child(4) {
            border-left: 1px solid #c9c1cb;
        }
    }
</style>
