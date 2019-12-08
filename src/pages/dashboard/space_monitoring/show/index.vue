<template>
    <main class="body-content-main">
        <div class="content-layout-right user-full-screen" :class="{ 'content-layout-right-pro': this.menuCollapse }">
            <Grid center square :hover="true" :col="column">
                <GridItem v-for="(item, key) in gridItems" :key="key" :name="key" >{{ item }}</GridItem>
            </Grid>
        </div>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'dashboard-space-monitoring-show',
        data () {
            return {
                title: '显示监控',
                column: 6,
                gridItems: []
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'isTablet',
                'isDesktop',
                'menuCollapse'
            ])
        },
        created () {
            let showIds = this.$route.params.showIds;
            console.log('test', showIds);
            if (showIds !== undefined) {
                console.log(showIds.length);
                let total = showIds.length;
                let column = Math.floor(Number(total) / 2);
                this.column = column > 6 ? 6 : column;
                this.getMonitoringById(showIds)
            } else {
                this.getMonitoringById()
            }
        },
        methods: {
            getMonitoringById (showIds = []) {
                console.log('根据id获取监控画面');
                if (showIds.length === 0) {
                    this.gridItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                } else {
                    this.gridItems = Array.from({ length: showIds.length }, (v, k) => k);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
