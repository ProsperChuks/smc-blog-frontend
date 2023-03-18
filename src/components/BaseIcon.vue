<template>
  <component :is="iconComputed" role="img" class="inline-block" />
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "currentColor",
  },
});

const iconComputed = computed(() => {
  props.name;
  return defineAsyncComponent(() =>
    import(`@/assets/icons/svgs/${props.name}.svg`)
  );
});
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
.fill-current {
  fill: currentColor;
}
</style>
