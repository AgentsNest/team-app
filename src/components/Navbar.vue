<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"                   
            :clipped="clipped" 
            app
            :permanent="$vuetify.breakpoint.mdAndUp"
        >
          
          <v-list-item class="py-4"> 
            <v-list-item-avatar>
              <v-img :src="client.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{client.name}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{client.email}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item-group active-class="active-link" >
              <v-list-item 
                v-for="link in links" 
                :key="link.name"
                link
                class="py-1"
                :to="{name: link.link}"
              >
                <v-list-item-action>
                  <v-icon size="20">{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                      {{link.name}}
                    </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn block text @click="logout" class="text-capitalize">
                <v-icon >mdi-power</v-icon>
                Logout
              </v-btn>
            </div>
          </template>

        </v-navigation-drawer>

        <v-app-bar :clipped-left="clipped" flat class="white" >
            <v-toolbar-title v-text="title" class="grey--text text--darken-4 font-weight-bold"/>
            <v-spacer />

            <Notification />

            <v-btn @click.stop="drawer = !drawer" icon class="ml-2">
              <v-icon color="grey darken-4">mdi-view-grid-outline</v-icon>
            </v-btn>
        </v-app-bar>

    </div>
</template>

<script>
import Team from '../Apis/Team'
import Notification from './Notification.vue'

export default {
  components:{ Notification },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'agnt.',
      client: {},
      isLoggedIn: false,
      links: [
        { name: 'Dashboard', link: 'TeamDashboard', icon: 'mdi-view-dashboard-outline' },
        { name: 'Leads', link: 'allLeads', icon: 'mdi-format-list-bulleted-square' },
        { name: 'Profile', link: 'Profile', icon: 'mdi-shield-account-outline' },
        { name: 'Website', link: 'Websites', icon: 'mdi-earth' },
        { name: 'Graphic', link: 'Graphic', icon: 'mdi-image-multiple-outline' },
        { name: 'Groups', link: 'allGroup', icon: 'mdi-folder-open' },
        { name: 'Followup', link: 'Followups', icon: 'mdi-note-multiple-outline' },
      ]
    }
  },
  created(){
    Team.auth().then((response) => {
      this.client = response.data.data
      //console.log(response.data)
    })
  },
  methods:{
    logout(){
      localStorage.removeItem("token");
      Team.logout()
      .then(() => {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$router.push({name: 'Login'});
      })
    }
  }
}
</script>

<style scoped>
.active-link{

}
</style>