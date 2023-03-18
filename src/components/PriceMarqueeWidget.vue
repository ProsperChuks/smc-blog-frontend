<template>
  <div class="flex items-center overflow-hidden">
    <div class="bg-transparent flex-col-reverse md:flex-row">
      <div
        class="w-full md:w-[calc(100%-141px)] overflow-hidden whitespace-nowrap flex"
      >
        <div
          class="flex flex-row justify-between animate-marquee-scroll hover:animate-pause text-xs"
        >
          <!-- TODO: Show loading skeleton while waiting -->
          <!-- TODO: Fix typography -->
          <WidgetCard v-for="coin in coinData" :key="coin.id" :coin="coin" />
          <WidgetCard v-for="coin in coinData" :key="coin.id" :coin="coin" />
        </div>
      </div>
      <!-- <div class="self-end md:self-auto">
        <p>
          powered by
          <a class="font-semibold" href="https://coinmarketcap.com/"
            >CoinMarketCap</a
          >
        </p>
      </div> -->
    </div>
  </div>
</template>
<script>
import WidgetCard from "./WidgetCard.vue";

export default {
  name: "PriceMarqueeWidget",
  components: {
    WidgetCard,
  },
  data() {
    return {
      coinData: [],
    };
  },
  mounted() {
    fetch(
      "https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=1,20700,23241,1027,74,5426,1839&convert_id=2781"
    ).then((response) => {
      response.json().then((data) => {
        this.coinData = Object.values(data.data);
      });
    });
  },
};
</script>
