<template>
  <footer class="text-center text-muted bg-white">
    <!-- Grid container -->
    <div class="container pt-4">
      <!-- Section: Social media -->
      <section class="mb-4">
        <!-- Facebook -->
        <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <img src="../assets/social/fb.svg" alt="Facebook">
        </a>
        <!-- Instagram -->
        <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <img src="../assets/social/instagram.svg" alt="Instagram">
        </a>
        <!-- VK -->
        <a class="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <img src="../assets/social/vk.svg" alt="VK">
        </a>

      </section>
      <!-- Section: Social media -->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center text-dark p-3 bg-white">
      © 2023 Copyright:
      <a class="text-dark" href="">internet-shop.com</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>
 
<script>
export default {
  name: 'BottomFooter',
}
</script>
<style>
/* CSS for the sticky footer */
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

/* Custom styles for social buttons */
.social-button {
  margin: 10px;
  padding: 10px;
  border-radius: 50%;
  background-color: #007bff;
  /* Primary button color */
  transition: background-color 0.2s;
}

.social-button:hover {
  background-color: #0056b3;
  /* Darker color on hover */
}
</style>