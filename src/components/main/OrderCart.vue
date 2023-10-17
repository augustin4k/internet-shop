<template>
  <!-- Modal -->
  <div class="modal fade" id="modalShopCart" tabindex="-1" aria-labelledby="modalShopCartLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalShopCartLabel"><i class="fa-solid fa-cart-shopping"></i> Order cart</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between text-muted">
            <p>Total sum:</p>
            <p>{{ totalPrice }} MDL</p>
          </div>
          <ul class="list-group">
            <li class="list-group-item" v-for="(product, index) in cartItems" :key="index">
              <div class="d-flex justify-content-between gap-4">
                <div class="d-flex align-items-center gap-1">
                  <img width="50" height="50" :src="`${root}${product.image}`" alt="Product Image" />
                  <div class="d-flex flex-column">
                    <p class="mb-0">{{ product.name }}</p>
                    <p class="mb-0 text-muted">
                      <small>
                        {{ product.price }} MDL
                      </small>
                    </p>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <button class="btn btn-sm btn-outline-primary" @click="updateCartDb(product, 'add')">+</button>
                  <span class="mx-2">{{ product.count }}</span>
                  <button class="btn btn-sm btn-outline-danger" @click="updateCartDb(product, 'delete')">-</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary w-100">To Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'OrderCart',
  props: {
    cartItems: Array,
  },
  data() {
    return {
      root: process.env.BASE_URL,
    };
  },
  methods: {
    updateCartDb(newData, action) {
      axios.get('http://localhost:3000/modifyCart', { params: { product: newData, action: action } })
        .then(() => {
          this.$emit('cart-updated');
        });
    },
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, product) => total + product.price * product.count, 0);
    },
  },

};
</script>
