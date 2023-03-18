<template>
  <div
    class="py-4 px-6 border dark:border-white border-black flex items-center"
  >
    <span
      class="border-r dark:border-white border-black pr-3 font-medium dark:text-white"
    >
      {{ coin.name }}
    </span>
    <span
      class="coin-marquee-item-price font-medium border-r dark:border-white border-black px-3"
      :class="{
        'text-[#008769] dark:text-[#37FECB]':
          coin.quote['2781'].percent_change_24h > 0,
        'text-red-500': coin.quote['2781'].percent_change_24h < 0,
      }"
    >
      ${{ parsePrice(coin.quote["2781"].price) }}
    </span>
    <div
      class="flex items-center gap-2 pl-3"
      :class="{
        'text-[#008769] dark:text-[#37FECB]':
          coin.quote['2781'].percent_change_24h > 0,
        'text-red-500': coin.quote['2781'].percent_change_24h < 0,
      }"
    >
      <span>24h</span>
      <svg
        v-if="coin.quote['2781'].percent_change_24h > 0"
        width="16"
        height="16"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-[#008769] dark:text-[#37FECB]"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.571639 0.571639C0.154999 0.98828 0.154999 1.65885 0.154999 3C0.154999 4.34114 0.154999 5.01172 0.571639 5.42836C0.98828 5.845 1.65885 5.845 3 5.845C4.34114 5.845 5.01172 5.845 5.42836 5.42836C5.845 5.01172 5.845 4.34114 5.845 3C5.845 1.65885 5.845 0.98828 5.42836 0.571639C5.01172 0.154999 4.34114 0.154999 3 0.154999C1.65885 0.154999 0.98828 0.154999 0.571639 0.571639ZM3.49787 2.431C3.49787 2.54884 3.59341 2.64437 3.71125 2.64437H3.90737L3.33479 3.21695C3.30702 3.24472 3.26198 3.24472 3.23421 3.21695L2.78305 2.76579C2.58862 2.57136 2.27338 2.57136 2.07895 2.76579L1.42662 3.41812C1.34329 3.50145 1.34329 3.63655 1.42662 3.71988C1.50995 3.80321 1.64505 3.80321 1.72838 3.71988L2.38071 3.06755C2.40848 3.03977 2.45352 3.03977 2.48129 3.06755L2.93245 3.51871C3.12688 3.71314 3.44212 3.71314 3.63655 3.51871L4.20912 2.94613V3.14225C4.20912 3.26009 4.30466 3.35562 4.4225 3.35562C4.54034 3.35562 4.63587 3.26009 4.63587 3.14225V2.431C4.63587 2.31315 4.54034 2.21762 4.4225 2.21762H3.71125C3.59341 2.21762 3.49787 2.31315 3.49787 2.431Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        width="16"
        height="16"
        viewBox="0 0 5 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.475114 0.974869C0.127655 1.32233 0.127655 1.88155 0.127655 3.00001C0.127655 4.11846 0.127655 4.67768 0.475114 5.02514C0.822572 5.3726 1.3818 5.3726 2.50025 5.3726C3.6187 5.3726 4.17793 5.3726 4.52539 5.02514C4.87285 4.67768 4.87285 4.11846 4.87285 3.00001C4.87285 1.88155 4.87285 1.32233 4.52539 0.974869C4.17793 0.627411 3.6187 0.627411 2.50025 0.627411C1.3818 0.627411 0.822572 0.627411 0.475114 0.974869ZM1.43978 2.39966C1.37029 2.33017 1.25762 2.33017 1.18813 2.39966C1.11864 2.46915 1.11864 2.58182 1.18813 2.65131L1.73214 3.19532C1.89428 3.35747 2.15718 3.35747 2.31932 3.19532L2.69557 2.81908C2.71873 2.79592 2.75629 2.79592 2.77945 2.81908L3.25695 3.29658H3.0934C2.99512 3.29658 2.91545 3.37625 2.91545 3.47453C2.91545 3.5728 2.99512 3.65247 3.0934 3.65247H3.68655C3.78482 3.65247 3.86449 3.5728 3.86449 3.47453V2.88138C3.86449 2.7831 3.78482 2.70343 3.68655 2.70343C3.58827 2.70343 3.5086 2.7831 3.5086 2.88138V3.04493L3.0311 2.56743C2.86896 2.40528 2.60606 2.40528 2.44392 2.56743L2.06767 2.94367C2.04451 2.96684 2.00695 2.96684 1.98379 2.94367L1.43978 2.39966Z"
          fill="#FF4D4D"
        />
      </svg>

      <span class="coin-marquee-item-percent">
        {{ coin.quote["2781"].percent_change_24h.toFixed(2) }}%
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetCard",
  props: {
    coin: {
      type: Object,
      required: true,
    },
  },
  methods: {
    parsePrice(price) {
      if (price.toString().includes("e")) {
        // if price is in scientific notation
        return price.toExponential(3);
      } else if (price > 1) {
        return price.toFixed(2);
      } else return price.toPrecision(6);
    },
  },
};
</script>

<style lang="scss" scoped></style>
