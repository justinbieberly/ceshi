<template>
    <main class="body-content-main">
        <div class="content-layout-left" :class="{ 'i-layout-slider-min': this.menuCollapse }"
             ref="left">
            <div class="logo-words-desc"> {{ logoDesc }} </div>
            <Card :bordered="false" class="i-admin-left-menu">
                <Card :title="title" icon="ios-options"  shadow >
                    <Tabs type="card" class="ivu-mt"  @on-click="changeTabs" >
                        <TabPane label="动火作业">
                            <div class="ivu-block"
                                 v-for="(value, index) in menuList"
                                 :key="index" >
                                <h4 class="s-title">{{ value.title }}</h4>
                                <div class="ivu-inline-block s-box" v-if="index === 0">
                                    <Button  size="small" style="margin-right: 8px;">
                                        <Icon type="md-arrow-round-down" />
                                        导出
                                    </Button>
                                    <Button  size="small" style="margin-right: 8px;">
                                        申请作业
                                    </Button>
                                </div>
                                <div class="ivu-block">
                                    <div class="regime-btn ivu-btn ivu-btn-default ivu-font-size-small"
                                         v-for="(item, key) in value.children"
                                         :key="key"
                                         :class="{ 'ivu-btn-selected': btnArr[index][key]['state'] }"
                                         @click="selectThisBtn(index, key)">
                                        <div class="ivu-inline-block">{{ item.title }}</div>
                                        <div class="ivu-inline-block">{{ item.createAt }}</div>
                                        <div class="ivu-inline-block do-action-btn">
                                            <Icon type="ios-close-circle" size="18" @click="modalAction(item.id, index, key)"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="登高作业">
                        </TabPane>
                        <TabPane label="临时用电作业">
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
        <div class="content-layout-right user-full-img ivu-overflow-auto"
             :class="{ 'content-layout-right-pro': this.menuCollapse }"
             ref="right">
            <div class="special-table">
                <table border="1" width="100%" cellspacing="0" v-if="table.state===1">
                    <tr align="center">
                        <td colspan="6" class="s-table-header">
                            <h3>动火安全作业证</h3>
                        </td>
                    </tr>
                    <tr align="center">
                        <td>申请单位</td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>申请人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td>作业证编号</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>动火作业级别</td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>动火方式</td>
                        <td colspan="3"><input type="text" class="ivu-super-input full"></td>
                    </tr>
                    <tr align="center">
                        <td>动火地点</td>
                        <td colspan="5">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>动火时间</td>
                        <td colspan="5" class="time-input">
                            自
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                            <input type="text" class="ivu-super-input">
                            分 至
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                            <input type="text" class="ivu-super-input">
                            分止

                        </td>
                    </tr>
                    <tr align="center">
                        <td>动火作业负责人</td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td colspan="2">动火人</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center" class="time-input">
                        <td>动火分析时间</td>
                        <td colspan="1">
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                        </td>
                        <td colspan="3">
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                        </td>
                        <td>
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                        </td>
                    </tr>
                    <tr align="center">
                        <td>分析点名称</td>
                        <td colspan="1">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td colspan="3">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>分析数据</td>
                        <td colspan="1">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td colspan="3">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>分析人</td>
                        <td colspan="1">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td colspan="3">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>涉及的其他特殊作业</td>
                        <td colspan="1">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td colspan="3">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>危害辨识</td>
                        <td colspan="5">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>序号</td>
                        <td colspan="4">安全措施</td>
                        <td>确认人</td>
                    </tr>
                    <tr align="center">
                        <td>1</td>
                        <td colspan="4" align="left">动火设备内部结构清理干净,蒸吹扫或水洗合格,达到用火条件</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>2</td>
                        <td colspan="4" align="left">断开与动火设备相连的所有管线,加盲板(
                            <input type="text" class="ivu-super-input" style="width: 30px">
                            )块</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>3</td>
                        <td colspan="4" align="left">动火点周围的下水井,地漏,地沟,电缆沟等已清除易燃物,并已采取覆盖,铺沙,水封等手段进行隔离</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>4</td>
                        <td colspan="4" align="left">罐区内动火点同一围堰和防火间距的油罐不同时进行脱水作业</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>5</td>
                        <td colspan="4" align="left">高处作业已采取防火花飞溅措施</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>6</td>
                        <td colspan="4" align="left">动火点周围易燃物已清除</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>7</td>
                        <td colspan="4" align="left">电焊回路线已接在焊件上把线未穿过下水井或其他设备搭接</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>8</td>
                        <td colspan="4" align="left">乙炔气瓶(直立放置)、氧气瓶与火源间的距离大于10m</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>9</td>
                        <td colspan="4" align="left">现场配备消防蒸汽带(
                            <input type="text" class="ivu-super-input" style="width: 30px">
                            )根，灭火器(
                            <input type="text" class="ivu-super-input" style="width: 30px">
                            )台，铁锇(
                            <input type="text" class="ivu-super-input" style="width: 30px">
                            )把，石棉布(
                            <input type="text" class="ivu-super-input" style="width: 30px">
                            )块</td>
                         <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td rowspan="2">10</td>
                        <td colspan="4" align="left">
                            其他安全措施:
                            <input type="text" class="ivu-super-input" style="width: 70%">
                        </td>
                        <td rowspan="2"><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td colspan="4" align="right">
                            编制人:
                            <input type="text" class="ivu-super-input" style="width: 20%">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>生产单位负责人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td>监火人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td>动火初审人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>实施安全教育人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td colspan="2"><input type="text" class="ivu-super-input"></td>
                        <td colspan="2"><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>申请单位意见:
                                <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>动火审批人意见:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>动火前,岗位当班班长验票:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>完工验收:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <table border="1" width="100%" cellspacing="0" v-if="table.state===2">
                    <tr align="center">
                        <td colspan="6" class="s-table-header">
                            <h3>高处安全作业证</h3>
                        </td>
                    </tr>
                    <tr align="center">
                        <td>申请单位</td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>申请人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td>作业证编号</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>作业时间</td>
                        <td colspan="5" class="time-input">
                            自
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                            <input type="text" class="ivu-super-input">
                            分 至
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                            <input type="text" class="ivu-super-input">
                            分止

                        </td>
                    </tr>
                    <tr align="center">
                        <td>作业地点</td>
                        <td colspan="5">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>作业内容</td>
                        <td colspan="5">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>作业高度</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>作业类别</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>作业单位</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>监护人</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>作业人</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>涉及的其他特殊作业</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>危害辨识</td>
                        <td colspan="5">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>序号</td>
                        <td colspan="4">安全措施</td>
                        <td>确认人</td>
                    </tr>
                    <tr align="center">
                        <td>1</td>
                        <td colspan="4" align="left">作业人员身体条件符合要求</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>2</td>
                        <td colspan="4" align="left">作业人员着装符合工作要求</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>3</td>
                        <td colspan="4" align="left">作业人员佩戴合格的安全帽</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>4</td>
                        <td colspan="4" align="left">作业人员佩戴安全带，安全带高挂低用</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>5</td>
                        <td colspan="4" align="left">作业人员携带有工具袋及安全绳</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>6</td>
                        <td colspan="4" align="left">作业人员佩戴:A过滤式防毒面具或口罩，B.空气呼吸器</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>7</td>
                        <td colspan="4" align="left">现场搭设的脚手架、防护网，围栏符合安全规定</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>8</td>
                        <td colspan="4" align="left">垂直分层作业中间有隔离设施</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>9</td>
                        <td colspan="4" align="left">梯子、绳子符合安全规定</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>10</td>
                        <td colspan="4" align="left">石棉瓦等轻型棚的承重梁、柱能承重负荷的要求</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>11</td>
                        <td colspan="4" align="left">作业人员在石棉瓦等不承重物作业所搭设的承重板稳定牢固</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>12</td>
                        <td colspan="4" align="left">采光、夜间作业照明符合作业要求，(需采用并已采用无需采用)防爆灯</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>13</td>
                        <td colspan="4" align="left">30m以上高处作业配备通讯，联络工具</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td rowspan="2">14</td>
                        <td colspan="4" align="left">
                            其他安全措施:
                            <input type="text" class="ivu-super-input" style="width: 70%">
                        </td>
                        <td rowspan="2"><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td colspan="4" align="right">
                            编制人:
                            <input type="text" class="ivu-super-input" style="width: 20%">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>实施安全教育人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td colspan="2"><input type="text" class="ivu-super-input"></td>
                        <td colspan="2"><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>生产单位作业负责人意见:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>作业单位负责人意见:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>审核部门意见:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>审批部门意见:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>完工验收:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <table border="1" width="100%" cellspacing="0" v-if="table.state===3">
                    <tr align="center">
                        <td colspan="6" class="s-table-header">
                            <h3>临时用电作业证</h3>
                        </td>
                    </tr>
                    <tr align="center">
                        <td>吊装地点</td>
                        <td>
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>吊装工具名称</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td>作业证编号</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>吊装人员及特殊工种作业证号</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>监护人</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>吊装指挥及特殊工种作业证号</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                        <td>起吊重物质量(t)</td>
                        <td colspan="2">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>作业时间</td>
                        <td colspan="5" class="time-input">
                            自
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                            <input type="text" class="ivu-super-input">
                            分 至
                            <input type="text" class="ivu-super-input">
                            年
                            <input type="text" class="ivu-super-input">
                            月
                            <input type="text" class="ivu-super-input">
                            日
                            <input type="text" class="ivu-super-input">
                            时
                            <input type="text" class="ivu-super-input">
                            分止

                        </td>
                    </tr>
                    <tr align="center">
                        <td>吊装内容</td>
                        <td colspan="5">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>危害辨识</td>
                        <td colspan="5">
                            <input type="text" class="ivu-super-input">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>序号</td>
                        <td colspan="4">安全措施</td>
                        <td>确认人</td>
                    </tr>
                    <tr align="center">
                        <td>1</td>
                        <td colspan="4" align="left">吊装质大于等于40t的重物和土建工程主体结构：吊装物体虽不足40t，但形状夏杂、刚
                            度小、长径比大、精密贵重，作业条件特殊，已编制吊装作业方案，且经作业主管部门和安全管理部门审查，报主管（副
                            总经理，总工程师批准)</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>2</td>
                        <td colspan="4" align="left">指派专人监护，并监守岗位，非作业人员禁止入内</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>3</td>
                        <td colspan="4" align="left">作业人员已按规定佩戴防护器具和个体防护用品</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>4</td>
                        <td colspan="4" align="left">已与分厂(车间)负责人取得联系，建立联系信号</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>5</td>
                        <td colspan="4" align="left">已在吊装现场设置安全警戒标志，无关人员不许进入作业现场</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>6</td>
                        <td colspan="4" align="left">夜间作业采用足够的照明</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>7</td>
                        <td colspan="4" align="left">室外作业遇到(大雪/暴雨大雾六级以上大风），已停止作业</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>8</td>
                        <td colspan="4" align="left">检查起重吊装设备、钢丝绳、缆风绳、链条、吊钩等各种机具，保证安全可靠</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>9</td>
                        <td colspan="4" align="left">明确分工、坚守岗位，并按规定的联络信号，统一指挥</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>10</td>
                        <td colspan="4" align="left">将建筑物、构筑物作为锚点，需经工程处审查核算并批准</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>11</td>
                        <td colspan="4" align="left">吊装绳索，缆风绳、拖拉绳等避免同带电线路接触，并保持安全距离</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>12</td>
                        <td colspan="4" align="left">人员随同吊装重物或吊装机械升降，应采取可靠的安全措施，并经过现场指挥人员批准</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>13</td>
                        <td colspan="4" align="left">利用管道、管架、电杆、机电设备等作吊装锚点，不准吊装</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>14</td>
                        <td colspan="4" align="left">县吊重物下方站人、通行和工作，不准吊装</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>15</td>
                        <td colspan="4" align="left">超负荷或重物质量不明，不准吊装</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>16</td>
                        <td colspan="4" align="left">斜拉重物、重物埋在地下或重物坚固不牢，绳打结、绳不齐，不准吊装</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>17</td>
                        <td colspan="4" align="left">棱角重物没有衬垫措施，不准吊装</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>18</td>
                        <td colspan="4" align="left">安全装置失灵，不准吊装</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>19</td>
                        <td colspan="4" align="left">用定型起重吊装机械(履带吊车轮胎吊车矫式吊车等)进行吊装作业，遵守该定型机械的操作规程</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>20</td>
                        <td colspan="4" align="left">作业过程中应先用低高度、短行程试吊</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>21</td>
                        <td colspan="4" align="left">作业现场出现危险品泄漏，立即停止作业，撤离人员</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>22</td>
                        <td colspan="4" align="left">作业完成后现场杂物已清理</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>23</td>
                        <td colspan="4" align="left">吊装作业人员持有法定的有效的证件</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>24</td>
                        <td colspan="4" align="left">地下通讯电(光)缆、局域网络电(光)缆、排水沟的盖板，承重吊装机械的负重量已确认，保护措施已落实</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>25</td>
                        <td colspan="4" align="left">起吊物的质（ ）t，经确认，在吊装机械的承重范围</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>26</td>
                        <td colspan="4" align="left">在吊装高度的管线、电缆桥架已做好防护措施</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>27</td>
                        <td colspan="4" align="left">作业现场围栏、警戒线、警告牌、夜间警示灯已按要求设置</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>28</td>
                        <td colspan="4" align="left">作业高度和转臂范围内，无架空线路</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>29</td>
                        <td colspan="4" align="left">人员出入口和撤离安全措施已落实:A.指示牌:B.指示灯</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>30</td>
                        <td colspan="4" align="left">在爆炸危险生产区域内作业，机动车排气管已装火星熄灭器</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>31</td>
                        <td colspan="4" align="left">现场夜间有充足照明:36V、 24V、12V防水型灯；36V、24V、12V防爆型灯</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td>32</td>
                        <td colspan="4" align="left">作业人员已佩戴防护器具</td>
                        <td><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td rowspan="2">33</td>
                        <td colspan="4" align="left">
                            其他安全措施:
                            <input type="text" class="ivu-super-input" style="width: 70%">
                        </td>
                        <td rowspan="2"><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr align="center">
                        <td colspan="4" align="right">
                            编制人:
                            <input type="text" class="ivu-super-input" style="width: 20%">
                        </td>
                    </tr>
                    <tr align="center">
                        <td>实施安全教育人</td>
                        <td><input type="text" class="ivu-super-input"></td>
                        <td colspan="2"><input type="text" class="ivu-super-input"></td>
                        <td colspan="2"><input type="text" class="ivu-super-input"></td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            生产单位安全部门负责人(签字):
                            <input type="text" class="ivu-super-input" style="width: 50%">
                        </td>
                        <td colspan="3">
                            生产单位负责人(签字): <input type="text" class="ivu-super-input" style="width: 50%">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            作业单位安全部门负责人(签字):
                            <input type="text" class="ivu-super-input" style="width: 50%">
                        </td>
                        <td colspan="3">
                            作业单位负责人(签字): <input type="text" class="ivu-super-input" style="width: 50%">
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="6" align="left">
                            <div class="ivu-block ivu-mt-8">
                                <div>审批部门意见:
                                    <input type="text" class="ivu-super-input" style="width: 70%;">
                                </div>
                            </div>
                            <div class="ivu-block ivu-text-right ivu-mt-8 ivu-mb-8">
                                <div class="ivu-inline-block ivu-mr-8">
                                    签字:
                                    <input type="text" class="ivu-super-input" style="width: 40px">
                                </div>
                                <div class="ivu-inline-block time-input">
                                    <input type="text" class="ivu-super-input">
                                    年
                                    <input type="text" class="ivu-super-input">
                                    月
                                    <input type="text" class="ivu-super-input">
                                    日
                                    <input type="text" class="ivu-super-input">
                                    时
                                    <input type="text" class="ivu-super-input">
                                    分
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="ivu-block ivu-text-center ivu-mt-16">
                    <div class="ivu-block ys-content ivu-border" v-if="table.state===3">
                        <div class="ys-title">验收照片</div>
                        <div class="ys-img-box">
                            <img src="/assets/images/u1946.svg" alt="">
                            <img src="/assets/images/u1946.svg" alt="">
                        </div>
                    </div>
                    <div class="ivu-block" style="width: 70%;margin-left: auto;margin-right: auto;" v-else>
                        <Form :label-width="140">
                            <FormItem label="选择下一步审核人">
                                <Select placeholder="请选择抄送人..." style="width: 150px" class="ivu-mr-8">
                                    <Option value="张三">张三</Option>
                                </Select>
                                <Button class="ivu-mr-8">提交</Button>
                                <Button class="ivu-mr-8">暂存</Button>
                                <Button>取消</Button>
                            </FormItem>
                        </Form>
                    </div>

                </div>
            </div>
            <div class="special-progress">
                <Steps :current="2" direction="vertical">
                    <Step title="待审批" content="还没有人审批，等待审批中"></Step>
                    <Step title="审批流程中" content="审批已进入到______"></Step>
                    <Step title="已完成审批" content="审批完成，正在施工"></Step>
                    <Step title="完工验收" content="未上传验收照片"></Step>
                </Steps>
            </div>
        </div>
        <Modal
                v-model="modal.modal1.status"
                title="确定删除?"
                @on-ok="submit(1)">
            <div class="ivu-block ivu-p-8">
                <p>您正在进行删除操作,请确定是否继续进行.</p>
            </div>
        </Modal>
    </main>
</template>
<script>
    import { mapState } from 'vuex';
    import { getSpecialAssignmentsMenu } from '@api/account';
    import Config from '@/config';

    export default {
        name: 'dashboard-console',
        data () {
            return {
                logoDesc: Config.logo.logoDesc,
                title: '特殊作业',
                menuList: [],
                btnArr: [],
                table: {
                    state: 3
                },
                modal: {
                    modal1: {
                        status: false,
                        index: undefined,
                        key: undefined,
                        id: undefined
                    },
                    modal2: {
                        fileTypeList: [], // 所有的文件类型
                        status: false,
                        state: 1,
                        title: '添加文件',
                        fileName: '',
                        category: '',
                        fileType: '',
                        filePath: '' // 返回id 还是路劲
                    }
                }
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'isTablet',
                'isDesktop',
                'screenHeight',
                'menuCollapse'
            ])
        },
        created () {
            let that = this;
            getSpecialAssignmentsMenu().then(async res => {
                that.menuList = res.menu
                console.log(that.menuList)
                this.setMenuClass(res.menu)
            }).catch(err => {
                console.log('err', err)
            })
        },
        mounted () {
            // 设置屏幕的宽度高度
            this.$refs.right.style.height = this.screenHeight + 'px'
            this.$refs.left.style.height = this.screenHeight + 'px'
        },
        methods: {
            setMenuClass (data) {
                let tempArr = []
                data.some((item, key, arr) => {
                    tempArr.push([])
                    item.children.some((value, index, a) => {
                        if (key === 0 && index === 0) {
                            // 默认第一个选中
                            this.getTableDataById(value.id)
                            tempArr[key].push({
                                state: true
                            })
                        } else {
                            tempArr[key].push({
                                state: false
                            })
                        }
                    })
                })
                this.btnArr = tempArr
            },
            selectThisBtn (index, key) {
                // 点击按钮切换颜色
                this.btnArr.some((item, key, arr) => {
                    item.some((v, i, arr) => {
                        this.btnArr[key][i].state = false
                    })
                })
                this.btnArr[index][key].state = true
                // todo 更换右侧表单的数据
                let that = this
                let id = this.menuList[index].children[key].id
                setTimeout(() => {
                    that.getTableDataById(id)
                }, 500)
            },
            getTableDataById (id = 0) {
                console.log('id', id)
                // let param = {
                //     id: id
                // }
                // getTrainingTableByParam(param).then(async res => {
                //     this.table.data = res.tableData.data
                //     this.table.loading = false
                // })
            },
            changeTabs (index) {
                // 点击tab分页 如果只在一个页面 页面数据会混淆
                // let that = this;
                if (index === 0) {
                } else if (index === 1) {
                    this.$router.push('practitioners')
                } else if (index === 2) {
                    this.$router.push('outsiders')
                }
            },
            modalAction (id, index, key) {
                this.modal.modal1.status = true
                this.modal.modal1.id = id
                this.modal.modal1.index = index
                this.modal.modal1.key = key
            },
            submit (state) {
                if (state === 1) {
                    // todo let id = this.modal.modal1.id
                    let key = this.modal.modal1.key
                    let index = this.modal.modal1.index
                    this.menuList[key].children.splice(index, 1)
                    // 清除按钮里面对应的数据
                    this.btnArr[key].splice(index, 1)
                    this.$Message.success('删除成功!')
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .s-title {
        width: 50%;
        display: inline-block;
        line-height: 40px;
    }
    .s-box {
        width: 49%;
        text-align: right;
    }
    .regime-btn {
        width: 100%;
        margin-bottom: 8px;
        line-height: 32px;
        overflow: hidden;
        div:first-child {
            width: 47%;
            text-align: left;
        }
        div:nth-child(2) {
            width: 35%;
        }
    }
    .special-table {
        width: 75%;
        margin-left: 4%;
        height: 100%;
        float: left;
        display: inline-block;
        color: #cfcfcf;
        .s-table-header {
            background-color: #494949;
        }
        .time-input {
            .ivu-super-input {
                width: 30px;
            }
        }
    }
    .special-progress {
        width: 16%;
        margin-left: 1%;
        display: inline-block;
    }
    .full {
        width: 100%;
    }
    .ys-content {
        height: 150px;
        .ys-title {
            width: 20%;
            border-right: 1px solid #7e7e7e;
            line-height: 150px;
            height: 100%;
            float: left;
        }
        .ys-img-box {
            margin-left: 16px;
            float: left;
            width: 65%;
            height: 100%;
            display: flex;
            align-items: center;
            img {
                max-width: 30%;
                float: left;
                margin-right: 10px;
                vertical-align: middle;
                align-items: center;
            }
        }
    }
</style>
