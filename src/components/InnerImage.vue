<template>
  <img
    class="mx-auto h-[15rem] w-4/5 object-cover rounded-xl shadow-2xl shadow-[#803d99]"
    :src="image"
  />
</template>
<script>
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);

export default {
  props: {
    url: {
      type: String,
      default: () => "",
    },
  },
  created() {
    console.log(this.url);
  },
  data() {
    return {
      image: imageBuilder.image(this.url),
    };
  },
  methods: {
    imageUrlFor() {
      return imageBuilder.image(this.url);
    },
  },
};
</script>
