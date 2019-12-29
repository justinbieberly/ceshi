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

/*
* @page 三维模型
* @object 获取【三维模型】的左侧导航栏
* @param data
* @author iEfoam
* @time 2019-12-18 23:07
* @return mixed
* */
export function get3dModelInfo (data) {
    return request({
        url: apiConfig.get3dModelInfo.url,
        method: apiConfig.get3dModelInfo.method,
        data
    });
}

/*
* @page 三维模型
* @object 将页面点击的按钮 传递给接口端
* @param data
* @author iEfoam
* @time 2019-12-18 23:07
* @return mixed
* */
export function send3dModelInfo (data) {
    console.log(data)
    return request({
        url: apiConfig.getCertificateByParameter.url,
        method: apiConfig.getCertificateByParameter.method,
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

/*
* @page 用电监测
* @object 用电监测 的tree  进行新增 删除 编辑操作
* @param data
* @author iEfoam
* @time 2019-12-18 23:07
* @return mixed
* */
export function sendElectricityMonitoring (data) {
    console.log('sendElectricityMonitoring', data)
    return request({
        url: apiConfig.sendElectricityMonitoring.url,
        method: apiConfig.sendElectricityMonitoring.method,
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

// 获取[风险预警]的数据
export function getRiskEarlyWarning (data) {
    return request({
        url: apiConfig.getRiskEarlyWarning.url,
        method: apiConfig.getRiskEarlyWarning.method,
        data
    });
}

/**
 * @page 风险预警
 * @object 点击了选项框会触发的函数 会将当前选中项的id 发送至此
 * @param {object} data
 * @author iEfoam
 * @time 2019-12-28
 * @return mixed
 */
export function sendRiskEarlyWarning (data) {
    return request({
        url: apiConfig.sendRiskEarlyWarning.url,
        method: apiConfig.sendRiskEarlyWarning.method,
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

// 获取[应急管理- 应急预案]的数据
export function getEmergencyResponsePlan (data) {
    return request({
        url: apiConfig.getEmergencyResponsePlan.url,
        method: apiConfig.getEmergencyResponsePlan.method,
        data
    });
}

// [CURD-应急预案-]的数据
export function sendEmergencyResponsePlan (data) {
    return request({
        url: apiConfig.sendEmergencyResponsePlan.url,
        method: apiConfig.sendEmergencyResponsePlan.method,
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

// 获取[对表格的数据操作- 值班情况]的数据
export function sendEmergencyTableAction (data) {
    return request({
        url: apiConfig.sendEmergencyTableAction.url,
        method: apiConfig.sendEmergencyTableAction.method,
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

// [CURD-人员信息管理的目录-的数据]的数据
export function sendPersonnelInformation (data) {
    return request({
        url: apiConfig.sendPersonnelInformation.url,
        method: apiConfig.sendPersonnelInformation.method,
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

// 获取[CURD - 人员信息管理 - 人员名录]的数据
export function sendPersonnelList (data) {
    return request({
        url: apiConfig.sendPersonnelList.url,
        method: apiConfig.sendPersonnelList.method,
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

// 获取[访客登记管理-]的数据
export function getVisitorRegistration (data) {
    return request({
        url: apiConfig.getVisitorRegistration.url,
        method: apiConfig.getVisitorRegistration.method,
        data
    });
}

// 获取[授权-访客登记管理]的数据
export function sendVisitorRegistration (data) {
    return request({
        url: apiConfig.sendVisitorRegistration.url,
        method: apiConfig.sendVisitorRegistration.method,
        data
    });
}

// 获取[实名进出管理-进出记录]的数据
export function getRegistrationLog (data) {
    return request({
        url: apiConfig.getRegistrationLog.url,
        method: apiConfig.getRegistrationLog.method,
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

// todo 上线之后需要删除
// 获取[特殊作业- 动火作业]的数据
export function getSpecialAssignmentsMenu (data) {
    if (data === undefined || data.menuType === 0) {
        return request({
            url: apiConfig.getSpecialAssignmentsMenu.url,
            method: apiConfig.getSpecialAssignmentsMenu.method,
            data
        });
    } else if (data.menuType === 1) {
        return request({
            url: '/response/特殊作业/登高作业/response.json',
            method: 'get',
            data
        });
    } else if (data.menuType === 2) {
        return request({
            url: '/response/特殊作业/临时用电作业/response.json',
            method: 'get',
            data
        });
    }
}

// 获取[特殊作业- 表格数据]的数据
export function getAssignmentsTableByParam (data) {
    return request({
        url: apiConfig.getAssignmentsTableByParam.url,
        method: apiConfig.getAssignmentsTableByParam.method,
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

// 获取[培训档案-menu]的数据
export function getTrainingRecordsMenu (data) {
    return request({
        url: apiConfig.getTrainingRecordsMenu.url,
        method: apiConfig.getTrainingRecordsMenu.method,
        data
    });
}

// 获取[培训档案-table]的数据
export function getTrainingTableByParam (data) {
    return request({
        url: apiConfig.getTrainingTableByParam.url,
        method: apiConfig.getTrainingTableByParam.method,
        data
    });
}

// 获取[培训档案-从业人员]的数据
export function getPractitionersTableData (data) {
    return request({
        url: apiConfig.getPractitionersTableData.url,
        method: apiConfig.getPractitionersTableData.method,
        data
    });
}

// 获取[培训档案-从业人员]的数据
export function getOutsidersTableData (data) {
    return request({
        url: apiConfig.getOutsidersTableData.url,
        method: apiConfig.getOutsidersTableData.method,
        data
    });
}

// 获取[数据统计-目录数据]的数据
export function getDataStatisticsMenu (data) {
    return request({
        url: apiConfig.getDataStatisticsMenu.url,
        method: apiConfig.getDataStatisticsMenu.method,
        data
    });
}

// 获取[数据统计-图表数据]的数据
export function getDataStatisticsCharts (data) {
    console.log('data', data)
    if (data.id === 16) {
        return request({
            url: apiConfig.getDataStatisticsCharts.url,
            method: apiConfig.getDataStatisticsCharts.method,
            data
        });
    } else if (data.id === 17) {
        return request({
            url: '/response/数据统计/图表数据/response1.json',
            method: apiConfig.getDataStatisticsCharts.method,
            data
        });
    } else if (data.id === 18) {
        return request({
            url: '/response/数据统计/图表数据/response2.json',
            method: apiConfig.getDataStatisticsCharts.method,
            data
        });
    } else if (data.id === 19) {
        return request({
            url: '/response/数据统计/图表数据/response3.json',
            method: apiConfig.getDataStatisticsCharts.method,
            data
        });
    }
}

// 获取[操作日志]的数据
export function getToperationLog (data) {
    return request({
        url: apiConfig.getToperationLog.url,
        method: apiConfig.getToperationLog.method,
        data
    });
}

// 获取[用户管理]的数据
export function getUserManagementData (data) {
    return request({
        url: apiConfig.getUserManagementData.url,
        method: apiConfig.getUserManagementData.method,
        data
    });
}

// 获取[权限分配]的数据
export function getPermissionsAllocateData (data) {
    return request({
        url: apiConfig.getPermissionsAllocateData.url,
        method: apiConfig.getPermissionsAllocateData.method,
        data
    });
}

// 获取[权限列表]的数据
export function getPermitList (data) {
    return request({
        url: apiConfig.getPermitList.url,
        method: apiConfig.getPermitList.method,
        data
    });
}

// 获取[根据id[用户id/部门id获取对应的权限]]的数据
export function getPermitById (data) {
    return request({
        url: apiConfig.getPermitById.url,
        method: apiConfig.getPermitById.method,
        data
    });
}
