<template>
    <v-row>
        <v-col cols="12" md="4" class="mx-auto">
            <v-card flat tile class="overflow-y-auto">

                <v-img
                    :src="user.image"
                    :lazy-src="user.image"
                    class=""
                    width="100%"
                    aspect-ratio="1.4"
                    contain
                ></v-img>

                <v-card class="rounded-t-xl mt-n6" flat>
                    <v-card-actions>
                        <div class="pa-4">
                            <div class="title">{{user.name}}</div>
                            <div class="caption">RERA: {{agent.rera}}</div>
                            <!-- <div class="caption">{{user.brand_text}}</div> -->
                        </div>
                        <v-spacer></v-spacer>
                        <v-img max-width="100" :src="agent.brand_logo"></v-img>
                    </v-card-actions>

                    <v-divider></v-divider>
                    <div class="px-6 my-2 grey--text">Business Details</div>
                    <v-divider></v-divider>

                    <div class="py-3 px-6">
                        <div class="d-flex mt-3">
                            <v-btn fab small class="rounded-lg blue-grey lighten-5" depressed>
                                <v-icon color="grey darken-3" size="20">mdi-bag-checked</v-icon>
                            </v-btn>
                            <div class="ml-2 body-2">
                                <div class="caption grey--text">Company</div>
                                {{agent.brand_text}}
                            </div>
                        </div>
                        <div class="d-flex my-4">
                            <v-btn fab small class="rounded-lg" depressed>
                                <v-icon color="grey darken-3" size="20">mdi-phone</v-icon>
                            </v-btn>
                            <div class="ml-2 body-2">
                                <div class="caption grey--text">Phone number</div>
                                {{user.contact}}
                            </div>
                        </div>
                        <div class="d-flex my-4">
                            <v-btn fab small class="rounded-lg" depressed>
                                <v-icon color="grey darken-3" size="20">mdi-card-account-details-outline</v-icon>
                            </v-btn>
                            <div class="ml-2 body-2">
                                <div class="caption grey--text">RERA number</div>
                                {{agent.rera}}
                            </div>
                        </div>
                        <div class="d-flex my-4">
                            <v-btn fab small class="rounded-lg" depressed>
                                <v-icon color="grey darken-3" size="20">mdi-email-outline</v-icon>
                            </v-btn>
                            <div class="ml-2 body-2">
                                <div class="caption grey--text">Email</div>
                                {{user.email}}
                            </div>
                        </div>
                        <div class="d-flex my-4">
                            <v-btn fab small class="rounded-lg" depressed>
                                <v-icon color="grey darken-3" size="20">mdi-web</v-icon>
                            </v-btn>
                            <div class="ml-2 body-2">
                                <div class="caption grey--text">Website</div>
                                {{agent.website}}
                            </div>
                        </div>
                        <div class="d-flex my-4">
                            <v-btn fab small class="rounded-lg" depressed>
                                <v-icon color="grey darken-3" size="22">mdi-map-marker-radius-outline</v-icon>
                            </v-btn>
                            <div class="ml-2 body-2">
                                <div class="caption grey--text">Address</div>
                                {{agent.address}}
                            </div>
                        </div>
                    </div>
                    <!-- About Text -->
                    <div class="pa-3">
                        <v-card-text class="blue lighten-5 rounded-lg">{{user.bio}}</v-card-text>
                    </div>

                    <v-card-text>
                        <v-btn block large dark class="amber accent-4 text-capitalize" depressed link :href="`https://wa.me/${user.contact}`">
                            <v-icon left>mdi-share</v-icon>
                            Send Message
                        </v-btn>
                        <!-- <v-btn block large dark class="grey darken-3 text-capitalize mt-3" depressed @click="saveContact">
                            <v-icon left>mdi-content-save</v-icon>
                            Add to Contact
                        </v-btn> -->
                    </v-card-text>

                    <!-- Social Links -->
                    <v-card-actions class="justify-center my-4">
                        <v-btn class="mr-3" small fab v-if="agent.facebook" :href="agent.facebook" target="_blank">
                            <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn class="mr-3" small fab v-if="agent.instagram" :href="agent.instagram" target="_blank">
                            <v-icon>mdi-instagram</v-icon>
                        </v-btn>
                        <v-btn class="mr-3" small fab v-if="agent.twitter" :href="agent.twitter" target="_blank">
                            <v-icon>mdi-twitter</v-icon>
                        </v-btn>
                        <v-btn small fab v-if="agent.linkedin" :href="agent.linkedin" target="_blank">
                            <v-icon>mdi-linkedin</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-divider></v-divider>
                    <v-card-text class="text-center">
                        <v-icon color="yellow darken-3">mdi-lightning-bolt</v-icon> Powered By <strong>agnt.</strong>        
                    </v-card-text>

                </v-card>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import Team from '../Apis/Team'

export default {
    data(){
        return{
            user:'',
            agent: '',
            agent_id: ''
        }
    },
    methods:{
        fetchAgent(){
            Team.teamCompanyDetails(this.agent_id)
            .then((response) => {
                this.agent = response.data
            })
        }
    },
    mounted(){
        Team.vcard(this.$route.params.uid)
        .then((res) => {
            this.user = res.data;
            Team.teamCompanyDetails(res.data.agent_id)
            .then((response) => {
                this.agent = response.data
            })
        })
        this.fetchAgent();
    }
}
</script>

<style>

</style>