<template>
  <!-- TODO: Refactor dimensions, Fixed Height/Widths, tidy component -->
  <article
    class="dark:text-white text-black  max-w-sm lg:max-w-full py-2 gap-2 items-center"
    :class="{
      'grid-cols-[1fr_130px]': variant !== 'default',
      ' ':
        mdShrink,
    }"
  >
    <router-link :to="`/post/${post.slug}`">
      <div
        v-if="post.mainImage"
        class="w-full"
        :class="{
          'md:h-full': mdShrink,
        }"
      >
        <img
          :src="post.mainImage"
          alt="blog post"
          class=""
        />
      </div>
      <div
        :class="{
          '-order-1': variant !== 'default',
        }"
      >
        <div
          v-if="variant !== 'default'"
          class="flex items-center text-[#919094] gap-2 text-xxs mb-2"
        >
          <figure class="h-5 w-5">
            <img
              :src="athmg"
              alt="author image"
              class="w-full h-full object-cover rounded-sm"
            />
          </figure>
          by {{ ath }}
        </div>
        <h3 class="font-bold font-serifFamily uppercase mb-1 leading-5">
          {{ post.title }}
        </h3>
        <p
          class="text-xs mb-2 leading-4"
          :class="{
            hidden: variant !== 'default' || mdShrink,
          }"
        >
          {{ post.summary }}
        </p>
        <div class="flex items-center text-[#919094] gap-2 text-xxs">
          <div v-if="variant === 'default'" class="flex items-center gap-2">
            <figure
              class="h-5 w-5"
              :class="{
                hidden: !mdShrink,
              }"
            >
              <img
                :src="athmg"
                alt="author image"
                class="w-full h-full object-cover rounded-sm"
              />
            </figure>
            by {{ ath }}
          </div>
          <span v-else>Jan 5th</span>
          <p class="h-2 w-2 bg-current rounded-full"></p>
          <span v-if="variant === 'default'">{{ post.publishedAt }}</span>
          <span v-else>{{ post.timeToRead }}</span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
import { getAPI } from "../axios";
export default {
  name: "BlogCard",
  data() {
    return {
      localVariable: null,
      ath: null,
      athmg: null,
    };
  },
  props: {
    variant: {
      type: String,
      default: "default", // secondary, default
    },
    mdShrink: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.post);
    var vsc = this.post.author;
    getAPI
      .get("/users/" + vsc)
      .then((response) => {
        this.localVariable = response.data;
        this.ath = this.localVariable.name;
        this.athmg = this.localVariable.image;
        console.log(this.localVariable);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
