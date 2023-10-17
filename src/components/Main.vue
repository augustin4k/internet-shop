<template>
  <div id="mainPart">
    <div class="album py-5 bg-light">
      <div class="container-fluid">
        <SortBar v-if="!emptyClickShop" @need-to-sort="sortItems" :info-shop="clickShop"
          :existProducs="menuItems && menuItems.length > 0" :min-price="minPrice"
          @reset-click-shop='resetEmptyShopFlag' />
        <div class="row" v-if="menuItems && menuItems.length > 0">
          <div class="col-4 d-flex align-items-stretch" v-for="(card, index) in menuItems" :key="index">
            <ProductCard @cart-updated="cartUpdated" @click='handleClickCard(card)' :itemInfo="card" />
          </div>
        </div>
        <div v-else class="alert alert-light text-center" role="alert">
          Restaurants, products or description not found :(
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SortBar from './main/SortBar.vue'
import ProductCard from './main/ProductCard.vue'
import fetchData from "../mixins/fetchFunction.vue"

export default {
  name: 'MainPart',
  props: { fluxData: Array },
  mixins: [fetchData],
  components: {
    SortBar, ProductCard,
  },
  data() {
    return {
      // variable where i will save 
      // information about shop, when i will click on any shop
      clickShop: {},
      root: process.env.BASE_URL,
      menuItems: [],
      saveBeforeSort: [],
    };
  },
  methods: {
    cartUpdated() {
      this.$emit('cart-updated');
    },
    sortItems(data) {
      // We are sure that this method will be only called when a shop card is clicked.
      const toSort = data;

      // Once we have a shop card, our items are an array of products that can be sorted.
      const saveBeforeSort = this.saveBeforeSort;

      // Use a conditional (ternary) operator to sort in ascending or descending order based on the 'toSort' variable.
      this.menuItems = toSort ? saveBeforeSort.sort((a, b) => a.price - b.price) : saveBeforeSort.sort((a, b) => b.price - a.price);
    },
    resetEmptyShopFlag() {
      this.clickShop = {};
      this.menuItems = this.fluxData;
    },
    handleClickCard(cardInfo) {
      // is shop only when cardInfo doesn't have id
      if (cardInfo.id == null) {
        this.clickShop = cardInfo;
        this.fetchData(`${this.root}db/${this.clickShop.products}`).then((data) => {
          // get products from the shop
          this.menuItems = data;
          this.saveBeforeSort = data;
          this.sortItems(true);
        });
      }
    },

  },
  computed: {
    emptyClickShop() {
      return Object.keys(this.clickShop).length === 0;
    },
    minPrice() {
      if (this.menuItems.length > 0) {
        return Math.min(...this.menuItems.map(product => product.price));
      }
      return 0; // Return a default value if there are no menu items.
    },
  },
  watch: {
    // Watch for changes in menuItems and update minPrice
    fluxData: {
      handler(newVal) {
        this.clickShop = {};
        this.menuItems = newVal;
      },
      deep: true,
    },
  },
};
</script>


