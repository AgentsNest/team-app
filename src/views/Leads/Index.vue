<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- Desktop Screen -->
        <v-card class="rounded-xl pa-md-5 shadow content-card d-none d-md-block" height="88vh" elevation="0">
            <v-toolbar flat>
                <div class="font-weight-bold text-h6">Total Leads ({{total_leads}})</div>
                <v-spacer></v-spacer>

                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    outlined
                    dense
                ></v-text-field>

                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small depressed class="text-capitalize rounded-lg blue-grey darken-3" dark v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item link :to="{name: 'AddLeads'}" 
                            :disabled="whateverActivatesThisLink" 
                            :event="whateverActivatesThisLink ? 'click' : ''"
                        ><v-list-item-title>Manually add</v-list-item-title></v-list-item>
                        <v-list-item link :to="{name: 'bulkUploadLead'}"
                            :disabled="whateverActivatesThisLink" 
                            :event="whateverActivatesThisLink ? 'click' : ''"
                        ><v-list-item-title>Bulk Upload</v-list-item-title></v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>

            <v-card flat>
                <!-- <v-toolbar flat class="d-none d-md-block">
                    <select class="mr-1" @change="onChangeGroup($event)">
                        <option selected disabled>Group</option>
                        <option v-for="group in groups" :key="group.id" :value="group.id">{{group.title}}</option>
                    </select>
                    
                    <v-btn fab tile small elevation="0" dark class="gradient rounded-lg" @click="addLeadToGroup">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                    
                    <select class="mr-1 ml-6" @change="onChangeTeamMember($event)">
                        <option selected disabled>Team</option>
                        <option v-for="team in teams" :key="team.id" :value="team.id">{{team.name}}</option>
                    </select>

                    <v-btn fab tile small elevation="0" dark class="gradient rounded-lg" @click="assignToTeam">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>

                    <select class="mr-1 ml-6" @change="onChangeLeadStatus($event)">
                        <option selected disabled>Lead Status</option>
                        <option value="New">New</option>
                        <option value="Cold">Cold</option>
                        <option value="Hot">Hot</option>
                        <option value="New">Warm</option>
                    </select>
                    <v-btn fab tile small elevation="0" dark class="gradient rounded-lg" @click="changeLeadStatus">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                </v-toolbar> -->

            <v-container>
                <v-row>
                    <v-col cols="4" class="d-flex">
                        <v-autocomplete
                            v-model="group_id"
                            :items="groups"
                            item-text="title"
                            item-value="id"
                            small-chips
                            outlined
                            dense
                            label="Group"
                        ></v-autocomplete>
                        <v-btn fab tile small elevation="0" dark class="gradient rounded ml-2" @click="addLeadToGroup">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="4" class="d-flex">
                        <v-autocomplete
                            v-model="team_id"
                            :items="teams"
                            item-text="name"
                            item-value="id"
                            small-chips
                            outlined
                            dense
                            label="Team"
                        ></v-autocomplete>
                        <v-btn fab tile small elevation="0" dark class="gradient rounded ml-2" @click="assignToTeam">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="4" class="d-flex">
                        <v-autocomplete
                            v-model="status_name"
                            :items="leadStatus"
                            item-text="title"
                            item-value="title"
                            small-chips
                            outlined
                            dense
                            label="Lead Status"
                        ></v-autocomplete>
                        <v-btn fab tile small elevation="0" dark class="gradient rounded-lg ml-2" @click="changeLeadStatus">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                </v-container>

                <v-simple-table
                    fixed-header
                    height="65vh"
                >
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left"><v-checkbox v-model="selectAll"></v-checkbox></th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Contact No.</th>
                            <th class="text-left">Added On</th>
                            <!-- <th class="text-left">Last Remark</th> -->
                            <th class="text-left">Status</th>
                            <th class="text-left">Source</th>
                            <!-- <th class="text-left">Assign To</th> -->
                            <!-- <th class="text-left">Group</th> -->
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(lead, index) in filterLead" :key="index"
                            class="blue-grey--text text--darken-2 cursor-pointer"
                        >
                            <td><v-checkbox refs="checkItem" :value="lead.id" v-model="selectedLeads"></v-checkbox></td>
                            <td @click="detailsSidebar(lead.id)">{{ lead.name }}</td>
                            <td @click="detailsSidebar(lead.id)">{{ lead.contact }}</td>
                            <td @click="detailsSidebar(lead.id)">{{ lead.created_at | formatDate }}</td>
                            <td @click="detailsSidebar(lead.id)">{{ lead.status }}</td>
                            <td>{{ lead.lead_source }}</td>
                            <!-- <td @click="detailsSidebar(lead.id)" v-if="lead.activities">
                                <span v-if="lead.activities[0].notes !== null">{{ lead.activities[0].notes }}</span>
                                <span v-if="lead.activities[0].message !== null">{{ lead.activities[0].message }}</span>
                                <span v-if="lead.activities[0].call !== null">{{ lead.activities[0].call }}</span>
                                <span v-if="lead.activities[0].whatsapp !== null">{{ lead.activities[0].whatsapp }}</span>
                            </td> -->
                            <!-- <td v-if="lead.activities">{{ lead.activities[0].created_at | formatDate }}</td> -->
                            <!-- <td>{{ lead.team_id }}</td> -->
                            <!-- <td>{{ lead.group_id }}</td> -->
                            <td>
                                <v-btn icon small @click="editedLeadDialogBox(lead.id)"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                                <v-btn icon small @click="deleteLeadDialogBox(lead.id)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                            </td>
                        </tr>
                        <infinite-loading @infinite="loadMoreDesktop">
                            <div slot="spinner">Loading...</div>
                            <div slot="no-more">No more leads</div>
                            <div slot="no-results" class="text-center grey--text">&nbsp;</div>
                        </infinite-loading>
                    </tbody>
                    </template>
                </v-simple-table>

                <!--
                    ===========================
                          Edit Lead Dialog 
                    ===========================
                -->
                <v-dialog v-model="editLead" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Lead Details</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Name" v-model="editedLead.name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Contact" v-model="editedLead.contact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="12">
                                    <v-text-field label="Email" v-model="editedLead.email" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                        :items="leadStatus"
                                        label="Lead Status"
                                        @change="onChangeLeadStatus($event)"
                                        v-model="editedLead.status"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                        :items="teams"
                                        item-text="name"
                                        item-value="id"
                                        label="Assign Team"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                        :items="groups"
                                        item-text="title"
                                        item-value="id"
                                        label="Group"
                                    ></v-select>
                                </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="editLead = !editLead">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="updateSingleLead(editedLead.id)">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-card>

        <!--====================================== 
        ======================================
            Single Lead Sidebar
        ======================================
        ====================================== -->
            <v-navigation-drawer v-model="drawer" tile absolute temporary right width="40vw">
                <v-card flat tile class="grey lighten-4">

                    <v-toolbar elevation="2" class="">
                        <v-toolbar-title>
                            <v-avatar :color="lead.color" size="42" class="mr-2" v-if="lead.name">
                                <span class="white--text text-h5">{{lead.name[0]}}</span>
                            </v-avatar>
                            {{lead.name}}
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card class="pa-3 grey lighten-4" flat tile>
                        <v-simple-table>
                            <tbody>
                                <tr><td>Email</td><td>{{lead.email}}</td></tr>
                                <tr><td>Contact</td><td>{{lead.contact}}</td></tr>
                                <tr><td>City</td><td>{{lead.city}}</td></tr>
                                <tr><td>Assign To</td><td>{{lead.team_id}}</td></tr>
                                <tr>
                                    <td>Lead Status</td>
                                    <td>
                                        <v-chip class="ma-2" color="pink" label text-color="white">
                                            {{lead.status}}
                                        </v-chip>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card>

                    <!-- <v-card-actions class="d-flex align-center justify-center">
                        <v-btn fab tile small class="mx-3 pa-6 white rounded-lg" elevation="1"
                            :href="`tel:${lead.contact}`"
                            @click="callNow"
                        >
                            <v-icon color="light-blue darken-3">mdi-phone</v-icon>
                        </v-btn>
                        <v-btn fab tile small class="mx-3 pa-6 white rounded-lg" elevation="1"
                            :href="`mailto:${lead.mail}`"
                            @click="addActivityMessage"
                        >
                            <v-icon color="red">mdi-email-outline</v-icon>
                        </v-btn>
                        <v-btn fab tile small class="mx-3 pa-6 white rounded-lg" elevation="1"
                            href="whatsapp://send?abid=phonenumber&text=Hello%2C%20World!"
                            @click="addActivityWhatsapp"
                        >
                            <v-icon color="green darken-4">mdi-whatsapp</v-icon>
                        </v-btn>
                    </v-card-actions> -->

                    <v-bottom-navigation color="teal" grow flat class="mb-3">
                        <v-btn @click="callNow" :href="`tel:${lead.contact}`">
                            <span>Call</span>
                            <v-icon>mdi-phone</v-icon>
                        </v-btn>
                        <v-btn :href="`mailto:${lead.email}`" target="_blank" @click="addActivityMessage">
                            <span>Email</span>
                            <v-icon>mdi-email-outline</v-icon>
                        </v-btn>
                        <v-btn @click="whatsappShareDialog">
                            <span>Message</span>
                            <v-icon>mdi-message-reply-text-outline</v-icon>
                        </v-btn>
                        <!-- <v-btn>
                            <span>Group</span>
                            <v-icon>mdi-folder-table-outline</v-icon>
                        </v-btn> -->
                        <v-btn @click="shareWebsiteListDialog">
                            <span>Website</span>
                            <v-icon>mdi-web</v-icon>
                        </v-btn>
                    </v-bottom-navigation>

                    <!-- ******************************** 
                            Share Msg/Whatsapp Dialog 
                    ********************************** -->
                    <v-bottom-sheet v-model="whatsappShare">
                        <v-list two-line height="350" class="overflow-y-auto">
                            <v-list-item v-for="message in messages" :key="message.id">
                                <v-list-item-avatar>
                                    <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <p>{{message.text}}</p>
                                </v-list-item-content>

                                <v-btn class="text-capitalize blue darken-2" dark 
                                    v-if="message"
                                    :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${message.text} %0a ${agentName}`"
                                    target="_blank"
                                    @click="addActivityWhatsapp"
                                >
                                    Share
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-bottom-sheet>
                    <!-- ******************************** 
                            End Msg/Whatsapp Dialog 
                    ********************************** -->

                    <!-- ******************************** 
                            Share Website Dialog 
                    ********************************** -->
                    <v-bottom-sheet v-model="sheet">
                        <v-list two-line>
                            <v-list-item v-for="website in websites" :key="website.id">
                                <v-list-item-avatar>
                                    <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{website.title}}</v-list-item-title>
                                    <v-list-item-subtitle>Total shared: {{website.trackers.length}}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-btn class="text-capitalize blue darken-2" dark 
                                    v-if="website"
                                    @click="shareNow(lead, website)"
                                >
                                    Share
                                </v-btn>
                                <!-- :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a Here is the details for ${website.title} %0a http://localhost:3000/wt/${tracker_id}`"
                                    target="_blank" -->
                            </v-list-item>
                        </v-list>
                    </v-bottom-sheet>
                    <!-- ******************************** 
                            End Share Website Dialog 
                    ********************************** -->

                    <v-dialog
                        v-model="websiteShareConfirmation"
                        width="500"
                    >
                        <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                            Privacy Policy
                            </v-card-title>

                            <v-card-text>
                            {{tracker_id}}
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                            >
                                I accept
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>


                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Followups</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <VueCtkDateTimePicker 
                                    :no-button-now = "true" 
                                    v-model="followup.send_date"  
                                    format='YYYY-MM-DD HH:mm'
                                />
                                <v-text-field class="mt-3" dense label="Remark" v-model="followup.remarks" placeholder="Remark" outlined></v-text-field>
                                <v-btn block class="text-capitalize gradient white--text" large @click="addFollowup">
                                    Add Followup
                                </v-btn>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>

                    <v-card height="300" class="mt-3 overflow-y-auto" flat>
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
                                            <v-btn small class="text-capitalize grey darken-4 white--text" depressed @click="addActivityNotes">Add activity</v-btn>
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

                </v-card>
            </v-navigation-drawer>
        <!--====================================== 
        ======================================
            Single Lead Sidebar Ends
        ======================================
        ====================================== -->

        </v-card>

    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import Group from '../../Apis/Other'
import User from '../../Apis/User'
import Website from '../../Apis/Website'
import Tracker from '../../Apis/Tracker'
import Other from '../../Apis/Other'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


export default {
    components:{ VueCtkDateTimePicker },
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
        leads:[],
        lead:{},
        total_leads : '',
        page: 1,
        last_page : null,
        agent: null,
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
        messages: [],
        whatsappShare: false,
        websiteName: '',
        leadStatus:[
            {id: 1, title: 'New'},
            {id: 2, title: 'Cold'},
            {id: 3, title: 'Hot'},
            {id: 4, title: 'Warm'},
            {id: 5, title: 'Dead'}
        ],
        whateverActivatesThisLink: true,
      }
    },
    methods:{
        async fetchData(){
            Lead.auth().then(response => {
                this.leads = response.data.data;
                this.total_leads = response.data.total;
                // console.log(response.data)
            });
        },
        async fetchGroups(){
            Group.userGroup().then(response => {
                this.groups = response.data;
            });
        },
        async fetchTeams(){
            User.agentTeam()
            .then(response => {
                this.teams = response.data;
            })
        },
        async fetchAgent(){
            User.auth()
            .then(response => {
                this.agent = response.data.data.id;
                this.agentName = response.data.data.name;
                if (response.data.data.subscribed === 'YES') {
                    this.whateverActivatesThisLink = true
                } else {
                    this.whateverActivatesThisLink = false
                }
            })
        },
        shareWebsiteListDialog(){
            this.sheet = true;
            Website.auth().then(response => {
                this.websites = response.data.websites;
            });
        },
        whatsappShareDialog(){
            this.whatsappShare = true;
            Group.messageSample().then(response => {
                this.messages = response.data.data;
            });
        },
        detailsSidebar(lead){
            this.drawer = true
            Lead.details(lead).then(response => {
                this.lead = response.data.data;
            });
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
                this.fetchData();
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
        addActivityMessage(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('message', 'Send Email')

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
        sendWhatsapp(){
            // let num=document.getElementById("number").value;
            // let leadname= document.getElementById("leadname").value;
            // let website= document.getElementById("website").value;
            // let websiteslug= document.getElementById("websiteslug").value;

            // console.log(this.lead.contact, this.lead.name, this.tracker_id, this.websiteName.title);

            window.open(`https://wa.me/${this.lead.contact}?text=Hi ${this.lead.name} %0a Here is the details for ${this.websiteName.title} %0a https://agentsnest.com/wt/${this.tracker_id}`, '_blank');


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
    },
    mounted(){
      this.fetchData();
      this.fetchGroups();
      this.fetchTeams();
      this.fetchAgent();
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
</style>