<template>
    <div>
        <v-card class="rounded-xl shadow" elevation="0">
            <v-toolbar flat>
                <v-btn width="50%" class="rounded-l-xl text-capitalize dark" dark depressed :to="{name: 'MyWebsite'}">My Projects</v-btn>
                <v-spacer></v-spacer>
                <v-btn width="50%" class="rounded-r-xl text-capitalize" depressed :to="{name: 'Website'}">All Projects</v-btn>
            </v-toolbar>
        </v-card>

        <input type="text" v-model="search" placeholder="Search Projects..." class="search-input mt-3">

        <v-card class="transparent content-card" elevation="0" height="80vh">
          <v-row class="mt-1">
              <v-col md="4" cols="12" v-for="(website, index) in filterWebsite" :key="index">
                  <v-card>
                      <router-link :to="{name: 'WebsiteDetails', params:{id: website.slug}}">
                        <v-img
                            height="180px"
                            :src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                            class="rounded-t"
                        ></v-img>
                      </router-link>

                      <v-card-text class="pa-0">
                        <v-card-title>{{website.title}}</v-card-title>
                        <v-card-subtitle>Total Shared: {{website.trackers.length}}</v-card-subtitle>
                      </v-card-text>

                      <div class="pa-0">
                        <v-btn width="50%" @click="dialog = !dialog" class="text-capitalize">
                          <v-icon left>mdi-pencil</v-icon>
                          Edit
                        </v-btn>
                        <v-btn width="50%" class="grey darken-3 text-capitalize" @click="shareSidebarOpen(website.id)" dark>
                          <v-icon left color="white">mdi-share-variant</v-icon>
                          Share
                        </v-btn>
                      </div>
                  </v-card>
              </v-col>
          </v-row>
        </v-card>

        <!-- Single Website Preview Dialog -->
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">Click Me</v-btn>
          </template>

          <v-card>
            <v-toolbar dense class="" flat>
                <v-toolbar-title>Image Gallery</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <label for="gallery" class="cursor-pointer flex items-center gap-2">
                        <v-icon size="38">mdi-plus-circle</v-icon>
                        <input type="file" multiple hidden ref="files" id="gallery" @change="updateImageList">
                    </label>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col 
                        v-for="(preview, index) in previewImage" :key="index" 
                        class="d-flex child-flex" cols="4"
                    >
                        <v-img
                            :src="preview.src"
                            id="image-preview"
                            aspect-ratio="1"
                            class="rounded-lg align-end pa-1"
                        >
                            <v-btn class="dark" x-small icon @click="setFeatured(preview)"><v-icon color="yellow">mdi-star</v-icon></v-btn>
                            <v-btn class="dark ml-2" x-small icon @click="clearImage(index)"><v-icon color="red">mdi-delete</v-icon></v-btn>
                        </v-img>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="grey darken-2" dark>Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      
        <!-- All Leads Dialog -->
        <v-navigation-drawer v-model="allLeadSidebar" tile absolute temporary right width="75vw">
          <v-card flat tile>
            <v-list>
              
              <v-list-item v-for="lead in leads" :key="lead.id">
                <v-list-item-content>
                  <v-list-item-title v-text="lead.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <!-- <v-btn block class="text-capitalize blue darken-2" dark 
                    v-if="website"
                    @click="shareNow(lead)"
                    :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a Here is the details for ${website.title} %0a http://localhost:3000/w/${tracker_id}/${website.id}`"
                  >
                    Share
                  </v-btn> -->
                  <v-btn @click="showSelectedWebsiteMessage(lead)">Share</v-btn>
                </v-list-item-action>

                <!-- Default website share message window -->
                <v-dialog v-model="editWebsiteWindow" width="500">
                  <v-card class="pt-5 rounded-lg">

                      <v-card-text>
                          <span class="caption grey--text">Hi, {clientName}</span> <br>
                          <div>{{selectedWebsiteMsg}}</div>
                          <span class="caption grey--text">{websiteName}</span> <br>
                          <span class="caption grey--text">Regards,</span> <br/>
                          <span class="caption grey--text">{yourName}</span>
                      </v-card-text>

                      <v-textarea outlined label="Default Message" v-model="selectedWebsiteMsg" height="100" class="mt-6"></v-textarea>

                      <v-divider></v-divider>
                      <v-card-actions>
                          <span class="grey--text text--darken-2">Share Via:</span>
                          <v-spacer></v-spacer>
                          <v-btn @click="shareNow(lead, website)">Share</v-btn>
                          <v-btn 
                              fab x-small elevation="1" class="green" dark
                              :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards: ${agent.name}`"
                              target="_blank"
                              @click="addActivityWhatsapp"
                          ><v-icon>mdi-whatsapp</v-icon></v-btn>
                          <v-btn 
                              fab x-small elevation="1" class="blue lighten-1" dark
                              :href="`sms:${lead.contact}&body=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards, %0a ${agent.name}`"
                              target="_blank"
                              @click="addActivityMessage"
                          ><v-icon>mdi-message-text-outline</v-icon></v-btn>
                      </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-list-item>
      
            </v-list>

          </v-card>
        </v-navigation-drawer>


    </div>
</template>

<script>
import Website from '../../Apis/Website'
import Lead from '../../Apis/Lead'
import Tracker from '../../Apis/Tracker'
import User from '../../Apis/User'

export default {
    data () {
      return {
        loading: false,
        items: [],
        search: '',
        select: null,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
        ],
        websites:[],
        website: null,
        shareData:{
            website_id: null,
            lead_id: null,
            agent_id: null,
            opened: false,
            total_views: 0
        },
        tracker_id : null,
        clientList: false,
        user_id: null,
        submitted: false,
        opened: [],
        unopened: [],
        selectedLeads: [],
        dialog: false,
        previewImage: [],
        images: [],
        allLeadSidebar: false,
        selectedWebsiteMsg: '',
        editWebsiteWindow: false,
        whatsappShare: false,
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
      fetchData(){
        Website.auth().then(response => {
            this.websites = response.data.data;
            // console.log(response.data.data);
        });
      },
      fetchLeadsDetails(){
        Lead.auth().then(response => {
          this.leads = response.data.data;
        });
      },
      shareSidebarOpen(website){
        this.allLeadSidebar = true
        this.website = website
      },
      updateImageList(){
          var selectedFiles = this.$refs.files.files;
          // for preview
          for (let i = 0; i < selectedFiles.length; i++) {
              let img = {
                  src: URL.createObjectURL(selectedFiles[i]),
                  file: selectedFiles[i]
              }
              this.previewImage.push(img);
          }
          // for post data to server
          for (let index = 0; index < selectedFiles.length; index++) {
              this.images.push(selectedFiles[index]);
          }
      },
      setFeatured(preview){
          var previews = this.previewImage;
          previews.unshift(preview);
          previews.pop(preview);
      },
      clearImage(index){
        this.previewImage.splice(index);
      },
      /* ------------------------------------------
          ====  Website Share functions ====
      ------------------------------------------  */ 
      showSelectedWebsiteMessage(lead, website){
          this.selectedWebsiteMsg = 'Here is the details for';
          this.editWebsiteWindow = true;
      },
      addActivityWhatsapp(){
          let data = new FormData();
          data.append('lead_id', this.lead.id)
          data.append('whatsapp', 'Whatsapp Message')

          Lead.addActivityWhatsapp(data)
          .then(() => {
              // this.fetchData();
          })
      },
      addActivityMessage(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('message', 'Send Text Message')

            Lead.addActivityMessage(data)
            .then(() => {
                // this.fetchData();
            })
        },
    },
    computed:{
      selectAll:{
          get : function (){
              return this.leads ? this.selectedLeads.length == this.leads.length : false;
          },
          set: function(value) {
              var selectedLeads = [];

              if(value) {
                  this.leads.forEach(function (lead) {
                      selectedLeads.push(lead.id);
                  });
              }
              this.selectedLeads = selectedLeads;
          }
      },
      filterWebsite: function(){
          return this.websites.filter((website) => {
              return website.title.toLowerCase().match(this.search.toLowerCase());
          })
      },
      leads(){  
        return this.$store.state.leads; 
      },
      agent(){ return this.$store.state.auth; },
    },
    mounted(){
      this.fetchData();
      this.fetchLeadsDetails();
      User.auth().then(response => {
          this.shareData.agent_id = response.data.data.id;
      });
      this.$store.dispatch('getLeads');
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>