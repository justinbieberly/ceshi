/**
 * iView Admin Pro 开发配置
 * */

const env = process.env.NODE_ENV;

const Config = {
    // logo地址
    logo: {
        logoPath: '/assets/images/logo.jpg',
        // 由于LOGO旁边的文字是有 -- 两行 --  在此处请使用换行符(\n)分开
        logoDesc: '张家港龙亿智慧仓库\n安全管理系统'
    },
    // 请求域名设置
    apiBaseURL: env === 'development' ? 'http://localhost:8080/' : '/',
    /**
     *  路由设置
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
