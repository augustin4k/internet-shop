<template>
  <div id="mainPart">
    <div class="album py-5 bg-light">
      <div class="container">

        <!-- Handling with sections between header and cards zone -->
        <div v-if='!showShopInfo' class="d-flex flex-column mb-3">
          <div class="d-flex flex-column p-5 rounded promo mb-5" name="previewShop">
            <h1 class="display-4 font-weight-bold mb-5">Онлайн-сервис <br />
              доставки еды на дом
            </h1>
            <p>Блюда из любимого ресторана привезет <br />курьер в перчатках, маске и с
              антисептиком</p>
          </div>
          <div class="d-flex justify-content-between mb-5">
            <h1 class="display-4 mb-0">Restaurants</h1>
            <div class="w-50 d-flex align-items-center">
              <div class="input-group input-group-lg">
                <span class="input-group-text bg-white" id="basic-addon1">
                  <i class="fa-solid fa-shop"></i>
                </span>
                <input v-model="searchInput" type="text" class="form-control" placeholder="Search restaurants..."
                  aria-label="delivery" aria-describedby="basic-addon1">
              </div>
            </div>
          </div>
        </div>
        <!-- if we are in shop mode, then show bar for sorting of products -->
        <SortBar v-else @need-to-sort="sortItems" :info-shop="clickShop" :existProducs="menuItems && menuItems.length > 0"
          :min-price="minPrice" @show-shop-list='showShopList' />
        <!-- Bellow is the zone for showing of cards (shops or product cards) -->
        <div class="row" v-if="menuItems && menuItems.length > 0">
          <div class="col-4 d-flex align-items-stretch" v-for="(card, index) in menuItems" :key="index">
            <ProductCard v-if="showShopInfo" :itemInfo="card" />
            <ShopCard v-else @cart-updated="cartUpdated" @click='handleClickCard(card)' :itemInfo="card" />
          </div>
        </div>
        <!-- if no items are shown, then show NO RESTAURANTS OR PRODUCTS CAN BE SHOWN -->
        <div v-else class="alert alert-warning text-center" role="alert">
          Restaurants according your searching haven't been found <i class="fa-solid fa-face-sad-tear"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SortBar from './main/SortBar.vue'
import ProductCard from './main/ProductCard.vue'
import ShopCard from './main/ShopCard.vue'
import axios from "axios";

export default {
  name: 'MainPart',
  props: {
    db: Object // used for saving initial state of db 
  },
  components: {
    SortBar, ProductCard,
    ShopCard
  },
  data() {
    return {
      searchInput: "",
      // variable where i will save 
      // information about shop, when i will click on any shop
      clickShop: {},
      root: process.env.BASE_URL,
      menuItems: this.db, // here will be saved actual list of items which should be rendered
      searchResults: this.db, // here will be saved flux items based on searching
      saveBeforeSort: [],
    };
  },
  methods: {
    cartUpdated() {
      // for sending information between components
      this.$emit('cart-updated');
    },

    //#region CASE is shop card opened
    sortItems(data) {
      // We are sure that this method will be only called when a shop card is clicked.
      const toSort = data;

      // Once we have a shop card, our items are an array of products that can be sorted.
      const saveBeforeSort = this.menuItems

      // Use a conditional (ternary) operator to sort in ascending or descending order based on the 'toSort' variable.
      this.menuItems = toSort ? saveBeforeSort.sort((a, b) => a.price - b.price) : saveBeforeSort.sort((a, b) => b.price - a.price);
    },

    searchShops(string) {
      axios.get('http://localhost:3000/findShops', { params: { searchString: string } })
        .then(response => {
          this.menuItems = response.data;
        })
        .catch(error => {
          console.error(error);
          this.menuItems = [];
        });
    },
    // trigger to show shops 
    showShopList() {
      this.clickShop = {};
      this.menuItems = this.searchResults;
    },
    //#endregion

    handleClickCard(cardInfo) {
      // if we clicked on shop, lets say this to the variable
      // which respond for next rendering of ui based on this clicking
      this.clickShop = cardInfo;
      axios.get('http://localhost:3000/getProducts', { params: { link: cardInfo.products } })
        .then(response => {
          this.menuItems = response.data;
          this.sortItems(true);
        })
        .catch(error => {
          console.error(error);
        });
    },

  },
  watch: {
    db: {
      // i added this watch, because for some reason
      // at first init of application, db gotten from props is empty
      // any way, we know that db should be changed only once
      // so we can set here to enforce attribution of db to menuItems and searchResults
      deep: true,
      handler(newVal) {
        this.menuItems = newVal;
        this.searchResults = newVal;
      }
    },
    searchInput: {
      handler(newVal) {
        if (newVal.length === 0) {
          this.menuItems = this.db;
        }
        else {
          this.searchShops(newVal);
        }
      }
    }
  },
  computed: {
    showShopInfo() {
      return Object.keys(this.clickShop).length > 0;
    },
  },
};
</script>

<style>
.promo {
  background: #fff1b8 url(../../public/img/promo/pizza.png) no-repeat top -100px right -250px / 830px;
}

.promo h1 {
  font-weight: bold;
}

.promo p {
  font-size: 2rem;
  font-weight: lighter;
}
</style>