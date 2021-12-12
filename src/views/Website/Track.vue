<template>
  <div>
      <v-card class="cardd" height="90vh">
        <v-row>
            <v-col md="8" offset-md="2">
                <v-card class="rounded mx-auto" tile>
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                        lazy-src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                        height="300"
                    >
                    </v-img>
                    <v-card-title>{{website.title}}</v-card-title>
                    <v-card-subtitle>{{website.about}}</v-card-subtitle>
                    <v-card-subtitle>Create for: {{lead.name}}</v-card-subtitle>

                    <v-row>
                        <v-col v-for="n in 6" :key="n" class="d-flex child-flex" md="6" xs="12" cols="12">
                            <v-img
                                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                aspect-ratio="1"
                                class="grey lighten-2"
                            >
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>

                    <v-card class="mt-4">
                        <h3 class="text-center pt-3">Shared By {{agent.name}}</h3>
                        <v-card-text class="text-center">
                            <v-btn><v-icon left>mdi-phone</v-icon> Call</v-btn>
                            <v-btn class="mx-4"><v-icon left>mdi-phone</v-icon> Message</v-btn>
                            <v-btn 
                                :href="`https://wa.me/${agent.contact}?text=Hi i want to know more about ${website.title}`"
                                target="_blank"
                            >
                                <v-icon left>mdi-whatsapp</v-icon> Whatsapp
                            </v-btn>
                        </v-card-text>
                    </v-card>

                    <v-card-text>
                        <div class="text-h6">Map</div>
                        <div><iframe :src="website.map" width="100%" height="400" frameborder="0"></iframe></div>
                    </v-card-text>
                    <v-card-text>
                        <div class="text-h6">Walkthrough</div>
                        <iframe id="ytplayer" type="text/html" :src="website.walkthrough" width="100%" height="400" frameborder="0"></iframe>
                    </v-card-text>
                    
                </v-card>
            </v-col>
        </v-row>

        <v-card>
            <v-card-text class="text-center">
                <v-icon>mdi-lightning-bolt-outline</v-icon>
                Powered By AgentsNest
            </v-card-text>
        </v-card>
        </v-card>

  </div>
</template>

<script>
import Tracker from "../../Apis/Tracker"

export default {
    data(){
        return{
            website:{},
            tracker_id: null,
            time: 0,
            duration: null,
            tracker: null,
            agent: null,
            lead: null
        }
    },
    created(){
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            // event.returnValue = '';
            this.storeDuration();
        });
    },
    methods:{
        sendRespose(tracker){
            Tracker.track(this.tracker_id, {crossdomain:true})
            .then(response => {
            })
            .catch((error) => {
                console.log(error)
            })
        },
        storeDuration(tracker){
            clearInterval(this.duration);
            Tracker.duration(this.tracker_id, {
                duration: this.time
            })
        },
        incrementTime() {
            this.time = parseInt(this.time) + 1;
        },
        fetchAgent(){
            let agent = this.tracker.agent_id;
            Tracker.agentDetails(agent)
            .then(response => {
                this.agent = response.data;
                // console.log('agent id:', response.data)
            });
        },
        fetchLead(){
            let lead = this.tracker.lead_id;
            Tracker.leadDetails(lead)
            .then(response => {
                this.lead = response.data;
            });
        },
        fetchTrackerDetails(){
            Tracker.trackerFullDetails(this.$route.params.tracker)
            .then(response => {
                this.tracker = response.data
                this.fetchAgent();
                this.fetchLead();
            }).catch(error => {
                console.log(error)
            })
        }
    },
    beforeMount(){
        Tracker.details(this.$route.params.website)
        .then(response => {
            this.website = response.data.website;
        });
    },
    mounted(){
        this.tracker_id = this.$route.params.tracker;
        this.sendRespose();
        this.duration = setInterval(this.incrementTime, 1000);
        this.fetchTrackerDetails();
    }
}
</script>

<style>
.cardd{overflow-y: scroll;}
</style>