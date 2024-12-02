<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const form = ref({
  account: '13012345751',
  password: '123456',
  agree: false
})

const formRef = ref(null)

const rules = {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}

const userStore = useUserStore()

const router = useRouter()

const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await userStore.getuserInfo({
        account: form.value.account,
        password: form.value.password
      })

      ElMessage({ type: 'success', message: '登录成功' })
      router.replace({ path: '/' })
    }
  })
}
</script>
<template>
  <div class="login">
    <div class="login-header">
      <div class="Center">
        <h1 class="logo">
          <RouterLink to="/"></RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </div>
    <div class="login-body">
      <div class="login-form">
        <h2>账户登录</h2>
        <div class="form">
          <el-form
            :model="form"
            :rules="rules"
            label-position="right"
            label-width="60px"
            status-icon
            ref="formRef"
          >
            <el-form-item label="账户" prop="account">
              <el-input v-model="form.account" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item prop="agree" label-width="22px">
              <el-checkbox size="large" v-model="form.agree">
                我已同意隐私条款和服务条款
              </el-checkbox>
            </el-form-item>
            <el-button size="large" class="subBtn" @click="handleLogin"
              >点击登录</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.login-header {
  height: 132px;
  border-bottom: 1px solid #e4e4e4;
  background-color: #fff;

  .Center {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 132px;

    .logo {
      width: 200px;
      height: 132px;

      a {
        display: inline-block;
        width: 100%;
        height: 132px;
        background: url(@/assets/logo.png) no-repeat center 18px / contain;
      }
    }
    .entry {
      font-size: 16px;
      color: #333;
      width: 120px;
      margin-bottom: 38px;
      i {
        font-size: 14px;
        color: #27ba9b;
        letter-spacing: -5px;
      }
    }
  }
}

.login-body {
  background: url('@/assets/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;
  border-top: 1px solid #e4e4e4;

  .login-form {
    position: absolute;
    width: 380px;
    height: 293px;
    top: 54px;
    left: 930px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background: #fff;

    h2 {
      font-size: 18px;
      line-height: 55px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 40px;
      text-align: center;
      align-items: center;
      font-weight: normal;
    }

    .form {
      padding: 0 20px 20px 20px;

      .input {
        position: relative;
        height: 36px;
      }

      .subBtn {
        background: #27ba9b;
        width: 100%;
        color: #fff;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  height: 159px;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    font-size: 14px;
    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
