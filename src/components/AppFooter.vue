<template>
  <footer
    class="text-center bg-[#1B1B1F] dark:bg-black text-white py-9 text-xs"
  >
    <div class="md:w-1/2 mx-auto">
      <h1 class="text-3xl font-bold font-serifFamily capitalize">
        Sign up for daily report in your inbox
      </h1>
      <div class="mt-4 my-6">
        <p>Get daily analysis, new and updates right into your inbox!</p>
        <p>Sign up here so you don't miss a single newsletter</p>
      </div>
      <form method="post" @submit.prevent="submitForm">
        <input
        class="border-b outline-none bg-transparent w-4/5 p-3 text-xs"
        type="text"
        name="email"
        v-model="email"
        placeholder="Enter your email address"
        required
        />
        <br />
        <button
          class="bg-white h-[50px] p-3 m-4 w-4/5 text-black text-xs font-semibold"
        >
          Subscribe
        </button>
        <p v-if="success"></p>
        <pre>{{ response }}</pre>
      </form>
    </div>
    <div
      class="flex md:flex-row flex-col footer lg:px-24 px-3 py-6 md:justify-between text-xs text-[#767680]"
    >
      <div class="">
        <p class="flex md:space-x-4 text-sm justify-center">
          &copy;2023 SMC Desk &nbsp;|<span
            class="mx-3 flex justify-center space-x-6"
          >
            <img src="@/assets/icons/discord.png" alt="" width="12" />
            <img src="@/assets/icons/twitter.png" alt="" width="12" />
            <img src="@/assets/icons/youtube.png" alt="" width="12" />
            <img src="@/assets/icons/instagram.png" alt="" width="12" />
            <img src="@/assets/icons/telegram.png" alt="" width="12" />
          </span>
        </p>
      </div>
      <div class="">
        <div class="flex justify-between w-full space-x-6">
          <RouterLink to="/"> About Us </RouterLink>
          <RouterLink to="">Privacy </RouterLink>
          <RouterLink to="/"> Learn</RouterLink>
          <RouterLink to="/"> Cookie Policy</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import { getAPI } from "../axios";
  export default {
    data (){
      return {
        email: '',
        response: '',
        success: null,
      }
    },
    methods: {
      submitForm(){
        getAPI.post('/subscribe', {email: this.email})
        .then(response => {
          this.success = true
          this.response = 'Subscribed'
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  };
</script>
