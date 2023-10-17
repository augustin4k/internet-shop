<template>
  <!-- default example at init of vue project -->
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <TopHeader @cart-updated="cartUpdatedFlag = false" :cart-updated="cartUpdatedFlag" :db='dataSave'
    @update-flux-data="updateFluxData" />
  <MainPart @cart-updated="cartUpdated" :flux-data="flattenedData" />
  <BottomFooter />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TopHeader from './components/Header.vue'
import MainPart from './components/Main.vue'
import BottomFooter from './components/Footer.vue'
import fetchData from "./mixins/fetchFunction.vue"

export default {
  name: 'App',
  mixins: [fetchData],
  components: {
    // HelloWorld
    TopHeader,
    MainPart,
    BottomFooter,
  },
  data() {
    return {
      fluxData: {}, // data which will be changed some time
      dataSave: {}, // original db will be saved here
      countingUpdating: 0,
      cartUpdatedFlag: false,
    };
  },
  methods: {
    cartUpdated() {
      this.cartUpdatedFlag = true;
    },
    updateFluxData(data) {
      // get new flux data
      this.fluxData = data;
    }
  },
  watch: {
    // for some reason at mounting data is null
    // im going to count changing of this.fluxData
    // and to save stable data at first changing
    fluxData: {
      handler(newVal) {
        this.countingUpdating++;
        if (this.countingUpdating === 1) {
          this.dataSave = newVal;
        }
      },
      deep: true,
    },
  },
  computed: {
    flattenedData() {
      const data = this.fluxData; // Data cu structura actuală

      // Verificăm dacă există cheia "partners" și, dacă da, aplicăm transformarea
      if (data.partners) {
        data.partners.forEach((partner) => {
          // Adăugăm cheia "description" cu textul dorit
          partner.description = `${partner.name} offers ${partner.kitchen}.`;
        });
      }

      // Transformăm datele într-un array
      const flattenedArray = Object.values(data).reduce((acc, current) => { return acc.concat(current) }, []);
      return flattenedArray;
    },
  },

  async mounted() {
    try {
      const data = await this.fetchData(`${process.env.BASE_URL}db/db.json`);
      this.fluxDataSave = data.db;
      this.fluxData = this.fluxDataSave;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Tilt Neon', cursive;
  /* Apply the font to the entire body */
}
</style>
