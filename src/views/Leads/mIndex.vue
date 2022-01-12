<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="shadow content-card" width="100%" flat>

            <v-toolbar>
                <div class="font-weight-bold">Total Leads ({{totalLeads}})</div>
                <v-spacer></v-spacer>
                <v-btn icon @click="searchInput = !searchInput"><v-icon>mdi-magnify</v-icon></v-btn>
            </v-toolbar>
            <div class="px-4">
                <v-text-field
                    v-model="search" label="Search" single-line hide-details v-if="searchInput"
                ></v-text-field>
            </div>

            <!-- checkbox actions -->
            <v-toolbar>
            <!-- <v-toolbar v-if="multipleActionToolbar"> -->
                <div class="d-flex align-center">
                    <!-- <v-checkbox v-model="selectAll" class="mr-2"></v-checkbox> -->
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
                
            </v-toolbar>
            

            <v-card height="80vh" class="overflow-y-auto pb-8" flat>
                <v-card v-for="lead in filterLead" :key="lead.id" v-hold="onTap" tile class="mt-1 rounded-lg" elevation="2">
                    <v-card-actions class="pa-3">
                        <v-checkbox class="" refs="checkItem" :value="lead.id" v-model="selectedLeads" v-if="actionBtn"></v-checkbox>
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
                    </v-card-actions>
                </v-card>               
                <div v-if="leads.length" v-observe-visibility="handleToScrollPagination"></div>
                <!-- <v-list three-line>
                    
                    <v-list-item v-for="lead in filterLead" :key="lead.id" class="">
                        <v-checkbox class="mr-3" refs="checkItem" :value="lead.id" v-model="selectedLeads" v-if="actionBtn"
                        ></v-checkbox>
                        <v-list-item-content v-hold="onTap">
                            <v-list-item-title>{{ lead.name }}</v-list-item-title>
                            <v-list-item-subtitle>
                                {{ lead.contact }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-if="lead.activities">
                                <div v-for="task in lead.activities.slice(0, 1)" :key="task.id">
                                    {{task.action}}
                                    {{task.notes}}
                                    {{task.message}}
                                    {{task.call}}
                                    {{task.whatsapp}}
                                </div>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn @click="detailsSidebar(lead.id)" icon>
                                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list> -->
            </v-card>


    <!-- Single Lead Dialog -->
            <v-dialog
                v-model="drawer"
                fullscreen
                hide-overlay
                persistent
                transition="dialog-bottom-transition"
            >
                <v-card tile v-if="lead">
                    <v-toolbar elevation="1">
                        <v-btn icon @click="drawer = false"><v-icon>mdi-close</v-icon></v-btn>
                        <v-spacer></v-spacer>

                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="text-capitalize" text v-bind="attrs" v-on="on">Options</v-btn>
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

                    </v-toolbar>

                    
                    <v-simple-table>
                        <tbody>
                            <tr><td>Name</td><td><strong>{{lead.name}}</strong></td></tr>
                            <tr><td>Email</td><td>{{lead.email}}</td></tr>
                            <tr><td>Contact</td><td>{{lead.contact}}</td></tr>
                            <tr><td>City</td><td>{{lead.city}}</td></tr>
                        </tbody>
                    </v-simple-table>

                    <v-row no-gutters>
                        <v-col cols="4">
                            <v-card tile class=" text-center" elevation="1" height="80">
                                <div class="grey darken-1 white--text caption pa-1">Group</div>
                                <v-card-subtitle>{{lead.group_id}}</v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card tile class="text-center" elevation="1" height="80">
                                <div class="grey darken-1 white--text caption pa-1">Status</div>
                                <v-card-subtitle>{{lead.status}}</v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card tile class="text-center" elevation="1" height="80">
                                <div class="grey darken-1 white--text caption pa-1">Team</div>
                                <v-card-subtitle>{{lead.team_id}}</v-card-subtitle>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-bottom-navigation color="teal" grow flat class="my-3">
                        <v-btn @click="callNow" :href="`tel:${lead.contact}`">
                            <span>Call</span>
                            <v-icon>mdi-phone</v-icon>
                        </v-btn>
                        <v-btn :href="`mailto:${lead.email}`" target="_blank">
                            <span>Email</span>
                            <v-icon>mdi-email-outline</v-icon>
                        </v-btn>
                        <v-btn @click="whatsappShareDialog">
                            <span>Message</span>
                            <v-icon>mdi-message-reply-text-outline</v-icon>
                        </v-btn>
                        <v-btn @click="shareWebsiteListDialog">
                            <span>Website</span>
                            <v-icon>mdi-web</v-icon>
                        </v-btn>
                    </v-bottom-navigation>

                <!-- ******************************** 
                        Share Text Message & Whatsapp Dialog 
                ********************************** -->
                    <v-bottom-sheet v-model="whatsappShare">
                        <v-card flat tile height="450" class="overflow-y-auto">
                            <v-tabs color="basil" grow>
                                <v-tab class="text-capitalize">My Msg</v-tab>
                                <v-tab class="text-capitalize">Sample Msg</v-tab>

                                <!-- Content -->
                                <v-tab-item>
                                    <v-card tile elevation="1" class="pa-2" v-for="text in myMsg" :key="text.id">
                                        <v-card-actions>
                                            <div class="caption">{{text.text}}</div>
                                            <v-spacer></v-spacer>
                                            <v-btn class="text-capitalize" icon @click="showSelectedMessage(text.text)">
                                                <v-icon color="grey">mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card class="rounded-lg mb-1 pa-2" elevation="1" v-for="message in messages" :key="message.id">
                                        <v-card-actions>
                                            <div class="caption">{{message.text}}</div>
                                            <v-spacer></v-spacer>
                                            <v-btn class="text-capitalize" icon @click="showSelectedMessage(message.text)">
                                                <v-icon color="grey">mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </v-card>
                    </v-bottom-sheet>
                    <v-dialog v-model="editMessageWindow" width="500">
                        <v-card class="pt-5 px-2 rounded-lg">
                            <!-- <div class="text-h6 pa-3 grey lighten-2">Send Message</div> -->
                            
                            <v-textarea outlined v-model="selectedMsg" class="px-2"></v-textarea>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <span class="grey--text text--darken-2">Share Via:</span>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    fab x-small elevation="1" class="green" dark
                                    :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${selectedMsg} %0a Regards: ${agentName}`"
                                    target="_blank"
                                    @click="addActivityWhatsapp"
                                ><v-icon>mdi-whatsapp</v-icon></v-btn>
                                <v-btn 
                                    fab x-small elevation="1" class="blue lighten-1" dark
                                    :href="`sms:${lead.contact}&body=Hi ${lead.name} %0a ${selectedMsg} %0a Regards, %0a ${agentName}`"
                                    target="_blank"
                                    @click="addActivityMessage"
                                ><v-icon>mdi-message-text-outline</v-icon></v-btn>
                                <v-btn 
                                    fab x-small elevation="1" class="red lighten-1" dark
                                    :href="`mailto:${lead.email}?body=${selectedMsg} %0a Regards, %0a ${agentName}`"
                                    target="_blank"
                                    @click="addActivityEmail"
                                ><v-icon>mdi-email</v-icon></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                <!-- ******************************** 
                        Share Website Dialog 
                ********************************** -->
                    <v-bottom-sheet v-model="sheet">
                        <v-list two-line>
                            <v-list-item v-for="website in websites" :key="website.id">
                                <v-list-item-avatar tile>
                                    <v-img
                                        :src="`https://realtsafe-test.s3.ap-south-1.amazonaws.com/website/${website.website_images.slice(0, 1)[0].url}`"
                                    ></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{website.title}}</v-list-item-title>
                                    <v-list-item-subtitle>Total shared: {{website.trackers.length}}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-btn class="text-capitalize blue darken-2" dark small
                                    @click="showSelectedWebsiteMessage(lead, website)"
                                >
                                    <!-- @click="shareNow(lead, website)" -->
                                    Select
                                </v-btn>
                                <!-- :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a Here is the details for ${website.title} %0a http://localhost:3000/wt/${tracker_id}`"
                                    target="_blank" -->

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
                                            <!-- <v-btn 
                                                fab x-small elevation="1" class="green" dark
                                                :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards: ${agentName}`"
                                                target="_blank"
                                                @click="addActivityWhatsapp"
                                            ><v-icon>mdi-whatsapp</v-icon></v-btn>
                                            <v-btn 
                                                fab x-small elevation="1" class="blue lighten-1" dark
                                                :href="`sms:${lead.contact}&body=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards, %0a ${agentName}`"
                                                target="_blank"
                                                @click="addActivityMessage"
                                            ><v-icon>mdi-message-text-outline</v-icon></v-btn> -->
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                
                            </v-list-item>
                        </v-list>
                    </v-bottom-sheet>
                    

                <!-- ******************************** 
                        Update Group Dialog 
                ********************************** -->
                    <v-bottom-sheet v-model="groupDailog">
                        <v-card class="pa-5" height="300">
                            <div class="font-weight-bold mb-3">Add lead to group</div>
                            <v-autocomplete
                                v-model="group_id"
                                :items="groups"
                                item-text="title"
                                item-value="id"
                                small-chips
                                outlined
                                dense
                                label="Search Group"
                            ></v-autocomplete>
                            <v-btn block depressed dark class="dark rounded" @click="addSingleLeadToGroup(lead.id)">
                                <v-icon left>mdi-check</v-icon>
                                Save
                            </v-btn>
                        </v-card>
                    </v-bottom-sheet>

                <!-- ******************************** 
                        Update Lead Status Dialog 
                ********************************** -->
                    <v-bottom-sheet v-model="statusDailog">
                        <v-card class="pa-5" height="300">
                            <div class="font-weight-bold mb-3">Update Lead status</div>
                            <v-autocomplete
                                v-model="status_name"
                                :items="leadStatus"
                                item-text="title"
                                item-value="title"
                                small-chips
                                outlined
                                dense
                                label="Change Lead Status"
                            ></v-autocomplete>
                            <v-btn block depressed dark class="dark rounded" @click="changeSingleLeadStatus(lead.id)">
                                <v-icon left>mdi-check</v-icon>
                                Save
                            </v-btn>
                        </v-card>
                    </v-bottom-sheet>

                <!-- ******************************** 
                    Assign Lead to Team Member Dialog 
                ********************************** -->
                    <v-bottom-sheet v-model="teamDailog">
                        <v-card class="pa-5" height="300">
                            <div class="font-weight-bold mb-3">Assign Lead To Team</div>
                            <v-autocomplete
                                v-model="team_id"
                                :items="teams"
                                item-text="name"
                                item-value="id"
                                small-chips
                                outlined
                                dense
                                label="Search team member"
                            ></v-autocomplete>
                            <v-btn block depressed dark class="dark rounded" @click="assignSingleLeadToTeam(lead.id)">
                                <v-icon left>mdi-check</v-icon>
                                Assign
                            </v-btn>
                        </v-card>
                    </v-bottom-sheet>
                   

                <!-- ******************************** 
                            Agent Activites
                ********************************** -->
                    <div class="px-6 pt-3">Activities <span v-if="lead.activities" class="ml-2">({{lead.activities.length}})</span></div>
                    <v-card-text>
                        <v-timeline dense clipped>
                            <v-timeline-item fill-dot class="white--text mb-3" color="grey lighten-3" >
                                <template v-slot:icon><v-icon>mdi-plus</v-icon></template>
                                <v-text-field
                                    v-model="input"
                                    hide-details
                                    label="Add activity..."
                                    outlined
                                    dense
                                    @keydown.enter="addActivityNotes"
                                >
                                    <template v-slot:append>
                                        <v-btn small class="text-capitalize grey darken-4 white--text" depressed @click="addActivityNotes">Add</v-btn>
                                    </template>
                                </v-text-field>
                            </v-timeline-item>
                            <v-timeline-item
                                v-for="activity in lead.activities" :key="activity.id"
                                class="mb-4" color="pink" small
                            >
                                <v-row justify="space-between">
                                    <v-col cols="7" v-if="activity.action" v-text="activity.action"></v-col>
                                    <v-col cols="7" v-if="activity.notes" v-text="activity.notes"></v-col>
                                    <v-col cols="7" v-if="activity.call" v-text="activity.call"></v-col>
                                    <v-col cols="7" v-if="activity.message" v-text="activity.message"></v-col>
                                    <v-col cols="7" v-if="activity.whatsapp" v-text="activity.whatsapp"></v-col>
                                    <v-col class="text-right" cols="5">{{activity.created_at | formatDate}}</v-col>
                                </v-row>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>

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

    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import User from '../../Apis/User'
import Website from '../../Apis/Website'
import Tracker from '../../Apis/Tracker'
import Other from '../../Apis/Other'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


export default {
    data () {
      return {
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
      }
    },
    methods:{
        onTap(){
            this.actionBtn = !this.actionBtn
            this.multipleActionToolbar = !this.multipleActionToolbar
        },
        async fetchData(){
            Lead.auth().then(response => {
                this.leads = response.data.data;
                this.total_leads = response.data.data.length;
                // console.log(response.data.data.length)
            });
        },
        async fetchGroups(){
            Other.userGroup().then(response => {
                this.groups = response.data;
            });
        },
        async fetchTeams(){
            User.agentTeam()
            .then(response => {
                this.teams = response.data;
            })
        },
        // async fetchAgent(){
        //     User.auth()
        //     .then(response => {
        //         this.agent = response.data.data.id;
        //         this.agentName = response.data.data.name;
        //     })
        // },
        shareWebsiteListDialog(){
            this.sheet = true;
            Website.auth().then(response => {
                this.websites = response.data.data;
                // console.log(response.data.data);
            });
        },
        whatsappShareDialog(){
            this.whatsappShare = true;
            Other.allMessage().then(response => {
                this.messages = response.data.data;
            });
            Other.myMessage().then(response => {
                this.myMsg = response.data.data;
            });
        },
        detailsSidebar(lead){
            this.drawer = true
            this.$store.dispatch('singleLead', lead);
        },
        deleteLead(lead){
            Lead.delete(lead)
            .then((res)=> {
                this.fetchData();
                this.drawer = false
            })
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
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        onChangeTeamMember(event){
            this.team_id = event.target.value
        },
        onChangeGroup(event){
            this.group_id = event.target.value
        },
        onChangeLeadStatus(event){
            this.status = event.target.value
        },
        addActivityNotes(){
            let data = new FormData();
            data.append('notes', this.input)
            data.append('lead_id', this.lead.id)

            Lead.addActivityNotes(data)
            .then(() => {
                this.input = ''
                this.$store.dispatch('singleLead', this.lead.id);
                this.snackbar = true
                this.snackbarText = 'Activity Note Added'
            })
        },
        callNow(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('call', 'Phone Call')

            Lead.addActivityCall(data)
            .then((res) => {
                // this.fetchData();
                console.log(res)
            })
        },
        addActivityEmail(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('action', 'Send Email')

            Lead.addActivityMessage(data)
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
        addActivityWhatsapp(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('whatsapp', 'Whatsapp Message')

            Lead.addActivityWhatsapp(data)
            .then(() => {
                // this.fetchData();
            })
        },
        addFollowup(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('agent_id', this.agent)
            data.append('send_date', this.followup.send_date)
            data.append('remarks', this.followup.remarks)

            Lead.addFollowup(data)
            .then(() => {
                this.snackbar = true
                this.snackbarText = 'Followup Added !!'
                this.followup = ''
                this.fetchData();
            })
        },
        assignToTeam(){
            let selected = this.selectedLeads;

            for (var key in selected) {
                // console.log(selected[key]);
                User.asignLeadToTeam(selected[key], {
                    team_id: this.team_id
                })
                .then(response => {
                    this.fetchData();
                    this.snackbarText = 'Lead successufully assigned to team member!'
                    this.snackbar = true;
                    this.selectedLeads = []
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        assignSingleLeadToTeam(lead){
            User.asignLeadToTeam(lead, {
                team_id: this.team_id
            })
            .then(response => {
                this.fetchData();
                this.snackbarText = 'Lead successufully assigned to team member!'
                this.snackbar = true;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        addLeadToGroup(){
            let selected = this.selectedLeads;

            for (var key in selected) {
                console.log(selected[key]);
                User.asignLeadToTeam(selected[key], {
                    group_id: this.group_id
                })
                .then(response => {
                    this.fetchData();
                    this.snackbarText = 'Lead successufully added to group'
                    this.snackbar = true;
                    this.selectedLeads = []
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        addSingleLeadToGroup(lead){
            User.asignLeadToTeam(lead, {
                group_id: this.group_id
            })
            .then(response => {
                // console.log(response.data);
                this.fetchData();
                this.snackbarText = 'Lead successufully added to group'
                this.snackbar = true;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        changeLeadStatus(){
            let selected = this.selectedLeads;

            for (var key in selected) {
                // console.log(selected[key]);
                User.asignLeadToTeam(selected[key], {
                    status: this.status_name
                })
                .then(response => {
                    this.fetchData();
                    this.snackbarText = 'Lead Staus changed'
                    this.snackbar = true;
                    this.selectedLeads = []
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        changeSingleLeadStatus(lead){
            User.asignLeadToTeam(lead, {
                status: this.status_name
            })
            .then(response => {
                this.fetchData();
                this.snackbarText = 'Lead Staus changed'
                this.snackbar = true;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        updateSingleLead(lead){
            User.asignLeadToTeam(lead, {
                // group_id: this.editedLead.group_id,
                // team_id: this.editedLead.team_id,
                contact: this.editedLead.contact,
                email: this.editedLead.email,
                status: this.editedLead.status,
                name: this.editedLead.name
            })
            .then(response => {
                this.fetchData();
                this.snackbarText = 'Lead Updated'
                this.snackbar = true;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        deleteLeadDialogBox(lead){
            console.log(lead)
        },
        editedLeadDialogBox(lead){
            this.editLead = true
            Lead.details(lead).then(response => {
                this.editedLead = response.data.data;
            });
        },
        infiniteHandler($state){
            if (this.page === this.last_page) {
                $state.complete();
            } else {
                this.page = this.page + 1;
                Lead.auth(this.page).then(response => {
                    // console.log(response.data.data)
                    response.data.data.forEach(data => {
                        this.leads.push(data);
                    });
                    $state.loaded();
                });
            }
        },
        handleToScrollPagination(){
            console.log('abc')
        },
        loadMoreDesktop($state){
            if (this.page == this.last_page) {
                $state.complete();
            } else {
                this.page = this.page + 1;
                Lead.auth(this.page).then(response => {
                    response.data.data.forEach(data => {
                        this.leads.push(data);
                    });
                    $state.loaded();
                });
            }
        },
        shareNow(lead, website){
            this.websiteName = website;

            let form = new FormData();
            form.append('website_id', website.id)
            form.append('lead_id', lead.id)
            form.append('agent_id', this.shareData.agent_id)
            form.append('opened', false)
            form.append('total_views', 0)

            // for (var pair of form.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Tracker.new(form)
            .then(response => {
                this.tracker_id = response.data.url
                // console.log(response.data)
                if (response.data == 'Already Sent') {
                    this.snackbarText = 'Already Sent!'
                    this.snackbar = true
                } else {
                    this.sendWhatsapp();
                }
                // this.websiteShareConfirmation = true
            })
            // .then(() => {
            //     this.sendWhatsapp();
            // })
            .catch(error => {
                console.log(error);
            })
        },
        showSelectedWebsiteMessage(lead, website){
            this.selectedWebsiteMsg = 'Here is the details for';
            this.editWebsiteWindow = true;
        },
        sendWhatsapp(){
            // let num=document.getElementById("number").value;
            // let leadname= document.getElementById("leadname").value;
            // let website= document.getElementById("website").value;
            // let websiteslug= document.getElementById("websiteslug").value;

            // console.log(this.lead.contact, this.lead.name, this.tracker_id, this.websiteName.title);

            window.open(`https://wa.me/${this.lead.contact}?text=Hi ${this.lead.name} ${this.selectedWebsiteMsg} ${this.websiteName.title} %0a https://agentsnest.com/wt/${this.websiteName.id}/${this.tracker_id}`, '_blank');
        },
        showSelectedMessage(message){
            this.selectedMsg = message;
            this.editMessageWindow = true
        }
    },
    computed:{
        leads(){  return this.$store.state.leads; },
        totalLeads(){ return this.$store.state.totalLeads },
        lead(){ return this.$store.state.lead; },

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
    },
    mounted(){
        // this.fetchData();
        // this.fetchGroups();
        // this.fetchTeams();
        // this.fetchAgent();
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