<template>
  <div class="card mb-4 w-100 d-flex flex-column" :class="itemInfo.id != null ? '' : 'bg-secondary text-white'">
    <img :src="`${root}${itemInfo.image}`" class="card-img-top rounded" alt="imagePhoto">
    <div class="card-body d-flex flex-column flex-fill">
      <h5 class="card-title">{{ itemInfo.name }}</h5>
      <p class="card-text" :class="itemInfo.id != null ? 'text-muted' : ''">
        {{ itemInfo.description }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between mt-auto">
      <a v-if='itemInfo.id != null' @click="updateCartDb(itemInfo)" class="btn btn-sm btn-primary btn-block">
        <i class="fa-solid fa-cart-shopping"></i>
        Add in cart
      </a>
      <a v-else class="btn btn-sm btn-outline-light disabled btn-block">
        <i class="fa-solid fa-circle-info"></i>
        {{ itemInfo.time_of_delivery }} min
      </a>
      <a v-if='itemInfo.id != null' class="btn btn-sm btn-block btn-outline-secondary disabled">
        {{ itemInfo.price }} MDL
      </a>
      <a v-else class="btn btn-sm btn-block btn-outline-warning disabled">
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
