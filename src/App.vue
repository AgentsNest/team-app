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
.gradient{
  background-image: linear-gradient(to right, #283593, #3cabba);
   color: #fff;
}
a{
 text-decoration: none; 
}
</style>