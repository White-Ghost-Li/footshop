<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">幽灵外卖</h2>
        <div class="login_header_title">
          <a href="javascript:" :class="{on:loginstyle}" @click="loginstyle=true">短信登陆</a>
          <a href="javascript:" :class="{on:!loginstyle}" @click="loginstyle=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginstyle}">    <!--短信登陆-->
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"/>
              <button :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone: rightPhone}" @click.prevent="getCode">
                {{ computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="code"/>
            </section>
            <section class="login_hint">
              温馨提示：未注册幽灵外卖账号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginstyle}">   <!--密码登陆-->
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name"/>
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd"/>
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd"/>
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' :'' }}</span>
                </div>
                <!--<div class="switch_button" @click="showPwd=!showPwd">-->
                  <!--<i class="iconfont icon-bukejian" v-if="!showPwd"/>-->
                  <!--<i class="iconfont icon-chakan" v-else/>-->
                <!--</div>-->
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <!-- <img src="./image/verification.png" class="get_verification2" ref="captcha"/> -->
                <!-- <img src="http://localhost:4000/captcha" class="get_verification2" @click="getCaptcha" ref="captcha"/> -->
				<!-- <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"> -->
				<img src="http://localhost:4000/captcha" class="get_verification2" @click="getCaptcha" ref="captcha"/>
				<!-- </svg> -->
              </section>
            </section>
          </div>
          <button class="login_submit">登陆</button>
        </form>
        <a href="javascript:" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-xingzhuanggongnengtubiao-5"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>

  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import { reqPhoneCode,reqPhoneLogin,reqPwdLogin} from '../../api'
  export default {
    data () {
      return {
        loginstyle: true, //登陆方式
        computeTime: 0,   //倒计时
        phone:'',         //手机号码
        pwd:'',           //密码
        showPwd:false,    //密码显示隐藏
        captcha:'',       //图片验证码
        name:'',         //用户名
        code:'',          //手机验证码
        alertText:'',      //提示框内容
        alertShow:false   //提示框是否显示
      }
    },
    computed: {
      rightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      async getCode(){
        if(!this.computeTime){
          //启动倒计时
          this.computeTime = 30
          this.intervalId = setInterval(() =>{
            this.computeTime--
            if(this.computeTime<=0){
              //停止计时
              clearInterval(this.intervalId)
            }
          },1000)
          //发送ajax请求（向指定手机发送验证码）
          const result = await reqPhoneCode(this.phone)
          if(result.code===1){
            //显示提示
            this.showAlert(result.message)
            //停止定时器
            if(this.computeTime){
              this.computeTime=0
              clearInterval(this.intervalId)
            }
          }
        }
      },
      showAlert (alertText) {
        this.alertShow = true;
        this.alertText = alertText;
      },
      async login(){
        let result;
          //前台表单验证
        if(this.loginstyle){
          //短信登陆
          const {phone,code} = this
          if(!this.rightPhone){
            //手机号不正确
            this.showAlert("手机号不正确")
            return
          }else if(!/^\d{6}$/.test(code)){
            //验证码不正确
            this.showAlert("验证码不正确")
            return
          }
          //发送ajax请求短信登陆
          result = await reqPhoneLogin(phone,code)
        }else{
            //密码登陆
            const {name,pwd,captcha} = this
          if(!name){
            //手机号不正确
            this.showAlert("手机号不正确")
            return
          }else if(!pwd){
            //密码不正确
            this.showAlert("密码不正确")
            return
          }else if(!captcha){
            //验证码不正确
            this.showAlert("验证码不正确")
            return
          }
          result = await reqPwdLogin({name,pwd,captcha})

        }
        //停止定时器
        if(this.computeTime){
          this.computeTime=0
          clearInterval(this.intervalId)
        }
        //根据result数据处理
        if(result.code===0){
          const user = result.data
		  console.log(user);
          //将 uesr保存到vuex的state
          this.$store.dispatch('recordUser',user)
          //去个人中心页面
          this.$router.replace('/profile')
        }else{
          const msg = result.msg
          this.showAlert(msg)
          this.getCaptcha()
          this.captcha=''
        }
      },
      closeTip(){
        this.alertShow = false;
        this.alertText = '';
      },
      //获取验证码
      getCaptcha(){
        this.$refs.captcha.src='http://localhost:4000/captcha?'+Date.now()
      }
    },
    components:{
      AlertTip
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .loginContainer
    width: 100%;
    height: 100%;
    background: #fff;
    .loginInner
      padding-top: 60px;
      width: 80%;
      margin: 0 auto;
      .login_header
        .login_logo
          font-size: 40px;
          font-weight: bold;
          color: #02a774;
          text-align: center;
        .login_header_title
          padding-top: 40px;
          text-align: center;
          >a
            color: #333;
            font-size: 14px;
            padding-bottom: 4px;
            &:first-child
              margin-right: 40px;
            &.on
              color: #02a774;
              font-weight: 700;
              border-bottom: 2px solid #02a774;
      .login_content
        >form
          >div
            display: none;
            &.on
              display: block;
            input
              width: 100%;
              height: 100%;
              padding-left: 10px;
              box-sizing: border-box;
              border: 1px solid #ddd;
              border-radius: 4px;
              outline: 0;
              font: 400 14px Arial;
							&:focus
                border: 1px solid #02a77;
            .login_message
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;
              .get_verification
                position: absolute;
                top: 30%;
                right: 10px;
                transform: translateT(-50%);
                border: 0;
                color: #ccc;
                font-size: 14px;
                background: transparent;
							  &.right_phone
                  color: black;
              .get_verification2
                position: absolute;
                top: 1px;
                right: 10px;
                height: 90%;
                transform: translateT(-50%);
            .login_verification
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;
              .switch_button
                font-size: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                transition: background-color 0.3s, border-color 0.3s;
                padding: 0 6px;
                width: 30px;
                height: 16px;
                line-height: 16px;
                color: #fff;
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                &.off
                  background: #fff;
                  .switch_text
                    float: right;
                    color: #ddd;
                &.on
                  background: #02a774;
                >.switch_circle
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  width: 16px;
                  height: 16px;
                  border: 1px solid #ddd;
                  border-radius: 50%;
                  background: #fff;
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                  transition: transform 0.3s;
                  &.right
                    transform: translateX(30px);

              /*.switch_button*/
                /*font-size: 12px;*/
                /*border-radius: 8px;*/
                /*width: 40px;*/
                /*height: 36px;*/
                /*color: blue;*/
                /*position: absolute;*/
                /*top: 50%;*/
                /*right: 5px;*/
                /*transform: scale(1.7);*/

            .login_hint
              margin-top: 12px;
              color: #999;
              font-size: 14px;
              line-height: 20px;
              >a
                color: #02a774;
          .login_submit
            display: block;
            width: 100%;
            height: 42px;
            margin-top: 30px;
            border-radius: 4px;
            background: #4cd96f;
            color: #fff;
            text-align: center;
            font-size: 16px;
            line-height: 42px;
            border: 0;
        .about_us
          display: block;
          font-size: 12px;
          margin-top: 20px;
          text-align: center;
          color: #999;
      .go_back
        position: absolute;
        top: 5px;
        left: 5px;
        width: 30px;
        height: 30px;
        >.iconfont
           font-size: 20px;
           color: #999;
</style>
