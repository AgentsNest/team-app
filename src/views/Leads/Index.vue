<template>
    <Layout>
        <v-card class="shadow content-card mt-1" width="100%" flat>
            <v-toolbar class="mt-1">
                <div class="font-weight-bold">Total Leads ({{total_leads}})</div>
                <v-spacer></v-spacer>
                <v-btn icon @click="searchInput = !searchInput"><v-icon>mdi-magnify</v-icon></v-btn>
            </v-toolbar>

            <div class="mt-1 px-4 d-flex align-center mb-3" v-if="searchInput">
                <v-text-field
                    v-model="search" label="Search by name.." single-line hide-details
                    width="80%"
                ></v-text-field>
                <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
            </div>

            <!-- checkbox actions -->
            <!-- <v-toolbar v-if="multipleActionToolbar"> -->
            <!-- <v-toolbar>
                <div class="d-flex align-center">
                    <input type="checkbox" v-model="selectAll" class="mr-2">Select all
                    <div v-if="selectedLeads.length" class="caption">Selected ({{selectedLeads.length}})</div>
                </div>
                <v-spacer></v-spacer>
                <v-btn text class="text-capitalize" small depressed @click="deleteMultipleLead">
                    <v-icon small>mdi-trash-can-outline</v-icon>
                    delete
                </v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="text-capitalize" text v-bind="attrs" v-on="on">Actions</v-btn>
                    </template>
                    <v-list dense flat elevation="0" class="py-0">
                        <v-list-item @click="groupDailog = !groupDailog">
                            <v-list-item-title>Add To Group</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="statusDailog = !statusDailog">
                            <v-list-item-title>Lead Status</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="teamDailog = !teamDailog">
                            <v-list-item-title>Assign Team</v-list-item-title>
                        </v-list-item>
                        <v-btn text small class="text-capitalize red lighten-4" block tile @click="deleteLead(lead.id)">
                            Delete
                        </v-btn>
                    </v-list>
                </v-menu>
            </v-toolbar> -->
      

            <v-card height="80vh" class="overflow-y-auto" flat>
                <v-card v-for="lead in leads" :key="lead.id" tile class="mt-1 rounded-lg" elevation="2">
                    <v-card-actions class="pa-3">
                        <!-- <v-checkbox class="" refs="checkItem" :value="lead.id" v-model="selectedLeads"></v-checkbox> -->
                        <div>
                            <span class="font-weight-bold">{{ lead.name }}</span> <br>
                            <span class="caption">{{ lead.contact }}</span> <br>
                            <div v-if="lead.activities" class="caption">
                                <div v-for="task in lead.activities.slice(0, 1)" :key="task.id">
                                    {{task.action}} {{task.notes}} {{task.message}} {{task.call}} {{task.whatsapp}}
                                </div>
                            </div>
                            <div>
                                <v-chip x-small class="mr-1 red lighten-4">{{lead.status}}</v-chip>
                                <v-chip x-small class="mr-1 teal lighten-4" v-if="lead.group_id">{{lead.group_id}}</v-chip>
                                <v-chip x-small class="mr-1 purple lighten-4" v-if="lead.team_id">{{lead.team_id}}</v-chip>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn @click="detailsSidebar(lead.id)" icon>
                            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                        </v-btn>
                        <!-- <router-link
                            :to="{name: 'singleLead', params: {id:lead.id}}"
                        >
                            <v-icon color="grey ">mdi-chevron-double-right</v-icon>
                        </router-link> -->
                    </v-card-actions>
                </v-card>   

                <infinite-loading 
                    @infinite="infiniteHandler" 
                    spinner="waveDots"
                    v-if="total_leads > 20"
                >
                    <span slot="no-more"></span>
                </infinite-loading>
                <!-- <v-btn block @click="loadMoreLead" class="my-3 rounded-lg text-capitalize">load more</v-btn> -->

            </v-card>

            <!-- Single Lead Dialog -->
            <v-dialog
                v-model="drawer"
                fullscreen
                hide-overlay
                persistent
                transition="dialog-bottom-transition"
            >
                <v-toolbar>
                    <v-btn icon @click="drawer = !drawer"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>
                <v-card>
                    <Single :lead="lead"></Single>
                </v-card>
            </v-dialog>
            
            <v-speed-dial
                    v-model="fab"
                    class="speed-dail"
                    :direction="direction"
                    :open-on-hover="hover"
                    :transition="transition"
                >
                <template v-slot:activator>
                    <v-btn v-model="fab" class="gradient" dark fab>
                        <v-icon v-if="fab">mdi-close</v-icon>
                        <v-icon v-else>mdi-plus</v-icon>
                    </v-btn>
                </template>

                <v-btn dark small color="white" class="rounded" link :to="{name: 'AddLeads'}">
                    <v-icon left color="#444">mdi-pencil</v-icon>
                    <span class="text-capitalize grey--text text--darken-3" >manual</span>
                </v-btn>
                <v-btn dark small color="white" class="rounded" link :to="{name: 'bulkUploadLead'}">
                    <v-icon left color="#444">mdi-file-upload-outline</v-icon>
                    <span class="text-capitalize grey--text text--darken-3">bulk</span>
                </v-btn>
            </v-speed-dial>
      
        </v-card>    
    </Layout> 
</template>

<script>
import Lead from '../../Apis/Lead'
import Layout from "../../Layouts/Layout.vue";
import InfiniteLoading from 'vue-infinite-loading';
import Single from "./Single.vue"
import Team from "../../Apis/Team"

export default {
    components: { InfiniteLoading, Layout, Single },
    name: 'Lead',

    data() {
        return {
          leads: [],
          lead: '',
          auth:'',
          search: '',
          benched: 0,
          headers: [
            { text: 'Name',align: 'start',sortable: false,value: 'name' },
            { text: 'Contact No.', value: 'contact' },
            { text: 'Added On', value: 'created_at' },
            { text: 'Assign', value: 'team_id' },
            { text: 'Last Remark', value: 'activites' },
          ],
          status_name: '',
          page: 1,
          last_page : null,
          agentName: '',
          drawer: false,
          input: '',
          followup:{
              send_date : "",
              remarks: ""
          },
          snackbar: false,
          snackbarText: '',
          leadStatusCustom: [
              'New',
              'Cold',
              'Hot',
              'Warm'
          ],
          selectedLeads: [],
          groups:[],
          teams: [],
          total_leads: 0,
          team_id: null,
          group_id: null,
          status: '',
          editLead: false,
          editedLead: {},
          sheet: false,
          websites: [],
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
          websiteShareConfirmation: false,
          messages:[],
          myMsg:[],
          whatsappShare: false,
          websiteName: '',
          leadStatus:[
              {id: 1, title: 'New'},
              {id: 2, title: 'Cold'},
              {id: 3, title: 'Hot'},
              {id: 4, title: 'Warm'},
              {id: 5, title: 'Dead'}
          ],
          direction: 'top',
          fab: false,
          fling: false,
          hover: false,
          tabs: null,
          top: false,
          right: true,
          bottom: true,
          left: false,
          transition: 'slide-y-reverse-transition',
          groupDailog: false,
          statusDailog: false,
          teamDailog: false,
          editMessageWindow: false,
          selectedMsg: '',
          editWebsiteWindow: false,
          actionBtn: false,
          searchInput: false,
          selectedWebsiteMsg: '',
          multipleActionToolbar: false
        };
    },
    methods:{
        async fetchData(){
            Lead.leads(this.page)
            .then(response => {
                this.leads = response.data.data;
                this.total_leads = response.data.meta.total;
                this.last_page = response.data.meta.last_page;
                // console.log(response.data);
            });
        },
        detailsSidebar(lead){
            this.drawer = true
            Lead.details(lead)
            .then((response) => {
                this.lead = response.data.data
            });
        },
        deleteMultipleLead(){
            let selected = this.selectedLeads;

            for (var key in selected) {
                // console.log(selected[key]);
                Lead.delete(selected[key])
                .then(response => {
                    this.fetchData();
                    this.snackbarText = 'Lead deleted'
                    this.snackbar = true;
                    this.selectedLeads = []
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        infiniteHandler($state){
            if (this.page === this.last_page) {
                $state.complete();
            } else {
                this.page = this.page + 1;
                Lead.leads(this.page).then((response) => {
                // console.log(response.data.data)
                response.data.data.forEach(data => {
                    this.leads.push(data);
                });
                $state.loaded();
                });
            }
        },
        fetchAuth(){
            Team.auth()
            .then((response) => {
                this.auth = response.data.data
                // console.log(response.data.data)
            })
        },
    },
    computed:{
        filterLead: function(){
            return this.leads.filter((lead) => {
                return lead.name.toLowerCase().match(this.search.toLowerCase());
            })
        },
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
        // auth(){ return this.$store.state.auth }
    },
    mounted(){
        this.fetchData();
        this.fetchAuth();
    }
};
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 1em;
  margin-bottom: 2em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.cursor-pointer{cursor: pointer;}
select{
    background-color: #fff;
    border-radius: 6px;
    width: 10vw;
    padding: 0.5em;
    outline: none;
    -webkit-appearance: listbox !important;
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.speed-dail{
    position: absolute;
    bottom: 6em;
    right: 15px;
}
</style>