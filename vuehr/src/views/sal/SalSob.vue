<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="showAdd">添加员工账套</el-button>
      <el-button size="small" icon="el-icon-refresh" @click="initSalaries"></el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table :data="salaries" border stripe>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="120" prop="name" label="账套名称"></el-table-column>
        <el-table-column width="100" prop="basicSalary" label="基本工资"></el-table-column>
        <el-table-column width="100" prop="trafficSalary" label="交通补助"></el-table-column>
        <el-table-column width="100" prop="lunchSalary" label="午餐补助"></el-table-column>
        <el-table-column width="70" prop="bonus" label="奖金"></el-table-column>
        <el-table-column width="100" prop="createDate" label="启用时间"></el-table-column>
        <el-table-column  label="养老金" align="center">
          <el-table-column width="70" prop="pensionPer" label="比率"></el-table-column>
          <el-table-column width="70" prop="pensionBase" label="基数"></el-table-column>
        </el-table-column>
        <el-table-column  label="医疗保险" align="center">
          <el-table-column width="70" prop="medicalPer" label="比率"></el-table-column>
          <el-table-column width="70" prop="medicalBase" label="基数"></el-table-column>
        </el-table-column>
        <el-table-column  label="公积金" align="center">
          <el-table-column width="70" prop="accumulationFundPer" label="比率"></el-table-column>
          <el-table-column width="70" prop="accumulationFundBase" label="基数"></el-table-column>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="editSalary(scope.row)">编辑</el-button> 
            <el-button size="small" type="danger" @click="deleteSalary(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%">
      <div style="display:flex;justify-content:space-around;align-items:center">
          <el-steps direction="vertical" :active="activeItemIndex">
            <el-step :title="item" v-for="(item, index) in salaryItemName" :key="index"></el-step>
          </el-steps>
          <el-input size="small" :placeholder="'请输入'+salaryItemName[index]+'...'" v-for="(item,title, index) in salary" 
                    v-model="salary[title]" :key="index" v-show="index === activeItemIndex" style="width:200px"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="preStep">{{activeItemIndex === 10 ? '取消' : '上一步'}}</el-button>
        <el-button size="small" type="primary" @click="nextStep()">{{activeItemIndex === 10 ? '完成' : '下一步'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { manyRequest } from '../../utils/api';
  export default {
    name: 'SalSob',
    data() {
      return {
        salaries: [],
        dialogVisible: false,
        dialogTitle: '',
        activeItemIndex: 0,
        editFlag: false,
        salaryItemName: [
          '基本工资',
          '交通补助',
          '午餐补助',
          '奖金',
          '养老金比率',
          '养老金基数',
          '医疗保险比率',
          '医疗保险基数',
          '公积金比率',
          '公积金基数',
          '账户名称',
        ],
        salary: {
          
        }
      }
    },
    mounted(){
      this.initSalaries()
      this.initSalary()
    },
    methods: {
      editSalary(data) {
        this.dialogTitle = '修改员工账套';
        this.dialogVisible = true
        this.editFlag = true
        this.salary.basicSalary = data.basicSalary;
        this.salary.trafficSalary = data.trafficSalary;
        this.salary.lunchSalary = data.lunchSalary;
        this.salary.bonus = data.bonus;
        this.salary.pensionPer= data.pensionPer;
        this.salary.pensionBase = data.pensionBase;
        this.salary.medicalPer = data.medicalPer;
        this.salary.medicalPer = data.medicalPer;
        this.salary.medicalBase = data.medicalBase;
        this.salary.accumulationFundPer = data.accumulationFundPer;
        this.salary.accumulationFundBase = data.accumulationFundBase;
        this.salary.name = data.name;
        this.salary.id = data.id;
      },
      deleteSalary(index, data) {
        this.$confirm('此操作将永久删除【'+data.name+'】账套, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          manyRequest("/salary/sob/"+data.id, "delete") 
            .then (res => {
              if (res) {
                this.initSalaries();
              }
            }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      preStep() {
        this.activeItemIndex -- ;
        if (this.activeItemIndex === -1) {
          this.dialogVisible = false;
          this.activeItemIndex = 0;
        } else if (this.activeItemIndex === 9) {
          this.dialogVisible = false;
          this.activeItemIndex = 0;
          this.initSalary();
        }
      },
      nextStep () {    
        if (this.activeItemIndex === 10) {
          if (this.editFlag) {
            this.editFlag = false
            manyRequest('/salary/sob/','put',this.salary)
              .then(res =>{
                if (res) {
                  this.activeItemIndex = 0;
                  this.dialogVisible = false
                  this.initSalaries();
                  this.initSalary();
                }
              })
          } else {
            manyRequest('/salary/sob/','post',this.salary)
              .then(res =>{
                if (res) {
                  this.activeItemIndex = 0;
                  this.dialogVisible = false
                  this.initSalaries();
                  this.initSalary();
                }
              })
          }
        } else {
           this.activeItemIndex ++ ;
        }
      },
      showAdd() {
        this.dialogTitle = '添加员工账套';
        this.dialogVisible = !this.dialogVisible;
      },
      initSalary() {
        this.salary = {
          basicSalary:'',
          trafficSalary:'',
          lunchSalary:'',
          bonus:'',
          pensionPer:'',
          pensionBase:'',
          medicalPer:'',
          medicalBase: '',
          accumulationFundPer:'',
          accumulationFundBase:'',
          name:''
        }
      },
      initSalaries() {
        manyRequest('/salary/sob/','get') 
          .then(res =>{
            if (res) {
              this.salaries = res;
            }
          })
      }
    }
  }
</script>

<style>

</style>