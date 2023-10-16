<template>
  <header class="navbar navbar-expand bg-body-tertiary">
    <div class="container-fluid">
      <div class="w-100">
        <form class='d-flex justify-content-between align-items-center'>
          <a class="navbar-brand m-0" href="#">
            <div class="d-flex align-items-center">
              <div class="mr-2">
                <i class="fa-solid fa-truck fa-2x"></i> <!-- Use fa-2x to set the icon size -->
              </div>
              <div>
                <div style="font-size: 1rem;">Delivery</div>
                <div style="font-size: 1rem;">Food</div>
              </div>
            </div>
          </a>
          <div class="input-group w-50">
            <span class="input-group-text bg-white" id="basic-addon1">
              <i class="fa-solid fa-house"></i>
            </span>
            <input type="text" class="form-control" placeholder="Delivery Adress" aria-label="delivery"
              aria-describedby="basic-addon1">
          </div>
          <button class="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopHeader',
};
</script>

<style scoped>
/* Add your CSS styling for the header here */
/* for logo */
.header-logo {
  display: flex;
  align-items: center;
}

.header-logo .label {
  margin-left: 10px;
  /* Ajustează marginea între imagine și label */
  display: flex;
  flex-direction: column;
}

.header-logo .label>div {
  font-size: 14px;
  /* Ajustează dimensiunea textului */
  font-weight: bold;
}
</style>
