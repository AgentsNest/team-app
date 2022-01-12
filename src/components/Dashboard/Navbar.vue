<template>
    <div>
      <v-toolbar class="transparent d-none d-md-block" flat>

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
              <v-btn fab small v-bind="attrs" v-on="on">
                <v-avatar size="42"><v-img :src="agent.image"></v-img></v-avatar>
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

      <!-- Mobile Navbar -->

      <v-toolbar class="rounded-xl d-md-none" flat>
        <v-btn icon @click.stop="mSidebar = !mSidebar"><v-icon>mdi-menu</v-icon></v-btn>
          <v-spacer></v-spacer>
        <v-btn text class="text-lowercase font-weight-bold title">agnt.</v-btn>
          <v-spacer></v-spacer>
        <!-- <v-avatar color="red">{{agent.name[0]}}</v-avatar> -->
        <Notification />
      </v-toolbar>
      
      <v-navigation-drawer v-model="mSidebar" absolute>
          <v-img :src="agent.brand_logo" max-width="35vw" class="mx-auto mt-8 mb-3"></v-img>
          <v-list-item>
            <v-list-item-content class="text-center">
              <v-list-item-title>
                {{agent.name}}
                <v-btn icon small depressed :to="{name: 'AgentAccount'}"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
              </v-list-item-title>
              <v-list-item-subtitle>{{agent.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              class="py-1"
              :to="{name: item.link}"
              :disabled="whateverActivatesThisLink" 
            >
              <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block @click="logout">Logout</v-btn>
            </div>
          </template>
        </v-navigation-drawer>
    </div>
</template>

<script>
import Notification from '../Notification.vue'

export default {
  components:{ Notification },
  data () {
    return {
      isLoggedIn: false,
      menu: false,
      mSidebar: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: 'Dashboard' },
        { title: 'Leads', icon: 'mdi-format-list-bulleted-square', link: 'mLeads' },
        { title: 'Graphics', icon: 'mdi-image-size-select-large', link: 'mGraphic' },
        { title: 'Existing Clients', icon: 'mdi-account-multiple-outline', link: 'Client' },
        { title: 'Social Ads', icon: 'mdi-advertisements', link: 'Smm' },
        { title: 'Projects', icon: 'mdi-office-building-marker', link: 'MyWebsite' },
        { title: 'Groups', icon: 'mdi-group', link: 'Groups' },
        { title: 'Messages', icon: 'mdi-message-outline', link: 'Message' },
        { title: 'Team', icon: 'mdi-account-multiple', link: 'Team' },
      ],
      whateverActivatesThisLink: false,
    }
  },
  computed:{
    agent(){ return this.$store.state.auth; },
  },
  methods:{
    logout(){
      localStorage.removeItem("token");
      // User.logout().then(() => {
      //   localStorage.removeItem("token");
      //   this.isLoggedIn = false;
      //   this.$router.push({name: 'Login'});
      // })
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