<template>
    <div class="single-lead">
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        <v-card class="rounded-xl" v-if="lead">
            <v-toolbar elevation="0">
                <v-btn icon :to="{name: 'allLeads'}"><v-icon>mdi-arrow-left</v-icon></v-btn>
                <v-spacer></v-spacer>

                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="text-capitalize" icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-cog</v-icon>
                        </v-btn>
                    </template>
                    <v-list dense flat elevation="0" class="py-0">
                        <!-- <v-list-item @click="showGroupDailog">
                            <v-list-item-title>Add To Group</v-list-item-title>
                        </v-list-item> -->
                        <v-list-item @click="statusDailog = !statusDailog">
                            <v-list-item-title>Lead Status</v-list-item-title>
                        </v-list-item>
                        <!-- <v-list-item @click="showTeamDailog">
                            <v-list-item-title>Assign Team</v-list-item-title>
                        </v-list-item> -->
                        <!-- <v-btn text small class="text-capitalize red lighten-4" block tile @click="deleteLead(lead.id)">
                            Delete
                        </v-btn> -->
                    </v-list>
                </v-menu>
            </v-toolbar>

            <v-simple-table>
                <tbody>
                    <tr><td>Name</td><td><strong>{{lead.name}}</strong></td></tr>
                    <tr><td>Email</td><td>{{lead.email}}</td></tr>
                    <tr><td>Contact</td><td>{{lead.contact}}</td></tr>
                    <tr><td>Source</td><td>{{lead.lead_source}}</td></tr>
                    <tr><td>Lead Status</td><td>{{lead.status}}</td></tr>
                </tbody>
            </v-simple-table>


            <v-bottom-navigation color="teal" grow flat class="my-3" height="50px">
                <v-btn @click="callNow" :href="`tel:${lead.contact}`" height="50px">
                    <span>Call</span>
                    <v-icon>mdi-phone</v-icon>
                </v-btn>
                <v-btn :href="`mailto:${lead.email}`" target="_blank" height="50px">
                    <span>Email</span>
                    <v-icon>mdi-email-outline</v-icon>
                </v-btn>
                <v-btn @click="whatsappShareDialog" height="50px">
                    <span>Message</span>
                    <v-icon>mdi-message-reply-text-outline</v-icon>
                </v-btn>
                <v-btn @click="shareWebsiteListDialog" height="50px">
                    <span>Website</span>
                    <v-icon>mdi-web</v-icon>
                </v-btn>
            </v-bottom-navigation>

        <!-- ******************************** 
                Share Text Message Dialog 
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
            <v-bottom-sheet v-model="sheet" class="white">
                <v-card class="white" flat>
                    <div class="pa-3 grey--text text--darken-2">Search Website</div>
                    <div class="d-flex align-center">
                        <input type="text" v-model="search" placeholder="Project Name..." class="search-input px-4">
                        <v-btn fab depressed class="white rounded-lg" @click.prevent="searchWebsite()">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </v-card>
                <v-list two-line>
                    <v-list-item v-for="website in websites" :key="website.id">
                        <!-- <v-list-item-avatar tile>
                            <v-img
                                :src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images.slice(0, 1)[0].url}`"
                            ></v-img>
                        </v-list-item-avatar> -->

                        <v-list-item-content>
                            <v-list-item-title>{{website.title}}</v-list-item-title>
                            <v-list-item-subtitle>Total shared: {{website.trackers.length}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <!-- <v-btn class="text-capitalize blue darken-2" dark small
                            @click="showSelectedWebsiteMessage(lead, website)"
                        >Select</v-btn> -->

                        <!-- 
                        ============== Edit Website Dialog ================
                        -->
                        <v-dialog v-model="editWebsiteWindow[website.id]" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" class="text-capitalize blue darken-2" dark small>Select</v-btn>
                            </template>

                            <v-card class="pt-5 rounded-lg">
                                <v-card-text>
                                    <span class="caption grey--text">Hi, {clientName},</span> <br>
                                    <div>{{selectedWebsiteMsg}}</div>
                                    <span class="caption grey--text">Regards,</span> <br/>
                                    <span class="caption grey--text">{yourName}</span>
                                </v-card-text>

                                <v-textarea outlined label="Default Message" v-model="selectedWebsiteMsg" height="100" class="mt-6"></v-textarea>

                                <v-divider></v-divider>
                                <v-card-actions>
                                    <span class="grey--text text--darken-2">Share Via:</span>
                                    <v-spacer></v-spacer>
                                    <v-btn 
                                        @click="shareNowViaWhatsapp(lead, website)"
                                        fab x-small elevation="1" class="green" dark
                                    ><v-icon>mdi-whatsapp</v-icon></v-btn>
                                    <v-btn 
                                        @click="shareNowViaMsg(lead, website)"
                                        fab x-small elevation="1" class="blue" dark
                                    ><v-icon>mdi-message-text-outline</v-icon></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        
                    </v-list-item>
                </v-list>
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
                    Agent Activites
        ********************************** -->
            <div class="px-6 pt-3">Activities <span v-if="lead.activities" class="ml-2">({{lead.activities.length}})</span></div>

            <v-card flat class="px-4 mt-3 overflow-y-auto" height="200">
                <!-- <v-timeline dense clipped >
                    <v-timeline-item fill-dot class="white--text mb-3 text-left" color="grey lighten-3" >
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
                        <template v-slot:icon><v-icon>mdi-plus</v-icon></template>
                    </v-timeline-item>

                    <v-timeline-item
                        v-for="activity in lead.activities" :key="activity.id"
                        class="mb-4 text-left" color="pink" small
                    >
                        <v-row justify="space-between" class="body-2">
                            <v-col cols="7" v-if="activity.action" v-text="activity.action"></v-col>
                            <v-col cols="7" v-if="activity.notes" v-text="activity.notes"></v-col>
                            <v-col cols="7" v-if="activity.call" v-text="activity.call"></v-col>
                            <v-col cols="7" v-if="activity.message" v-text="activity.message"></v-col>
                            <v-col cols="7" v-if="activity.whatsapp" v-text="activity.whatsapp"></v-col>
                            <v-col class="text-right" cols="5">{{activity.created_at | formatDate}}</v-col>
                        </v-row>
                    </v-timeline-item>
                </v-timeline> -->

                <div>
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
                </div>
                <v-list>
                    <v-list-item two-line v-for="activity in lead.activities" :key="activity.id">
                        <v-list-item-icon>
                            <v-icon color="pink">mdi-record-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                <div v-if="activity.action" v-text="activity.action"></div>
                                <div v-if="activity.notes" v-text="activity.notes"></div>
                                <div v-if="activity.call" v-text="activity.call"></div>
                                <div v-if="activity.message" v-text="activity.message"></div>
                                <div v-if="activity.whatsapp" v-text="activity.whatsapp"></div>
                            </v-list-item-title>
                            <v-list-item-subtitle>{{activity.created_at | formatDate}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

        </v-card>
    </div>
</template>

<script>
import Lead from '../../Apis/Lead';
import Team from '../../Apis/Team'
import Other from '../../Apis/Other'
import Website from '../../Apis/Website'
import Tracker from '../../Apis/Tracker'

export default {
    data(){
        return {
            groupDailog: false,
            statusDailog: false,
            teamDailog: false,
            myMsg:[],
            messages:[],
            selectedMsg: '',
            agentName: '',
            websites: [],
            group_id: null,
            leadStatus:[
                {id: 1, title: 'New'},
                {id: 2, title: 'Cold'},
                {id: 3, title: 'Hot'},
                {id: 4, title: 'Warm'},
                {id: 5, title: 'Dead'}
            ],
            status_name: '',
            team_id: null,
            input: '',
            snackbar: false,
            snackbarText: '',
            sheet: false,
            editMessageWindow: false,
            selectedWebsiteMsg: 'Here is the details for',
            editWebsiteWindow: {},
            whatsappShare: false,
            shareData:{
                website_id: null,
                lead_id: null,
                agent_id: null,
                opened: false,
                total_views: 0
            },
            generatedLink: '',
            search: '',
            lead: '',
            auth: ''
        }
    },
    computed:{
    },
    mounted(){
        this.fetchData();
        this.fetchAuth();
    },
    methods:{
        fetchAuth(){
            Team.auth()
            .then((response) => {
                this.auth = response.data.data
                // console.log(response.data.data)
            })
        },
        fetchData(){
            Lead.details(this.$route.params.id)
            .then((response) => {
                this.lead = response.data.data
            });
        },
        addActivityNotes(){
            let data = new FormData();
            data.append('notes', this.input)
            data.append('lead_id', this.lead.id)

            Lead.addActivityNotes(data)
            .then(() => {
                this.input = ''
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
            data.append('whatsapp', 'Share Website Via Whatsapp')

            Lead.addActivityWhatsapp(data)
            .then(() => {
                // this.fetchData();
            })
        },
        changeSingleLeadStatus(lead){
            Lead.asignLeadToTeam(lead, {
                status: this.status_name
            })
            .then(response => {
                this.fetchData();
                console.log(response)
                this.snackbarText = 'Lead Staus changed'
                this.snackbar = true;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        showGroupDailog(){
            this.$store.dispatch('getGroup');
            this.groupDailog = true
        },
        addSingleLeadToGroup(lead){
            Team.asignLeadToTeam(lead, {
                group_id: this.group_id
            })
            .then(response => {
                this.fetchData();
                console.log(response)
                this.snackbarText = 'Lead successufully added to group'
                this.snackbar = true;
            })
            .then(() =>{
                this.groupDailog = false;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        showTeamDailog(){
            this.$store.dispatch('getTeams');
            this.teamDailog = true
        },
        deleteLead(lead){
            Lead.delete(lead)
            .then((res)=> {
                this.$router.push({name: 'mLeads'});
                console.log(res)
            })
        },
        // Share Website
        shareWebsiteListDialog(){
            this.sheet = true;
            // Website.myWebsiteToShare().then(response => {
            //     this.websites = response.data.data;
            // });
        },
        showSelectedWebsiteMessage(lead, website){
            this.selectedWebsiteMsg = 'Here is the details for';
            this.editWebsiteWindow = true;
            console.log(lead, website)
        },
        // Text Message share
        whatsappShareDialog(){
            this.whatsappShare = true;
            Other.allMessage().then(response => {
                this.messages = response.data.data;
            });
            Other.myMessage().then(response => {
                this.myMsg = response.data.data;
            });
        },
        showSelectedMessage(message){
            this.selectedMsg = message;
            this.editMessageWindow = true
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
                // this.tracker_id = response.data.url
                this.tracker_id = response.data.id
                
                // window.location.href(`https://wa.me/${lead.contact}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://agentsnest.com/wt/${response.data.id}/${website.share.url}`, '_blank');

                // console.log(response.data)

                if (response.data.message == 'Already Sent') {
                    this.snackbarText = 'Already Sent!'
                    this.snackbar = true

                    var tracker = response.data.tracker[0].id
                    
                    window.open(`https://wa.me/${lead.contact.replace(/\s+/g, '')}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://teams.agentsnest.com/wt/${tracker}/${website.share.url}`)
                } else {
                    // this.sendWhatsapp();
                    window.open(`https://wa.me/${lead.contact.replace(/\s+/g, '')}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://teams.agentsnest.com/wt/${response.data.id}/${website.share.url}`, '_blank');
                }
                // this.websiteShareConfirmation = true
            })
            .catch(error => {
                console.log(error);
            })
        },
        
        /* -- Share website via message -- */
        shareNowViaMsg(lead, website){
            this.websiteName = website;

            let form = new FormData();
            form.append('website_id', website.id)
            form.append('website_name', website.title)
            form.append('lead_id', lead.id)
            form.append('lead_name', lead.name)
            form.append('type', 'message')
            form.append('opened', false)
            form.append('total_views', 0)
            form.append('share_id', website.share.id)
            form.append('agent_id', this.auth.agent_id)

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

        searchWebsite(){
            Website.searchMyWebsite(this.search)
            .then((res) => {
                this.websites = res.data;
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        },
        
    }
}
</script>

<style scoped>
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 88%;
  outline: none;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>