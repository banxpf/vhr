(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32db800e"],{"58da":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("div",[a("el-input",{staticStyle:{width:"300px","margin-right":"8px"},attrs:{size:"small",type:"text",placeholder:"请输入员工名...","prefix-icon":"el-icon-search",clearable:"",disabled:e.showTopSearch},on:{clear:e.initEmps},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.initEmps(t)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search",disabled:e.showTopSearch},on:{click:e.initEmps}},[e._v("搜索")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.showTopSearch=!e.showTopSearch}}},[a("i",{staticClass:"fa fa-angle-double-down",attrs:{"aria-hidden":"true"}}),e._v(" 高级搜索")])],1),a("div",[a("el-button",{staticStyle:{"margin-top":"8px"},attrs:{type:"danger",size:"small",disabled:0==e.multipleSelection},on:{click:e.manyDelete}},[e._v("批量删除")]),a("el-upload",{staticClass:"empUpload",attrs:{action:"/employee/basic/import","show-file-list":!1,"before-upload":e.beforeUpload,"on-success":e.onSuccess,"on-error":e.onError,disabled:e.importDataBtnDisable}},[a("el-button",{attrs:{disabled:e.importDataBtnDisable,size:"small",type:"success",icon:e.importDataBtnIcon}},[e._v(" "+e._s(e.importDataBtnText))])],1),a("el-button",{attrs:{size:"small",type:"success",icon:"el-icon-download"},on:{click:e.exportData}},[e._v(" 导出表格")]),a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.editEmp}},[e._v("添加用户")])],1)]),a("transition",{attrs:{name:"el-zoom-in-top"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.showTopSearch,expression:"showTopSearch"}],staticStyle:{border:"1px solid #409eff","border-radius":"5px","box-sizing":"border-box",padding:"5px",margin:"10px 0px"}},[a("el-row",[a("el-col",{attrs:{span:5}},[e._v(" 政治面貌: "),a("el-select",{staticStyle:{width:"130px","margin-left":"8px"},attrs:{size:"mini",placeholder:"请选择"},model:{value:e.searchValue.politicId,callback:function(t){e.$set(e.searchValue,"politicId",t)},expression:"searchValue.politicId"}},e._l(e.politicsstatus,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-col",{attrs:{span:4}},[e._v(" 民族:"),a("el-select",{staticStyle:{width:"130px","margin-left":"8px"},attrs:{size:"mini",placeholder:"请选择民族..."},model:{value:e.searchValue.nationId,callback:function(t){e.$set(e.searchValue,"nationId",t)},expression:"searchValue.nationId"}},e._l(e.nations,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-col",{attrs:{span:4}},[e._v(" 职位: "),a("el-select",{staticStyle:{width:"130px","margin-left":"8px"},attrs:{size:"mini",placeholder:"请选择职位..."},model:{value:e.searchValue.posId,callback:function(t){e.$set(e.searchValue,"posId",t)},expression:"searchValue.posId"}},e._l(e.positions,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-col",{attrs:{span:4}},[e._v(" 职称:"),a("el-select",{staticStyle:{width:"130px","margin-left":"8px"},attrs:{size:"mini",placeholder:"请选择职称..."},model:{value:e.searchValue.jobLevelId,callback:function(t){e.$set(e.searchValue,"jobLevelId",t)},expression:"searchValue.jobLevelId"}},e._l(e.jobLevels,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-col",{attrs:{span:7}},[e._v(" 聘用形式: "),a("el-radio-group",{model:{value:e.searchValue.engageForm,callback:function(t){e.$set(e.searchValue,"engageForm",t)},expression:"searchValue.engageForm"}},[a("el-radio",{attrs:{label:"劳动合同"}},[e._v("劳动合同")]),a("el-radio",{attrs:{label:"劳务合同"}},[e._v("劳务合同")])],1)],1)],1),a("el-row",{staticStyle:{"margin-top":"10px"}},[a("el-col",{attrs:{span:5}},[e._v(" 所属部门: "),a("el-popover",{attrs:{placement:"right",title:"请选择部门",width:"200px",trigger:"manual"},model:{value:e.visible1,callback:function(t){e.visible1=t},expression:"visible1"}},[a("el-tree",{attrs:{data:e.deps,props:e.defaultProps,"default-expand-all":""},on:{"node-click":e.searchNodeClick}}),a("div",{staticClass:"empDep1",attrs:{slot:"reference"},on:{click:function(t){e.visible1=!e.visible1}},slot:"reference"},[e._v(e._s(e.searchValueName))])],1)],1),a("el-col",{attrs:{span:10}},[e._v(" 入职日期： "),a("el-date-picker",{attrs:{size:"mini",type:"daterange","unlink-panels":"","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.searchValue.beginDateScope,callback:function(t){e.$set(e.searchValue,"beginDateScope",t)},expression:"searchValue.beginDateScope"}})],1),a("el-col",{attrs:{span:5,offset:4}},[a("el-button",{attrs:{size:"mini"}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:function(t){return e.initEmps(!1)}}},[e._v("搜索")])],1)],1)],1)]),a("div",[a("div",{staticStyle:{"margin-top":"10px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.emps,border:"",stripe:"",size:"small"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"name",fixed:"",align:"left",label:"姓名",width:"90"}}),a("el-table-column",{attrs:{prop:"workID",label:"工号",align:"left",width:"85"}}),a("el-table-column",{attrs:{prop:"gender",align:"left",label:"性别",width:"55"}}),a("el-table-column",{attrs:{prop:"birthday",label:"出生日期",width:"100"}}),a("el-table-column",{attrs:{prop:"idCard",label:"身份证号码",width:"185"}}),a("el-table-column",{attrs:{prop:"wedlock",label:"婚姻状况",width:"80"}}),a("el-table-column",{attrs:{prop:"nation.name",label:"民族",width:"55"}}),a("el-table-column",{attrs:{prop:"nativePlace",label:"籍贯",width:"70"}}),a("el-table-column",{attrs:{prop:"politicsstatus.name",label:"政治面貌",width:"70"}}),a("el-table-column",{attrs:{prop:"email",label:"电子邮件",width:"180"}}),a("el-table-column",{attrs:{prop:"phone",label:"电话号码",width:"100"}}),a("el-table-column",{attrs:{prop:"address",label:"联系地址",width:"220"}}),a("el-table-column",{attrs:{prop:"department.name",label:"所属部门",width:"100"}}),a("el-table-column",{attrs:{prop:"position.name",label:"职位",width:"100"}}),a("el-table-column",{attrs:{prop:"jobLevel.name",label:"职称",width:"100"}}),a("el-table-column",{attrs:{prop:"engageForm",label:"聘用形式",width:"100"}}),a("el-table-column",{attrs:{prop:"specialty",label:"专业",width:"120"}}),a("el-table-column",{attrs:{prop:"school",label:"毕业院校",width:"120"}}),a("el-table-column",{attrs:{prop:"tiptopDegree",label:"最高学历",width:"80"}}),a("el-table-column",{attrs:{prop:"beginDate",label:"入职日期",width:"150"}}),a("el-table-column",{attrs:{prop:"conversionTime",label:"转正日期",width:"150"}}),a("el-table-column",{attrs:{prop:"beginContract",label:"合同起始日期",width:"150"}}),a("el-table-column",{attrs:{prop:"endContract",label:"合同截止日期",width:"150"}}),a("el-table-column",{attrs:{label:"合同期限",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{size:"mini"}},[e._v(e._s(t.row.contractTerm)+"年")])]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.updateEmp(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("高级资料")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.deleteEmp(t.row)}}},[e._v("删除")])]}}])})],1)],1),a("div",{staticStyle:{display:"flex","justify-content":"flex-end"}},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.sizeChange,"current-change":e.currentChange}})],1)]),a("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"empForm",attrs:{rules:e.rules,model:e.emp}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"姓名:",prop:"name"}},[a("el-input",{staticClass:"empInput",attrs:{size:"mini","prefix-icon":"el-icon-edit",placeholder:"请输入员工姓名..."},model:{value:e.emp.name,callback:function(t){e.$set(e.emp,"name",t)},expression:"emp.name"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:" 性别：",prop:"gender"}},[a("el-radio-group",{model:{value:e.emp.gender,callback:function(t){e.$set(e.emp,"gender",t)},expression:"emp.gender"}},[a("el-radio",{attrs:{label:"男"}},[e._v("男")]),a("el-radio",{attrs:{label:"女"}},[e._v("女")])],1)],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"出生日期:",prop:"birthday"}},[a("el-date-picker",{attrs:{type:"date",size:"mini","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.emp.birthday,callback:function(t){e.$set(e.emp,"birthday",t)},expression:"emp.birthday"}})],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"政治面貌:",prop:"politicId"}},[a("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:e.emp.politicId,callback:function(t){e.$set(e.emp,"politicId",t)},expression:"emp.politicId"}},e._l(e.politicsstatus,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"民族:",prop:"nationId"}},[a("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:e.emp.nationId,callback:function(t){e.$set(e.emp,"nationId",t)},expression:"emp.nationId"}},e._l(e.nations,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"籍贯:",prop:"nativePlace"}},[a("el-input",{staticStyle:{width:"120px"},attrs:{size:"mini","prefix-icon":"el-icon-edit",placeholder:"请输入籍贯..."},model:{value:e.emp.nativePlace,callback:function(t){e.$set(e.emp,"nativePlace",t)},expression:"emp.nativePlace"}})],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"电子邮箱:",prop:"email"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{size:"mini","prefix-icon":"el-icon-edit",placeholder:"请输入电子邮件..."},model:{value:e.emp.email,callback:function(t){e.$set(e.emp,"email",t)},expression:"emp.email"}})],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"联系地址:",prop:"address"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini","prefix-icon":"el-icon-edit",placeholder:"请输入员工姓名..."},model:{value:e.emp.address,callback:function(t){e.$set(e.emp,"address",t)},expression:"emp.address"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"职位:",prop:"posId"}},[a("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:e.emp.posId,callback:function(t){e.$set(e.emp,"posId",t)},expression:"emp.posId"}},e._l(e.positions,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"职称:",prop:"jobLevelId"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",placeholder:"请选择"},model:{value:e.emp.jobLevelId,callback:function(t){e.$set(e.emp,"jobLevelId",t)},expression:"emp.jobLevelId"}},e._l(e.jobLevels,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"所属部门:",prop:"departmentId"}},[a("el-popover",{attrs:{placement:"right",title:"请选择部门",width:"200",trigger:"manual"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("el-tree",{attrs:{data:e.deps,props:e.defaultProps,"default-expand-all":""},on:{"node-click":e.handleNodeClick}}),a("div",{staticClass:"empDep",attrs:{slot:"reference"},on:{click:function(t){e.visible=!e.visible}},slot:"reference"},[e._v(e._s(e.divDepName))])],1)],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"电话号码:",prop:"phone"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini","prefix-icon":"el-icon-phone"},model:{value:e.emp.phone,callback:function(t){e.$set(e.emp,"phone",t)},expression:"emp.phone"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"工号:",prop:"workID"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{disabled:"",size:"mini"},model:{value:e.emp.workID,callback:function(t){e.$set(e.emp,"workID",t)},expression:"emp.workID"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"学历:",prop:"tiptopDegree"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",placeholder:"学历"},model:{value:e.emp.tiptopDegree,callback:function(t){e.$set(e.emp,"tiptopDegree",t)},expression:"emp.tiptopDegree"}},e._l(e.tiptopDegrees,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"毕业院校:",prop:"school"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{size:"mini","prefix-icon":"el-icon-edit",placeholder:"毕业院校"},model:{value:e.emp.school,callback:function(t){e.$set(e.emp,"school",t)},expression:"emp.school"}})],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"专业名称:",prop:"specialty"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini","prefix-icon":"el-icon-edit",placeholder:"专业名称"},model:{value:e.emp.specialty,callback:function(t){e.$set(e.emp,"specialty",t)},expression:"emp.specialty"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"入职日期:",prop:"beginDate"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"date","value-format":"yyyy-MM-dd",size:"mini",placeholder:"选择日期时间"},model:{value:e.emp.beginDate,callback:function(t){e.$set(e.emp,"beginDate",t)},expression:"emp.beginDate"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"转正日期:",prop:"conversionTime"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"date","value-format":"yyyy-MM-dd",size:"mini",placeholder:"选择日期时间"},model:{value:e.emp.conversionTime,callback:function(t){e.$set(e.emp,"conversionTime",t)},expression:"emp.conversionTime"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"合同起始日期:",prop:"beginContract"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"date","value-format":"yyyy-MM-dd",size:"mini",placeholder:"选择日期时间"},model:{value:e.emp.beginContract,callback:function(t){e.$set(e.emp,"beginContract",t)},expression:"emp.beginContract"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"合同结束日期:",prop:"endContract"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"date","value-format":"yyyy-MM-dd",size:"mini",placeholder:"选择日期时间"},model:{value:e.emp.endContract,callback:function(t){e.$set(e.emp,"endContract",t)},expression:"emp.endContract"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"身份证号码:",prop:"idCard"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini","prefix-icon":"el-icon-edit",placeholder:"身份证号码"},model:{value:e.emp.idCard,callback:function(t){e.$set(e.emp,"idCard",t)},expression:"emp.idCard"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"聘用形式:",prop:"engageForm"}},[a("el-radio-group",{model:{value:e.emp.engageForm,callback:function(t){e.$set(e.emp,"engageForm",t)},expression:"emp.engageForm"}},[a("el-radio",{attrs:{label:"劳动合同"}},[e._v("劳动合同")]),a("el-radio",{attrs:{label:"劳务合同"}},[e._v("劳务合同")])],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"婚姻状况:",prop:"wedlock"}},[a("el-radio-group",{model:{value:e.emp.wedlock,callback:function(t){e.$set(e.emp,"wedlock",t)},expression:"emp.wedlock"}},[a("el-radio",{attrs:{label:"未婚"}},[e._v("未婚")]),a("el-radio",{attrs:{label:"已婚"}},[e._v("已婚")]),a("el-radio",{attrs:{label:"离异"}},[e._v("离异")])],1)],1)],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addEmp}},[e._v("确 定")])],1)],1)],1)},l=[],s=(a("4160"),a("b0c0"),a("159b"),a("7c15")),o={name:"EmpBasic",data:function(){return{searchValue:{politicId:"",nationId:"",jobLevelId:"",posId:"",engageForm:"",departmentId:null,beginDateScope:null},searchValueName:"请选择部门",title:"",importDataBtnText:"导入数据",importDataBtnIcon:"el-icon-upload2",importDataBtnDisable:!1,showTopSearch:!1,emps:[],loading:!0,total:0,page:1,size:10,keyword:"",divDepName:"",dialogVisible:!1,visible:!1,visible1:!1,nations:[],jobLevels:[],politicsstatus:[],positions:[],deps:[],tiptopDegrees:["博士","硕士","本科","大专","高中","初中","小学","其他"],emp:{name:"徐鹏飞",gender:"男",birthday:"1990-01-01",idCard:"610122199001011256",wedlock:"已婚",nationId:1,nativePlace:"陕西",politicId:13,email:"laowang@qq.com",phone:"18565558897",address:"深圳市南山区",departmentId:5,jobLevelId:9,posId:29,engageForm:"劳务合同",tiptopDegree:"本科",specialty:"信息管理与信息系统",school:"深圳大学",beginDate:"2018-01-01",workID:"00000001",conversionTime:"2018-04-01",notworkDate:null,beginContract:"2018-01-01",endContract:"2020-01-01",workAge:null},defaultProps:{children:"children",label:"name"},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"}],gender:[{required:!0,message:"请输入员工姓名",trigger:"blur"}],birthday:[{required:!0,message:"请输入出生日期",trigger:"blur"}],idCard:[{required:!0,message:"请输入身份证号码",trigger:"blur"},{pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message:"身份证号码格式不正确",trigger:"blur"}],wedlock:[{required:!0,message:"请输入婚姻状况",trigger:"blur"}],nationId:[{required:!0,message:"请输入民族",trigger:"blur"}],nativePlace:[{required:!0,message:"请输入籍贯",trigger:"blur"}],politicId:[{required:!0,message:"请输入政治面貌",trigger:"blur"}],email:[{required:!0,message:"请输入电子邮箱",trigger:"blur"},{type:"email",message:"邮箱格式不正确",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"}],address:[{required:!0,message:"请输入联系地址",trigger:"blur"}],departmentId:[{required:!0,message:"请输入部门名称",trigger:"blur"}],jobLevelId:[{required:!0,message:"请输入职称",trigger:"blur"}],posId:[{required:!0,message:"请输入职位",trigger:"blur"}],engageForm:[{required:!0,message:"请输入聘用形式",trigger:"blur"}],tiptopDegree:[{required:!0,message:"请输入最高学历",trigger:"blur"}],specialty:[{required:!0,message:"请输入专业名称",trigger:"blur"}],school:[{required:!0,message:"请输入毕业院校",trigger:"blur"}],beginDate:[{required:!0,message:"请输入入职日期",trigger:"blur"}],workState:[{required:!0,message:"请输入工作状态",trigger:"blur"}],contractTerm:[{required:!0,message:"请输入合同期限",trigger:"blur"}],conversionTime:[{required:!0,message:"请输入转正日期",trigger:"blur"}],notworkDate:[{required:!0,message:"请输入离职日期",trigger:"blur"}],beginContract:[{required:!0,message:"请输入合同起始日期",trigger:"blur"}],endContract:[{required:!0,message:"请输入合同结束日期",trigger:"blur"}],workAge:[{required:!0,message:"请输入工龄",trigger:"blur"}]},multipleSelection:[]}},mounted:function(){this.initEmps(),this.initData(),this.initPosition(!0)},methods:{searchNodeClick:function(e){this.searchValueName=e.name,this.searchValue.departmentId=e.id,this.visible1=!1},onError:function(e,t,a){this.importDataBtnText="导入数据",this.importDataBtnIcon="el-icon-upload2",this.importDataBtnDisable=!1,this.$message.error("上传失败")},onSuccess:function(e,t,a){this.importDataBtnText="导入数据",this.importDataBtnIcon="el-icon-upload2",this.importDataBtnDisable=!1,this.initEmps(),this.$message.success("上传成功")},beforeUpload:function(){this.importDataBtnText="正在导入",this.importDataBtnIcon="el-icon-loading",this.importDataBtnDisable=!0},manyDelete:function(){var e=this;this.$confirm("此操作将永久删除【"+this.multipleSelection.length+"】条记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var t="?";e.multipleSelection.forEach((function(e){t+="ids="+e.id+"&"})),Object(s["b"])("/employee/basic/many"+t,"delete").then((function(t){t&&e.initEmps()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},handleSelectionChange:function(e){this.multipleSelection=e},exportData:function(){window.open("/employee/basic/export","_parent")},entryEmp:function(){this.emp={name:"",gender:"",birthday:"",idCard:"",wedlock:"",nationId:1,nativePlace:"",politicId:13,email:"",phone:"",address:"",departmentId:5,jobLevelId:9,posId:29,engageForm:"",tiptopDegree:"",specialty:"",school:"",beginDate:"",conversionTime:"",notworkDate:null,beginContract:"",endContract:"",workAge:null},this.divDepName="",this.initPosition(!0)},updateEmp:function(e){this.initPosition(!1),this.title="修改员工资料",this.emp=e,this.divDepName=e.department.name,this.dialogVisible=!0},deleteEmp:function(e){var t=this;this.$confirm("此操作将永久删除【"+e.name+"】, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(s["b"])("/employee/basic/"+e.id,"delete").then((function(e){e&&t.initEmps()}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},addEmp:function(){var e=this,t="";t=this.emp.id?"put":"post",this.$refs.empForm.validate((function(a){a&&Object(s["b"])("/employee/basic/",t,e.emp).then((function(t){t&&(e.dialogVisible=!1,e.initEmps(),e.entryEmp())}))}))},handleNodeClick:function(e){this.emp.departmentId=e.id,this.divDepName=e.name,this.visible=!this.visible},initPosition:function(e){var t=this;e&&Object(s["b"])("/employee/basic/workID","get").then((function(e){e&&(t.emp.workID=e.obj)})),Object(s["b"])("/employee/basic/positions","get").then((function(e){e&&(t.positions=e)}))},initData:function(){var e=this;window.sessionStorage.getItem("ntaions")?this.nations=JSON.parse(window.sessionStorage.getItem("ntaions")):Object(s["b"])("/employee/basic/nations","get").then((function(t){t&&(e.nations=t,window.sessionStorage.setItem("nations",JSON.stringify(t)))})),window.sessionStorage.getItem("jobLevels")?this.jobLevels=JSON.parse(window.sessionStorage.getItem("jobLevels")):Object(s["b"])("/employee/basic/jobLevels","get").then((function(t){t&&(e.jobLevels=t,window.sessionStorage.setItem("jobLevels",JSON.stringify(t)))})),window.sessionStorage.getItem("politicsstatus")?this.politicsstatus=JSON.parse(window.sessionStorage.getItem("politicsstatus")):Object(s["b"])("/employee/basic/politicsstatus","get").then((function(t){t&&(e.politicsstatus=t,window.sessionStorage.setItem("politicsstatus",JSON.stringify(t)))})),window.sessionStorage.getItem("deps")?this.deps=JSON.parse(window.sessionStorage.getItem("deps")):Object(s["b"])("/system/basic/department","get").then((function(t){t&&(e.deps=t,window.sessionStorage.setItem("deps",JSON.stringify(t)))}))},editEmp:function(){this.entryEmp(),this.title="添加员工",this.dialogVisible=!0},currentChange:function(e){this.page=e,this.initEmps()},sizeChange:function(e){this.size=e,this.initEmps()},initEmps:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a="/employee/basic/?page="+this.page+"&size="+this.size;t?(console.log("1235"),a+="&name="+this.keyword):(a+=this.searchValue.politicId?"&politicId="+this.searchValue.politicId:"",a+=this.searchValue.nationId?"&nationId="+this.searchValue.nationId:"",a+=this.searchValue.jobLevelId?"&jobLevelId="+this.searchValue.jobLevelId:"",a+=this.searchValue.posId?"&posId="+this.searchValue.posId:"",a+=this.searchValue.departmentId?"&departmentId="+this.searchValue.departmentId:"",a+=this.searchValue.engageForm?"&engageForm="+this.searchValue.engageForm:"",a+=this.searchValue.beginDateScope?"&beginDateScope="+this.searchValue.beginDateScope:"",this.$message.success("正在努力查找中....")),Object(s["b"])(a,"get").then((function(t){e.loading=!1,t&&(e.emps=t.data,e.total=t.total,0===t.total&&e.$message.info("未查到相关内容！"))}))}}},r=o,n=(a("ec21"),a("2877")),p=Object(n["a"])(r,i,l,!1,null,null,null);t["default"]=p.exports},8759:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div")},l=[],s={name:"EmpAdv"},o=s,r=a("2877"),n=Object(r["a"])(o,i,l,!1,null,"352a042e",null);t["default"]=n.exports},c6ed:function(e,t,a){},ec21:function(e,t,a){"use strict";var i=a("c6ed"),l=a.n(i);l.a}}]);
//# sourceMappingURL=chunk-32db800e.0d83632a.js.map