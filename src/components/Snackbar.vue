<template>
<div>
    <v-snackbar
    >
      {{ toastMessage }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
    props: ['toastMessage'],
}
</script>

<style>

</style>