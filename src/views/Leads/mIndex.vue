<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="shadow content-card" width="100%" flat>

            <v-card-text>
                <v-text-field
                    v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details outlined dense
                ></v-text-field>
            </v-card-text>

            <v-toolbar flat>
                <div class="font-weight-bold">Total Leads ({{total_leads}})</div>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card height="70vh" class="overflow-y-auto" flat>
                <v-list three-line>
                    <v-list-item v-for="lead in filterLead" :key="lead.id">
                        <v-list-item-content>
                            <v-list-item-title @click="detailsSidebar(lead.id)">{{ lead.name }}</v-list-item-title>
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
                    </v-list-item>
                </v-list>
            </v-card>


    <!-- Single Lead Dialog -->
            <v-dialog
                v-model="drawer"
                fullscreen
                hide-overlay
                persistent
                transition="dialog-bottom-transition"
            >
                <v-card tile>
                    <v-toolbar flat>
                        <v-btn icon @click="drawer = false"><v-icon>mdi-close</v-icon></v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-items><v-btn text @click="drawer = false">Options</v-btn></v-toolbar-items>
                    </v-toolbar>
                    <v-card-title>{{lead.name}}</v-card-title>
                    <v-simple-table>
                        <tbody>
                            <tr><td>Email</td><td>{{lead.email}}</td></tr>
                            <tr><td>Contact</td><td>{{lead.contact}}</td></tr>
                            <tr><td>City</td><td>{{lead.city}}</td></tr>
                            <tr>
                                <td>Lead Status</td>
                                <td>
                                    <v-chip class="ma-2" color="pink" label text-color="white">
                                        {{lead.status}}
                                    </v-chip>
                                </td>
                            </tr>
                            <tr><td>Assign To</td><td>{{lead.team_id}}</td></tr>
                        </tbody>
                    </v-simple-table>

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
                        <v-btn @click="shareWebsiteListDialog">
                            <span>Website</span>
                            <v-icon>mdi-web</v-icon>
                        </v-btn>
                    </v-bottom-navigation>

                    <!-- ******************************** 
                            Share Msg/Whatsapp Dialog 
                    ********************************** -->
                    <v-bottom-sheet v-model="whatsappShare">
                        <v-card flat tile height="450" class="overflow-y-auto">
                            <v-card v-for="message in messages" :key="message.id" class="mb-3">
                                <v-card-text class="d-flex align-center">
                                    <div class="mr-2">{{message.text}}</div>
                                    <v-btn class="text-capitalize"
                                        v-if="message"
                                        :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${message.text} %0a ${agentName}`"
                                        target="_blank"
                                        @click="addActivityWhatsapp"
                                        icon
                                    >
                                        <v-icon color="grey">mdi-chevron-right</v-icon>
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-card>
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
import Group from '../../Apis/Other'
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
                console.log(response.data);
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
.speed-dail{
    position: absolute;
    bottom: 20px;
    right: 15px;
}
</style>