<template>
  <div class="d-flex flex-row justify-content-between align-items-center mb-3">
    <!-- Prima parte -->
    <div class="d-flex flex-row align-items-center gap-5">
      <button class="btn btn-outline-dark" @click="backToSearch"><i class="fa-solid fa-caret-left"></i></button>
      <h1 class="font-weight-bold display-4">{{ infoShop.name }}</h1>
      <div name='starLabel' class="d-flex gap-2 align-items-center">
        <img src="../../assets/icon/rating.svg" width="30" />
        <h2 class="m-0 text-warning font-weight-bold">{{ infoShop.stars }}</h2>
      </div>
      <div>
        <h3 class="m-0 font-weight-bold text-muted">from {{ minPrice }} MDL - {{ infoShop.kitchen }}</h3>
      </div>
    </div>
    <!-- A doua parte -->
    <!-- aceasta parte apare doar cand am selectat recent un shop -->
    <div class="d-flex justify-content-between gap-3">
      <div class="btn-group btn-group-lg" role="group" aria-label="ByPriceSort">
        <a class="btn" :class="[existProducs ?? `disabled`, clickedPriceButtonAsc ? `btn-dark` : `btn-outline-dark`]"
          href="#" role="button" @click="sortPriceItems('asc')">
          <i class="fas fa-triangle"></i> Price - asc
        </a>
        <a class="btn" :class="[existProducs ?? `disabled`, clickedPriceButtonDesc ? `btn-dark` : `btn-outline-dark`]"
          href="#" role="button" @click="sortPriceItems('desc')">
          <i class="fas fa-triangle"></i> Price - desc
        </a>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "SortBar",
  props: {
    infoShop: Object,
    minPrice: Number,
    existProducs: Boolean
  },
  data() {
    return {
      clickedPriceButtonAsc: true,
      clickedPriceButtonDesc: false
    }
  },
  methods: {
    sortPriceItems(order) {
      if (order === 'asc') {
        this.clickedPriceButtonAsc = true;
        this.clickedPriceButtonDesc = false;
      }
      if (order === 'desc') {
        this.clickedPriceButtonAsc = false;
        this.clickedPriceButtonDesc = true
      }
      this.$emit('need-to-sort', this.clickedPriceButtonAsc);
    },
    backToSearch() {
      this.$emit('show-shop-list');
    }
  },
}
</script>