<template>
  <header class="w-min">
    <a href="/" class="flex items-center">
      <img src="@/assets/icons/icon.png" class="m-3 w-[30px]" alt="" />
      <p class="font-baseFamily text-white font-bold">Home</p>
    </a>
  </header>
  <div class="font-baseFamily pt-12">
    <img
      src="@/assets/icons/icon-main.png"
      class="pt-9 w-[300px] mx-auto"
      alt=""
    />
    <hr class="w-3/5 mx-auto" />

    <form method="post" @submit.prevent="loginForm" class="w-4/5 mx-auto">
      <h1 class="uppercase text-white font-bold text-xl m-6 w-max mx-auto">
        Login to dashboard
      </h1>
      <div class="flex flex-col space-y-6">
        <div class="flex flex-col w-min mx-auto">
          <label for="name" class="text-white font-semibold"
            >Email</label
          >
          <input
            type="text"
            name="text"
            v-model="email"
            required
            placeholder="Email"
            class="rounded-xl border p-4 border-white/50 bg-transparent"
          />
        </div>
        <div class="flex flex-col w-min mx-auto">
          <label for="email" class="text-white font-semibold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
            required
            class="rounded-xl border p-4 border-white/50 bg-transparent"
          />
        </div>
        <div class="flex justify-center">
          <button
            class="bg-white/10 px-10 py-3 rounded-xl text-white border border-white"
          >
            LOGIN
          </button>
        </div>
        <div class="flex justify-center">
          <br>
          <p style="color: rgb(255, 0, 0);">{{ error }}</p>
        </div>
      </div>
    </form><br><br><br>
  </div>
</template>

<style></style>

<script>
  import { getAPI } from "../axios";

  export default {
    data() {
      return {
        email: '',
        password: '',
        userslg: '',
        success: null,
        error: null,
        token: null,
      };
    },
    methods: {
      loginForm(){
        getAPI.post('api/auth/token/login/', {username: this.email, password: this.password})
        .then(response => {
          this.success = true
          this.token = response.data
          getAPI.get('/users?email='+this.email)
          .then(response => {
            this.userslg = response.data[0].slug
            // console.log(this.userslg)
            this.$router.push({path: 'profile/'+this.userslg })
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
          this.error = err
        })
      }
    },
  };
</script>
