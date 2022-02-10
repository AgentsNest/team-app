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

      <v-card>
        <v-card-actions>
              <div class="caption grey--text font-weight-bold">https://agentsnest.com/t/<span class="teal--text">{{team.uid}}</span> </div>
              <v-spacer></v-spacer>
              <v-btn x-small fab elevation="1" class="mr-3 white" link :to="{name: 'vCard', params:{uid: team.uid}}" target="_blank">
                  <v-icon>mdi-eye</v-icon>
              </v-btn>
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
      snackbar: false
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
  },
  beforeMount(){
    Team.auth().then((response) => {
      this.team = response.data.data;
      // console.log(response.data)
    });
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