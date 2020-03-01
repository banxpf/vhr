<template>
  <div>
    <div style="width: 470px">
      <el-input
        size="small"
        prefix-icon="el-icon-search"
        placeholder="请输入部门名进行搜索..."
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="deps"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree">
        <span class="custom-tree-node" style="display: flex;justify-content: space-between; width:100%;" 
        slot-scope="{node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button 
              class="depBtn"
              type="primary"
              size="mini"
              @click="() => addDep(data)">
              添加部门
            </el-button>
            <el-button 
              class="depBtn"
              type="danger"
              size="mini"
              @click="() => deleteDep(data)">
              删除部门
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog
    title="添加部门"
    :visible.sync="dialogVisible"
    width="30%">
      <div>
        <div>
          <el-tag >上级部门</el-tag>
          <span class="depInput">{{pname}}</span>
        </div>
        <div style="margin-top:8px;">
          <el-tag >添加部门</el-tag>
          <el-input v-model="dep.name" placeholder="请输入部门名称..." type="text" size="small" class="depInput" ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doAddDep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {manyRequest} from '../../../utils/api'
  export default {
    name :'DepMana',
    data() {
      return {
        filterText: '',
        deps: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        dep:{
          name:'',
          parentId: -1,
        },
        pname:'',
        dialogVisible: false
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
      this.initDep();
    },
    methods: {
      addDep2Deps(deps, dep) {
        for (let i in deps) {
          let d = deps[i];
          if (d.id == dep.parentId) {
            d.children = d.children.concat(dep);
            if(d.children.length > 0) {
              d.parent = true
            }
            return;
          } else {
            this.addDep2Deps(d.children, dep)
          }
        }
      },
      doAddDep() {
        manyRequest('/system/basic/department', 'post',this.dep)
          .then(res => {
            if (res) {
              this.addDep2Deps(this.deps, res.obj);
              this.dialogVisible =false;
              this.pname = '';
              this.dep.name = '';
              this.dep.parentId = -1;
            }
          })
      },
      addDep (data) {
        this.pname = data.name;
        this.dep.parentId = data.id
        this.dialogVisible =true
      },
      deleteDepByDeps(p,deps, id) {
        for (let i in deps) {
          let d = deps[i];
          if (d.id == id) {
            deps.splice(i,1)
            if (deps.length === 0) {
              p.parent = false;
            }
            return;
          } else {
            this.deleteDepByDeps(d, d.children, id)
          }
        }
      },
      deleteDep (data) {
        if (data.parent) {
          this.$message.error("该部门下有子部门，删除失败！")
        } else {
          this.$confirm('此操作将永久删除【'+data.name+'】部门, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            manyRequest('/system/basic/department/'+data.id,'delete') 
              .then(res => {
                if (res) {
                  this.deleteDepByDeps(null, this.deps, data.id)
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }

      },
      initDep() {
        manyRequest('/system/basic/department', 'get') 
          .then(res => {
            if (res) {
              this.deps = res;
            }
          })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    },

  }
</script>

<style>
  .depBtn {
    padding: 2px;
  }
  .depInput {
    width: 250px;
    margin-left: 8px;
  }
</style>