<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Lead Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        <v-card class="rounded-xl pa-10 shadow content-card" height="88vh" elevation="0">
            <v-toolbar flat class="mb-6">
                <v-btn class="white rounded-lg mr-6" elevation="1" depressed icon @click="$router.go(-1)">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="font-weight-bold text-h6">Add New Lead</div>
            </v-toolbar>

            <v-container>
                <v-row>
                    <v-col md="6">
                        <v-text-field class="rounded-lg" label="Name" outlined v-model="lead.name"></v-text-field>
                        <v-text-field class="rounded-lg" label="Contact Number" prefix="+91" outlined v-model="lead.contact"></v-text-field>
                        <v-text-field class="rounded-lg" label="Address" outlined v-model="lead.address"></v-text-field>
                        <v-text-field class="rounded-lg" label="City" outlined v-model="lead.city"></v-text-field>
                        <v-row>
                            <v-col><v-text-field label="State" outlined class="rounded-lg" v-model="lead.state"></v-text-field></v-col>
                            <v-col><v-text-field label="Country" outlined class="rounded-lg" v-model="lead.country"></v-text-field></v-col>
                        </v-row>
                    </v-col>
                    <v-col md="6">
                        <v-text-field class="rounded-lg" label="Email" outlined v-model="lead.email"></v-text-field>
                        <v-text-field class="rounded-lg" label="Pin Code" outlined v-model="lead.pincode"></v-text-field>
                        <v-text-field class="rounded-lg" label="Custom Label" outlined v-model="lead.label"></v-text-field>
                        <v-select :items="propertyType" label="Property Type" outlined class="rounded-lg" v-model="lead.property_type"></v-select>
                        <v-row>
                            <v-col>
                                <v-select :items="leadstatus" label="Lead Status" outlined class="rounded-lg" v-model="lead.status"></v-select>
                            </v-col>
                            <v-col>
                                <v-text-field label="Lead Source" outlined class="rounded-lg" v-model="lead.lead_source"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-btn block class="py-7 rounded-lg gradient" dark @click="saveLead">Add New Leads</v-btn>
            </v-container>

        </v-card>
    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import User from '../../Apis/User'


export default {
    data () {
      return {
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
            agent_id: null
        },
      }
    },
    methods:{
        saveLead(){
            Lead.new(this.lead)
            .then(() => {
                this.snackbar = true;
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
                this.lead.agent_id =  null
            })
            .catch(error => {
                this.errors = error.response.data.errors;
            });            
        },
    },
    mounted(){
        User.auth().then(response => {
            this.lead.agent_id = response.data.data.id;
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