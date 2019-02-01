<template>
  <div class="app-container">
    <article>
      <el-row class="fix-row">
        <el-col :xs="24" :sm="16" :md="16" :lg="14" :xl="14">
          <el-steps :active="active" finish-status="success">
            <el-step title="填写表单"></el-step>
            <el-step title="确认表单"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
        <el-col :xs="24" :sm="15" :md="14" :lg="11" :xl="8">
          <component :is="currentComponent" :form="form" @onFormSumbit="resetFields"/>
        </el-col>
      </el-row>
      <el-button @click="next">下一步</el-button>
    </article>
  </div>
</template>

<script>
import Info from './components/Info'
import Confirm from './components/Confirm'
import Result from './components/Result'
export default {
  data() {
    return {
      active: 0,
      currentComponent: 'Confirm',
      form: {
        name: '',
        account: '',
        money: null,
        remark: ''
      }
    };
  },
  components: {
    Info,
    Confirm,
    Result
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    resetFields () {
      this.form = {
        name: '',
        account: '',
        money: null,
        remark: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fix-row{
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
}
</style>