<template>
  <div>
    <v-toolbar class="gradient-bg" flat>
        <v-btn class="white" depressed icon @click="$router.go(-1)"><v-icon color="black">mdi-keyboard-backspace</v-icon></v-btn>
        <v-spacer></v-spacer>
    </v-toolbar>

    <v-img 
      src="../../assets/img/refer.svg"
      lazy-src="../../assets/img/refer.svg"
    ></v-img>

    <v-card flat>
      <v-card-text>
        <div class="text-h5 mb-2 grey--text text--darken-3 text-center">Invite your friends</div>
        <div class="text-primary text-center">Invite your friends to download the app.</div>
      </v-card-text>
      <v-card-actions class="text-center">
        <div class="d-flex align-center justify-space-between copy-text">
          <div class="pl-2 grey--text text--darken-2">agentsnest</div>
          <v-btn small dark class="blue darken-3">Copy</v-btn>
        </div>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.copy-text{
  width: 60%;
  margin: 0 auto;
  box-shadow: 0px 0px 6px #cdcdcd;
  padding: 2px;
  border-radius: 4px;
}
</style>