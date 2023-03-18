<script>
  import Placeholder from "../components/BlogPost.vue";
  import { useDark, useToggle } from "@vueuse/core";
  import PriceMarqueeWidget from "../components/PriceMarqueeWidget.vue";
  import BlogCardList from "../components/BlogCardList.vue";
  import { getAPI } from "../axios";
  
  const isDark = useDark();
  export default {
    name: 'Posts',
    data() {
      return {
        isDark: isDark,
        blogPosts: null,
        fall: false,
        loading: true,
        isMobile: false,
      }
    },
    components: {
      Placeholder,
      PriceMarqueeWidget,
      BlogCardList,
    },
    created() {
      getAPI.get('/posts?category='+'bc',)
      .then(response => {
        this.loading= false
        console.log('post API has received data')
        this.blogPosts = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
  </script>
  
  <template>
    <main class="pb-6 mb-20 font-baseFamily mx-auto">
      <section class="py-4 max-w-4xl mx-auto w-full mb-12">
        <p class="pb-8 text-2xl font-bold text-center">Latest Stories</p>
        <div
          class="font-baseFamily text-center font-bold text-4xl mt-32 mb-32"
          v-if="!blogPosts || !blogPosts.length"
        >
          <h1>No New Posts Here</h1>
        </div>
        <template v-else>
          <BlogCardList v-if="blogPosts" :posts="blogPosts" />
        </template>
      </section>
    </main>
  </template>
  