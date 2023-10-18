<template>
  <div class="card mb-4 w-100 d-flex flex-column bg-secondary text-white">
    <img :src="`${root}${itemInfo.image}`" class="card-img-top rounded" alt="imagePhoto">
    <div class="card-body d-flex flex-column flex-fill">
      <h5 class="card-title d-flex">{{ itemInfo.name }}

      </h5>
      <p class="card-text">
        from {{ itemInfo.price }} MDL - {{ itemInfo.kitchen }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between mt-auto">
      <button class="disabled btn btn-sm btn-dark">
        <i class="fa-solid fa-circle-info"></i>
        {{ itemInfo.time_of_delivery }} min</button>
      <a class="btn btn-sm btn-block btn-outline-warning disabled">
        <i class="fa-solid fa-star"></i>
        {{ itemInfo.stars }}
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
