<template>
    <div class="i-layout-header-trigger i-layout-header-trigger-min ">
        <Dropdown v-if="isMobile || isTablet || isCollapse" ref="menu">
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
                <Dropdown placement="right-start">
                    <DropdownItem>
                        系统设置
                        <Icon type="ios-arrow-forward"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list">
                        <DropdownItem>挂炉烤鸭</DropdownItem>
                        <DropdownItem>焖炉烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </DropdownMenu>
        </Dropdown>
        <div class="i-layout-header-trigger-no-height nav-btn-color" v-else>
            <Dropdown placement="bottom-start" style="margin-left: 10px" v-for="(item, key) in menuList" :key="key" :name="key" >
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
        created () {
            let that = this;
            getHeaderMenu()
                .then(async res => {
                    that.menuList = res.menu;
                }).catch(err => { console.log('err: ', err) })
        },
        methods: {
            handleOpenLog () {
                this.$router.push({
                    name: 'log'
                });
            }
        }
    }
</script>
