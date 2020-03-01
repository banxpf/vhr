<template>
  <div>
    <div>
      <el-input placeholder="请输入英文名称..." v-model="per.name" size="small" class="permissInput">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input placeholder="请输入中文名称..." v-model="per.nameZh" size="small" @keydown.enter.native ="addRole" class="permissInput">
      </el-input>
      <el-button size="small" type="primary" icon ="el-icon-plus" @click="addRole">添加</el-button>
    </div>
    <div >
      <el-collapse  accordion v-model="activeName" class="permissMian"  @change="change">
        <el-collapse-item :title="r.nameZh" :name='r.id'  v-for="(r, index) in roles" :key="r.id">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0; color:red" type="text"
               icon="el-icon-delete" @click="deleteRole(r)"></el-button>
            </div>
            <div>
              <el-tree
                show-checkbox
                node-key="id"
                ref='tree'
                :default-checked-keys="selectMenus"
                :data="allMenus" :props="defaultProps" >
              </el-tree>
              <div style="display:flex;justify-content: flex-end">
                <el-button size="small" @click="quxiao">取消修改</el-button>
                <el-button type="primary"size="small" @click="doUpdate(r.id, index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import {manyRequest} from '../../../utils/api'
  export default {
    name :'PermissMana',
    data() {
      return {
        per: {
          name:'',
          nameZh: ''
        },
        activeName: -1,
        roles: [],
        allMenus: [],
        selectMenus:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    mounted() {
      this.initPermission()
    },
    methods: {
      quxiao() {
        this.$message.info("已取消修改！")
        this.activeName = -1
      },
      deleteRole(role) {
        this.$confirm('此操作将永久删除【'+ role.nameZh +'】角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          manyRequest('/system/basic/permission/role/'+role.id,'delete')
            .then(res => {
              if (res) {
                this.initPermission();
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });   
        });       
      },
      addRole() {
        if (this.per.name && this.per.nameZh) {
          manyRequest('/system/basic/permission/role', 'post',this.per)
            .then(res => {
              this.initPermission();
              this.per.name = '';
              this.per.nameZh = '';
            })
        } else {
          this.$message.error("数据不可为空！")
        }
      },
      doUpdate(rid,index) {
        let selectedKeys = this.$refs.tree[index].getCheckedKeys(true);
        let url = '/system/basic/permission?rid='+rid;
        selectedKeys.forEach(key => {
          url += '&mids='+ key;
        });
        manyRequest(url, 'put')
          .then(res => {
            if (res) {
              this.activeName = -1;
            }
          })
      },
      change (rid) {
        if (rid) {
          this.initMenus()
          this.initSelectMeuns(rid)
        }
      },
      initSelectMeuns(rid) {
        manyRequest ("/system/basic/permission/mid/"+rid,'get')
          .then(res => {
            if (res) {
              this.selectMenus = res;
            }
        })
      },
      initMenus () {
        manyRequest ("/system/basic/permission/menu",'get')
          .then(res => {
            if (res) {
              this.allMenus = res;
            }
        })
      },
      initPermission () {
        manyRequest ("/system/basic/permission",'get')
          .then(res => {
            if (res) {
              this.roles = res;
            }
          })
      }
    }
  }
</script>

<style>
  .permissInput {
    width: 300px;
    margin-right: 8px;
  }
  .permissMian {
    width: 700px;
    margin-top: 10px;
  }
</style>