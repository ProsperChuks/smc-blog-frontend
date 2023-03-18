<script>
import { useDark } from "@vueuse/core";
import { h } from "vue";
import BlogCardList from "../components/BlogCardList.vue";
import BaseIcon from "./BaseIcon.vue";
import { getAPI } from "../axios";
import AddComment from '../components/AddComment.vue';
import Comment from '../components/Comment.vue';

const isDark = useDark();

export default {
  data() {
    return {
      loading: true,
      isDark: isDark,
      posts: [],
      similarposts: [],
      thsl: this.$route.params.slug.toString(),
      cat: null,
      auth_img: null,
      auth_name: null,
      text: '',
    };
  },
  created() {
    getAPI.get('/posts/'+this.thsl)
    .then(response => {
      this.loading = false
      console.log('posts API has received data')
      this.posts = response.data
      this.text = this.posts.body
      this.cat = this.posts.categories

      getAPI.get('/categories/'+this.cat)
      .then(response => {
        this.cat = response.data.cat_title
      })
      .catch(err => {
        console.log(err)
      })

      getAPI.get('/users/'+this.posts.author)
      .then(response => {
        this.auth_name = response.data.name
        this.auth_img = response.data.image
      })
      .catch(err => {
        console.log(err)
      })

      getAPI.get('/posts?category='+this.cat)
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id == this.posts.id){
            response.data.splice(i, 1);
            this.similarposts = response.data;
            break;
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  components: { BlogCardList, BaseIcon, AddComment, Comment },
};
</script>
<template>
  <main class="lg:px-48">
    <section class="pb-6 mb-20 font-baseFamily mx-auto">
      <div>
        <div class="flex loading w-max mx-auto" v-if="loading">
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-1/5 h-1/5 mx-auto dark:text-white text-black animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <div v-if="posts" class="p-5">
          <h1
            class="font-bold bg-blue-600 w-max my-4 uppercase text-white p-2 text-sm text-center"
          >
            {{ cat }}
          </h1>
          <h1
            class="md:text-4xl text-2xl my-10 font-serifFamily capitalize font-bold"
          >
            {{ posts.title }}
          </h1>
          <div class="flex items-center gap-2 my-6">
            <div class="w-8 h-8">
              <img
                class="w-full h-full rounded-full"
                :src="auth_img"
                alt=""
              />
            </div>
            <div class="text-[#919094] text-xs">
              <h1 class="font-semibold text-sm text-[#a6a2b5]">
                by {{ auth_name }}
              </h1>
              <div class="flex items-center gap-2">
                <span>Jan 5th</span>
                <p class="h-1 w-1 bg-current rounded-full"></p>
                <!-- <span>{{ posts.timeToRead || "15 mins read" }}</span> -->
              </div>
            </div>
          </div>

          <img
            v-if="posts.mainImage"
            v-for="post in posts.mainImage"
            :key="post.id"
            class="h-[15rem] w-full object-contain my-4"
            :src="post.mainImage"
          />

          <div class="md:px-12">
            <div
              class="flex-nowrap content mx-auto flex flex-col space-y-9 text-lg text-elipsis"
            >
              <div class="text-md" v-html="text"></div>
            </div>
            <br />
            <div class="">
              <div class="border-2 md:p-12 p-6 border-[#E3BADA]">
                <p class="font-bold text-xl uppercase">Key Points</p>
                <h1>{{ posts.summary }}</h1>
              </div>
              <div class="text-sm mt-12">
                <span class="mr-4">
                  <BaseIcon name="heart" />
                  200
                </span>
                <span>
                  <BaseIcon name="chat" />
                  15
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center flex justify-center space-x-6 mx-6 mt-10">
        <div class="after:content-[''] h-[3rem] w-6 bg-gray-300"></div>
        <p class="italic">
          <span class="font-bold">Disclaimer: </span>
          All posts and articles are opinions and views of the writers only and
          do not constitute financial or legal advice
        </p>
      </div>
    </section>
    <div class="">
      <p
        class="p-2 mb-8 text-xl font-bold text-left border-t border-b border-black dark:border-white"
      >
        Comments
      </p>
      <div class="md:mx-12 mx-5">
        <div class="comment-space">
          <comment class="message" />
        </div>
        <hr>
        <add-comment />
      </div>
    </div>

    <section class="py-4 w-full">
      <p
        class="p-2 mb-8 text-xl font-bold text-left border-t border-b border-black dark:border-white"
      >
        More Like This
      </p>
      <div class="px-5">
        <BlogCardList v-if="similarposts" :posts="similarposts" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.comment-space{
  font-size: 0.9em;
}

ul,
ol {
  font-size: 1.3rem;
  line-height: 1.75em;
  margin: 1.2em 0;
}
.content {
  align-items: start;
}

.content p {
  text-align: left;
  /* width: fit-content; */
}

.content a {
  text-decoration: underline;
}

main {
  min-height: 100vh;
}
</style>
