<template>
    <div>

        <v-card class="rounded-xl pa-5 shadow content-card" height="88vh" elevation="0">
            
            <v-toolbar flat>
                <div class="font-weight-bold text-h6">My Followups</div>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small depressed class="text-capitalize rounded-lg blue-grey darken-3" dark v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card class="py-6">
                        <v-card-title><span class="text-h5">Add followup</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Select Date" type="date" v-model="followup.followup_date" required ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Select Date" type="time" required v-model="followup.followup_time"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-autocomplete 
                                    label="Search lead" 
                                    v-model="lead_id"
                                    :items="leads"
                                    item-text="name"
                                    item-value="id"
                                ></v-autocomplete>
                                <v-textarea rows="4" outlined label="Remarks" v-model="followup.remarks"></v-textarea>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey darken-3" class="text-capitalize" outlined @click="dialog = false">Close</v-btn>
                            <v-btn color="grey darken-3" dark class="text-capitalize" 
                                @click="addFollowup"
                                :loading="loading"
                            >Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>

            <v-card flat>
                <v-list three-line>
                    <v-list-item v-for="event in events" :key="event.id">
                        <v-list-item-avatar color="red">
                            {{event.lead.name[0]}}
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{event.lead.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{event.remarks}}</v-list-item-subtitle>
                            <v-list-item-subtitle>
                                <v-icon size="16">mdi-alarm</v-icon>
                                {{event.timezoneoffset}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

        </v-card>

        
    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import User from '../../Apis/User'

export default {
    data () {
        return {
            events: [],
            dialog: false,
            loading: false,
            lead_id: null,
            leads: [],
            followup:{
                followup_date : "",
                followup_time : "",
                remarks: ""
            },
            agent_id: null
        }
    },
    methods:{
        async fetchData(){
            Lead.getFollowups().then(response => {
                this.events = response.data.events;
                // console.log(response.data)
            });
        },
        async leadList(){
            Lead.auth().then(response => {
                this.leads = response.data.data;
                // console.log(response.data.data)
            });
        },
        async fetchAgent(){
            User.auth()
            .then(response => {
                this.agent_id = response.data.data.id;
            })
        },
        addFollowup(){
            let data = new FormData();
            data.append('lead_id', this.lead_id)
            data.append('agent_id', this.agent_id)
            data.append('followup_date', this.followup.followup_date)
            data.append('followup_time', this.followup.followup_time)
            data.append('remarks', this.followup.remarks)

            this.loading = true

            Lead.addFollowup(data)
            .then(() => {
                // this.snackbar = true
                // this.snackbarText = 'Followup Added !!'
                this.followup = ''
                this.fetchData();
                this.dialog = false
                this.loading = false
            })
        },
    },
    mounted(){
      this.fetchData();
      this.leadList();
      this.fetchAgent();
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