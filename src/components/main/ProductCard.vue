<template>
  <div class="card mb-4 w-100 d-flex flex-column">
    <img :src="`${root}${itemInfo.image}`" class="card-img-top rounded" alt="imagePhoto">
    <div class="card-body d-flex flex-column flex-fill">
      <h5 class="card-title">{{ itemInfo.name }} </h5>
      <p class="card-text">
        {{ itemInfo.description }}
      </p>
    </div>
    <div class=" card-footer d-flex justify-content-between mt-auto">
      <a @click="updateCartDb(itemInfo)" class="btn btn-sm btn-primary btn-block">
        <i class="fa-solid fa-cart-shopping"></i>
        Add in cart
      </a>
      <a class="btn btn-sm btn-block btn-outline-secondary disabled">
        {{ itemInfo.price }} MDL
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ProductCard',
  props: { itemInfo: Object },
  data() {
    return {
      root: process.env.BASE_URL,
    };
  },
  methods: {
    updateCartDb(newData) {
      axios.get('http://localhost:3000/modifyCart', { params: { product: newData, action: 'add' } })
        .then(() => {
        });
      this.$emit('cart-updated');
    }
  }
};
</script>

<style>
.card {
  transition: transform 0.3s;
  cursor: pointer;
  /* Add a transition for the transform property */
}

.card:hover {
  transform: scale(1.1);
  /* Increase the scale factor on hover */
}
</style>
