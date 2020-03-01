<template>
  <div>
    <div>
      <el-input
        size="small"
        style="width: 300px; margin-right:8px;"
        placeholder="添加职称..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addJobLevel"
        v-model="jl.name">
        </el-input>
        <el-select v-model="jl.titleLevel" size="small" style="margin-right:8px;" placeholder="职称等级">
          <el-option
            v-for="item in titleLevels"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
         <el-button icon="el-icon-plus" size="small" type="primary" @click="addJobLevel">添加</el-button>
    </div>
    <div class="jobLevelManaTable">
       <el-table
        :data="jobLevels"
        border
        @selection-change="handleSelectionChange"
        stripe
        size="small"
        style="width: 80%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="职位名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="titleLevel"
          label="职位级别"
          width="130">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="是否启用"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success"size="small" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" size="small"v-else>未启用</el-tag>
          </template>
        </el-table-column>
            <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-button @click="manyDelete" type="danger" size="small" style="margin-top:8px" :disabled="multipleSelection == 0">批量删除</el-button>
    </div>
      <el-dialog
      title="修改职位"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input class="updateLjInput" size="small" v-model="updateJl.name"></el-input>
      </div>
      <div style="margin-top: 10px">
        <el-tag style="margin-right:8px">职位级别</el-tag>
         <el-select v-model="updateJl.titleLevel" size="small" style="margin-right:8px;" placeholder="职称等级">
          <el-option
            v-for="item in titleLevels"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 10px">
        <el-tag style="margin-right:8px">是否启用</el-tag>
        <el-switch
          size="small"
          v-model="updateJl.enabled"
          active-text="已启用"
          inactive-text="未启用">
        </el-switch>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {manyRequest} from '../../../utils/api'
  export default {
    name :'JobLevelMana',
    data () {
      return {
        jl: {
          name: '',
          titleLevel:''
        },
        updateJl: {
          name: '',
          titleLevel:'',
          enabled: ''
        },
        dialogVisible: false,
        titleLevels:[
          '正高级',
          '副高级',
          '中级',
          '初级',
          '员级',
        ],
        jobLevels:[],
        multipleSelection: [],
      }
    },
    mounted() {
      this.initJobLevels();
    },
    methods: {
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
          manyRequest("/system/basic/jobLevel/many"+ids, "delete") 
            .then (res => {
              if (res) {
                this.initJobLevels();
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
        console.log(check)
      },
      initJobLevels() {
        manyRequest('/system/basic/jobLevel','get')
          .then(res => {
            if (res) {
              this.jobLevels = res;
            }
          })
      },
      addJobLevel() {
        if (this.jl.name && this.jl.titleLevel) {
          manyRequest('/system/basic/jobLevel','post', this.jl)
            .then (res => {
                if(res) {
                  this.initJobLevels();
                  this.jl.name = '';
                  this.jl.titleLevel = '';
                }
            })
        } else {
          this.$message.error("职位名称或职称等级不可为空")
        }
        console.log(this.jl)
      },
      handleEdit(index, data) {
        Object.assign(this.updateJl, data)
        this.dialogVisible = true;
      },
      doUpdate() {
        manyRequest("/system/basic/jobLevel/","put", this.updateJl) 
          .then(res => {
            if (res) {
                this.initJobLevels();
                this.updateJl.name ='';
                this.updateJl.titleLevel = '';
                this.dialogVisible = false;
            }
          })
      },
      handleDelete(index, data) {
        this.$confirm('此操作将永久删除【'+data.name+'】, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          manyRequest("/system/basic/jobLevel/"+data.id, "delete") 
            .then (res => {
              if (res) {
                this.initJobLevels();
              }
            }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }

  }
</script>

<style>
  .jobLevelManaTable {
    margin-top: 10px;
  }
  .updateLjInput {
    width: 260px;
    margin-left: 8px;
  }
</style>