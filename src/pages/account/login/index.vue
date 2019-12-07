<template>
    <div class="page-account">
        <div v-if="showI18n" class="page-account-header">
            <i-header-i18n />
        </div>
        <div class="full-screen">
            <div class="page-account-container">
                <div class="page-account-top">
                    <div class="page-account-top-logo">
                        张家港龙亿智慧仓库<br>
                        安全管理系统
                    </div>
                </div>
                <Login @on-submit="handleSubmit">
                    <UserName name="username" value="admin" />
                    <Password name="password" value="admin" enter-to-submit />
                    <div class="page-account-auto-login">
                        <Checkbox v-model="autoLogin" size="large">{{ $t('page.login.remember') }}</Checkbox>
                    </div>
                    <Submit>{{ $t('page.login.submit') }}</Submit>
                </Login>
            </div>
        </div>
        <i-copyright />
    </div>
</template>
<script>
    import iCopyright from '@/components/copyright';
    import { mapActions } from 'vuex';
    import mixins from '../mixins';

    export default {
        mixins: [ mixins ],
        components: { iCopyright },
        data () {
            return {
                autoLogin: true
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'login'
            ]),
            /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
            handleSubmit (valid, values) {
                if (valid) {
                    const { username, password } = values;
                    this.login({
                        username,
                        password
                    })
                        .then(() => {
                            // 重定向对象不存在则返回顶层路径
                            this.$router.replace(this.$route.query.redirect || '/');
                    });
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .full-screen {
        flex: 1;
    }
    .page-account-container{
        width: 420px;
        height: 400px;
        border-radius: 14px;
        border: 1px solid #bebebe;
        margin-top: 100px;
        padding: 0 30px;
        box-shadow: 10px 10px 5px #c2c2c2;
        .page-account-top-logo{
            font-size: 30px;
            line-height: 1.2;
        }
    }
</style>
