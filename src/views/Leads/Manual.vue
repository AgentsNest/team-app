<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Lead Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        <v-card class="rounded-xl pa-3 shadow content-card overflow-y-auto" height="88vh" elevation="0">
            <v-toolbar flat class="mb-6">
                <v-btn class="white rounded-lg mr-6" elevation="0" depressed icon @click="$router.go(-1)">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="">Add New Lead</div>
            </v-toolbar>

            <v-row>
                <v-col cols="4"><v-subheader>Name</v-subheader></v-col>
                <v-col cols="8"><v-text-field dense v-model="lead.name"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="4"><v-subheader>Email</v-subheader></v-col>
                <v-col cols="8"><v-text-field dense v-model="lead.email"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="4"><v-subheader>Contact</v-subheader></v-col>
                <v-col cols="8"><v-text-field dense v-model="lead.contact" prefix="+91"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="4"><v-subheader>Lead Source</v-subheader></v-col>
                <v-col cols="8"><v-text-field dense v-model="lead.lead_source"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="4"><v-subheader>Lead Status</v-subheader></v-col>
                <v-col cols="8"><v-select dense :items="leadstatus" class="rounded-lg" v-model="lead.status"></v-select></v-col>
            </v-row>

            <v-card flat>
                <v-card-text>
                <v-btn outlined block @click="more = !more" class="text-capitalize grey--text text--darken-2">
                    More details
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                </v-card-text>

                <div v-if="more">
                    <v-row>
                        <v-col cols="4"><v-subheader>Address</v-subheader></v-col>
                        <v-col cols="8"><v-text-field dense v-model="lead.address"></v-text-field></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"><v-subheader>City</v-subheader></v-col>
                        <v-col cols="8"><v-text-field dense v-model="lead.city"></v-text-field></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"><v-subheader>State</v-subheader></v-col>
                        <v-col cols="8"><v-text-field dense v-model="lead.state"></v-text-field></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"><v-subheader>Country</v-subheader></v-col>
                        <v-col cols="8"><v-text-field dense v-model="lead.country"></v-text-field></v-col>
                    </v-row>
                </div>
            </v-card>

            <v-btn block class="py-6 mt-3 rounded-lg gradient" 
                dark 
                @click="saveLead"
                :loading="loading"
            >Save Leads</v-btn>

        </v-card>
    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import Team from '../../Apis/Team'

export default {
    data () {
      return {
        more: false,
        snackbar: false,
        leadstatus: [
            'New',
            'Cold',
            'Hot',
            'Warm',
        ],
        propertyType: [
            'Commercial',
            'Residential'
        ],
        lead: {
            name:"", 
            contact:"",
            address:"",
            city: "",
            state:"",
            country:"",
            lead_source:"",
            email:"",
            pincode:"",
            label:"",
            status: 'New',
            property_type: '',
            team_id: null
        },
        loading: false
      }
    },
    methods:{
        saveLead(){
            this.loading = true
            Lead.new(this.lead)
            .then(() => {
                this.snackbar = true;
                this.loading = false
                this.lead.name = "", 
                this.lead.contact = "",
                this.lead.address = "",
                this.lead.city =  "",
                this.lead.state = "",
                this.lead.country = "",
                this.lead.lead_source = "",
                this.lead.email = "",
                this.lead.pincode = "",
                this.lead.label = "",
                this.lead.status = "",
                this.lead.property_type =  "",
                this.lead.team_id =  null
            })
            .catch(error => {
                this.errors = error.response.data.errors;
            });            
        },
    },
    mounted(){
        Team.auth().then(response => {
            this.lead.team_id = response.data.data.id;
        });
    },
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
</style>