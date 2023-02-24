<template>
  <div class="signUp-container">
    <!-- didicast image -->
    <div>
      <img class="signUp-didicast-image" :src="require('@/img/didicast_logo.png')"/>
    </div>

    <!-- login container -->
    <div>
      <h3 class="signUp-title">로그인</h3>

      <!-- login form -->
      <div class="signup-input-container">
        <div>
          <div>
            <input v-model="signId" class="signUp-input" type="text" placeholder="아이디 입력"/>
          </div>
          <div>
            <input v-model="signPw" class="signUp-input" type="password" placeholder="패스워드 입력"/>
          </div>
          <button class="signUp-button" @click="login">
            로그인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'signUp',
  data() {
    return {
      signId: '',
      signPw: '',
    }
  },
  props: {
  },
  methods: {
    login() {
      // 로그인 api 호출
      axios.post(
        'https://api-government.didisam.com/api/login',
        {
          email: this.signId, 
          password: this.signPw,
        }
      ).then((res) => {
        // token을 로컬스토리지에 저장
        localStorage.setItem('token', res.data.authorisation.token);
        localStorage.setItem('username', res.data.user.username);
        console.log(res.data)

        if(res.data.user.role == "user"){
          this.$router.push('/userMain')
          localStorage.setItem('role', "user");
        }
        if(res.data.user.role == "admin"){
          this.$router.push('/userMain')
          localStorage.setItem('role', "admin");
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style>
@import "../css/signUp.css";
</style>
