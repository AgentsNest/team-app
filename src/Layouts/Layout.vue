<template>
  <div>
    <Navbar />
    <v-container class="pt-0">
      <slot />
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>
