<script>
import Placeholder from "../components/BlogPost.vue";
import PriceMarqueeWidget from "../components/PriceMarqueeWidget.vue";
import BlogCardList from "../components/BlogCardList.vue";
import { useDark, useToggle } from "@vueuse/core";
import BlogCard from "../components/BlogCard.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseIcon from "../components/BaseIcon.vue";
import { getAPI } from "../axios";

const isDark = useDark();

export default {
  data() {
    return {
      blogPosts: null,
      typedPosts: null,
      editorPosts: null,
      fall: false,
      count: 0,
      loading: true,
      isMobile: false,
      isDark: isDark,
    };
  },
  methods: {
    fetchTypedPost(slug) {
      getAPI.get('/posts?category='+slug)
      .then(response => {
        this.typedPosts = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created() {
    this.fetchTypedPost('bc')
    getAPI.get('/posts')
    .then(response => {
      console.log('posts API has received data')
      this.blogPosts = response.data
    })
    .catch(err => {
      console.log(err)
    })

    getAPI.get('/posts'+'?editor=True')
    .then(response => {
      this.editorPosts = response.data
    })
    .catch(err => {
      console.log(err)
    })
  },
  components: {
    Placeholder,
    PriceMarqueeWidget,
    BlogCardList,
    BlogCard,
    BaseButton,
    BaseIcon,
  },
};
</script>

<template>
  <header class="pb-4 capitalize">
    <div class="h-max" id="stats">
      <PriceMarqueeWidget class="dark:text-black" />
    </div>
  </header>
  <main class="lg:px-48" :class="{ 'overflow-hidden max-h-[100vh]': isMobile }">
    <section class="py-4 w-full md:grid md:grid-cols-[1fr_180px] gap-5">
      <div
        class="h-[70vh] text-white flex flex-col max-w-4xl mx-auto bg-[url(https://images.unsplash.com/photo-1677019617752-7316ce58b864?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80)] justify-end"
      >
        <div class="p-12">
          <h1 class="font-bold text-2xl font-serifFamily capitalize">
            {{ blogPosts[0].title }}
          </h1>
          <p class="flex items-center gap-2 text-[#919094] text-[10px]">
            by {{ blogPosts[0].author }}
          </p>
        </div>
        <div class="flex space-x-2 justify-center p-3">
          <p class="h-2 w-2 rounded-full bg-[#668AFF]"></p>
          <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
          <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
          <p class="h-2 w-2 bg-[#FEFBFF] rounded-full"></p>
        </div>
      </div>
      <div class="hidden lg:block">
        <BlogCard v-if="editorPosts[0]" :post="editorPosts[0]" md-shrink />
        <BlogCard v-if="editorPosts[1]" :post="editorPosts[1]" md-shrink />
      </div>
    </section>
    <section class="py-4 w-full">
      <div
        class="flex items-center justify-between mb-8 border-t border-b dark:border-white border-black p-2"
      >
        <h2 class="text-xl font-bold text-left">Editor's Posts</h2>
        <RouterLink to="/bc" class="text-sm font-semibold flex items-center">
          <span>All</span>
          <BaseIcon name="arrow-right" />
        </RouterLink>
      </div>
      <div class="px-5">
        <BlogCardList v-if="editorPosts" :posts="editorPosts" />
      </div>
    </section>

    <section class="mt-16 py-4 w-full">
      <nav
        class="flex gap-4 py-2 mx-5 mb-8 border-b border-black dark:border-white overflow-y-auto scrollbar-hide"
      >
        <button
          @click="fetchTypedPost('et')"
          :class="{
            'text-blue-700 underline-offset-[10px] decoration-4 underline':
              count == 1,
          }"
          class="font-bold"
        >
          Equity
        </button>
        <button
          @click="fetchTypedPost('bc')"
          :class="{
            'text-blue-700 underline-offset-[10px] decoration-4 underline':
              count == 2,
          }"
          class="font-bold"
        >
          Blockchain
        </button>
        <button
          @click="fetchTypedPost('ge')"
          :class="{
            'text-blue-700 underline-offset-[10px] decoration-4 underline':
              count == 3,
          }"
          class="font-bold"
        >
          Geopolitical
        </button>
        <button
          @click="fetchTypedPost('ec')"
          :class="{
            'text-blue-700 underline-offset-[10px] decoration-4 underline':
              count == 4,
          }"
          class="font-bold"
        >
          Economic
        </button>
      </nav>
      <div class="px-5">
        <BlogCardList
          v-if="typedPosts"
          :posts="typedPosts"
          variant="secondary"
        />
        <BaseButton class="w-2/4 mx-auto my-16"> Show more stories </BaseButton>
      </div>
    </section>
  </main>
</template>
