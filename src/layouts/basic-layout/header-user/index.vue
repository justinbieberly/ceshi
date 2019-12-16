<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min">

        <Dropdown placement="bottom-end" :trigger="isMobile ? 'click' : 'hover'" class="i-layout-header-user" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
            <span class="i-layout-header-user-name" v-if="!isMobile & !isShowUser & !isTablet">
                {{ info.login_time }}
            </span>
            <span class="ivu-avatar ivu-avatar-circle ivu-avatar-image ivu-avatar-small">
                <Icon type="md-contact" size="25"/>
            </span>
            <DropdownMenu slot="list">
                <i-link to="/setting/user">
                    <DropdownItem>
                        <Icon type="ios-contact-outline" />
                        <span>{{ info.account }}</span>
                    </DropdownItem>
                </i-link>
                <i-link to="/setting/account">
                    <DropdownItem style="width: 180px">
                        <Icon type="ios-time-outline" />
                        <span>{{ info.login_time }}</span>
                    </DropdownItem>
                </i-link>
                <DropdownItem divided name="logout">
                    <Icon type="ios-log-out" />
                    <span>{{ $t('basicLayout.user.logOut') }}</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'iHeaderUser',
        data () {
            return {
                showMin: true
            }
        },
        computed: {
            ...mapState('admin/user', [
                'info'
            ]),
            ...mapState('admin/layout', [
                'isMobile',
                'isTablet',
                'isShowUser',
                'logoutConfirm'
            ])
        },
        mounted () {
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
