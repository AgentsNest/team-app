<template>
  <Layout>
    <v-card width="100vw" class="transparent" flat>
      <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
          {{snackbarText}}
          <template v-slot:action="{ attrs }">
              <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
      </v-snackbar>

      <input type="text" v-model="search" placeholder="Search Projects..." class="search-input mt-3 mb-3">

      <v-card v-for="(website, index) in filterWebsite" :key="index" class="mb-1 rounded-lg pa-1" outlined>
        <v-card-actions>
          <div>
            <router-link :to="{name: 'WebsiteDetails', params:{id: website.slug}}" class="grey--text text--darken-3 subtitle-1">
              {{website.title}}
            </router-link>
            <div class="grey--text body-2">Total Shared: {{website.trackers.length}}</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn fab small elevation="1" class="white" @click="shareSidebarOpen(website)">
            <v-icon color="grey">mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-card>

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
              <!-- <v-btn @click="showSelectedWebsiteMessage(lead)">Share</v-btn> -->
            </v-list-item-action>

            <!-- Default website share message window -->
            <v-dialog v-model="editWebsiteWindow[lead.id]" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">Share</v-btn>
              </template>

              <v-card class="pt-5 rounded-lg">
                  <v-card-text>
                      <span class="caption grey--text">Hi, {clientName},</span> <br>
                      <div>{{selectedWebsiteMsg}}</div>
                      <!-- <span class="caption grey--text">https://agentsnest.com/wt/{{website.share.url}}</span> <br> -->
                      <span class="caption grey--text">Regards,</span> <br/>
                      <span class="caption grey--text">{yourName}</span>
                  </v-card-text>

                  <v-textarea outlined label="Default Message" v-model="selectedWebsiteMsg" height="100" class="mt-6"></v-textarea>

                  <v-divider></v-divider>
                  <v-card-actions v-if="website">
                      <span class="grey--text text--darken-2">Share Via:</span>
                      <v-spacer></v-spacer>
                      <v-btn 
                        @click="shareNowViaWhatsapp(lead, website)"
                        fab x-small elevation="1" class="green" dark
                        id="shareToWebsite"
                      ><v-icon>mdi-whatsapp</v-icon></v-btn>
                      <v-btn 
                        @click="shareNowViaMsg(lead, website)"
                        fab x-small elevation="1" class="blue" dark
                      ><v-icon>mdi-message-text-outline</v-icon></v-btn>
                      <!-- <v-btn 
                          fab x-small elevation="1" class="green" dark
                          :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards: ${agent.name}`"
                          target="_blank"
                          @click="addActivityWhatsapp"
                      ><v-icon>mdi-whatsapp</v-icon></v-btn> -->
                      <!-- <v-btn 
                          fab x-small elevation="1" class="blue lighten-1" dark
                          :href="`sms:${lead.contact}&body=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards, %0a ${agent.name}`"
                          target="_blank"
                          @click="addActivityMessage"
                      ><v-icon>mdi-message-text-outline</v-icon></v-btn> -->
                  </v-card-actions>
              </v-card>
            </v-dialog>

          </v-list-item>
  
        </v-list>

      </v-card>
    </v-navigation-drawer>

  </Layout>
</template>

<script>
import Website from '../../Apis/Website'
import Lead from '../../Apis/Lead'
import Tracker from '../../Apis/Tracker'
import Team from '../../Apis/Team'
import Layout from "../../Layouts/Layout.vue";

export default {
    components: { Layout },
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
        leads:[],
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
        selectedWebsiteMsg: 'Here is the details for',
        editWebsiteWindow: {},
        whatsappShare: false,
        snackbarText: '',
        snackbar: false
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
        });
      },
      fetchAuth(){
          Team.auth()
          .then((response) => {
              this.auth = response.data.data
          })
      },
      fetchLeads(){
        Lead.leads().then(response => {
            this.leads = response.data.data;
        });
      },
      shareSidebarOpen(website){
        this.allLeadSidebar = true
        this.website = website
        // console.log(website)
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
      showSelectedWebsiteMessage(){
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
      // Share Website via whatsapp
      shareNowViaWhatsapp(lead, website){
          this.websiteName = website;

          let form = new FormData();
          form.append('website_id', website.id)
          form.append('website_name', website.title)
          form.append('lead_id', lead.id)
          form.append('lead_name', lead.name)
          form.append('type', 'whatsapp')
          form.append('opened', false)
          form.append('total_views', 0)
          form.append('share_id', website.share.id)
          form.append('team_id', this.auth.id)

          // for (var pair of form.entries()){
          //     console.log(pair[0]+ ', '+ pair[1]); 
          // }

          Tracker.new(form)
          .then(response => {
              this.tracker_id = response.data.id

              if (response.data.message == 'Already Sent') {
                  this.snackbarText = 'Already Sent!'
                  this.snackbar = true

                  var tracker = response.data.tracker[0].id
                  
                  window.open(`https://wa.me/${lead.contact}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://teams.agentsnest.com/wt/${tracker}/${website.share.url}`)
              } else {
                  window.open(`https://wa.me/${lead.contact}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://teams.agentsnest.com/wt/${response.data.id}/${website.share.url}`, '_blank');
              }
          })
          .catch(error => {
              console.log(error);
          })
      },
      /* ===================================
      -- -- Share website via message --- --
      =====================================*/
      shareNowViaMsg(lead, website){
          this.websiteName = website;

          let form = new FormData();
          form.append('website_id', website.id)
          form.append('website_name', website.title)
          form.append('lead_id', lead.id)
          form.append('lead_name', lead.name)
          form.append('type', 'whatsapp')
          form.append('opened', false)
          form.append('total_views', 0)
          form.append('share_id', website.share.id)
          form.append('team_id', this.auth.id)

          Tracker.new(form)
          .then(response => {
              this.tracker_id = response.data.id

              // window.location.assign(`sms:${lead.contact}&body=Hi ${lead.name} %0a ${this.selectedWebsiteMsg} %0a ${website.title} %0a https://agentsnest.com/wt/${this.tracker_id}/${website.share.url}`);
              
              if (response.data.message == 'Already Sent') {
                  this.snackbarText = 'Already Sent!'
                  this.snackbar = true

                  var tracker = response.data.tracker[0].id
                  
                  window.open(`sms:${lead.contact}?&body=Hi ${lead.name} %0a ${this.selectedWebsiteMsg} %0a ${website.title} %0a https://agentsnest.com/wt/${tracker}/${website.share.url}`)
              } else {
                  window.open(`sms:${lead.contact}?&body=Hi ${lead.name} %0a ${this.selectedWebsiteMsg} %0a ${website.title} %0a https://agentsnest.com/wt/${this.tracker_id}/${website.share.url}`);
              }
          })
          .catch(error => {
              console.log(error);
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
    },
    mounted(){
      this.fetchData();
      this.fetchLeads();
      this.fetchAuth();
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