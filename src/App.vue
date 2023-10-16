<template>
  <!-- default example at init of vue project -->
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <TopHeader></TopHeader>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TopHeader from './components/Header.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    TopHeader
  }
}
</script>

<style>
/* default style from init of vue project */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#app {
  font-family: 'Tilt Neon', cursive;
  /* Apply the font to the entire body */
}
</style>
