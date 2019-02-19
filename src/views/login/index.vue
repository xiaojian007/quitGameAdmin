<template>
  <div class="login-container" ref="main">

    <div class="form" :class="res ? 'on' : ''">
          <!-- login加载 -->
      <div class="form__cover"></div>
      <div class="form__loader">
        <div class="spinner active">
          <svg class="spinner__circular" viewBox="25 25 50 50">
            <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>
          </svg>
        </div>
      </div>
      <div class="form__content">
        <!-- form登录表单 -->
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <h3 class="title" v-if="!res">Login</h3>
          <h3 class="title" v-else>Register</h3>
          <el-form-item prop="username">
            <span class="fontcontainer svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="loginDefault.name" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container fontcontainer">
              <svg-icon icon-class="password"></svg-icon>
            </span>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" :placeholder="loginDefault.password"></el-input>
            <span  v-show="sendAuthCode" class="validate" @click="authentication" v-if="res">获取验证码</span>
            <span v-show="!sendAuthCode" class="validate"> 
              <span class="auth_text_blue">
                {{auth_time}} </span> 秒后重新获取
              </span> 
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
          </el-form-item>
          <!-- <el-form-item class="fix-form-item">
            <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
            <el-button type="text">忘记密码</el-button>
          </el-form-item> -->
          <!-- click.native.prevent阻止默认事件 -->
          <!-- <el-form-item>
            <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
              Sign in
            </el-button>
          </el-form-item> -->
          <!-- <div class="tips">
                    <span style="margin-right:20px;">username: admin</span>
                    <span> password: admin</span>
                </div> -->
        </el-form>
        <!-- 图片滑动验证 -->
        <div class="chartvalidation">
          <div id="captcha" style="position: relative"></div>
          <div id="msg"></div>
        </div>
        <!-- 验证码登录 -->
        <div class="identify">
          如没有账号可以使用手机号
          <span @click="identify">立即登录</span>
        </div>
      </div>
    </div>

    <!-- <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="50"
      shapeType="star"
      :particleSize="5"
      linesColor="#fff"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      >
    </vue-particles> -->
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate"

export default {
  name: "login",
  data() {
    // 前台验证用户名
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的手机号"))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: "17621376429",
        password: "123125"
      },
      loginDefault: {
        name: '手机号',
        password: '密码'
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername
          }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ]
      },
      loading: false,
      pwdType: "password",
      res: false,
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /*倒计时 计数器*/
      autoLogin: false,
      loginAni1: '',
      loginAni2: ''
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = ""
      } else {
        this.pwdType = "password"
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let that = this
          this.loading = true
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$router.push({ path: "/" })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log("error submit!!")
          return false
        }
      });
    },
    GetImgValidate(obj) {
      let that = this
      jigsaw.init(document.getElementById(obj), function () {
        // that.$message({
        //   message: '登录成功',
        //   type: 'success'
        // })
        if (that.res) {
          // 调用注册接口
          console.log(1)
          that.handleLogin()
        } else {
          that.handleLogin()
        }
      }, function () {
        console.log('验证失败')
        that.$message.error('验证失败')
      })
    },
    identify() {
      if (this.res) {
        this.pwdType = "password"
        this.loginDefault.password = '密码'
      } else {
        this.pwdType = ""
        this.loginDefault.password = '验证码'
      }
      this.res = !this.res
    },
    authentication() {
      this.$message({
        message: '验证码已发送至手机号为'+ this.loginForm.username + '中',
        type: 'success'
      })
      this.sendAuthCode = false
      this.auth_time = 60
      var auth_timetimer =  setInterval(()=>{
          this.auth_time--
          if(this.auth_time<=0){
              this.sendAuthCode = true
              clearInterval(auth_timetimer)
          }
      }, 1000)
    },
    loginAnimate1() {
      this.$refs.main.classList.add('on-start')
    },
    loginAnimate2() {
      this.$refs.main.classList.add('document-loaded')
    }
  },
  mounted() {
    this.GetImgValidate('captcha')
    this.loginAni1 = setTimeout(this.loginAnimate1, 100)
    this.loginAni2 = setTimeout(this.loginAnimate2, 1800)
  },
  computed: {
    // ssss () {
    //   return  this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    // }
  },
  beforeDestroy() {
    clearTimeout(this.loginAni1)
    clearTimeout(this.loginAni2)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 90%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .identify {
    font-size: 14px;
    text-align: right;
    color: #fff;
    line-height: 35px;
    span {
      color: #f00;
      cursor: pointer;
    }
    span:hover {
      color: #ff0;
      font-weight: bold;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .form {
    position: absolute;
    left: 50%;
    top: 20%;
    padding: 15px;
    border-radius: 7px;
    margin-left: -260px;
    z-index: 55;
    transition: all 0.5s ease;
    .form__content{
      width: 100%;
      .chartvalidation {
        width: 460px;
        margin: 0 auto;
      }
      .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
          &:first-of-type {
            margin-right: 16px;
          }
        }
      }
      .svg-container {
        // padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
          font-size: 20px;
        }
      }
      .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
      .fontcontainer {
        color: #889aa4;
        padding-left: 10px;
      }
    }
  }
  .form.on {
    transform: perspective(400px) rotate(-360deg);
  }
}
.validate {
  position: absolute;
  right: 0;
  top: 0;
  height: 47px;
  line-height: 47px;
  font-size: 14px;
  color: #fff;
  width: 140px;
  text-align: center;
  background: #000;
  z-index: 6;
  border-radius: 5px;
  cursor: pointer;
}
</style>
<style lang="scss">
// 文字闪耀
@keyframes  scratchy {
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 0 0;
  }
  26% {
    background-position: 20px -20px;
  }
  50% {
    background-position: 20px -20px;
  }
  51% {
    background-position: 40px -40px;
  }
  75% {
    background-position: 40px -40px;
  }
  76% {
    background-position: 60px -60px;
  }
  99% {
    background-position: 60px -60px;
  }
  100% {
    background-position: 0 0;
  }
}
#captcha {
  .sliderContainer {
    position: relative;
    text-align: center;
    width: 460px;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    background: #f7f9fa;
    color: #45494c;
    border: 1px solid #e4e7eb;
    .sliderText{
    	background: linear-gradient(left, #f71605, #e0f513); 
      background: -webkit-linear-gradient(left, #f71605, #e0f513);
      background: -o-linear-gradient(right, #f71605, #e0f513);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;
		  animation:scratchy 0.53s linear forwards infinite;
    }
  }

  .sliderContainer_active .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #1991fa;
  }

  .sliderContainer_active .sliderMask {
    height: 38px;
    border-width: 1px;
  }

  .sliderContainer_success .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #52ccba;
    background-color: #52ccba !important;
  }

  .sliderContainer_success .sliderMask {
    height: 38px;
    border: 1px solid #52ccba;
    background-color: #d2f4ef;
  }

  .sliderContainer_success .sliderIcon {
    background-position: 0 0 !important;
  }

  .sliderContainer_fail .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #f57a7a;
    background-color: #f57a7a !important;
  }

  .sliderContainer_fail .sliderMask {
    height: 38px;
    border: 1px solid #f57a7a;
    background-color: #fce1e1;
  }

  .sliderContainer_fail .sliderIcon {
    background-position: 0 -83px !important;
  }
  .sliderContainer_active .sliderText,
  .sliderContainer_success .sliderText,
  .sliderContainer_fail .sliderText {
    display: none;
  }

  .sliderMask {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    border: 0 solid #1991fa;
    background: #d1e9fe;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 38px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .slider:hover {
    background: #57616f;
  }

  .slider:hover .sliderIcon {
    // background-position: 0 -13px;
  }

  .sliderIcon {
    position: absolute;
    top: 14px;
    left: 10px;
    width: 20px;
    height: 12px;
    background-image: url(../../assets/icon_light.png);
    background-size: cover;
  }

  .refreshIcon {
    position: absolute;
    right: 0;
    top: 0;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
  #msg {
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    margin-left: 100px;
    color: #0366d6;
  }
  .block {
    position: absolute;
    left: 0;
    top: 0;
  }
}
#particles-js{
  width: 100%;
  height: 100%;
}

.form__cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -4;
  border-radius: 7px;
  overflow: hidden;
  transition: all 0.3s ease 0.8s;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
.form__cover:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,.15);
  z-index: -4;
  border-radius: 50%;
  transition: all 1.5s ease 0.3s;
  -webkit-transform: scale(0);
          transform: scale(0);
}
.form__cover:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: white;
  z-index: -5;
  border-radius: 50%;
  transition: all 0.5s ease;
          transform: scale(0);
}

.form__loader {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  z-index: -4;
  transition: all 0.5s ease;
}
.on-start .form__cover:before {
          transform: scale(0.15);
}
.document-loaded .form__loader {
  transform: scale(0);
  opacity: 0;
  visibility: hidden;
}
.document-loaded .form__content {
  opacity: 1;
          transform: none;
}
.document-loaded .form__cover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}
.document-loaded .form__cover:after {
          transform: scale(2);
}
.document-loaded .form__cover:before {
  -webkit-transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: transform 2s ease, opacity 0.3s ease 0.8s;
  transition: transform 2s ease, opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
          transform: scale(2);
  opacity: 0;
}
.form__content {
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  position: relative;
  opacity: 0;
  -webkit-transform: translateY(10px);
          transform: translateY(10px);
  -webkit-transition: all 0.5s ease 0.7s;
  transition: all 0.5s ease 0.7s;
}

.spinner {
  position: relative;
  margin: auto;
  width: 50px;
  height: 50px;
  -webkit-transition: all 0.2s ease 0s;
  transition: all 0.2s ease 0s;
}
.spinner__circular {
  -webkit-animation: rotate 1.5s linear infinite;
          animation: rotate 1.5s linear infinite;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
  -webkit-transform-origin: center center;
          transform-origin: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
}
.spinner__path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.3s ease forwards 0.5s;
          animation: dash 1.3s ease forwards 0.5s;
  opacity: 0;
  stroke-linecap: round;
  stroke: #7b23ff;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}

</style>

