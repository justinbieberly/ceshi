import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'dashboard-';

export default {
    path: '/dashboard',
    name: 'dashboard',
    redirect: {
        name: `${pre}console`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'console',
            name: `${pre}console`,
            meta: {
                ...meta,
                title: '主控台'
            },
            component: () => import('@/pages/dashboard/console')
        },
        {
            path: 'goods_stored',
            name: `${pre}goods-stored`,
            meta: {
                ...meta,
                title: '货物存储'
            },
            component: () => import('@/pages/dashboard/goods_stored')
        },
        {
            path: 'goods_stored_detail',
            name: `${pre}goods-stored-detail`,
            meta: {
                ...meta,
                title: '货物存储详情'
            },
            component: () => import('@/pages/dashboard/goods_stored/detail')
        },
        {
            path: 'temporary_storage',
            name: `${pre}temporary-storage`,
            meta: {
                ...meta,
                title: '临时存储'
            },
            component: () => import('@/pages/dashboard/temporary_storage')
        },
        {
            path: 'distribution',
            name: `${pre}distribution`,
            meta: {
                ...meta,
                title: '分布状况'
            },
            component: () => import('@/pages/dashboard/distribution')
        },
        {
            path: 'environmental_monitoring',
            name: `${pre}environmental-monitoring`,
            meta: {
                ...meta,
                title: '环境监测'
            },
            component: () => import('@/pages/dashboard/environmental_monitoring')
        },
        {
            path: 'electricity_monitoring',
            name: `${pre}electricity-monitoring`,
            meta: {
                ...meta,
                title: '用电监测'
            },
            component: () => import('@/pages/dashboard/electricity_monitoring')
        },
        {
            path: 'real_time_monitor',
            name: `${pre}real-time-monitoring`,
            meta: {
                ...meta,
                title: '实时监测'
            },
            component: () => import('@/pages/dashboard/electricity_monitoring/real_time_monitor')
        },
        {
            path: 'electricity_history',
            name: `${pre}electricity-history`,
            meta: {
                ...meta,
                title: '历史数据'
            },
            component: () => import('@/pages/dashboard/electricity_monitoring/history')
        },
        {
            path: 'space_monitoring',
            name: `${pre}space-monitoring`,
            props: true,
            meta: {
                ...meta,
                title: '空间监测'
            },
            component: () => import('@/pages/dashboard/space_monitoring')
        },
        {
            path: 'space_monitoring_show',
            name: `${pre}space-monitoring-show`,
            props: true,
            meta: {
                ...meta,
                title: '空间监测-显示全部/所选'
            },
            component: () => import('@/pages/dashboard/space_monitoring/show')
        },
        {
            path: 'risk_zoning',
            name: `${pre}risk-zoning`,
            props: true,
            meta: {
                ...meta,
                title: '风险分区'
            },
            component: () => import('@/pages/dashboard/risk_zoning')
        }
    ]
};
