<template>
  <section class="main-card">
    <v-container fluid>
        <Navbar />
        <v-row class="mt-2">
          <v-col md="2" class="d-none d-md-block">
            <Sidelink />
          </v-col>
          <v-col md="10">
            <!-- <slot /> -->
            <router-view/>
          </v-col>
        </v-row>
    </v-container>
  </section>
</template>

<script>
import Navbar from "../components/Dashboard/Navbar.vue";
import Sidelink from '../components/Dashboard/Sidelink'

export default {
  components: {
    Navbar,
    Sidelink
  },
};
</script>


<style>
.main-card{
  /* background: #f3f6fd; */
  background: #f5f5f5;
  height: 100vh;
  overflow-y: hidden;
}
.shadow{
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>