<template>
  <header class="navbar navbar-expand bg-body-tertiary">
    <div class="container-fluid">
      <div class="w-100">
        <div class='d-flex justify-content-between align-items-center'>
          <a class="navbar-brand m-0" href="#">
            <img width="100" height="100" src="../assets/icon/logo.svg" />
          </a>
          <div class="input-group w-50">
            <span class="input-group-text bg-white" id="basic-addon1">
              <i class="fa-solid fa-shop"></i>
            </span>
            <input v-model="searchInput" @input="updateFluxData" type="text" class="form-control"
              placeholder="Search restaurants, products..." aria-label="delivery" aria-describedby="basic-addon1">
          </div>
          <div class="btn-group">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalShopCart"
              :class="cartItems.length === 0 ? 'disabled' : ''">
              <i class="fa-solid fa-cart-shopping"></i>
              Cart
              <span class="badge">{{ cartItems.length }}</span>
            </button>
            <OrderCart @cart-updated="getCartProducts" :cart-items="cartItems" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import OrderCart from "./main/OrderCart.vue";
import fetchData from "../mixins/fetchFunction.vue";
import axios from 'axios';

export default {
  name: 'TopHeader',
  components: { OrderCart },
  mixins: [fetchData],
  props: {
    cartUpdated: Boolean,
    // used for saving initial state of db
    db: Object
  },
  data() {
    return {
      cartItems: [],
      searchInput: "",
      searchResults: [],
    };
  },
  methods: {
    getCartProducts() {
      // Make a GET request to the Express route
      axios.get('http://localhost:3000/getOrderCartProducts')
        .then(response => {
          // Handle the response data here
          this.cartItems = response.data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    updateFluxData() {
      // Emit a custom event named 'child-event' with optional data
      this.searchResults = this.search();
      this.$emit('update-flux-data', this.searchResults);
    },
    search() {
      const query = this.searchInput.toLowerCase();
      const results = [];
      if (query && query.length > 0) {
        // Search in the "partners" key
        if (this.db.partners) {
          const partners = this.db.partners.filter((partner) => partner.name.toLowerCase().includes(query));
          results.push(...partners);
        }
        // Search in other keys
        for (const key in this.db) {
          if (key !== "partners") {
            const items = this.db[key].filter((item) => {
              return (item.name.toLowerCase().includes(query) ||
                (item.description && item.description.toLowerCase().includes(query)));
            });
            results.push(...items);
          }
        }
        return results;
      }
      else {
        return Object.values(this.db).reduce((acc, current) => { return acc.concat(current); }, []);
      }
    },
    checkAndCreateFile() {
      axios.get('http://localhost:3000/checkAndCreateCartFile')
        .then(response => {
          console.log(response.data.message);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  watch: {
    cartUpdated: {
      handler() {
        this.getCartProducts();
        this.$emit('cart-updated')
      }
    }
  },
  mounted() {
    this.checkAndCreateFile();
    this.getCartProducts();
  }
};
</script>