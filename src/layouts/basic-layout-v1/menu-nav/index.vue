<template>
    <div class="i-layout-menu-head i-layout-header-menu">
        <Dropdown v-if="isMobile || isTablet || isCollapse" ref="menu">
            <a href="javascript:void(0)">
                <Icon type="md-apps" size="28"/>
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
        <div class="i-layout-header-trigger-no-height" v-else>
            <Dropdown placement="bottom-start">
                <Button type="primary">
                    重大危险源监测预警
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start">
                <Button type="primary">
                    重大危险源监测预警
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start">
                <Button type="primary">
                    重大危险源监测预警
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start">
                <Button type="primary">
                    重大危险源监测预警
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start">
                <Button type="primary">
                    系统设置
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                    <DropdownItem>货物存储</DropdownItem>
                    <DropdownItem>临时存储</DropdownItem>
                    <DropdownItem>分布状况</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'iMenuNav',
        data () {
            return {
                isCollapse: false,
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
            if (this.screenWidth < 1220) {
                this.isCollapse = true
            }
        },
        mounted () {
        }

    }
</script>

<style lang="scss" scoped>
    .i-layout-header-menu {
        button {
            height: 50px;
            background: #1abc9c;
        }
    }
</style>
