<template>
    <v-toolbar class="transparent" flat>

      <div class="text-h5 font-weight-bold">agnt.</div>

      <input type="text" placeholder="Search..." class="search-input">

      <v-spacer></v-spacer>

      <v-btn outlined text link :to="{name: 'Team'}" class="text-capitalize mr-4">Teams</v-btn>
      <v-btn outlined text link :to="{name: 'Followups'}" class="text-capitalize">Followups</v-btn>

      <v-spacer></v-spacer>

      <Notification />

      <!-- <v-badge avatar bordered overlap>
        <template v-slot:badge>
          <v-avatar color="red">
            <span>7</span>
          </v-avatar>
        </template>

        <v-avatar size="40">
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-avatar>
      </v-badge> -->

      <!-- <v-btn text class="text-capitalize">Vimal Bharti</v-btn> -->

      <v-btn fab small @click="logout" class="grey darken-3 mr-3" dark elevation="1">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn class="white mr-3" elevation="1" fab small :to="{name: 'AgentAccount'}">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
            <v-btn outlined class="rounded-xl pa-2" text large>
              <v-img :src="agent.brand_logo" aspect-ratio="2" contain v-bind="attrs" v-on="on"></v-img>
            </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar color="red">
                <span class="white--text text-h6" v-if="agent.name">{{agent.name[0]}}</span>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{agent.name}}</v-list-item-title>
                <v-list-item-subtitle>{{agent.email}}</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>My Account</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

        </v-card>
      </v-menu>

    </v-toolbar>
</template>

<script>
import User from '../../Apis/User'
import Notification from '../Notification.vue'

export default {
  components:{ Notification },
  data () {
    return {
      agent: {},
      isLoggedIn: false,
      menu: false,
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
.search-input{
  background-color: #fff;
  border-radius: 12px;
  margin-left: 2em;
  padding: 8px 1em;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>