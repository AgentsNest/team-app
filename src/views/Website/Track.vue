<template>
    <div>
    
        <v-row class="">
            <v-col md="8" offset-md="2">
                <v-card class="mx-auto" tile>
                    <v-img
                        :src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}`"
                        :lazy-src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}`"
                        class="white--text align-end"
                        height="250px"
                        gradient="to bottom right, rgba(0,0,0,0), rgba(0,0,0,.9)"
                    >   
                        <div class="text-center pb-2">
                            <h6>PREPARED FOR</h6>
                            <h4>@CLIENTNAME</h4>
                        </div>
                    </v-img>
                    <!-- <div class="text-center py-2 blue white--text">
                        <h6>PREPARED FOR</h6>
                        <h4>{{lead.name}}</h4>
                    </div> -->

                    <v-card-title>{{website.title}}</v-card-title>
                    <v-card-subtitle>{{website.about}}</v-card-subtitle>

                    <v-row v-if="website.website_images">
                        <v-col v-for="image in website.website_images" :key="image.id" class="px-6" cols="12" md="3">
                            <v-img
                                :src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                :lazy-src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                aspect-ratio="1"
                                class="grey lighten-2 rounded-lg"
                            >
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>

                    <!-- <v-card class="d-flex align-center pa-4 mt-5 justify-space-around">
                        <div class="font-weight-bold">PREPARED BY:</div>
                        <v-spacer></v-spacer>
                        <img :src="agent.image" style="width: 80px;height: 80px;border-radius:100%;" v-if="agent">
                        <div class="ml-2">
                            <div>{{agent.name}}</div>
                            <div>{{agent.contact}}</div>
                        </div>
                    </v-card> -->

                    <v-card-text>
                        <div class="text-h6">Map</div>
                        <iframe :src="website.map" style="width: 100%; height: 350px; border:0" allowfullscreen="" loading="lazy"></iframe>
                    </v-card-text>
                    <v-card-text class="text-center">
                        <div class="text-h6">Walkthrough</div>
                        <LazyYoutube src="https://www.youtube.com/watch?v=TcMBFSGVi1c" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-card>
            <v-card-text class="text-center">
                <h5>SHARED BY</h5>
                <v-img max-width="150" :src="agent.brand_logo" class="mx-auto my-3"></v-img>
                <h3>{{agent.brand_text}}</h3>
                <h4>{{agent.name}}</h4>
                <div class="caption">{{agent.contact}}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn outlined class="text-capitalize" color="blue darken-3">
                    <v-icon left>mdi-phone</v-icon>
                    <span>Call</span>
                </v-btn>
                <v-btn outlined class="text-capitalize" color="grey darken-1">
                    <v-icon left>mdi-message-processing-outline</v-icon>
                    <span>SMS</span>
                </v-btn>
                <v-btn outlined class="text-capitalize" color="teal darken-3">
                    <v-icon left>mdi-whatsapp</v-icon>
                    <span>Whatsapp</span>
                </v-btn>
            </v-card-actions>
            <v-card-text class="text-center">
                <v-icon>mdi-lightning-bolt-outline</v-icon>
                Powered By AgentsNest
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Tracker from "../../Apis/Tracker"
import { LazyYoutube } from "vue-lazytube";

export default {
    components: {
        LazyYoutube
    },
    data(){
        return{
            website:'',
            tracker_id: '',
            time: 0,
            duration: '',
            tracker: '',
            agent: '',
            lead: '',
            agent_id : '',
            lead_id : '',
            website_id: ''
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
        async fetchAgent(){
            let agent = this.agent_id;
            await Tracker.agentDetails(agent)
            .then(response => {
                this.agent = response.data;
                // console.log('agent id:', response.data)
            });
        },
        async fetchLead(){
            let lead = this.lead_id;
            await Tracker.leadDetails(lead)
            .then(response => {
                this.lead = response.data;
            });
        },
        async fetchWebsite(){
            let website = this.website_id;
            await Tracker.websiteShowById(website)
            .then(response => {
                this.website = response.data.website;
                // console.log('website data:',response.data)
            });
        },
        fetchTrackerDetails(){
            Tracker.fetchWebsiteForSharedTrackById(this.tracker_id)
            .then(response => {
                // console.log(response)
                this.agent_id = response.data.agent_id
                this.website_id = response.data.website_id
                this.lead_id = response.data.lead_id
                this.tracker = response.data
                this.fetchAgent();
                this.fetchLead();
                this.fetchWebsite();
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted(){
        this.sendRespose();
        this.duration = setInterval(this.incrementTime, 1000);
        this.fetchTrackerDetails();
    },
    beforeMount(){
        this.tracker_id = this.$route.params.tracker;
    }
}
</script>

<style>
.cardd{overflow-y: scroll;}
</style>