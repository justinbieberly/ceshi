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
                      v-for="(item, index) in menuList" :key="index" :name="index"
                      :class="headerMenuSelect[index]" >
                <Button type="primary">
                     {{ item.name }}
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
<!--                ivu-dropdown-item-selected-->
                <DropdownMenu slot="list">
                    <i-link v-for="(item, key) in item.children" :key="key" :name="key" :to="item.path" >
                        <DropdownItem :class="dropdownItem[index][key]">{{ item.name }}</DropdownItem>
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
                headerMenuSelect: [],
                dropdownItem: [],
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
                this.headerSelect()
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
                this.headerMenuSelect = []
                this.dropdownItem = []
                menu.some((value, index, arr) => {
                    this.dropdownItem.push([])
                    this.headerMenuSelect.push('not-select')
                    value['children'].some((item, key, arrs) => {
                        this.dropdownItem[index].push('')
                        if (item['path'] === this.$route.path) {
                            this.headerMenuSelect[index] = 'ivu-user-header-select'
                            this.dropdownItem[index][key] = 'ivu-dropdown-item-selected'
                        }
                    })
                })
            }
        }
    }
</script>
