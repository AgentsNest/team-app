<template>
  <div>
      <v-row>
          <v-col md="4">
              <Sidebar />
          </v-col>
          <v-col md="8">
              <v-card height="88vh" class="rounded-xl pa-5 content-card" flat>
                    <v-card-title>You Membership Plan</v-card-title>
                    <v-card-subtitle>You may cancel your subscription (including free trials) at any time. Subscriptions are automatically billed according to the period stated upon purchase (weekly/monthly/annually). The cancellation steps vary depending on who your subscription is billed through.</v-card-subtitle>

                    <v-row class="mt-4">
                        <v-col md="4">
                            <v-card class="pa-2 d-flex flex-column align-center rounded-xl" tile>
                                <v-btn outlined class="mb-8 mt-6 px-6 py-5">3 Months</v-btn>
                                <div class="d-flex mb-6">
                                    <div class="text-h5">₹</div>
                                    <div class="d-flex flex-column align-left">
                                    <div class="text-h3 font-weight-bold">4500</div> 
                                    <div class="caption pl-3">1100/Month</div>
                                    </div>
                                </div>
                                <v-btn block class="rounded-xl" disabled>Choose</v-btn>
                            </v-card>
                        </v-col>
                        <v-col md="4">
                            <v-card class="pa-2 d-flex flex-column align-center rounded-xl" tile>
                                <v-btn outlined class="mb-8 mt-6 px-6 py-5">6 Months</v-btn>
                                <div class="d-flex mb-6">
                                    <div class="text-h5">₹</div>
                                    <div class="d-flex flex-column align-left">
                                    <div class="text-h3 font-weight-bold">9000</div> 
                                    <div class="caption pl-3">1300/Month</div>
                                    </div>
                                </div>
                                <v-btn block class="rounded-xl blue darken-3" dark>Selected Plan</v-btn>
                            </v-card>
                        </v-col>
                        <v-col md="4">
                            <v-card class="pa-2 d-flex flex-column align-center rounded-xl" tile>
                                <v-btn outlined class="mb-8 mt-6 px-6 py-5">12 Months</v-btn>
                                <div class="d-flex mb-6">
                                    <div class="text-h5">₹</div>
                                    <div class="d-flex flex-column align-left">
                                    <div class="text-h3 font-weight-bold">15000</div> 
                                    <div class="caption pl-3">1500/Month</div>
                                    </div>
                                </div>
                                <v-btn block class="rounded-xl" disabled>Choose</v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
              </v-card>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import Sidebar from '../../components/Account/Sidebar.vue'

export default {
    components:{ Sidebar },

}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}

.shadow{
    background-color: #fefefe;
    border-radius: 6px;
    padding: 1em;
    width: 33.3%;
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.4),0 24px 20px -24px rgba(71,82,107,.3);
}
</style>