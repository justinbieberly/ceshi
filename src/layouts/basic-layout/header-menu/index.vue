<template>
    <div class="i-layout-header-trigger i-layout-header-trigger-min user-header-recover">
        <Dropdown v-if="isMobile" ref="menu">
            <a href="javascript:void(0)">
                <Icon type="md-apps" size="23"/>
            </a>
            <DropdownMenu slot="list">
                <Dropdown placement="right-start">
                    <DropdownItem>
                        重大危险源监测预警
                        <Icon type="ios-arrow-forward"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list">
                        <DropdownItem>挂炉烤鸭</DropdownItem>
                        <DropdownItem>焖炉烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </DropdownMenu>
        </Dropdown>
        <div class="i-layout-header-trigger-no-height nav-btn-color ivu-header" v-else>
            <Dropdown placement="bottom-start" style="margin-left: 10px"
                      v-for="(item, key) in menuList" :key="key" :name="key"
                      :class="{ 'iuv-user-header-select': menuList[key]['isSelect'] }" >
                <Button type="primary">
                     {{ item.name }}
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <i-link v-for="(item, key) in item.children" :key="key" :name="key" :to="item.path" >
                        <DropdownItem>{{ item.name }}</DropdownItem>
                    </i-link>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { getHeaderMenu } from '@api/account';

    export default {
        name: 'iHeaderMenu',
        data () {
            return {
                isSelect: false,
                isCollapse: false,
                menuList: [],
                screenWidth: document.body.clientWidth // 屏幕宽度
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'isDesktop',
                'isTablet'
            ])
        },
        watch: {
            $route (to, from) {
                console.log('执行了')
                this.headerSelect()
                console.log(this.menuList)
            }
        },
        created () {
            let that = this;
            getHeaderMenu()
                .then(async res => {
                    that.menuList = res.menu;
                    that.headerSelect()
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
            handleOpenLog () {
                this.$router.push({
                    name: 'log'
                });
            },
            headerSelect () {
                let menu = this.menuList
                menu.some((value, index, arr) => {
                    Object.assign(this.menuList[index], {
                        isSelect: false
                    })
                    value['children'].some((item, key, arrs) => {
                        if (item['path'] === this.$route.path) {
                            Object.assign(this.menuList[index], {
                                isSelect: true
                            })
                        }
                    })
                })
            }
        }
    }
</script>
