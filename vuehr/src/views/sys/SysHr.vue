<template>
  <div>
    <div style="margin-top:10px;display: flex;justify-content:center">
      <el-input size="small" type="text" prefix-icon="el-icon-search" placeholder="请输入要搜索的内容..." 
      style="width:300px;margin-right: 8px;" v-model="keyword"
      @keydown.enter.native="doSearch"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
    </div>
    <div class="hr-container">
      <el-card class="hr-card" v-for="(hr,index) in hrs" :key="index">
        <div slot="header" class="clearfix">
          <span>{{hr.name}}</span>
          <el-button style="float: right; padding: 3px 0;color:red;" type="text" icon="el-icon-delete"@click="deleteHr(hr)"></el-button>
        </div>
        <div>
          <div class="img-container">
             <img :src="hr.userface" :alt="hrs.name" :title="hr.name" class="userface-img">
          </div>
          <div class= "userinfo-container">用户名：{{hr.name}}</div>
          <div class= "userinfo-container">手机号码：{{hr.phone}}</div>
          <div class= "userinfo-container">电话号码：{{hr.telephone}}</div>
          <div class= "userinfo-container">地址：{{hr.address}}</div>
          <div class= "userinfo-container">用户状态：<el-switch
                v-model="hr.enabled"
                size="mini"
                @change="enabledChange(hr)"
                active-text="启用"
                inactive-text="禁用">
              </el-switch></div>
          <div  size="mini" class= "userinfo-container">用户角色：
            <el-tag type="success" style="margin-right:4px" v-for="(role, indexj) in hr.roles" :key="indexj">{{role.nameZh}}</el-tag>
              <el-popover
              placement="right"
              title="角色列表"
              @show="showPop(hr)"
              @hide="hidePop(hr)"
              width="200"
              trigger="click">
                <el-select v-model="selectedRoles" multiple placeholder="请选择">
                  <el-option
                    v-for="(r,indexk) in allRoles"
                    :key="indexk"
                    :label="r.nameZh"
                    :value="r.id">
                  </el-option>
                </el-select>
              <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
              </el-popover>
            
          </div>
          <div class="userinfo-container">备注：{{hr.remark}}</div>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
  import {manyRequest} from '../../utils/api'
  export default {
    name: 'SysHr',
    data() {
      return {
        hrs:[],
        allRoles:[],
        selectedRoles: [],
        keyword:''
      }
    },
    mounted() {
      this.initHrs();
    },
    methods: {
      deleteHr(hr) {
        this.$confirm('此操作将永久删除【'+hr.name+'】, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            manyRequest('/system/hr/'+hr.id,'delete') 
              .then(res => {
                if (res) {
                  this.initHrs();
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      doSearch() {
        this.initHrs();
      },
      hidePop(hr) {
        let roles = hr.roles
        let role = [];
        let flag = false;
        if (roles.length !== this.selectedRoles.length) {
          flag = true;
        } else {
          roles.forEach(r => {
            role.push(r.id)
          });
          flag = !(JSON.stringify(role.sort()) == JSON.stringify(this.selectedRoles.sort()))
        }
        if(flag) {
          let url = "/system/hr/role?hrid="+hr.id;
          this.selectedRoles.forEach(res => {
            url += "&rids="+ res;
          })
          manyRequest(url,'put') 
            .then(res => {
              if (res) {
                this.initHrs();
              }
            })
        }

      },
      showPop(hr) {
        this.initAllRoles();
        let roles = hr.roles;
        this.selectedRoles = [];
        roles.forEach(r => {
          this.selectedRoles.push(r.id)
        });

      },
      initAllRoles() {
        manyRequest("/system/hr/roles",'get') 
          .then(res => {
            if (res) {
              this.allRoles = res;
            }
          })
      },
      enabledChange(hr) {
        delete hr.roles
        manyRequest("/system/hr/",'put', hr) 
          .then(res => {
            if (res) {
              this.initHrs();
            }
          })
      },
      initHrs() {
        manyRequest("/system/hr/?keyword="+this.keyword,'get')
          .then(res =>{
            this.hrs = res;
          })
      }
    }


  }
</script>

<style>
  .userinfo-container {
    margin-top: 3px;
    font-size: 13px;
    color: blue
  }
  .img-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .userface-img {
    width: 72Px;
    height: 72px;
    border-radius: 72px;
  }
  .hr-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .hr-card {
    width: 350px;
    margin-bottom: 20px;
  }
</style>