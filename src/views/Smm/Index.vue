<template>
  <div>
    <v-card class="rounded-xl pa-md-5 shadow content-card" height="88vh" elevation="0">

      <v-toolbar flat>
          <div class="font-weight-bold md-text-h6 title">My Ads ({{ads.length}})</div>
          <v-spacer></v-spacer>
          <v-btn large small depressed class="d-none d-md-flex text-capitalize rounded-lg blue-grey darken-3" dark :to="{name: 'CreateNewAd'}">
            <v-icon left>mdi-plus</v-icon>
            Post New Ad
          </v-btn>
          <v-btn small fab class="blue-grey darken-3" dark :to="{name: 'CreateNewAd'}">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
      </v-toolbar>

      <v-card-text>

        <v-row>
          <v-col v-for="ad in ads" :key="ad.id" cols="12" md="6"> 
            <v-card class="rounded-lg">

              <v-card-title class="text-capitalize">{{ad.heading}}</v-card-title>
              <v-card-subtitle>Budget: 15000</v-card-subtitle>

              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="6" class="pa-2">
                    <v-card outlined>
                      <v-card-text class="pa-2">
                        Objectives: <br>
                        <strong>{{ad.objectives}}</strong>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6" class="pa-2">
                    <v-card outlined>
                      <v-card-text class="pa-2">
                        Economic profile: <br>
                        <strong>{{ad.audience}}</strong>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6" class="pa-2">
                    <v-card outlined>
                      <v-card-text class="pa-2">
                        Location: <br>
                        <strong>{{ad.states}}</strong>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6" class="pa-2">
                    <v-card outlined>
                      <v-card-text class="pa-2">
                        Platforms: <br>
                        <strong>{{ad.platform}}</strong>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>Report</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card flat outlined class="py-1 px-3 mb-2">
                      <div><strong>Total Leads:</strong> {{ad.result.total_leads}}</div>
                    </v-card>
                    <v-row no-gutters>
                      <v-col cols="4">
                        <v-card outlined class="pa-1 text-center">
                          <strong>{{ad.result.cost_per_action}}</strong> <br>
                          <span class="caption">Cost Per Action</span>
                        </v-card>
                      </v-col>
                      <v-col cols="4">
                        <v-card outlined class="pa-1 text-center">
                          <strong>{{ad.result.cost_per_lead}}</strong> <br>
                          <span class="caption">Cost Per Lead</span>
                        </v-card>
                      </v-col>
                      <v-col cols="4">
                        <v-card outlined class="pa-1 text-center">
                          <strong>{{ad.result.reach}}</strong> <br>
                          <span class="caption">Branch Reach</span>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              
            </v-card>
          </v-col> 
          
        </v-row>
      </v-card-text>

    </v-card>

  </div>
</template>

<script>
import Ads from '../../Apis/Ads'
export default {
  data(){
    return {
      ads:[]
    }
  },
  mounted(){
    Ads.auth()
    .then((response) =>{
      this.ads = response.data
    })
  }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.addNewButton{
  position: fixed;
  right: 10px;
  bottom: 6rem;
}
.gradient{
  background-image: linear-gradient(to right, #283593, #3cabba);
  box-shadow: 0 4px 15px 0 rgba(23, 91, 168, 0.75);
}
</style>