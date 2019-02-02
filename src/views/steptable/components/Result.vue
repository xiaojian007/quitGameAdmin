<template>
  <el-form class="fix-form">
    <i class="el-icon-success fix-icon"></i>
    <p class="font-tips">转账成功</p>
    <p class="font-helper">预计两小时内到账</p>

    <el-form-item class="fix-form-item">
      <el-button type="primary" @click="again">继续转账</el-button>
      <el-button plain>查看账单</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    again () {
      this.$emit('listenToNext', 'Info')      
    }
  }
}
</script>

<style lang="scss" scoped>
.font-tips {
  font-size: 26px;
  font-weight: 600;
}

.font-helper {
  margin: 10px 0;
  font-size: 14px;
}

.fix-form {
  width: 100%;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  margin: 40px 0 0 0;
}

.fix-form-item {
  /deep/ {
    .el-form-item__content {
      margin-top: 80px;
    }
  }
}

.fix-icon {
  color: #67c23a;
  font-size: 68px;
}
</style>
