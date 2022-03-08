<template>
    <div>
    <Layout>
        <v-card class="shadow content-card" height="88vh" elevation="0" >
            
            <v-toolbar flat>
                <div class="font-weight-bold">Followups</div>
                <v-spacer></v-spacer>
                <!-- <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab x-small depressed class="text-capitalize rounded-lg blue-grey darken-3" dark v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card class="py-3">
                        <v-card-title><span class="text-h5">Add followup</span></v-card-title>

                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <VueCtkDateTimePicker 
                                        :no-button-now = "true" 
                                        v-model="followup.send_date"  
                                        format='YYYY-MM-DD HH:mm'
                                    />
                                </v-col>
                            </v-row>
                            <v-autocomplete 
                                label="Search lead" 
                                v-model="lead_id"
                                :items="leads"
                                item-text="name"
                                item-value="id"
                                class="mt-3"
                            ></v-autocomplete>
                            <v-textarea rows="4" outlined label="Remarks" v-model="followup.remarks"></v-textarea>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey darken-3" class="text-capitalize" outlined @click="dialog = false">Close</v-btn>
                            <v-btn color="grey darken-3" dark class="text-capitalize" 
                                @click="addFollowup"
                                :loading="loading"
                            >Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog> -->
            </v-toolbar>

            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="events"
                    :items-per-page="5"
                    class="elevation-1"
                    dense
                >
                    <template v-slot:item.date_string="{ item }">
                        {{ item.date_string | fromNow() }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small @click="deleteItem(item.id)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>

        </v-card>
    </Layout>
        
    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import Team from '../../Apis/Team';
// import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
// import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Layout from '../../Layouts/Layout.vue'

export default {
    components:{ Layout },
    data () {
        return {
            events: [],
            dialog: false,
            loading: false,
            lead_id: null,
            leads: [],
            followup:{
                send_date : "",
                remarks: ""
            },
            team_id: null,
            agent_name: '',
            headers: [
                { text: 'Lead Name', align: 'start', sortable: false, value: 'lead.name',},
                { text: 'Remarks', value: 'remarks', sortable: false, },
                { text: 'Date', value: 'date_string' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
        }
    },
    methods:{
        async fetchData(){
            Lead.getFollowups().then(response => {
                this.events = response.data.events.data;
                // console.log(response.data.events.data)
            });
        },
        async leadList(){
            Lead.leads().then(response => {
                this.leads = response.data.data;
                // console.log(response.data.data)
            });
        },
        async fetchAgent(){
            Team.auth()
            .then(response => {
                this.team_id = response.data.data.id;
            })
        },
        addFollowup(){
            let data = new FormData();
            data.append('lead_id', this.lead_id)
            data.append('lead_name', this.lead_name)
            data.append('team_id', this.team_id)
            data.append('send_date', this.followup.send_date)
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
        deleteItem(item){
            Lead.deleteFollowup(item)
            .then(() => {
                this.fetchData();
            })
        }
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