<template>
  <div>
    <v-card flat class="text-center mx-auto rounded-xl d-flex flex-column justify-center" height="88vh" width="50vw">
        <v-icon size="120px" color="red lighten-1">mdi-alert-circle-outline</v-icon>
        <div class="font-weight-bold title mb-6 text-uppercase">Payment Failed</div>
        <router-link :to="{name: 'Smm'}">
          <v-btn depressed class="text-capitalize white--text" color="red darken-2">Please try again</v-btn>
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