<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <Navbar />
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>
