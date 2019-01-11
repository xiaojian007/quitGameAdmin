<template>
  <div class="login-container">
    <div class="form" :class="res ? 'on' : ''">
      <!-- form登录表单 -->
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <h3 class="title" v-if="!res">Login</h3>
        <h3 class="title" v-else>Register</h3>
        <el-form-item prop="username">
          <span class="fontcontainer">
            <span class="iconfont icon-yonghu"></span>
          </span>
          <!-- <span class="svg-container svg-container_login">
                      <svg-icon icon-class="user" />
                  </span> -->
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="loginDefault.name" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="fontcontainer">
            <span class="iconfont icon-mima"></span>
          </span>
          <!-- <span class="svg-container">
                  <svg-icon icon-class="password"></svg-icon>
                  </span> -->
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" :placeholder="loginDefault.password"></el-input>
          <span  v-show="sendAuthCode" class="validate" @click="authentication" v-if="res">获取验证码</span>
          <span v-show="!sendAuthCode" class="validate"> 
            <span class="auth_text_blue">
              {{auth_time}} </span> 秒后重新获取
            </span> 
          <!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
          <span class="show-pwd iconfont icon-yanjing" @click="showPwd"></span>
        </el-form-item>
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

    <vue-particles
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
    </vue-particles>
    <!-- 背景视频 -->
    <!-- <div class="homepage-hero-module">
      <div class="video-container">
        <div :style="fixStyle" class="filter"></div>
        <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
          <source src="http://hc.yinyuetai.com/uploads/videos/common/A37901643495027099BF3D4BEE5042DE.mp4?sc=8459032adc5f52f0" type="video/mp4" /> 浏览器不支持 video 标签，建议升级浏览器。
          <source src="PATH_TO_WEBM" type="video/webm" /> 浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="//img0.c.yinyuetai.com/video/mv/180821/0/-M-5510b0a6b9d257f6c7d4aee5d67ba847_240x135.jpg" alt="">
        </div>
      </div>
    </div> -->
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
        username: "",
        password: ""
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
      // 视频参数
      vedioCanPlay: false,
      fixStyle: '',
      res: false,
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /*倒计时 计数器*/
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
    canplay() {
      this.vedioCanPlay = true
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
      this.sendAuthCode = false
      this.auth_time = 60
      var auth_timetimer =  setInterval(()=>{
          this.auth_time--
          if(this.auth_time<=0){
              this.sendAuthCode = true
              clearInterval(auth_timetimer)
          }
      }, 1000)
    }
  },
  mounted() {
    this.GetImgValidate('captcha')
    // 背景视频
    // window.onresize = () => {
    //   const windowWidth = document.body.clientWidth
    //   const windowHeight = document.body.clientHeight
    //   const windowAspectRatio = windowHeight / windowWidth
    //   let videoWidth
    //   let videoHeight
    //   if (windowAspectRatio < 0.5625) {
    //     videoWidth = windowWidth
    //     videoHeight = videoWidth * 0.5625
    //     this.fixStyle = {
    //       height: windowWidth * 0.5625 + 'px',
    //       width: windowWidth + 'px',
    //       'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
    //       'margin-left': 'initial'
    //     }
    //   } else {
    //     videoHeight = windowHeight
    //     videoWidth = videoHeight / 0.5625
    //     this.fixStyle = {
    //       height: windowHeight + 'px',
    //       width: windowHeight / 0.5625 + 'px',
    //       'margin-left': (windowWidth - videoWidth) / 2 + 'px',
    //       'margin-bottom': 'initial'
    //     }
    //   }
    // }
    // window.onresize()
  },
  computed: {
    // ssss () {
    //   return  this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    // }
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
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-left: -160px;
    z-index: 55;
    transition: all 0.5s ease;
    .login-form {
      margin: 0 auto;
    }
    .chartvalidation {
      width: 310px;
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
      padding: 6px 5px 6px 15px;
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
#captcha {
  .sliderContainer {
    position: relative;
    text-align: center;
    width: 310px;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    background: #f7f9fa;
    color: #45494c;
    border: 1px solid #e4e7eb;
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
    height: 39px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .slider:hover {
    background: #1991fa;
  }

  .slider:hover .sliderIcon {
    background-position: 0 -13px;
  }

  .sliderIcon {
    position: absolute;
    top: 15px;
    left: 13px;
    width: 14px;
    height: 10px;
    /* background: url(../img/icon_light.f13cff3.png) 0 -26px; */
    background-size: 34px 471px;
  }

  .refreshIcon {
    position: absolute;
    right: 0;
    top: 0;
    width: 34px;
    height: 34px;
    cursor: pointer;
    /* background: url(../img/icon_light.f13cff3.png) 0 -437px; */
    background-size: 34px 471px;
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
// .homepage-hero-module,
// .video-container {
//   position: relative;
//   height: 100vh;
//   overflow: hidden;
// }

// .video-container .poster img,
// .video-container video {
//   z-index: 0;
//   position: absolute;
// }

// .video-container .filter {
//   z-index: 1;
//   position: absolute;
//   background: rgba(0, 0, 0, 0.4);
// }
</style>

