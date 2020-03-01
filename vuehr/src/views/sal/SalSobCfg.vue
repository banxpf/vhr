<template>
  <div>
    <div>
      <el-table :data="emps" border stripe >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="姓名" width="120" prop="name"></el-table-column>
        <el-table-column label="工号" width="120" prop="workID"></el-table-column>
        <el-table-column label="电子邮件" width="200" prop="email"></el-table-column>
        <el-table-column label="电话号码" width="120" prop="phone"></el-table-column>
        <el-table-column label="所属部门" width="120" prop="department.name"></el-table-column>
        <el-table-column label="工资账套" align="center" >
          <template slot-scope="scope">
            <el-tooltip placement="right" v-if="scope.row.salary !== null">
                <div slot="content">
                  <table>
                    <tr>
                      <td>基本工资</td>
                      <td>{{scope.row.salary.basicSalary}}</td>
                    </tr>
                    <tr>
                      <td>交通补助</td>
                      <td>{{scope.row.salary.trafficSalary}}</td>
                    </tr>
                    <tr>
                      <td>午餐补助</td>
                      <td>{{scope.row.salary.lunchSalary}}</td>
                    </tr>
                    <tr>
                      <td>奖金</td>
                      <td>{{scope.row.salary.bonus}}</td>
                    </tr>
                    <tr>
                      <td>养老金比率</td>
                      <td>{{scope.row.salary.pensionPer}}</td>
                    </tr>
                    <tr>
                      <td>养老金基数</td>
                      <td>{{scope.row.salary.pensionBase}}</td>
                    </tr>
                    <tr>
                      <td>医疗保险比率</td>
                      <td>{{scope.row.salary.medicalPer}}</td>
                    </tr>
                    <tr>
                      <td>医疗保险基数</td>
                      <td>{{scope.row.salary.medicalBase}}</td>
                    </tr>
                    <tr>
                      <td>公积金比率</td>
                      <td>{{scope.row.salary.accumulationFundPer}}</td>
                    </tr>
                    <tr>
                      <td>公积金基数</td>
                      <td>{{scope.row.salary.accumulationFundBase}}</td>
                    </tr>
                    <tr>
                      <td>启用时间</td>
                      <td>{{scope.row.salary.createDate}}</td>
                    </tr>

                  </table>
                </div>
               <el-tag>{{scope.row.salary.name}}</el-tag>
            </el-tooltip>
            <el-tag v-else>暂未设置</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope" >
            <el-popover
              placement="left"
              title="修改套账"
              width="200"
              @show="handleSalary(scope.row.salary)"
              @hide="hidePop(scope.row)"
              trigger="click">
              <el-select v-model="currentSalary" placeholder="请选择"size="mini">
                <el-option 
                  v-for="item in salaries"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button slot="reference" type="danger" size="small" >修改账套</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
        <div style="display:flex;justify-content:flex-end">
          <el-pagination
            background
            @current-change="currentChange"
            @size-change="sizeChange"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import { manyRequest } from '../../utils/api'
  export default {
    name: 'SalSobCfg',
    data() {
      return {
        emps:'',
        salaries:'',
        currentSalary: '',
        total:0,
        currentPage:1,
        currentSize:10,
      }
    },
    mounted() {
      this.initSalSobCfg();
      this.initSalary() 
    },
    methods: {
      sizeChange(size) {
        this.currentSize = size;
        this.initSalSobCfg();
      },
      currentChange(page) {
        this.currentPage = page;
        this.initSalSobCfg();
      },
      hidePop(data) {
        if(this.currentSalary) {
          manyRequest('/salary/sobcfg/?eid='+data.id+'&sid='+ this.currentSalary,'put').then(res =>{
            if(res) {
              this.initSalSobCfg();
            }
          })
        }
      },
      handleSalary(data) {
        if (data) {
          this.currentSalary = data.id
        }

      },
      initSalary() {
        manyRequest('/salary/sob/','get').then(res =>{
          if(res) {
            this.salaries = res;
          }
        })
      },
      initSalSobCfg() {
        manyRequest('/salary/sobcfg/?page='+this.currentPage+'&size='+this.currentSize, 'get').then(res =>{
          if(res) {
            this.emps = res.data;
            this.total = res.total;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>