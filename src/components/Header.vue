<template>
  <header class="navbar navbar-expand bg-body-tertiary">
    <div class="container">
      <div class="w-100">
        <div class='d-flex justify-content-between align-items-center'>
          <a class="navbar-brand m-0" href="#">
            <img width="100" height="100" src="../assets/icon/logo.svg" />
          </a>
          <div class="input-group w-50">
            <span class="input-group-text bg-white" id="basic-addon1">
              <i class="fa-solid fa-house"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search delivery address..." aria-label="delivery"
              aria-describedby="basic-addon1">
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
import axios from 'axios';

export default {
  name: 'TopHeader',
  components: { OrderCart },
  props: {
    cartUpdated: Boolean,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    // lets create a db file for cart, if it's not created yet
    checkAndCreateFile() {
      axios.get('http://localhost:3000/checkAndCreateCartFile')
        .then(response => {
          console.log(response.data.message);
        })
        .catch(error => {
          console.error(error);
        });
    },

    // getting all cart's products
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
  },
  watch: {
    // will send information that file has been updated already
    cartUpdated: {
      handler() {
        this.getCartProducts();
        this.$emit('cart-updated')
      }
    }
  },
  mounted() {
    // create a db cart file first of all
    this.checkAndCreateFile();
    // get products, if in this this there are some products
    this.getCartProducts();
  }
};
</script>