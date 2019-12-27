/**
 * iView Admin Pro 开发配置
 * */

const env = process.env.NODE_ENV;

const Config = {
    // logo地址
    logo: {
        logoPath: '/assets/images/logo.png',
        // 由于LOGO旁边的文字是有 -- 两行 --  在此处请使用换行符(\n)分开
        logoDesc: '龙亿智慧仓库安全管理系统'
    },
    // 请求域名设置
    apiBaseURL: env === 'development' ? 'http://localhost:8080/' : '/',
    /**
     *  api路由 请求设置
     * */
    apiRoute: {
        login: {
            alias: '登录接口',
            url: '/response/login/response-success.json',
            method: 'get'
        },
        getHeaderMenu: {
            alias: '获取头部导航',
            url: '/response/menu/response.json',
            method: 'get'
        },
        getGoodsStored: {
            alias: '获取货物存取数据',
            url: '/response/货物存储/response.json',
            method: 'get'
        },
        get3dModelInfo: {
            alias: '获取-三维模型-数据',
            url: '/response/三维模型/response.json',
            method: 'get'
        },
        getStoredDetail: {
            alias: '获取货物存取详情的数据',
            url: '/response/货物存储/detail-response.json',
            method: 'get'
        },
        getTemporaryStorage: {
            alias: '获取临时存储的数据',
            url: '/response/临时存储/response.json',
            method: 'get'
        },
        getDistributionData: {
            alias: '获取-分布状况-的数据',
            url: '/response/分布状况/response.json',
            method: 'get'
        },
        getEnvironmentalMonitoring: {
            alias: '获取-环境监测-的数据',
            url: '/response/环境监测/response.json',
            method: 'get'
        },
        getElectricityMonitoring: {
            alias: '获取-用电监测-的数据',
            url: '/response/用电监测/response.json',
            method: 'get'
        },
        getElectricityRealTime: {
            alias: '获取-用电监测-实时监测-的数据',
            url: '/response/用电监测/实时监测/response.json',
            method: 'get'
        },
        getElectricityHistory: {
            alias: '获取-用电监测-历史数据-的数据',
            url: '/response/用电监测/历史数据/response.json',
            method: 'get'
        },
        getSpaceMonitoring: {
            alias: '获取-空间监测-的数据',
            url: '/response/空间监测/response.json',
            method: 'get'
        },
        getRiskZoningData: {
            alias: '获取-风险分区-的数据',
            url: '/response/风险分区/response.json',
            method: 'get'
        },
        getRiskEarlyWarning: {
            alias: '获取-风险预警-的数据',
            url: '/response/风险预警/response.json',
            method: 'get'
        },
        getRiskHistory: {
            alias: '获取-风险预警-历史数据-的数据',
            url: '/response/风险预警/历史数据/response.json',
            method: 'get'
        },
        getSpecialManagement: {
            alias: '获取-特种设备管理-的数据',
            url: '/response/特种设备管理/response.json',
            method: 'get'
        },
        getSpecialManagementHistory: {
            alias: '获取-特种设备管理-的数据',
            url: '/response/特种设备管理/历史记录/response.json',
            method: 'get'
        },
        getConsoleRoomData: {
            alias: '获取-控制室值班-的数据',
            url: '/response/值班室值班/response.json',
            method: 'get'
        },
        getOnDutySituation: {
            alias: '获取-控制室值班-值班情况-的数据',
            url: '/response/值班室值班/值班情况/response.json',
            method: 'get'
        },
        getPunchCardLog: {
            alias: '获取-控制室值班-打卡记录-的数据',
            url: '/response/值班室值班/打卡记录/response.json',
            method: 'get'
        },
        getEmergencyResponsePlan: {
            alias: '获取-应急预案例-的数据',
            url: '/response/应急管理/应急预案/response.json',
            method: 'get'
        },
        getPreparednessDrill: {
            alias: '获取-应急预案例-的数据',
            url: '/response/应急管理/预案演练/response.json',
            method: 'get'
        },
        getEmergencyTreatment: {
            alias: '获取-应急预案例-的数据',
            url: '/response/应急管理/应急处理/response.json',
            method: 'get'
        },
        getPersonnelInformation: {
            alias: '获取-人员信息管理-的数据',
            url: '/response/人员信息管理/response.json',
            method: 'get'
        },
        getPersonnelList: {
            alias: '获取-人员信息管理-的数据',
            url: '/response/人员信息管理/人员目录/response.json',
            method: 'get'
        },
        getUserInfoById: {
            alias: '获取-人员信息管理-详情-的数据',
            url: '/response/人员信息管理/用户详情/response.json',
            method: 'get'
        },
        getRealNameManagement: {
            alias: '获取-实名进出管理-的数据',
            url: '/response/实名进出管理/response.json',
            method: 'get'
        },
        getRecordOfInOut: {
            alias: '获取-实名进出管理-进出记录-的数据',
            url: '/response/实名进出管理/进出记录/response.json',
            method: 'get'
        },
        getVisitorRegistration: {
            alias: '获取-访客登记管理-的数据',
            url: '/response/访客登记管理/response.json',
            method: 'get'
        },
        getregistrationLog: {
            alias: '获取-访客登记管理-登记记录-的数据',
            url: '/response/访客登记管理/登记记录/response.json',
            method: 'get'
        },
        getVehicleReInspection: {
            alias: '获取-车辆登记检查-的数据',
            url: '/response/车辆登记检查/response.json',
            method: 'get'
        },
        getRegimeManagement: {
            alias: '获取-制度管理-的数据',
            url: '/response/制度管理/response.json',
            method: 'get'
        },
        getRegimeByParameter: {
            alias: '获取-制度管理-某一项的文档数据列表-的数据',
            url: '/response/制度管理/制度文档/response.json',
            method: 'get'
        },
        getCertificateManagement: {
            alias: '获取-制度管理-某一项的文档数据列表-的数据',
            url: '/response/证件管理/response.json',
            method: 'get'
        },
        getCertificateByParameter: {
            alias: '获取-制度管理-某一项的文档数据列表-的数据',
            url: '/response/证件管理/证件列表/response.json',
            method: 'get'
        },
        getOccupationalHealth: {
            alias: '获取-职业健康台账-的数据',
            url: '/response/职业健康台账/response.json',
            method: 'get'
        },
        getSuppliesParameter: {
            alias: '获取-职业健康台账-用品台账-的数据',
            url: '/response/职业健康台账/用品台账/response.json',
            method: 'get'
        },
        getSafetyEquipmentData: {
            alias: '获取-安全设备设施台账-设备设施种类-的数据',
            url: '/response/安全设备台账/设备设施种类/response.json',
            method: 'get'
        },
        getMaintenanceRecordMenu: {
            alias: '获取-安全设备设施台账-检测维保记录-的数据',
            url: '/response/安全设备台账/检测维保记录/response.json',
            method: 'get'
        },
        getMaintenanceRecordTable: {
            alias: '获取-安全设备设施台账-检测维保记录-的数据',
            url: '/response/安全设备台账/检测维保记录/response-table.json',
            method: 'get'
        },
        getRoutineInspectionsMenu: {
            alias: '获取-日常巡查-左侧目录-的数据',
            url: '/response/日常巡查/response.json',
            method: 'get'
        },
        getRoutineTableByParam: {
            alias: '获取-日常巡查-右侧的表格-的数据',
            url: '/response/日常巡查/巡查详情/response.json',
            method: 'get'
        },
        getNewRoutineMenu: {
            alias: '获取-日常巡查-新增-左侧的列表-的数据',
            url: '/response/日常巡查/新增日常巡查/response.json',
            method: 'get'
        },
        getNewRoutineByParam: {
            alias: '获取-日常巡查-新增-右侧侧的列表-的数据',
            url: '/response/日常巡查/新增日常巡查/response-tran.json',
            method: 'get'
        },
        getHazardRegistration: {
            alias: '获取-隐患登记处置-的数据',
            url: '/response/隐患处置/response.json',
            method: 'get'
        },
        getHazardHistory: {
            alias: '获取-隐患登记处置-历史记录-的数据',
            url: '/response/隐患处置/历史记录/response.json',
            method: 'get'
        },
        getHandlingOperation: {
            alias: '获取-装卸作业-的数据',
            url: '/response/装卸作业/response.json',
            method: 'get'
        },
        getSpecialAssignmentsMenu: {
            alias: '获取-特殊作业的menu-的数据',
            url: '/response/特殊作业/动火作业/response.json',
            method: 'get'
        },
        getAssignmentsTableByParam: {
            alias: '获取-特殊作业的表格-的数据',
            url: '/response/特殊作业/动火作业/response-table.json',
            method: 'get'
        },
        // todo 分页符
        getAccidentManagement: {
            alias: '获取- 事故管理-的数据',
            url: '/response/事故管理/response.json',
            method: 'get'
        },
        getAccidentDetailByParam: {
            alias: '获取- 事故管理-的数据',
            url: '/response/事故管理/response-detail.json',
            method: 'get'
        },
        getTrainingRecordsMenu: {
            alias: '获取-教育培训-培训档案-menu-的数据',
            url: '/response/教育培训/培训档案/response.json',
            method: 'get'
        },
        getTrainingTableByParam: {
            alias: '获取-教育培训-培训档案-menu-的数据',
            url: '/response/教育培训/培训档案/response-table.json',
            method: 'get'
        },
        getPractitionersTableData: {
            alias: '获取-教育培训-从业人员-的数据',
            url: '/response/教育培训/从业人员/response.json',
            method: 'get'
        },
        getOutsidersTableData: {
            alias: '获取-教育培训-从业人员-的数据',
            url: '/response/教育培训/外来人员/response.json',
            method: 'get'
        },
        getDataStatisticsMenu: {
            alias: '获取-数据统计-的数据',
            url: '/response/数据统计/response.json',
            method: 'get'
        },
        getDataStatisticsCharts: {
            alias: '获取-数据统计-图表数据-的数据',
            url: '/response/数据统计/图表数据/response.json',
            method: 'get'
        },
        getToperationLog: {
            alias: '获取-操作日志-的数据',
            url: '/response/操作日志/response.json',
            method: 'get'
        },
        getUserManagementData: {
            alias: '获取-用户管理的表格-的数据',
            url: '/response/用户管理/response.json',
            method: 'get'
        },
        getPermissionsAllocateData: {
            alias: '获取-权限分配的表格-的数据',
            url: '/response/权限分配/response.json',
            method: 'get'
        },
        getPermitList: {
            alias: '获取-权限列表-的数据',
            url: '/response/权限列表/response.json',
            method: 'get'
        },
        getPermitById: {
            alias: '获取-根据id[用户id/部门id获取对应的权限]-的数据',
            url: '/response/权限列表/response1.json',
            method: 'get'
        }
    },
    /**
     *  交互api配置
     * */
    interactionApi: {
        sendElectricityMonitoring: {
            alias: '用电检测的-新增-编辑-删除操作接口',
            url: '/response/api/sendElectricityMonitoring.json',
            method: 'get'
        },
        sendRealTimeMonitorParam: {
            alias: '用电检测的-新增-编辑-删除操作接口',
            url: '/response/api/sendElectricityMonitoring.json',
            method: 'get'
        }
    },
    /**
     * 版权设置
     * */
    copyright: {
        copyright: ' Copyright © www.longyi.com , All Rights Reserved.',
        contact: 'Email : 1234567@qq.com   QQ: 1234567'
    }
};

module.exports = Config;
