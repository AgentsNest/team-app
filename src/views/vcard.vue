<template>
    <div>
        <v-card flat height="90vh" class="overflow-y-auto">
            <v-row>
                <v-col cols="12" md="6" offset-md="3">

                
                    <v-row class="pa-3">
                        <v-col cols="4">
                            <v-img
                                :src="user.image"
                                :lazy-src="user.image"
                                class="rounded"
                                aspect-ratio="1"
                                cover
                            ></v-img>
                        </v-col>
                        <v-col>
                            <div class="title">{{user.name}}</div>
                            <div>RERA: {{user.rera}}</div>
                            <div>{{user.brand_text}}</div>
                            
                            <div class="blue--text text--darken-3 font-weight-bold mt-3 mb-2">
                                <a :href="`mailto:${user.email}`">
                                    <v-icon color="blue darken-3" class="mr-2">mdi-email</v-icon>{{user.email}}
                                </a>
                            </div>
                            <div class="blue--text text--darken-3 font-weight-bold mb-4">
                                <a :href="`tel:+${user.contact}`">
                                    <v-icon color="blue darken-3" class="mr-2">mdi-phone</v-icon>{{user.contact}}
                                </a>
                            </div>
                            
                            <div class="mt-4"><strong class="mr-2">Address:</strong>{{user.address}}</div>
                            <div>
                                <span v-if="user.city">{{user.city}}</span>
                                <span v-if="user.state">, {{user.state}}</span>
                                <span v-if="user.country">, {{user.country}}</span>
                            </div>
                            
                        </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-card-text>
                        {{user.bio}}
                    </v-card-text>


                    <v-card-text class="text-center">
                        <!-- <h5>SHARED BY</h5> -->
                        <v-img max-width="150" :src="agent.brand_logo" class="mx-auto my-3"></v-img>
                        <h3>{{agent.brand_text}}</h3>
                    </v-card-text>

                    <v-card-actions class="justify-center my-4">
                        <v-btn fab v-if="agent.facebook" :href="agent.facebook" target="_blank">
                            <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn fab v-if="agent.instagram" :href="agent.instagram" target="_blank">
                            <v-icon>mdi-instagram</v-icon>
                        </v-btn>
                        <v-btn fab v-if="agent.twitter" :href="agent.twitter" target="_blank">
                            <v-icon>mdi-twitter</v-icon>
                        </v-btn>
                        <v-btn fab v-if="agent.linkedin" :href="agent.linkedin" target="_blank">
                            <v-icon>mdi-linkedin</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-col>
            </v-row>

        </v-card>

        <v-footer fixed class="white px-0">
            <v-card flat class="transparent" width="100%">
                <v-divider></v-divider>
                <v-card-text class="text-center">
                    <v-icon color="yellow darken-3">mdi-lightning-bolt</v-icon> Powered By <strong>agnt.</strong>        
                </v-card-text>
            </v-card>
        </v-footer>
    </div>
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
    mounted(){
        Team.vcard(this.$route.params.uid)
        .then((res) => {
            this.user = res.data;
            Team.teamCompanyDetails(res.data.agent_id)
            .then((response) => {
                this.agent = response.data
            })
        })
    }
}
</script>

<style>

</style>