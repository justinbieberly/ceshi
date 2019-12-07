<template>
    <div class="i-layout-user-info" v-if="isMobile || isCollapseU">
        <Dropdown @on-click="handleClick">
            <div class="mobile-user-info">
                <Icon type="md-contact" size="40" color="#2D8cF0"/>
            </div>
            <DropdownMenu slot="list">
                <i-link to="/setting/user">
                    <DropdownItem>{{ info.login_time }}</DropdownItem>
                </i-link>
                <i-link to="/setting/user">
                    <DropdownItem>{{ info.account }}</DropdownItem>
                </i-link>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
    <div class="i-layout-user-info" v-else>
        <i-link to="/home">
            <Icon type="ios-home-outline"  size="35" class="jump-home"/>
        </i-link>
        <i-link to="/setting/user">
            <div class="user-info">
                <Avatar size="small" :src="info.avatar" v-if="info.avatar" class="user-avatar"/>
                <div class="account-info">
                    <span class="user-info-login-time" v-if="info.login_time">{{ info.login_time }}</span>
                    <span v-if="info.account"> {{ info.account }}</span>
                </div>
            </div>
        </i-link>
        <a href="javascript:void(0)">
            <Icon type="md-power" size="34"  @click.native='handleClick("logout")'/>
        </a>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        name: 'iHeaderUser',
        data () {
            return {
                isCollapseU: false,
                screenWidth: document.body.clientWidth // 屏幕宽度
            }
        },
        computed: {
            ...mapState('admin/user', [
                'info'
            ]),
            ...mapState('admin/layout', [
                'isMobile',
                'logoutConfirm'
            ])
        },
        created () {
            if (this.screenWidth < 1366) {
                this.isCollapseU = true
            }
        },
        mounted () {
            // 监听窗口大小
            window.onresize = () => {
                if (this.screenWidth < 1366) {
                    this.isCollapseU = true
                } else {
                    this.isCollapseU = false
                }
                return (() => {
                    this.screenWidth = document.body.clientWidth;
                })()
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'logout'
            ]),
            handleClick (name) {
                if (name === 'logout') {
                    this.logout({
                        confirm: this.logoutConfirm,
                        vm: this
                    });
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    .i-layout-user-info {
        height: 56px;
        float: right;
        margin-right: 12px;
        color: #efefef;
        a{
            color: #efefef;
        }
        i {
            float: left;
            line-height: 56px;
        }

        .jump-home {
            margin-right: 8px;
        }

        .user-info {
            width: 175px;
            overflow: hidden;
            float: left;
            line-height: 18px;
            .user-avatar {
                width: 30px;
                height: 30px;
                margin-top: 13px;
            }
            .user-avatar {
                display: inline-block;
                float: left;
            }
            .account-info {
                display: inline-block;
                float: right;
                margin-right: 2px;
            }
            .user-info-login-time {
                margin-top: 10px;
            }

            span {
                display: block;
            }
        }
        .mobile-user-info{
            display: inline-block;
            height: 32px;
            padding: 0 30px;
            margin-right: 10px;
        }
    }
</style>
