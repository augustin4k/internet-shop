<template>
  <!-- default example at init of vue project -->
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <TopHeader @cart-updated="cartUpdatedFlag = false" :cart-updated="cartUpdatedFlag" />
  <MainPart @cart-updated="cartUpdated" :db='dataSave' />
  <BottomFooter />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TopHeader from './components/Header.vue'
import MainPart from './components/Main.vue'
import BottomFooter from './components/Footer.vue'
import axios from "axios";

export default {
  name: 'App',
  components: {
    // HelloWorld
    TopHeader,
    MainPart,
    BottomFooter,
  },
  data() {
    return {
      dataSave: [], // original db will be saved here
      countingUpdating: 0,
      cartUpdatedFlag: false,
    };
  },
  methods: {
    cartUpdated() {
      this.cartUpdatedFlag = true;
    },
  },
  mounted() {
    // lets get all information about shop and products database
    // once we dont have any CRUD actions in our products, we can get this information only once
    axios.get('http://localhost:3000/getShops')
      .then(response => {
        this.dataSave = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
}
</script>

<style>
#app {
  font-family: 'Tilt Neon', cursive;
  /* Apply the font to the entire body */
}
</style>
