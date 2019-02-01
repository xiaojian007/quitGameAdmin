<template>
  <el-form class="fix-form" :rules="rules" label-width="80px" :model="form">
    <el-form-item label="收款人" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item class="money" label="收款账户" prop="account">
      <el-select class="money-select" v-model="moneyValue" placeholder="请选择">
        <el-option v-for="item in moneyOptions" :key="item.moneyValue" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input class="money-input" v-model="form.account">
      </el-input>
    </el-form-item>


    <el-form-item label="支付金额" prop="money">
      <!-- {{form.money | toThousands}} -->
      <el-input v-model="form.money"></el-input>
    </el-form-item>

    <el-form-item label="备注">
      <el-input type="textarea" placeholder="无" v-model="form.remark"></el-input>
    </el-form-item>

    <el-form-item class="fix-form-item">
      <el-button type="primary" @click="next">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      isSubmit: false,
      rules: {
        name: [
          { required: true, message: '请输入收款人姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入收款账户', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入支付金额', trigger: 'blur' }
        ]
      },
      moneyOptions: [{
        value: '0',
        label: '支付宝'
      }, {
        value: '1',
        label: '银行卡'
      }],
      moneyValue: '支付宝',
      select: 'alipay'
    }
  },
  methods: {
    next () {
      // this.$refs.form.validate(valid => {
      //   if (!valid) return false
      //   this.$router.push({ name: 'step-form-confirm' })
      // })
    }
  },
  props: {
    form: {
      type: Object
    }
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