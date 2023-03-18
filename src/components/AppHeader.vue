<script>
import BaseButton from "./BaseButton.vue";
import AppLogo from "./AppLogo.vue";
import { useDark, useToggle } from "@vueuse/core";
import BaseIcon from "./BaseIcon.vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return {
      isDark,
      toggleDark,
    };
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.classList.toggle("overflow-hidden");
    },
  },
  mounted() {
    const router = useRouter();
    router.beforeEach((to, from) => {
      this.isMenuOpen = false;
    });
  },
  components: { BaseButton, AppLogo, BaseIcon },
};
</script>
<template>
  <div
    class="flex flex-col sticky top-0 z-50 shadow"
    :class="{
      'h-screen': isMenuOpen,
    }"
  >
    <nav
      class="grid place-items-center grid-cols-[minmax(25px,8rem)_1fr_minmax(25px,8rem)] px-5 md:pt-4 pt-8 pb-4 gap-9 w-full items-center justify-between lg:text-lg bg-white dark:bg-[#1B1B1F]"
    >
      <!-- class="flex px-5 py-4 gap-9 w-full items-center justify-between lg:text-lg" -->
      <div class="">
        <button class="flex gap-2 items-center" @click="toggleDark()">
          <BaseIcon name="mode" />
          <span class="hidden lg:block text-sm whitespace-nowrap font-semibold"
            >{{ isDark ? "Dark" : "Light" }} Mode</span
          >
        </button>
      </div>
      <RouterLink class="md:hidden" to="/">
        <AppLogo class="text-black dark:text-white" />
      </RouterLink>
      <div class="hidden lg:flex gap-9 w-full capitalize justify-evenly">
        <div class="flex items-center gap-4">
          <RouterLink
            class="font-bold text-sm"
            to="/bc"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
            >blockchain report
          </RouterLink>
          <RouterLink
            class="font-bold text-sm"
            to="/eq"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
          >
            equity report</RouterLink
          >
        </div>
        <RouterLink to="/">
          <AppLogo class="text-black dark:text-white" />
        </RouterLink>
        <div class="flex items-center gap-4">
          <RouterLink
            class="font-bold text-sm"
            to="/eco"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
          >
            economics report</RouterLink
          >
          <RouterLink
            class="font-bold text-sm"
            to="/geo"
            exact-active-class="text-[#366bff]"
            active-class="text-[#366bff]"
          >
            geopolitical report</RouterLink
          >
        </div>
      </div>
      <div class="hidden md:block">
        <div
          class="flex gap-2 transition-all items-center border-b border-[#004FE5] w-full text-sm group"
        >
          <BaseIcon
            name="search"
            class="group-focus-within:text-[#00E0B1] transition-all t text-[#366BFF]"
          />
          <input
            type="text"
            placeholder="search"
            class="outline-none w-12 group-focus-within:w-full transition-all"
          />
        </div>
      </div>
      <div class="lg:hidden">
        <button @click="openMenu" v-if="!isMenuOpen">
          <BaseIcon name="hamburger" />
        </button>
        <button @click="openMenu" v-if="isMenuOpen">
          <BaseIcon name="close" />
        </button>
      </div>
      <!-- TODO: Refactor mobile menu dropdown -->
      <div
        v-if="isMenuOpen"
        class="flex absolute bg-white dark:bg-[#272626] mt-[4.8rem] h-[100vh] z-50 items-center text-left flex-col space-y-10 w-full capitalize border-t border-black dark:border-white top-0"
      >
        <div
          class="flex gap-2 items-center border-b border-[#004FE5] w-full px-6 py-3"
        >
          <BaseIcon name="search" class="text-[#366BFF]" />
          <input type="text" placeholder="search" class="outline-none w-full" />
        </div>
        <div class="flex flex-col justify-center gap-10 h-1/2 !m-0">
          <RouterLink
            to="/"
            class="font-bold"
            exact-active-class="text-[#366bff]"
          >
            home
          </RouterLink>
          <RouterLink
            to="/bc"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
            >blockchain report
          </RouterLink>
          <RouterLink
            to="/eq"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
          >
            equity report</RouterLink
          >
          <RouterLink
            to="/eco"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
          >
            economics report</RouterLink
          >
          <RouterLink
            to="/geo"
            class="font-bold"
            active-class="text-[#366bff]"
            exact-active-class="text-[#366bff]"
          >
            geopolitical report</RouterLink
          >
        </div>
        <hr class="border w-full" />
        <BaseButton class="capitalize">
          subscribe to our daily news letter
        </BaseButton>
        <div class="flex justify-center space-x-6">
          <img src="@/assets/icons/discord.png" alt="" width="20" />
          <img src="@/assets/icons/twitter.png" alt="" width="20" />
          <img src="@/assets/icons/youtube.png" alt="" width="20" />
          <img src="@/assets/icons/instagram.png" alt="" width="20" />
          <img src="@/assets/icons/telegram.png" alt="" width="20" />
        </div>
      </div>
    </nav>
  </div>
</template>
