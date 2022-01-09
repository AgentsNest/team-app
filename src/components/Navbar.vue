<template>
    <div>
        <v-app-bar class="transparent" elevation="0">

          <v-toolbar-title class="font-weight-bold text-h5">agnt.</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn text class="text-capitalize">Home</v-btn>

          <v-btn text class="text-capitalize">Gallery</v-btn>

          <!-- <v-btn outlined text class="text-capitalize mr-5" to="/login">Login</v-btn> -->

          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="text-capitalize" dark>
                Logout
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="n in 3"
                :key="n"
                @click="() => {}"
              >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>

    </div>
</template>

<script>
import User from '../Apis/User'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'agnt.',
      agent: {},
      isLoggedIn: false
    }
  },
  created(){
    User.auth().then((response) => {
      this.agent = response.data.data
    })
  },
  methods:{
    logout(){
      localStorage.removeItem("token");
      User.logout().then(() => {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$router.push({name: 'Login'});
      })
    }
  }
}
</script>

<style scoped>

</style>