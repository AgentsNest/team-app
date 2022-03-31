<template>
  <Layout>
    <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Profile Updated
        <template v-slot:action="{ attrs }">
            <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
    </v-snackbar>
    <v-card flat>
      <div class="title text-center mt-5 text-uppercase">Profile</div>

      <!-- Agent Avatar -->
      <v-card class="rounded-xl mb-5 content-card" flat>
        <div class="text-center mt-5">
          <v-avatar tile size="130" class="rounded-lg">
              <img 
                  :src="avatarPreview ? avatarPreview : team.image"
                  :lazy-src="avatarPreview ? avatarPreview : team.image"
              >
              <label for="brandAvatar" class="uploadAvatarBtn">
                  <v-icon color="grey lighten-1">mdi-camera</v-icon>
                  <!-- <span class="caption">change</span> -->
                  <input type="file" id="brandAvatar" hidden accept="image/*" @change="previewAvatar"/>
              </label>
          </v-avatar>
        </div>
      </v-card>

      <v-card flat class="px-2">
        <v-card-actions>
              <div class="caption grey--text font-weight-bold">teams.agentsnest.com/t/<span class="teal--text">{{team.uid}}</span> </div>
              <v-spacer></v-spacer>
              <!-- <v-btn x-small fab elevation="1" class="mr-3 white" link :to="{name: 'vCard', params:{uid: team.uid}}" target="_blank">
                  <v-icon>mdi-eye</v-icon>
              </v-btn> -->
              <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
              >
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" class="mr-2 white" x-small fab elevation="1">
                          <v-icon>mdi-eye</v-icon>
                      </v-btn>
                  </template>
                  <v-card tile>
                      <v-toolbar dark class="dark" dense tile> 
                          <div>Preview</div>
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                              <v-btn dark icon @click="dialog = false">
                                  <v-icon>mdi-close</v-icon>
                              </v-btn>
                          </v-toolbar-items>
                      </v-toolbar>

                      <v-card flat tile class="overflow-y-auto">
                          <v-img
                              :src="team.image"
                              :lazy-src="team.image"
                              class=""
                              aspect-ratio="1"
                              width="100%"
                              max-height="400"
                          ></v-img>

                          <v-card class="rounded-t-xl mt-n6" flat>
                              <v-card-actions>
                                  <div class="pa-4">
                                      <div class="title">{{team.name}}</div>
                                      <div class="caption">RERA: {{agent.rera}}</div>
                                      <div class="caption">{{agent.brand_text}}</div>
                                  </div>
                                  <v-spacer></v-spacer>
                                  <v-img max-width="100" :src="team.brand_logo"></v-img>
                              </v-card-actions>

                              <v-divider></v-divider>
                              <div class="px-6 my-2 grey--text">Business Details</div>
                              <v-divider></v-divider>

                              <div class="py-3 px-6">
                                  <div class="d-flex mt-3">
                                      <v-icon color="black" size="20">mdi-bag-checked</v-icon>
                                      <div class="ml-2 body-2">{{agent.brand_text}}</div>
                                  </div>
                                  <div class="d-flex my-4">
                                      <v-icon color="black" size="20">mdi-phone</v-icon>
                                      <div class="ml-2 body-2">{{team.contact}}</div>
                                  </div>
                                  <div class="d-flex my-4">
                                      <v-icon color="black" size="20">mdi-card-account-details-outline</v-icon>
                                      <div class="ml-2 body-2">{{agent.rera}}</div>
                                  </div>
                                  <div class="d-flex my-4">
                                      <v-icon color="black" size="20">mdi-email-outline</v-icon>
                                      <div class="ml-2 body-2">{{team.email}}</div>
                                  </div>
                                  <div class="d-flex my-4">
                                      <v-icon color="black" size="20">mdi-web</v-icon>
                                      <div class="ml-2 body-2">{{agent.website}}</div>
                                  </div>
                                  <div class="d-flex my-4">
                                      <v-icon color="black" size="22">mdi-map-marker-radius-outline</v-icon>
                                      <div class="ml-2 body-2">{{agent.address}}</div>
                                  </div>
                              </div>
                              <!-- About Text -->
                              <div class="pa-3">
                                  <v-card-text class="blue lighten-5 rounded-lg">{{team.bio}}</v-card-text>
                              </div>

                              <v-card-actions>
                                  <v-btn block x-large dark class="amber accent-3 text-capitalize" depressed link :href="`https://wa.me/${team.contact}`">Send Message</v-btn>
                              </v-card-actions>

                              <!-- Social Links -->
                              <v-card-actions class="justify-center my-4">
                                  <v-btn class="mr-3" small fab v-if="team.facebook" :href="team.facebook" target="_blank">
                                      <v-icon>mdi-facebook</v-icon>
                                  </v-btn>
                                  <v-btn class="mr-3" small fab v-if="team.instagram" :href="team.instagram" target="_blank">
                                      <v-icon>mdi-instagram</v-icon>
                                  </v-btn>
                                  <v-btn class="mr-3" small fab v-if="team.twitter" :href="team.twitter" target="_blank">
                                      <v-icon>mdi-twitter</v-icon>
                                  </v-btn>
                                  <v-btn small fab v-if="team.linkedin" :href="team.linkedin" target="_blank">
                                      <v-icon>mdi-linkedin</v-icon>
                                  </v-btn>
                              </v-card-actions>

                              <v-divider></v-divider>
                              <v-card-text class="text-center">
                                  <v-icon color="yellow darken-3">mdi-lightning-bolt</v-icon> Powered By <strong>agnt.</strong>        
                              </v-card-text>

                          </v-card>
                      </v-card>

                  </v-card>
              </v-dialog>
              <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn fab elevation="1" class="white" x-small v-bind="attrs" v-on="on">
                          <v-icon>mdi-share-variant-outline</v-icon>
                      </v-btn>
                  </template>
                  <v-list dense elevation="0" class="py-0">
                      <v-list-item link :href="`https://wa.me/?text=teams.agentsnest.com/t/${team.uid}`">
                          <v-list-item-title>
                              <v-icon left size="16">mdi-whatsapp</v-icon>
                              Whatsapp
                          </v-list-item-title>
                      </v-list-item>
                      <v-list-item link :href="`sms:&body=teams.agentsnest.com/t/${team.uid}`">
                          <v-list-item-title>
                              <v-icon left size="16">mdi-message-text-outline</v-icon>
                              Message
                          </v-list-item-title>
                      </v-list-item>
                      <v-list-item link target="_blank" :href="`mailto:&body=${team.uid}`">
                          <v-list-item-title>
                              <v-icon left size="16">mdi-email</v-icon>
                              Email 
                          </v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
          </v-card-actions>
      </v-card>
      
      <v-card class="rounded-lg mb-5 mt-3" flat>
          <v-card-text>
            <v-text-field label="Name" outlined v-model="team.name"></v-text-field>
            <v-text-field
                label="Email" outlined v-model="team.email" readonly
            ></v-text-field>
            <v-textarea
              outlined label="About You" v-model="team.bio" rows="3"
            ></v-textarea>
            <v-text-field label="Contact" outlined v-model="team.contact"></v-text-field>

            <v-btn 
              block 
              large
              dark
              class="white--text"
              @click="saveDetails()"
            >Update</v-btn>
          </v-card-text>
      </v-card>

    </v-card>

  </Layout>
</template>

<script>
import Layout from '../../Layouts/Layout.vue'
import Team from '../../Apis/Team'

export default {
  components: { Layout },
  data(){
    return{
      team:'',
      preview: '',
      success: false,
      avatarPreview: '',
      snackbar: false,
      dialog: false,
      agent_id: null,
      agent: ''
    }
  },
  methods: {
    saveDetails(){
      // console.log(this.team);
      Team.updateProfile(this.team.id, this.team)
      .then(() => {
        this.snackbar = true;
      });
    },
    previewAvatar(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.avatarPreview = e.target.result;
            this.team.image = e.target.result;
        };
    },
    async fetchTeam(){
      await Team.auth()
      .then((response) => {
        this.team = response.data.data;
        this.agent_id = response.data.data.agent_id
      }).then(() => {
        this.fetchAgent();
      });
    },
    fetchAgent(){
      Team.teamCompanyDetails(this.agent_id)
      .then((response) => {
          this.agent = response.data
      })
    },
  },
  created(){
    this.fetchTeam();
  }
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}
#brandLogo{width: 100%;margin-top:2em}
.update-btn{
    position: fixed;
    right: 10px;
    bottom: 20px;
    z-index: 999;
}
.search-input{
  background-color: #fefefe;
  border-radius: 6px;
  padding: 1em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.4),0 24px 20px -24px rgba(71,82,107,.3);
  margin-top: 5px;
}
.brandLogoLabel{
  border: 1px solid #999999;
  border-radius: 4px;
  padding: 5px 16px;
  cursor: pointer;
  font-size: 14px
}
.brandLogoLabel:hover{
    background: #efefef;
}
.gradient{
  background-image: linear-gradient(to right, #0ba360, #3cba92);
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.uploadAvatarBtn{
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.4);
    color: #ededed;
    width: 100%;
    padding: 5px;
    cursor: pointer;
}
</style>