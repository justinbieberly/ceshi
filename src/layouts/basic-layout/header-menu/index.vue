<template>
    <div class="i-layout-header-trigger i-layout-header-trigger-min ">
        <div class="i-layout-header-trigger-no-height nav-btn-color">
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
