import request from '@/plugins/request';

export function AccountLogin (data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    });
}

export function AccountRegister (data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    });
}

// 获取【三维模型】的左侧导航栏
export function Get3dModelInfo (data) {
    return request({
        url: '/api/Get3dModelInfo',
        method: 'post',
        data
    });
}

// 获取【头部的导航】数据 信息链接
export function getHeaderMenu (data) {
    return request({
        url: '/api/getHeaderMenu',
        method: 'post',
        data
    });
}

// 获取【货物存储】的数据
export function getGoodsStored (data) {
    return request({
        url: '/api/getGoodsStored',
        method: 'post',
        data
    });
}

// 获取[货物存储详情]的数据 后期可能更为根据条件获取比如id之类
export function getStoredDetail (data) {
    return request({
        url: '/api/getStoredDetail',
        method: 'post',
        data
    });
}

// 获取[临时货存储]的数据
export function getTemporaryStorage (data) {
    return request({
        url: '/api/getTemporaryStorage',
        method: 'post',
        data
    });
}

// 获取[分布情况]的数据
export function getDistributionData (data) {
    return request({
        url: '/api/getDistributionData',
        method: 'post',
        data
    });
}

// 获取[环境监测]的数据
export function getEnvironmentalMonitoring (data) {
    return request({
        url: '/api/getEnvironmentalMonitoring',
        method: 'post',
        data
    });
}

// 获取[用电监测]的数据
export function getElectricityMonitoring (data) {
    return request({
        url: '/api/getElectricityMonitoring',
        method: 'post',
        data
    });
}
