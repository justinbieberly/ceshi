export default [
    {
        path: '/api/login',
        method: 'post',
        handle () {
            return require('../../json_data/login/login-success.json');
        }
    },
    {
        path: '/api/get3dModelInfo',
        method: 'post',
        handle () {
            return require('../../json_data/三维模型/response.json');
        }
    },
    {
        path: '/api/getHeaderMenu',
        method: 'post',
        handle () {
            return require('../../json_data/menu/response.json');
        }
    },
    {
        path: '/api/getGoodsStored',
        method: 'post',
        handle () {
            return require('../../json_data/货物存储/response.json');
        }
    },
    {
        path: '/api/getStoredDetail',
        method: 'post',
        handle () {
            return require('../../json_data/货物存储/detailResponse.json');
        }
    },
    {
        path: '/api/getTemporaryStorage',
        method: 'post',
        handle () {
            return require('../../json_data/临时存储/response.json');
        }
    },
    {
        path: '/api/getDistributionData',
        method: 'post',
        handle () {
            return require('../../json_data/分布状况/response.json');
        }
    },
    {
        path: '/api/getEnvironmentalMonitoring',
        method: 'post',
        handle () {
            return require('../../json_data/环境监测/response.json');
        }
    },
    {
        path: '/api/getElectricityMonitoring',
        method: 'post',
        handle () {
            return require('../../json_data/用电监测/response.json');
        }
    },
    {
        path: '/api/getElectricityRealTime',
        method: 'post',
        handle () {
            return require('../../json_data/用电监测/实时监测/response.json');
        }
    },
    {
        path: '/api/getElectricityHistory',
        method: 'post',
        handle () {
            return require('../../json_data/用电监测/历史数据/response.json');
        }
    },
    {
        path: '/api/getSpaceMonitoring',
        method: 'post',
        handle () {
            return require('../../json_data/空间监测/response.json');
        }
    }
]
