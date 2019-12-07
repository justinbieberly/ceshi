<template>
    <footer class="ivu-global-footer i-copyright">
        <div class="ivu-global-footer-copyright">
            <div>
                Copyright © <router-link to="www.longyi.com">www.longyi.com</router-link> , All Rights Reserved.
            </div>
            <div>
                {{ contact }}
            </div>
        </div>
    </footer>
</template>
<script>
    export default {
        name: 'i-copyright',
        data () {
            return {
                copyright: '',
                contact: 'Email : 1234567@qq.com   QQ: 1234567'
            }
        }
    }
</script>
<style lang="less">
    .i-copyright {
        flex: 0 0 auto;
    }
</style>
