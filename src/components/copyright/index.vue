<template>
    <footer class="ivu-global-footer i-copyright">
        <div class="ivu-global-footer-copyright">
            <div>
               {{ copyright }}
            </div>
            <div>
                {{ contact }}
            </div>
        </div>
    </footer>
</template>
<script>
    import Setting from '@/setting';

    export default {
        name: 'i-copyright',
        data () {
            return {
                copyright: '',
                contact: ''
            }
        },
        created () {
            this.contact = Setting.copyright.contact;
            this.copyright = Setting.copyright.copyright;
        }
    }
</script>
<style lang="less">
    .i-copyright {
        flex: 0 0 auto;
    }
</style>
