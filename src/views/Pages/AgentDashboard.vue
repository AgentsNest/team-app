<template>
    <div>
        <v-row>
            <v-col md="3" cols="6">
                <v-card flat class="rounded-lg pa-3">
                    <v-card-actions>
                      <v-icon size="38" color="red">mdi-fire-circle</v-icon>
                      <v-spacer></v-spacer>
                      <div>
                        <div class="">Hot Lead</div>
                        <div class="font-weight-bold display-1">{{hotLeadPercentage}}%</div>
                      </div>
                    </v-card-actions>
                    <v-card-actions>
                      <v-progress-linear rounded v-model="hotLeadPercentage" color="red" striped height="8"></v-progress-linear>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col md="3" cols="6">
                <v-card flat class="rounded-lg pa-3">
                    <v-card-actions>
                      <v-icon size="38" color="orange">mdi-account-group-outline</v-icon>
                      <v-spacer></v-spacer>
                      <div>
                        <div class="">Warm Lead</div>
                        <div class="font-weight-bold display-1">{{warmLeadPercentage}}%</div>
                      </div>
                    </v-card-actions>
                    <v-card-actions>
                      <v-progress-linear rounded v-model="warmLeadPercentage" color="orange" striped height="8"></v-progress-linear>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col md="3" cols="6">
                <v-card flat class="rounded-lg pa-3">
                    <v-card-actions>
                      <v-icon size="38" color="blue">mdi-snowflake-alert</v-icon>
                      <v-spacer></v-spacer>
                      <div>
                        <div class="">Cold Lead</div>
                        <div class="font-weight-bold display-1">{{coldLeadPercentage}}%</div>
                      </div>
                    </v-card-actions>
                    <v-card-actions>
                      <v-progress-linear rounded v-model="coldLeadPercentage" color="blue" striped height="8"></v-progress-linear>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col md="3" cols="6">
                <v-card flat class="rounded-lg pa-3">
                    <v-card-actions>
                      <v-icon size="38" color="grey">mdi-emoticon-sad-outline</v-icon>
                      <v-spacer></v-spacer>
                      <div>
                        <div class="">Dead Lead</div>
                        <div class="font-weight-bold display-1">{{deadLeadPercentage}}%</div>
                      </div>
                    </v-card-actions>
                    <v-card-actions>
                      <v-progress-linear rounded v-model="deadLeadPercentage" color="grey" striped height="8"></v-progress-linear>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">
            <v-card height="80vh" class="overflow-y-auto rounded-lg pa-2" flat>
              <v-card-title>Followups</v-card-title>
              <v-row class="px-4 mb-4">
                <v-col cols="4" v-for="event in events" :key="event.id">
                  <v-card class="rounded-lg">
                    <v-card-text>
                      <h3>{{event.lead.name}}</h3>
                      <div>{{event.remarks}}</div>
                      <div class="caption"><v-icon size="16">mdi-alarm</v-icon>{{event.send_date}}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>


              <v-card-title>Existing Clients</v-card-title>
              <v-row class="px-4">
                <v-col>
                  <v-card class="rounded-lg pa-2">
                    <v-card-actions>
                      <v-btn fab depressed color="teal lighten-5"><v-icon color="teal">mdi-shield-account</v-icon></v-btn>
                      <v-spacer></v-spacer>
                      <div class="title">Total Clients</div>
                      <v-spacer></v-spacer>
                      <div class="title">{{clients.length}}</div>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="rounded-lg pa-2">
                    <v-card-actions>
                      <v-btn fab depressed color="purple lighten-5"><v-icon color="purple">mdi-home-circle</v-icon></v-btn>
                      <v-spacer></v-spacer>
                      <div class="title">Client's Property</div>
                      <v-spacer></v-spacer>
                      <div class="title">34</div>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

            </v-card>
          </v-col>

      <!--=======================
            Right Sidebar
      ========================  -->
          <v-col cols="4">
            <v-card flat class="rounded-lg pa-3 mb-4">
                <v-card-actions>
                  <v-icon size="38" color="teal">mdi-fire</v-icon>
                  <v-spacer></v-spacer>
                  <div>
                    <div class="">New Lead</div>
                    <div class="font-weight-bold display-1">{{newLeadPercentage}}%</div>
                  </div>
                </v-card-actions>
                <v-card-actions>
                  <v-progress-linear rounded v-model="newLeadPercentage" color="teal" striped height="8"></v-progress-linear>
                </v-card-actions>
            </v-card>
          
      <!--====================
          Recent Activities 
      =====================-->
            <v-card flat class="rounded-lg mb-4">
              <v-card-subtitle>Recent Activities</v-card-subtitle>

              <v-card flat height="100%" class="overflow-y-auto">
                <v-card-text class="pa-0">
                  <v-timeline align-top dense class="overflow-y-auto pr-5" style="height:28vh">
                    <v-timeline-item color="pink" small v-for="activity in activities" :key="activity.id">
                      <v-row class="">
                        <v-col cols="7" v-if="activity.action">
                          {{activity.action}}
                          <div class="caption grey--text">{{activity.lead.name}}</div>
                        </v-col>
                        <v-col cols="7" v-if="activity.notes">
                          {{activity.notes}}
                          <div class="caption grey--text">{{activity.lead.name}}</div>
                        </v-col>
                        <v-col cols="7" v-if="activity.call">
                          {{activity.call}}
                          <div class="caption grey--text">{{activity.lead.name}}</div>
                        </v-col>
                        <v-col cols="7" v-if="activity.message">
                          {{activity.message}}
                          <div class="caption grey--text">{{activity.lead.name}}</div>
                        </v-col>
                        <v-col cols="7" v-if="activity.whatsapp">
                          {{activity.whatsapp}}
                          <div class="caption grey--text">{{activity.lead.name}}</div>
                        </v-col>
                        <v-col class="text-right" cols="5">{{activity.created_at | formatDate}}</v-col>
                      </v-row>
                    </v-timeline-item>
                  </v-timeline>
                  <v-card-actions>
                    <v-btn block depressed class="text-capitalize grey--text text--darken-2">Load more</v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>

            </v-card>

          </v-col>
        </v-row>

    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import Client from '../../Apis/Client'

export default {
  data: () => ({
    deadLead: '',
    coldLead: '',
    hotLead: '',
    warmLead: '',
    totalLead: '',
    newLead: '',
    items: [
      { header: 'New Lead' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `<span class="text--primary">Ali Connors</span>`,
      }
    ],
    activities: [],
    clients: '',
    events: [],
  }),
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
    fetchActivity(){
      Lead.allActivityByUser()
      .then((res) => {
        this.activities = res.data.data;
        // console.log(res.data.data)
      })
    },
    fetchClients(){
      Client.countMyClient()
      .then((res) => {
        this.clients = res.data;
        // console.log(res);
      })
    },
    fetchFollowups(){
      Lead.getFollowups().then(response => {
        this.events = response.data.events.data;
        // console.log(response.data)
      });
    }
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
  mounted(){
    this.fetchData();
    this.fetchActivity();
    this.fetchClients();
    this.fetchFollowups();
  }
}
</script>

<style>

</style>