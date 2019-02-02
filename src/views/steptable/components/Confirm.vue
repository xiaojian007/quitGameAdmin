<template>
  <el-form class="fix-form" label-width="80px">
    <el-alert class="fix-alert" title="确认转账后，资金将直接打入对方账户，无法退回。" type="warning" show-icon>
    </el-alert>

    <el-form-item label="收款人">
      {{form.name}}
    </el-form-item>

    <el-form-item label="收款账户">
      {{form.account}}
    </el-form-item>

    <el-form-item label="支付金额">
      {{form.money.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}} 元
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      {{form.remark || '无'}}
    </el-form-item>

    <el-form-item class="fix-form-item">
      <el-button type="primary" @click="submit" :loading="isSubmit">
        提交
      </el-button>
      <el-button @click="previous">上一步</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import { assets } from '@/api/table'
export default {
  data() {
    return {
      isSubmit: false
    }
  },
  methods: {
    submit() {
      this.isSubmit = true
      assets(this.form).then(res => {
        setTimeout(() => {
          this.isSubmit = false
          this.$emit('onFormSumbit')
          this.$emit('listenToNext', 'Result')
        }, 1000)
      })
    },
    previous() {
      this.$emit('listenToNext', 'Info')
    }
  },
  props: {
    form: {
      type: Object
    }
  },
  computed: {
  }
}
</script>

<style>
/* 收款账户样式 */
.money > div.el-form-item__content {
  display: flex;
}
.money > div.el-form-item__content .money-select {
  width: 25%;
}
.money > div.el-form-item__content .money-select input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: #eee;
}
.money .money-input input {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.money .money-input {
  flex: 1;
}
</style>

<style lang="scss" scoped>
.fix-form {
  width: 100%;
  margin: 40px 0 0 0;
}

.fix-alert {
  margin: 20px 0;
  line-height: 1;

  /deep/ {
    .el-alert__closebtn {
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.fix-form-item {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px #e4e7ed solid;

  @media screen and (max-width: 769px) {
    /deep/ {
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
}
</style>