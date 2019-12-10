import request from '@/plugins/request';
import Config from '@/config';

const apiConfig = Config.apiRoute;

export function AccountLogin (data) {
    return request({
        url: apiConfig.login.url,
        method: apiConfig.login.method,
        data
    });
}

export function AccountRegister (data) {
    return request({
        url: apiConfig.login.url,
        method: apiConfig.login.method,
        data
    });
}

// 获取【头部的导航】数据 信息链接
export function getHeaderMenu (data) {
    return request({
        url: apiConfig.getHeaderMenu.url,
        method: apiConfig.getHeaderMenu.method,
        data
    });
}

// 获取【三维模型】的左侧导航栏
export function get3dModelInfo (data) {
    return request({
        url: apiConfig.get3dModelInfo.url,
        method: apiConfig.get3dModelInfo.method,
        data
    });
}

// 获取【货物存储】的数据
export function getGoodsStored (data) {
    return request({
        url: apiConfig.getGoodsStored.url,
        method: apiConfig.getGoodsStored.method,
        data
    });
}

// 获取[货物存储详情]的数据 后期可能更为根据条件获取比如id之类
export function getStoredDetail (data) {
    return request({
        url: apiConfig.getStoredDetail.url,
        method: apiConfig.getStoredDetail.method,
        data
    });
}

// 获取[临时存储]的数据
export function getTemporaryStorage (data) {
    return request({
        url: apiConfig.getTemporaryStorage.url,
        method: apiConfig.getTemporaryStorage.method,
        data
    });
}

// 获取[分布情况]的数据
export function getDistributionData (data) {
    return request({
        url: apiConfig.getDistributionData.url,
        method: apiConfig.getDistributionData.method,
        data
    });
}

// 获取[环境监测]的数据
export function getEnvironmentalMonitoring (data) {
    return request({
        url: apiConfig.getEnvironmentalMonitoring.url,
        method: apiConfig.getEnvironmentalMonitoring.method,
        data
    });
}

// 获取[用电监测]的数据
export function getElectricityMonitoring (data) {
    return request({
        url: apiConfig.getElectricityMonitoring.url,
        method: apiConfig.getElectricityMonitoring.method,
        data
    });
}

// 获取[用电监测-实时监测]的数据
export function getElectricityRealTime (data) {
    return request({
        url: apiConfig.getElectricityRealTime.url,
        method: apiConfig.getElectricityRealTime.method,
        data
    });
}

// 获取[用电监测-历史数据]的数据
export function getElectricityHistory (data) {
    return request({
        url: apiConfig.getElectricityHistory.url,
        method: apiConfig.getElectricityHistory.method,
        data
    });
}

// 获取[空间监测-]的数据
export function getSpaceMonitoring (data) {
    return request({
        url: apiConfig.getSpaceMonitoring.url,
        method: apiConfig.getSpaceMonitoring.method,
        data
    });
}

// 获取[风险分区-]的数据
export function getRiskZoningData (data) {
    return request({
        url: apiConfig.getRiskZoningData.url,
        method: apiConfig.getRiskZoningData.method,
        data
    });
}

// 获取[风险预警-]的数据
export function getRiskEarlyWarning (data) {
    return request({
        url: apiConfig.getRiskEarlyWarning.url,
        method: apiConfig.getRiskEarlyWarning.method,
        data
    });
}

// 获取[风险预警-历史记录]的数据
export function getRiskHistory (data) {
    return request({
        url: apiConfig.getRiskHistory.url,
        method: apiConfig.getRiskHistory.method,
        data
    });
}

// 获取[特种设备管理]的数据
export function getSpecialManagement (data) {
    return request({
        url: apiConfig.getSpecialManagement.url,
        method: apiConfig.getSpecialManagement.method,
        data
    });
}
