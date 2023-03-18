<template>
  <button
    class="block mx-auto p-3 text-xs font-semibold"
    :class="{
      'bg-black dark:bg-white p-3 text-white dark:text-black':
        variant === 'primary',
      'bg-transparent border border-black dark:border-white dark:text-white text-black':
        variant === 'secondary',
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
    },
  },
};
</script>
