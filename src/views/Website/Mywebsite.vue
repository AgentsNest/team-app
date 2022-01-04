<template>
    <div>
        <v-card class="rounded-xl shadow" elevation="0">
            <v-toolbar flat>
                <v-btn width="50%" class="rounded-l-xl text-capitalize dark" dark depressed :to="{name: 'MyWebsite'}">My Websites</v-btn>
                <v-spacer></v-spacer>
                <v-btn width="50%" class="rounded-r-xl text-capitalize" depressed :to="{name: 'Website'}">All Websites</v-btn>
            
            </v-toolbar>
        </v-card>

        <v-card class="transparent content-card" elevation="0" height="80vh">
            <v-container>
                <v-row class="mt-4">
                    <v-col md="4" cols="12" v-for="(website, index) in websites" :key="index">
                      <router-link :to="{name: 'WebsiteDetails', params:{id: website.slug}}">
                        <v-card>
                            <v-img
                                height="180px"
                                :src="website.website_images[0] ? `https://realtsafe-test.s3.ap-south-1.amazonaws.com/website/${website.website_images[0].url}` : 'https://realtsafe-test.s3.ap-south-1.amazonaws.com/Default/property.jpg'"
                            ></v-img>

                            <v-card-text class="pa-0">
                              <v-card-title>{{website.title}}</v-card-title>
                              <v-card-subtitle>Total Shared: {{website.trackers.length}}</v-card-subtitle>
                            </v-card-text>
                        </v-card>
                      </router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <!-- Single Website Details Dialog -->


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
        search: null,
        select: null,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
        ],
        websites:[],
        website: null,
        leads:[],
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
        this.drawer = true
        this.website = website
      },
      shareNow(lead){
        let form = new FormData();
        form.append('website_id', this.website)
        form.append('lead_id', lead.id)
        form.append('agent_id', this.shareData.agent_id)
        form.append('opened', false)
        form.append('total_views', 0)

        // for (var pair of form.entries()){
        //     console.log(pair[0]+ ', '+ pair[1]); 
        // }

        Tracker.new(form)
        .then(response => {
            this.tracker_id = response.data.id
        })
        .then(res => {
            this.sendWhatsapp();
        })
        .catch(error => {
            console.log(error);
        })
      },
      sendWhatsapp(){
          let num=document.getElementById("number").value;
          let leadname= document.getElementById("leadname").value;
          let website= document.getElementById("website").value;
          let websiteslug= document.getElementById("websiteslug").value;
          let tracker = this.tracker_id;

          var win = window.open(`https://wa.me/${num}?text=Hi ${leadname} %0a Here is the details for ${website} %0a http://agentsnest-vue.s3-website.ap-south-1.amazonaws.com/w/${tracker}/${websiteslug} `, '_blank');
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
      }
    },
    mounted(){
      this.fetchData();
      this.fetchLeadsDetails();
      User.auth().then(response => {
          this.shareData.agent_id = response.data.data.id;
      });
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