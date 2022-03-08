<template>
    <div class="single-lead">
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- <v-toolbar dense elevation="1">
            <v-btn icon :to="{name: 'allLeads'}"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <span class="grey--text text--darken-3">Details</span>
            <v-spacer></v-spacer>
        </v-toolbar> -->

        <v-toolbar class="my-1" elevation="1">
            <v-btn fab small depressed v-if="lead.name">
                {{lead.name.slice(0, 1)}}
            </v-btn>
            <div class="ml-3">
                <div class="body-1 font-weight-bold">{{lead.name}}</div>
                <div class="caption grey--text text--darken-1">{{lead.contact}}</div>
            </div>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list dense class="rounded-xl">
                    <v-list-item @click="showGroupDailog">
                        <v-list-item-title>Add To Group</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="statusDailog = !statusDailog">
                        <v-list-item-title>Lead Status</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>

         <v-tabs class="pa-0" grow>
            <v-tabs-slider/>
            <v-tab class="text-capitalize">Contact</v-tab>
            <v-tab class="text-capitalize">Activities</v-tab>
            <v-tab class="text-capitalize">Followups</v-tab>

            <!-- Contact Tab  -->
            <v-tab-item>
                <v-bottom-navigation grow class="my-1" height="60px" >
                    <v-btn @click="callNow" :href="`tel:${lead.contact}`" height="60px" class="white">
                        <span>Call</span>
                        <v-icon size="20">mdi-phone</v-icon>
                    </v-btn>
                    <v-btn :href="`mailto:${lead.email}`" target="_blank" height="60px" class="white">
                        <span>Email</span>
                        <v-icon size="20">mdi-email-outline</v-icon>
                    </v-btn>
                    <v-btn @click="whatsappShareDialog" height="60px" class="white">
                        <span>Message</span>
                        <v-icon size="20">mdi-message-reply-text-outline</v-icon>
                    </v-btn>
                    <v-btn @click="shareWebsiteListDialog" height="60px" class="white">
                        <span>Website</span>
                        <v-icon size="20">mdi-web</v-icon>
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
                                :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${selectedMsg} %0a Regards: ${auth.name}`"
                                target="_blank"
                                @click="addActivityWhatsapp"
                            ><v-icon>mdi-whatsapp</v-icon></v-btn>
                            <v-btn 
                                fab x-small elevation="1" class="blue lighten-1" dark
                                :href="`sms:${lead.contact}&body=Hi ${lead.name} %0a ${selectedMsg} %0a Regards, %0a ${auth.name}`"
                                target="_blank"
                                @click="addActivityMessage"
                            ><v-icon>mdi-message-text-outline</v-icon></v-btn>
                            <v-btn 
                                fab x-small elevation="1" class="red lighten-1" dark
                                :href="`mailto:${lead.email}?body=${selectedMsg} %0a Regards, %0a ${auth.name}`"
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

                <v-simple-table>
                    <tbody>
                        <tr><td>Email</td><td>{{lead.email}}</td></tr>
                        <tr><td>Contact</td><td>{{lead.contact}}</td></tr>
                        <tr><td>Source</td><td>{{lead.lead_source}}</td></tr>
                        <tr><td>Lead Status</td><td>{{lead.status}}</td></tr>
                        <tr><td>Group</td><td>{{lead.group_id}}</td></tr>
                        <tr><td>Address</td><td>{{lead.address}}</td></tr>
                    </tbody>
                </v-simple-table>
                
            </v-tab-item>

            <!-- Activites Tab -->
            <v-tab-item>
                <v-card v-if="lead" class="mt-1 pt-4">    
                <!-- ******************************** 
                            Agent Activites
                ********************************** -->
                    <div class="px-6 pt-1">Activities <span v-if="lead.activities" class="ml-2">({{lead.activities.length}})</span></div>

                    <v-card flat class=" mt-3 overflow-y-auto" height="65vh">
                        <div class="px-5">
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
                        <v-list dense>
                            <v-list-item two-line v-for="activity in lead.activities" :key="activity.id" class="list-style">
                                <v-list-item-icon>
                                    <v-icon size="20px" color="pink">mdi-record-circle</v-icon>
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
            </v-tab-item>

            <!-- ******************************** 
                        Followups
            ********************************** -->
            <v-tab-item>
                <!-- ******************************** 
                    Add Followup Dialog 
                ********************************** -->
                <v-card class="pa-5 mt-1" tile>
                    <div class="font-weight-bold mb-3">Add Followup</div>
                    <VueCtkDateTimePicker 
                        :no-button-now = "true" 
                        v-model="followup.send_date"  
                        format='YYYY-MM-DD HH:mm'
                    />
                    <v-textarea rows="3" class="mt-2" outlined label="Remarks" v-model="followup.remarks"></v-textarea>
                    <v-btn block depressed dark class="dark rounded" @click="addFollowup">
                        <v-icon left>mdi-check</v-icon>
                        Save
                    </v-btn>
                </v-card>
            </v-tab-item>

        </v-tabs>

    </div>
</template>

<script>
import Lead from '../../Apis/Lead';
import Team from '../../Apis/Team'
import Other from '../../Apis/Other'
import Website from '../../Apis/Website'
import Tracker from '../../Apis/Tracker'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default {
    components:{ VueCtkDateTimePicker },
    props: ['lead'],
    data(){
        return {
            groupDailog: false,
            followupDailog: false,
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
            // lead: '',
            auth: '',
            isSafari: null,
            followup:{
                send_date : "",
                remarks: ""
            },
        }
    },
    computed:{
        groups(){ return this.$store.state.groups},
        // lead(){ return this.$store.state.lead},
        // teams(){ return this.$store.state.teams},
        // agent(){ return this.$store.state.auth }
    },
    mounted(){
        this.whichBrowser();
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
            // Lead.details(this.$route.params.id)
            Lead.details(this.lead.id)
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
            Lead.asignLeadToTeam(lead, {
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
                this.myMsg = response.data;
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
        whichBrowser(){
            var bro = navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1
            this.isSafari = bro
        },
        // Followups Function
        addFollowup(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('lead_name', this.lead.name)
            data.append('team_id', this.auth.id)
            data.append('send_date', this.followup.send_date)
            data.append('remarks', this.followup.remarks)

            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Lead.addFollowup(data)
            .then(() => {
                this.followup = ''
                this.snackbarText = "Followuup added!"
                this.snackbar = true
                this.followupDailog = false
            })
        }
        
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
.list-style{
    border: 1px solid #efefef;
    border-radius: 4px;
}
</style>