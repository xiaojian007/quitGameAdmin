<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <!-- 消息 -->
    <MessageBox class="hidden-xs-only" :messages="messages"/>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        {{name}}
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
          <el-dropdown-item disabled>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item disabled>
            设置
          </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import MessageBox from '@/components/MessageBox'


export default {
  data () {
    return {
      messages: {
        length: 8,
        notify: [],
        messages: [{
          id: 1,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }, {
          id: 2,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }, {
          id: 3,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }, {
          id: 4,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }],
        schedule: [{
          id: 1,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }, {
          id: 2,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }, {
          id: 3,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }, {
          id: 4,
          main: '斯达克警方和深刻搭街坊黑色盔甲的'
        }]
      },
      home: {
        title: ''
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    MessageBox
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'avatar'
    ])
    
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .hidden-title{
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 250px;
  }
  .hidden-xs-only{
    display: inline-block;
    position: absolute;
    top: 15px;
    height: 35px;
    right: 150px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      line-height: 40px;
      /*弹性盒模型*/    
      display:flex;
      /*主轴居中对齐*/
      justify-content: center;
      /*侧轴居中对齐*/    
      align-items: center; 
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

