<template>
  <div>
    <v-card flat class="text-center mx-auto rounded-xl" height="88vh" width="50vw">
        <v-img src="../../assets/img/payment.webp" height="450"></v-img>
        <div class="font-weight-bold title mb-6 text-uppercase">Payment Successful</div>
        <router-link :to="{name: 'Smm'}">
          <v-btn class="text-capitalize white--text" color="grey darken-4">Back to All Ads Page</v-btn>
      </router-link>
    </v-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>