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

// 获取[特种设备管理-历史记录]的数据
export function getSpecialManagementHistory (data) {
    return request({
        url: apiConfig.getSpecialManagementHistory.url,
        method: apiConfig.getSpecialManagementHistory.method,
        data
    });
}

// 获取[控制室值班]的数据
export function getConsoleRoomData (data) {
    return request({
        url: apiConfig.getConsoleRoomData.url,
        method: apiConfig.getConsoleRoomData.method,
        data
    });
}

// 获取[控制室值班- 值班情况]的数据
export function getOnDutySituation (data) {
    return request({
        url: apiConfig.getOnDutySituation.url,
        method: apiConfig.getOnDutySituation.method,
        data
    });
}

// 获取[控制室值班- 值班情况]的数据
export function getPunchCardLog (data) {
    return request({
        url: apiConfig.getPunchCardLog.url,
        method: apiConfig.getPunchCardLog.method,
        data
    });
}

// 获取[控制室值班- 值班情况]的数据
export function getEmergencyResponsePlan (data) {
    return request({
        url: apiConfig.getEmergencyResponsePlan.url,
        method: apiConfig.getEmergencyResponsePlan.method,
        data
    });
}

// 获取[控制室值班- 值班情况]的数据
export function getPreparednessDrill (data) {
    return request({
        url: apiConfig.getPreparednessDrill.url,
        method: apiConfig.getPreparednessDrill.method,
        data
    });
}

// 获取[控制室值班- 值班情况]的数据
export function getEmergencyTreatment (data) {
    return request({
        url: apiConfig.getEmergencyTreatment.url,
        method: apiConfig.getEmergencyTreatment.method,
        data
    });
}

// 获取[人员信息管理]的数据
export function getPersonnelInformation (data) {
    return request({
        url: apiConfig.getPersonnelInformation.url,
        method: apiConfig.getPersonnelInformation.method,
        data
    });
}

// 获取[人员信息管理 - 人员名录]的数据
export function getPersonnelList (data) {
    return request({
        url: apiConfig.getPersonnelList.url,
        method: apiConfig.getPersonnelList.method,
        data
    });
}

// 获取[人员信息管理 - 个人信息详情]的数据
export function getUserInfoById (data) {
    return request({
        url: apiConfig.getUserInfoById.url,
        method: apiConfig.getUserInfoById.method,
        data
    });
}

// 获取[实名进出管理 - 人员名录]的数据
export function getRealNameManagement (data) {
    return request({
        url: apiConfig.getRealNameManagement.url,
        method: apiConfig.getRealNameManagement.method,
        data
    });
}

// 获取[实名进出管理-进出记录]的数据
export function getRecordOfInOut (data) {
    return request({
        url: apiConfig.getRecordOfInOut.url,
        method: apiConfig.getRecordOfInOut.method,
        data
    });
}

// 获取[实名进出管理-进出记录]的数据
export function getVisitorRegistration (data) {
    return request({
        url: apiConfig.getVisitorRegistration.url,
        method: apiConfig.getVisitorRegistration.method,
        data
    });
}

// 获取[实名进出管理-进出记录]的数据
export function getregistrationLog (data) {
    return request({
        url: apiConfig.getregistrationLog.url,
        method: apiConfig.getregistrationLog.method,
        data
    });
}

// 获取[实名进出管理-进出记录]的数据
export function getVehicleReInspection (data) {
    return request({
        url: apiConfig.getVehicleReInspection.url,
        method: apiConfig.getVehicleReInspection.method,
        data
    });
}

// 获取[制度管理-进出记录]的数据
export function getRegimeManagement (data) {
    return request({
        url: apiConfig.getRegimeManagement.url,
        method: apiConfig.getRegimeManagement.method,
        data
    });
}

// 获取[制度管理-详情]的数据
export function getRegimeByParameter (data) {
    return request({
        url: apiConfig.getRegimeByParameter.url,
        method: apiConfig.getRegimeByParameter.method,
        data
    });
}

// 获取[证书管理-menu]的数据
export function getCertificateManagement (data) {
    return request({
        url: apiConfig.getCertificateManagement.url,
        method: apiConfig.getCertificateManagement.method,
        data
    });
}

// 获取[证书管理-根据参数获取table]的数据
// todo need delete this example
export function getCertificateByParameter (data) {
    if (data.id === 160050114) {
        return request({
            url: '/response/证件管理/证件列表/response1.json',
            method: 'get',
            data
        });
    }
    return request({
        url: apiConfig.getCertificateByParameter.url,
        method: apiConfig.getCertificateByParameter.method,
        data
    });
}

// 获取[职业健康台账的首页表格数据]的数据
export function getOccupationalHealth (data) {
    return request({
        url: apiConfig.getOccupationalHealth.url,
        method: apiConfig.getOccupationalHealth.method,
        data
    });
}

// 获取[职业健康台账的首页表格数据]的数据
export function getSuppliesParameter (data) {
    return request({
        url: apiConfig.getSuppliesParameter.url,
        method: apiConfig.getSuppliesParameter.method,
        data
    });
}

// 获取[安全设备设施台账-设备设施种类]的数据
export function getSafetyEquipmentData (data) {
    return request({
        url: apiConfig.getSafetyEquipmentData.url,
        method: apiConfig.getSafetyEquipmentData.method,
        data
    });
}

// 获取[安全设备设施台账-检测维保记录]的数据
export function getMaintenanceRecordMenu (data) {
    return request({
        url: apiConfig.getMaintenanceRecordMenu.url,
        method: apiConfig.getMaintenanceRecordMenu.method,
        data
    });
}

// 获取[安全设备设施台账-检测维保记录]的数据
export function getMaintenanceRecordTable (data) {
    return request({
        url: apiConfig.getMaintenanceRecordTable.url,
        method: apiConfig.getMaintenanceRecordTable.method,
        data
    });
}

// 获取[日常巡查]的数据
export function getRoutineInspectionsMenu (data) {
    return request({
        url: apiConfig.getRoutineInspectionsMenu.url,
        method: apiConfig.getRoutineInspectionsMenu.method,
        data
    });
}

// 获取[日常巡查]的数据
export function getRoutineTableByParam (data) {
    return request({
        url: apiConfig.getRoutineTableByParam.url,
        method: apiConfig.getRoutineTableByParam.method,
        data
    });
}

// 获取[日常巡查]的数据
export function getNewRoutineMenu (data) {
    return request({
        url: apiConfig.getNewRoutineMenu.url,
        method: apiConfig.getNewRoutineMenu.method,
        data
    });
}

// 获取[日常巡查-右侧侧的列表]的数据
export function getNewRoutineByParam (data) {
    return request({
        url: apiConfig.getNewRoutineByParam.url,
        method: apiConfig.getNewRoutineByParam.method,
        data
    });
}

// 获取[隐患登记处置]的数据
export function getHazardRegistration (data) {
    return request({
        url: apiConfig.getHazardRegistration.url,
        method: apiConfig.getHazardRegistration.method,
        data
    });
}

// 获取[隐患登记处置]的数据
export function getHazardHistory (data) {
    return request({
        url: apiConfig.getHazardHistory.url,
        method: apiConfig.getHazardHistory.method,
        data
    });
}

// 获取[装卸作业]的数据
export function getHandlingOperation (data) {
    return request({
        url: apiConfig.getHandlingOperation.url,
        method: apiConfig.getHandlingOperation.method,
        data
    });
}

// todo 分页符
// 获取[事故管理]的数据
export function getAccidentManagement (data) {
    return request({
        url: apiConfig.getAccidentManagement.url,
        method: apiConfig.getAccidentManagement.method,
        data
    });
}

// 获取[事故管理-事故详情]的数据
export function getAccidentDetailByParam (data) {
    return request({
        url: apiConfig.getAccidentDetailByParam.url,
        method: apiConfig.getAccidentDetailByParam.method,
        data
    });
}

// todo 分页符
// todo 分页符
// todo 分页符
// todo 分页符
// 获取[操作日志]的数据
export function geToperationLog (data) {
    return request({
        url: apiConfig.geToperationLog.url,
        method: apiConfig.geToperationLog.method,
        data
    });
}
