<template>
    <Layout>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-lg pa-2 pa-md-3">
                    <v-card-actions>
                        <v-btn fab depressed color="teal lighten-5"><v-icon color="teal">mdi-format-list-checkbox</v-icon></v-btn>
                        <v-spacer></v-spacer>
                        <div class="title text-right">Total Leads</div>
                        <v-spacer></v-spacer>
                        <div class="font-weight-bold title">
                            <span>{{totalLead}}</span>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col md="3" cols="6">
              <v-card class="rounded-lg pa-2 pa-md-3">
                  <v-card-actions class="">
                    <v-icon size="42" color="red">mdi-fire-circle</v-icon>
                    <v-spacer></v-spacer>
                    <div>
                      <div class="text-right">Hot Lead</div>
                      <div class="font-weight-bold headline md-display-1">
                        <span v-if="totalLead > 0">{{hotLeadPercentage}}%</span>
                        <span v-else>0</span>
                      </div>
                    </div>
                  </v-card-actions>
                  <v-card-actions>
                    <v-progress-linear rounded v-model="hotLeadPercentage" color="red" striped height="8"></v-progress-linear>
                  </v-card-actions>
              </v-card>
            </v-col>
            <v-col md="3" cols="6">
              <v-card class="rounded-lg pa-2 pa-md-3">
                  <v-card-actions class="">
                    <v-icon size="42" color="orange">mdi-account-group-outline</v-icon>
                    <v-spacer></v-spacer>
                    <div>
                      <div class="text-right">Warm Lead</div>
                      <div class="font-weight-bold headline md-display-1">
                        <span v-if="totalLead > 0">{{warmLeadPercentage}}%</span>
                        <span v-else>0</span>
                      </div>
                    </div>
                  </v-card-actions>
                  <v-card-actions>
                    <v-progress-linear rounded v-model="warmLeadPercentage" color="orange" striped height="8"></v-progress-linear>
                  </v-card-actions>
              </v-card>
            </v-col>
            <v-col md="3" cols="6">
              <v-card class="rounded-lg pa-2 pa-md-3">
                  <v-card-actions class="">
                    <v-icon size="42" color="blue">mdi-snowflake-alert</v-icon>
                    <v-spacer></v-spacer>
                    <div>
                      <div class="text-right">Cold Lead</div>
                      <div class="font-weight-bold headline md-display-1">
                        <span v-if="totalLead > 0">{{coldLeadPercentage}}%</span>
                        <span v-else>0</span>
                      </div>
                    </div>
                  </v-card-actions>
                  <v-card-actions>
                    <v-progress-linear rounded v-model="coldLeadPercentage" color="blue" striped height="8"></v-progress-linear>
                  </v-card-actions>
              </v-card>
            </v-col>
            <v-col md="3" cols="6">
              <v-card class="rounded-lg pa-2 pa-md-3">
                  <v-card-actions class="">
                    <v-icon size="42" color="grey">mdi-emoticon-sad-outline</v-icon>
                    <v-spacer></v-spacer>
                    <div>
                      <div class="text-right">Dead Lead</div>
                      <div class="font-weight-bold headline md-display-1">
                        <span v-if="totalLead > 0">{{deadLeadPercentage}}%</span>
                        <span v-else>0</span>
                      </div>
                    </div>
                  </v-card-actions>
                  <v-card-actions>
                    <v-progress-linear rounded v-model="deadLeadPercentage" color="grey" striped height="8"></v-progress-linear>
                  </v-card-actions>
              </v-card>
            </v-col>
        </v-row>

        <v-card class="rounded-lg pa-2 mt-5">
            <v-card-actions>
              <v-btn fab depressed color="teal lighten-5"><v-icon color="teal">mdi-shield-account</v-icon></v-btn>
              <v-spacer></v-spacer>
              <div class="title">Existing Clients</div>
              <v-spacer></v-spacer>
              <div class="title">0</div>
            </v-card-actions>
        </v-card>

    </Layout>
</template>

<script>
import Team from "../../Apis/Team"; // eslint-disable-line
import Lead from "../../Apis/Lead"
import Layout from "../../Layouts/Layout.vue";

export default {
    components: { Layout },
    name: 'Property',

    data() {
        return {
            dialog: false,
            deadLead: '',
            coldLead: '',
            hotLead: '',
            warmLead: '',
            totalLead: '',
            newLead: '',
        };
    },
    methods:{
      fetchData(){
        Lead.leadsAnalytics()
        .then((res) => {
          this.deadLead = res.data.deadLeads
          this.coldLead = res.data.coldLeads
          this.hotLead = res.data.hotLeads
          this.warmLead = res.data.warmLeads
          this.newLead = res.data.newLeads
          this.totalLead = res.data.allLeads
        })
      },
    },
    mounted(){
        this.fetchData();
        // debugger; // eslint-disable-line
    },
    computed:{
      hotLeadPercentage(){
        return (this.hotLead / this.totalLead * 100).toFixed(2)
      },
      coldLeadPercentage(){
        return (this.coldLead / this.totalLead * 100).toFixed(2)
      },
      warmLeadPercentage(){
        return (this.warmLead / this.totalLead * 100).toFixed(2)
      },
      deadLeadPercentage(){
        return (this.deadLead / this.totalLead * 100).toFixed(2)
      },
      newLeadPercentage(){
        return (this.newLead / this.totalLead * 100).toFixed(2)
      },
    },
    created() {
        // Team.auth()
        // .then((res) => {
        //      console.log(res.data)
        // })
    },
};
</script>

<style>

</style>