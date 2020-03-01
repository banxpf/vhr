<template>
  <div>
    <div>
        <el-input
          size="small"
          style="width: 300px; margin-right:8px;"
          placeholder="添加职位..."
          prefix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
         </el-input>
         <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
    </div>
    <div class="posManaTable">
       <el-table
        :data="positions"
        border
        @selection-change="handleSelectionChange"
        stripe
        size="small"
        style="width: 70%">
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
        <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
      </div>
      <div style="margin-top: 10px">
        <el-tag style="margin-right:8px">是否启用</el-tag>
        <el-switch
          size="small"
          v-model="updatePos.enabled"
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
  import {getRequest,manyRequest} from '../../../utils/api'
  export default {
    name :'PosMana',
    data() {
      return {
        pos: {
          name: ''
        },
        dialogVisible: false,
        updatePos: {
          name: '',
          enabled: ''
        },
        positions:[],
        multipleSelection: []
      }
    },
    mounted() {
      this.initPositions();
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
          manyRequest("/system/basic/pos/many"+ids, "delete") 
            .then (res => {
              if (res) {
                this.initPositions();
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
      initPositions() {
        manyRequest('/system/basic/pos','get')
          .then(res => {
            if (res) {
              this.positions = res;
            }
          })
      },
      addPosition() {
        if (this.pos.name) {
          manyRequest('/system/basic/pos','post', this.pos)
            .then (res => {
                if(res) {
                  this.initPositions();
                  this.pos.name='';
                }
            })
        } else {
          this.$message.error("职位名称不可为空")
        }

      },
      handleEdit(index, data) {
        Object.assign(this.updatePos, data)
        this.dialogVisible = true;
      },
      doUpdate() {
        manyRequest("/system/basic/pos/","put", this.updatePos) 
          .then(res => {
            if (res) {
                this.initPositions();
                this.updatePos.name ='';
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
          manyRequest("/system/basic/pos/"+data.id, "delete") 
            .then (res => {
              if (res) {
                this.initPositions();
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
  .posManaTable {
    margin-top: 10px;
  }
  .updatePosInput {
    width: 260px;
    margin-left: 8px;
  }
</style>