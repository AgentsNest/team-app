<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
a{
 text-decoration: none; 
}
.gradient-bg{
  background-image: linear-gradient(to right, #6441A5 0%, #2a0845  51%, #6441A5  100%);
}
</style>