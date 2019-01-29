<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'dashboard',
  data () {
    return {
      currentRole: 'adminDashboard'
    }
  },
  components: { adminDashboard, editorDashboard },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    // console.log(this.roles.includes('admin'))
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
