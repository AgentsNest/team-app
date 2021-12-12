<template>
<div>
  <v-bottom-navigation
    background-color="grey"
    shift
    dark
    app
    fixed
    grow
  >
    <!-- <v-btn to="/" height="56px" class="grey darken-4">
      <span>Leads</span>
      <v-icon>mdi-format-list-bulleted-square</v-icon>
    </v-btn> -->

    <v-btn to="/graphics" height="56px" class="grey darken-4">
      <span>Graphics</span>
      <v-icon>mdi-image</v-icon>
    </v-btn>

    <v-btn to="/clients" height="56px" class="grey darken-4">
      <span>Client</span>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>

    <v-btn to="/social-ads" height="56px" class="grey darken-4">
        <span>Ads</span>
        <v-icon>mdi-bullhorn-outline</v-icon>
    </v-btn>

    <v-btn height="56px" class="grey darken-4" to="/profile">
      <span>Setting</span>
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

  </v-bottom-navigation>
  </div>

</template>

<script>
  export default {
    data: () => ({ value: 0 }),

    computed: {

    },
  }
</script>

<style scoped>
</style>