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
        },
        {
            path: 'risk_early_warning',
            name: `${pre}risk-early-warning`,
            props: true,
            meta: {
                ...meta,
                title: '风险预警'
            },
            component: () => import('@/pages/dashboard/risk_early_warning')
        },
        {
            path: 'risk_warning_history',
            name: `${pre}risk-warning-history`,
            props: true,
            meta: {
                ...meta,
                title: '风险预警-历史数据'
            },
            component: () => import('@/pages/dashboard/risk_early_warning/history')
        },
        {
            path: 'special_management',
            name: `${pre}special-management`,
            props: true,
            meta: {
                ...meta,
                title: '特种设备管理'
            },
            component: () => import('@/pages/dashboard/special_management')
        },
        {
            path: 'control_room',
            name: `${pre}control-room`,
            props: true,
            meta: {
                ...meta,
                title: '控制室值班管理'
            },
            component: () => import('@/pages/dashboard/control_room')
        },
        {
            path: 'emergency_management',
            name: `${pre}emergency-management`,
            props: true,
            meta: {
                ...meta,
                title: '应急管理'
            },
            component: () => import('@/pages/dashboard/emergency_management')
        },
        {
            path: 'personnel_information',
            name: `${pre}personnel-information`,
            props: true,
            meta: {
                ...meta,
                title: '人员信息管理'
            },
            component: () => import('@/pages/dashboard/personnel_information')
        },
        {
            path: 'real_name_management',
            name: `${pre}real-name-management`,
            props: true,
            meta: {
                ...meta,
                title: '实名进出管理'
            },
            component: () => import('@/pages/dashboard/real_name_management')
        },
        {
            path: 'visitor_registration_management',
            name: `${pre}visitor-registration-management`,
            props: true,
            meta: {
                ...meta,
                title: '访客登记管理'
            },
            component: () => import('@/pages/dashboard/visitor_registration_management')
        },
        {
            path: 'vehicle_re_inspection',
            name: `${pre}vehicle-re-inspection`,
            props: true,
            meta: {
                ...meta,
                title: '车辆登记检查'
            },
            component: () => import('@/pages/dashboard/vehicle_re_inspection')
        },
        {
            path: 'regime_management',
            name: `${pre}regime-management`,
            props: true,
            meta: {
                ...meta,
                title: '制度管理'
            },
            component: () => import('@/pages/dashboard/regime_management')
        },
        {
            path: 'certificate_management',
            name: `${pre}certificate-management`,
            props: true,
            meta: {
                ...meta,
                title: '证件管理'
            },
            component: () => import('@/pages/dashboard/certificate_management')
        },
        {
            path: 'occupational_health_ledger',
            name: `${pre}occupational-health-ledger`,
            props: true,
            meta: {
                ...meta,
                title: '职业健康台账'
            },
            component: () => import('@/pages/dashboard/occupational_health_ledger')
        },
        {
            path: 'supplies_parameter',
            name: `${pre}supplies-parameter`,
            props: true,
            meta: {
                ...meta,
                title: '用品台账'
            },
            component: () => import('@/pages/dashboard/occupational_health_ledger/supplies_parameter')
        },
        {
            path: 'operation_log',
            name: `${pre}operation-log`,
            props: true,
            meta: {
                ...meta,
                title: '操作日志'
            },
            component: () => import('@/pages/dashboard/operation_log')
        },
        {
            path: 'safety_equipment_ledger',
            name: `${pre}safety-equipment-ledger`,
            props: true,
            meta: {
                ...meta,
                title: '安全设备设施种类'
            },
            component: () => import('@/pages/dashboard/safety_equipment_ledger')
        },
        {
            path: 'equipmen_facilities_ledger',
            name: `${pre}equipmen-facilities-ledger`,
            props: true,
            meta: {
                ...meta,
                title: '安全设备设施台账'
            },
            component: () => import('@/pages/dashboard/safety_equipment_ledger/equipmen_facilities_ledger')
        },
        {
            path: 'check_maintenance_record',
            name: `${pre}check-maintenance-record`,
            props: true,
            meta: {
                ...meta,
                title: '检测维保记录'
            },
            component: () => import('@/pages/dashboard/safety_equipment_ledger/check_maintenance_record')
        },
        {
            path: 'routine_inspections',
            name: `${pre}routine-inspections`,
            props: true,
            meta: {
                ...meta,
                title: '日常巡查'
            },
            component: () => import('@/pages/dashboard/routine_inspections')
        },
        {
            path: 'new_patrol',
            name: `${pre}new-patrol`,
            props: true,
            meta: {
                ...meta,
                title: '新增日常巡查'
            },
            component: () => import('@/pages/dashboard/routine_inspections/new_patrol')
        },
        {
            path: 'hazard_registration',
            name: `${pre}hazard-registration`,
            props: true,
            meta: {
                ...meta,
                title: '隐患登记处置'
            },
            component: () => import('@/pages/dashboard/hazard_registration')
        },
        {
            path: 'hazard_history',
            name: `${pre}hazard-history`,
            props: true,
            meta: {
                ...meta,
                title: '隐患处置-历史记录'
            },
            component: () => import('@/pages/dashboard/hazard_registration/history')
        },
        {
            path: 'handling_operation',
            name: `${pre}handling-operation`,
            props: true,
            meta: {
                ...meta,
                title: '装卸作业'
            },
            component: () => import('@/pages/dashboard/handling_operation')
        },
        {
            path: 'special_assignments',
            name: `${pre}special-assignments`,
            props: true,
            meta: {
                ...meta,
                title: '特殊作业'
            },
            component: () => import('@/pages/dashboard/special_assignments')
        },
        {
            path: 'accident_management',
            name: `${pre}accident-management`,
            props: true,
            meta: {
                ...meta,
                title: '事故管理'
            },
            component: () => import('@/pages/dashboard/accident_management')
        },
        {
            path: 'education_training',
            name: `${pre}education-training`,
            props: true,
            meta: {
                ...meta,
                title: '教育培训'
            },
            component: () => import('@/pages/dashboard/education_training')
        },
        {
            path: 'practitioners',
            name: `${pre}practitioners`,
            props: true,
            meta: {
                ...meta,
                title: '从业人员'
            },
            component: () => import('@/pages/dashboard/education_training/practitioners')
        },
        {
            path: 'outsiders',
            name: `${pre}outsiders`,
            props: true,
            meta: {
                ...meta,
                title: '外来人员'
            },
            component: () => import('@/pages/dashboard/education_training/outsiders')
        }
    ]
};
