<template>
  <div>  
    <div style="display:flex;justify-content: space-between">
      <div>
        <el-input size="small" type="text" placeholder="请输入员工名..." prefix-icon="el-icon-search" 
        style="width:300px;margin-right:8px" v-model="keyword" @keydown.enter.native="initEmps"
        clearable @clear="initEmps" :disabled="showTopSearch"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="initEmps" :disabled="showTopSearch">搜索</el-button>
        <el-button size="small" type="primary" @click="showTopSearch = !showTopSearch">
          <i class="fa fa-angle-double-down" aria-hidden="true" ></i>
          高级搜索</el-button>
      </div>
      <div>
        <el-button @click="manyDelete" type="danger" size="small" style="margin-top:8px" :disabled="multipleSelection == 0">批量删除</el-button>
        <el-upload class="empUpload"  action="/employee/basic/import" 
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-error="onError"
        :disabled="importDataBtnDisable">
          <el-button :disabled="importDataBtnDisable" size="small" type="success" :icon="importDataBtnIcon"> 
            {{importDataBtnText}}</el-button>
        </el-upload>
        <el-button size="small" type="success" @click="exportData" icon="el-icon-download">
          导出表格</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="editEmp">添加用户</el-button>

      </div>
    </div>
   <transition name="el-zoom-in-top">
    <div v-show="showTopSearch" style="border:1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding:5px; margin:10px 0px;" >
      <el-row>
        <el-col :span="5">
           政治面貌: <el-select size="mini" v-model="searchValue.politicId" style="width:130px; margin-left:8px;" placeholder="请选择">
              <el-option    
                v-for="item in politicsstatus"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
          民族:<el-select size="mini" v-model="searchValue.nationId" style="width:130px; margin-left:8px;" placeholder="请选择民族...">
            <el-option    
              v-for="item in nations"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
            职位:
            <el-select size="mini" v-model="searchValue.posId" style="width:130px; margin-left:8px;"placeholder="请选择职位...">
              <el-option    
                v-for="item in positions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            职称:<el-select size="mini" style="width:130px; margin-left:8px;" v-model="searchValue.jobLevelId" placeholder="请选择职称...">
              <el-option    
                v-for="item in jobLevels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
           <el-col :span="7">
            聘用形式:
            <el-radio-group v-model="searchValue.engageForm">
              <el-radio label="劳动合同">劳动合同</el-radio>
              <el-radio label="劳务合同">劳务合同</el-radio>
            </el-radio-group>
          </el-col>
      </el-row>
      <el-row style="margin-top:10px">
          <el-col :span="5">
            所属部门:
            <el-popover
                placement="right"
                title="请选择部门"
                width="200px"
                trigger="manual"
                v-model="visible1">
                <el-tree :data="deps" :props="defaultProps" 
                default-expand-all @node-click="searchNodeClick"></el-tree>
                <div class="empDep1" slot="reference" @click="visible1 = !visible1">{{searchValueName}}</div>
              </el-popover>
          </el-col>
          <el-col :span="10" >
            入职日期：
            <el-date-picker
              v-model="searchValue.beginDateScope"
              size="mini"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5" :offset="4">
            <el-button  size="mini">取消</el-button>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="initEmps(false)">搜索</el-button>
          </el-col>
      </el-row>
    </div>
   </transition>
    <div>
      <div style="margin-top:10px">
       <el-table
        :data="emps"
        v-loading="loading"
        border
        stripe
        @selection-change="handleSelectionChange"
        size="small"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          fixed
          align="left"
          label="姓名"
          width="90">
        </el-table-column>
        <el-table-column
          prop="workID"
          label="工号"
          align="left"
          width="85">
        </el-table-column>
        <el-table-column
          prop="gender"
          align="left"
          label="性别"
          width="55">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          width="185">
        </el-table-column>
        <el-table-column
          prop="wedlock"
          label="婚姻状况"
          width="80">
        </el-table-column>
        <el-table-column
          prop="nation.name"
          label="民族"
          width="55">
        </el-table-column>
        <el-table-column
          prop="nativePlace"
          label="籍贯"
          width="70">
        </el-table-column>
        <el-table-column
          prop="politicsstatus.name"
          label="政治面貌"
          width="70">
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮件"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系地址"
          width="220">
        </el-table-column>
        <el-table-column
          prop="department.name"
          label="所属部门"
          width="100">
        </el-table-column>
        <el-table-column
          prop="position.name"
          label="职位"
          width="100">
        </el-table-column>
        <el-table-column
          prop="jobLevel.name"
          label="职称"
          width="100">
       </el-table-column>          
        <el-table-column
          prop="engageForm"
          label="聘用形式"
          width="100">       
        </el-table-column>
        <el-table-column
          prop="specialty"
          label="专业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="school"
          label="毕业院校"
          width="120">
        </el-table-column>
        <el-table-column
          prop="tiptopDegree"
          label="最高学历"
          width="80">
        </el-table-column>
        <el-table-column
          prop="beginDate"
          label="入职日期"
          width="150">
        </el-table-column>  
        <el-table-column
          prop="conversionTime"
          label="转正日期"
          width="150">
        </el-table-column>  
        <el-table-column
          prop="beginContract"
          label="合同起始日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="endContract"
          label="合同截止日期"
          width="150">  
        </el-table-column>
        <el-table-column
          label="合同期限"
          width="100">
          <template slot-scope="scope">
            <el-tag size="mini">{{scope.row.contractTerm}}年</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                   fixed="right"
                   width="300px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateEmp(scope.row)">编辑</el-button>
          <el-button
          <el-button
            size="mini"
            type="primary">高级资料</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteEmp(scope.row)">删除</el-button>
        </template>
        </el-table-column>
        </el-table>
      </div>      
      <div style="display:flex;justify-content: flex-end">
        <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%">
      <el-form :rules="rules" ref="empForm" :model="emp">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名:" prop="name">
              <el-input class="empInput" size="mini" prefix-icon="el-icon-edit" v-model="emp.name" placeholder="请输入员工姓名..."/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label=" 性别：" prop="gender">
              <el-radio-group v-model="emp.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="出生日期:" prop="birthday">
              <el-date-picker
                v-model="emp.birthday"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="政治面貌:" prop="politicId">
              <el-select size="mini" v-model="emp.politicId" placeholder="请选择">
                <el-option    
                  v-for="item in politicsstatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="民族:" prop="nationId">
              <el-select size="mini" v-model="emp.nationId" placeholder="请选择">
                <el-option    
                  v-for="item in nations"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="籍贯:" prop="nativePlace">
              <el-input style="width:120px" size="mini" prefix-icon="el-icon-edit" v-model="emp.nativePlace" placeholder="请输入籍贯..."/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="电子邮箱:" prop="email">
              <el-input style="width:220px" size="mini" prefix-icon="el-icon-edit" v-model="emp.email" placeholder="请输入电子邮件..."/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系地址:" prop="address">
              <el-input style="width:200px" size="mini" prefix-icon="el-icon-edit" v-model="emp.address" placeholder="请输入员工姓名..."/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="职位:" prop="posId">
              <el-select size="mini" v-model="emp.posId" placeholder="请选择">
                <el-option    
                  v-for="item in positions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="职称:" prop="jobLevelId">
              <el-select size="mini" style="width:120px" v-model="emp.jobLevelId" placeholder="请选择">
                <el-option    
                  v-for="item in jobLevels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="所属部门:" prop="departmentId">
                <el-popover
                  placement="right"
                  title="请选择部门"
                  width="200"
                  trigger="manual"
                  v-model="visible">
                  <el-tree :data="deps" :props="defaultProps" 
                  default-expand-all @node-click="handleNodeClick"></el-tree>
                  <div class="empDep" slot="reference" @click="visible = !visible">{{divDepName}}</div>
                </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="电话号码:" prop="phone">
              <el-input style="width:200px" size="mini" prefix-icon="el-icon-phone" v-model="emp.phone"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="工号:" prop="workID">
              <el-input style="width:200px" disabled size="mini" v-model="emp.workID"/>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="4">
              <el-form-item label="学历:" prop="tiptopDegree">
                <el-select size="mini" style="width:120px" v-model="emp.tiptopDegree" placeholder="学历">
                  <el-option    
                    v-for="item in tiptopDegrees"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="毕业院校:" prop="school">
                <el-input style="width:220px" size="mini" prefix-icon="el-icon-edit" v-model="emp.school" placeholder="毕业院校"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="专业名称:" prop="specialty">
                <el-input style="width:200px" size="mini" prefix-icon="el-icon-edit" v-model="emp.specialty" placeholder="专业名称"/>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="入职日期:" prop="beginDate">
              <el-date-picker
                v-model="emp.beginDate"
                type="date"
                value-format="yyyy-MM-dd"
                size="mini"
                style="width: 150px;"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="转正日期:" prop="conversionTime">
              <el-date-picker
                v-model="emp.conversionTime"
                type="date"
                value-format="yyyy-MM-dd"
                size="mini"
                style="width: 150px;"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同起始日期:" prop="beginContract">
              <el-date-picker
                v-model="emp.beginContract"
                type="date"
                value-format="yyyy-MM-dd"
                size="mini"
                style="width: 150px;"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同结束日期:" prop="endContract">
              <el-date-picker
                v-model="emp.endContract"
                type="date"
                value-format="yyyy-MM-dd"
                size="mini"
                style="width: 150px;"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="身份证号码:" prop="idCard">
              <el-input style="width:200px" size="mini" prefix-icon="el-icon-edit" v-model="emp.idCard" placeholder="身份证号码"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="聘用形式:" prop="engageForm">
              <el-radio-group v-model="emp.engageForm">
                <el-radio label="劳动合同">劳动合同</el-radio>
                <el-radio label="劳务合同">劳务合同</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况:" prop="wedlock">
              <el-radio-group v-model="emp.wedlock">
                <el-radio label="未婚">未婚</el-radio>
                <el-radio label="已婚">已婚</el-radio>
                <el-radio label="离异">离异</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addEmp">确 定</el-button>
      </span>
    </el-dialog>
  
  </div>

</template>

<script>
import { manyRequest } from '../../utils/api';
  export default {
    name: 'EmpBasic',
    data() {
      return {
        searchValue: {
          politicId: '',
          nationId: '',
          jobLevelId: '',
          posId: '',
          engageForm:'',
          departmentId: null,
          beginDateScope: null,
        },
        searchValueName:'请选择部门',
        title:'',
        importDataBtnText: '导入数据',
        importDataBtnIcon:'el-icon-upload2',
        importDataBtnDisable: false,
        showTopSearch: false,
        emps:[],
        loading: true,
        total: 0,
        page: 1,
        size: 10,
        keyword: '',
        divDepName: '',
        dialogVisible: false,
        visible:false,
        visible1:false,
        nations: [],
        jobLevels: [],
        politicsstatus: [],
        positions: [],
        deps:[],
        tiptopDegrees:['博士','硕士','本科','大专','高中','初中','小学','其他'],
        emp:   {
            name: "徐鹏飞",
            gender: "男",
            birthday: "1990-01-01",
            idCard: "610122199001011256",
            wedlock: "已婚",
            nationId: 1,
            nativePlace: "陕西",
            politicId: 13,
            email: "laowang@qq.com",
            phone: "18565558897",
            address: "深圳市南山区",
            departmentId: 5,
            jobLevelId: 9,
            posId: 29,
            engageForm: "劳务合同",
            tiptopDegree: "本科",
            specialty: "信息管理与信息系统",
            school: "深圳大学",
            beginDate: "2018-01-01",
            workID: "00000001",
            conversionTime: "2018-04-01",
            notworkDate: null,
            beginContract: "2018-01-01",
            endContract: "2020-01-01",
            workAge: null
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules:{
          name: [{required: true, message: '请输入用户名', trigger: 'blur' }],
          gender: [{required: true, message: '请输入员工姓名', trigger: 'blur' }],
          birthday: [{required: true, message: '请输入出生日期', trigger: 'blur' }],
          idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur' },
              {pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
              message:'身份证号码格式不正确',trigger: 'blur' }],
          wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur' }],
          nationId: [{required: true, message: '请输入民族', trigger: 'blur' }],
          nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur' }],
          politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur' }],
          email: [{required: true, message: '请输入电子邮箱', trigger: 'blur' },
                  {type:'email',message:'邮箱格式不正确',trigger: 'blur'}],
          phone: [{required: true, message: '请输入手机号码', trigger: 'blur' }],
          address: [{required: true, message: '请输入联系地址', trigger: 'blur' }],
          departmentId: [{required: true, message: '请输入部门名称', trigger: 'blur' }],
          jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur' }],
          posId: [{required: true, message: '请输入职位', trigger: 'blur' }],
          engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur' }],
          tiptopDegree: [{required: true, message: '请输入最高学历', trigger: 'blur' }],
          specialty: [{required: true, message: '请输入专业名称', trigger: 'blur' }],
          school: [{required: true, message: '请输入毕业院校', trigger: 'blur' }],
          beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur' }],
          workState: [{required: true, message: '请输入工作状态', trigger: 'blur' }],
          // workID: [{required: true, message: '请输入工号', trigger: 'blur' }],
          contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur' }],
          conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur' }],
          notworkDate: [{required: true, message: '请输入离职日期', trigger: 'blur' }],
          beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur' }],
          endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur' }],
          workAge: [{required: true, message: '请输入工龄', trigger: 'blur' }],
        },
        multipleSelection: [],
      }
    },
    mounted() {
      this.initEmps();
      this.initData();
      this.initPosition(true);
    },
    methods: {      
      searchNodeClick(data) {
        this.searchValueName = data.name;
        this.searchValue.departmentId = data.id;
        this.visible1 = false;
      },
      onError(err, file, fileList) {
        this.importDataBtnText = "导入数据";
        this.importDataBtnIcon = "el-icon-upload2"
        this.importDataBtnDisable= false;
        this.$message.error('上传失败');
      },
      onSuccess(response, file, fileList) {
        this.importDataBtnText = "导入数据";
        this.importDataBtnIcon = "el-icon-upload2"
        this.importDataBtnDisable= false;
        this.initEmps();
        this.$message.success('上传成功');
      },
      beforeUpload() {
        this.importDataBtnText = "正在导入";
        this.importDataBtnIcon = "el-icon-loading"
        this.importDataBtnDisable=true
      },
      manyDelete() {
        this.$confirm('此操作将永久删除【'+this.multipleSelection.length+'】条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = '?';
          this.multipleSelection.forEach(item => {
            ids += 'ids='+item.id + '&'
          })
          manyRequest("/employee/basic/many"+ids, "delete") 
            .then (res => {
              if (res) {
                this.initEmps();
              }
            }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleSelectionChange(check) {
        this.multipleSelection = check;
      },
      exportData() {
        window.open('/employee/basic/export', '_parent')
      },
      entryEmp() {
        this.emp =  {
            name: "",
            gender: "",
            birthday: "",
            idCard: "",
            wedlock: "",
            nationId: 1,
            nativePlace: "",
            politicId: 13,
            email: "",
            phone: "",
            address: "",
            departmentId: 5,
            jobLevelId: 9,
            posId: 29,
            engageForm: "",
            tiptopDegree: "",
            specialty: "",
            school: "",
            beginDate: "",
            // workID: "",
            conversionTime: "",
            notworkDate: null,
            beginContract: "",
            endContract: "",
            workAge: null
        }
        this.divDepName = ''
        this.initPosition(true);
      },
      updateEmp(data){
        this.initPosition(false);
        this.title='修改员工资料';
        this.emp = data;
        this.divDepName = data.department.name;
        this.dialogVisible =true
      },
      deleteEmp(data) {
        this.$confirm('此操作将永久删除【'+data.name+'】, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          manyRequest("/employee/basic/"+data.id, "delete") 
            .then (res => {
              if (res) {
                this.initEmps();
              }
            }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      addEmp() {
        let req = '';
        if (this.emp.id) {
          req = 'put';
        } else {
          req = 'post';
        }
        this.$refs.empForm.validate((valid) => {
          if (valid) {
            manyRequest('/employee/basic/', req, this.emp)
            .then(res => {
              if (res) {
                this.dialogVisible =false;
                this.initEmps();
                this.entryEmp();
              }
            })
          }
        })

      },
      handleNodeClick(data) {
        this.emp.departmentId = data.id;
        this.divDepName = data.name;
        this.visible = !this.visible;
      },
      initPosition(flag) {
        if (flag) {
          manyRequest('/employee/basic/workID','get')
            .then(res => {
              if (res) {
                this.emp.workID = res.obj;
              }
            })
        }

        manyRequest('/employee/basic/positions','get')
          .then(res => {
            if (res) {
              this.positions = res;
            }
          })

      },
      initData() {
        if (!window.sessionStorage.getItem('ntaions')) {
          manyRequest('/employee/basic/nations','get')
            .then(res => {
              if (res) {
               this.nations = res;
               window.sessionStorage.setItem('nations',JSON.stringify(res))
              }
            })
        } else {
          this.nations = JSON.parse(window.sessionStorage.getItem('ntaions'))
        }
        if (!window.sessionStorage.getItem('jobLevels')) {
          manyRequest('/employee/basic/jobLevels','get')
            .then(res => {
              if (res) {
               this.jobLevels = res;
               window.sessionStorage.setItem('jobLevels',JSON.stringify(res))
              }
            })
        } else {
          this.jobLevels = JSON.parse(window.sessionStorage.getItem('jobLevels'))
        }
        if (!window.sessionStorage.getItem('politicsstatus')) {
          manyRequest('/employee/basic/politicsstatus','get')
            .then(res => {
              if (res) {
               this.politicsstatus = res;
               window.sessionStorage.setItem('politicsstatus',JSON.stringify(res))
              }
            })
        } else {
          this.politicsstatus = JSON.parse(window.sessionStorage.getItem('politicsstatus'));
        }
        if (!window.sessionStorage.getItem('deps')) {
          manyRequest('/system/basic/department','get')
            .then(res => {
              if (res) {
               this.deps = res;
               window.sessionStorage.setItem('deps',JSON.stringify(res))
              }
            })
        } else {
          this.deps = JSON.parse(window.sessionStorage.getItem('deps'));
        }
      },
      editEmp() {
        this.entryEmp();
        this.title='添加员工'

        this.dialogVisible =true
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initEmps();
      },
      sizeChange(size) {
        this.size = size;
        this.initEmps();
      },
      initEmps(flag = true) {
        let url = '/employee/basic/?page='+this.page+ '&size='+this.size 
        if (flag) {
          console.log('1235')
          url += '&name='+this.keyword;
        } else {
          url += this.searchValue.politicId ? '&politicId='+ this.searchValue.politicId : '';
          url += this.searchValue.nationId ? '&nationId='+ this.searchValue.nationId : '';
          url += this.searchValue.jobLevelId ? '&jobLevelId='+ this.searchValue.jobLevelId : '';
          url += this.searchValue.posId ? '&posId='+ this.searchValue.posId : '';
          url += this.searchValue.departmentId ? '&departmentId='+ this.searchValue.departmentId : '';
          url += this.searchValue.engageForm ? '&engageForm='+ this.searchValue.engageForm : '';
          url += this.searchValue.beginDateScope ? '&beginDateScope='+ this.searchValue.beginDateScope : '';
          this.$message.success("正在努力查找中....")
        }

        manyRequest(url,'get')
          .then(res => {
            this.loading =false
            if (res) {
              this.emps = res.data;
              this.total = res.total;
              if (res.total === 0) {
              this.$message.info("未查到相关内容！")
              }
            } 
          })
      }
    }
    
  }
</script>

<style>
  .empInput {
    width: 200px;
  }
  .empDep {
    margin-top: 5px;
    width: 220px;
    height: 26px;
    display: inline-flex;
    font-size: 13px;
    border: 1px solid #dedede;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    padding-left: 8px;
    box-sizing: border-box;
  }
  .empDep1 {
    margin-left: 9px;
    margin-top: 5px;
    width: 130px;
    height: 26px;
    display: inline-flex;
    font-size: 13px;
    border: 1px solid #dedede;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    padding-left: 8px;
    box-sizing: border-box;
  }
  .empUpload {
    display: inline-flex;
    margin-right: 8px;
    margin-left: 8px;
  }

</style>