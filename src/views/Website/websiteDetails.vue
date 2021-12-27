<template>
    <div>
        <v-card class="rounded-xl pa-md-5 pa-2 shadow content-card" height="88vh" elevation="0">

            <v-toolbar flat>
                <v-btn icon class="" @click="$router.go(-1)">
                    <v-icon size="28" color="grey darken-3">mdi-arrow-left</v-icon>
                </v-btn>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>back</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-toolbar>

            <v-card-title class="flex justify-space-between align-center d-none d-md-block" v-if="website">
                <div>{{website.title}}</div>
            </v-card-title>

            <!-- Properties -->
            <v-container>
                <v-row>
                    <v-col md="6">
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                            lazy-src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                        ></v-img>
                    </v-col>
                    <v-col md="6">
                        <v-simple-table>
                            <thead><tr class="grey lighten-3"><th>Sharing History</th><th></th></tr></thead>
                            <tbody>
                                <tr class="grey--text text--darken-3">
                                    <td>Total Shared</td>
                                    <td>
                                        {{total}}
                                        <v-btn icon @click="leadListSidebar = !leadListSidebar"><v-icon>mdi-chevron-right</v-icon></v-btn>
                                    </td>
                                </tr>
                                <tr class="grey--text text--darken-3">
                                    <td>Opened</td>
                                    <td>
                                        {{opened}}
                                        <v-btn icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                    </td>
                                </tr>
                                <tr class="grey--text text--darken-3">
                                    <td>Unopened</td>
                                    <td>
                                        {{unopened}}
                                        <v-btn icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                        <v-btn class="text-capitalize" outlined block @click="dialog = true">Preview</v-btn>

                        <!-- all leads dialog by category -->
                        <v-navigation-drawer v-model="leadListSidebar" tile absolute temporary right width="30vw">
                            <v-card flat tile>
                                <v-list>
                                    <v-list-item v-for="lead in leads" :key="lead.id">
                                        <v-list-item-content>
                                            <v-list-item-title v-text="lead.name"></v-list-item-title>
                                            <v-list-item-subtitle></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>

                            </v-card>
                        </v-navigation-drawer>
                    </v-col>
                </v-row>

                <h3>Payment Plans</h3>
                <v-row>
                    <v-col></v-col>
                </v-row>
            </v-container>
        </v-card>

        <!-- Website Preview -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card tile>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>{{website.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>

                <v-row class="">
                    <v-col md="8" offset-md="2">
                        <v-card class="mx-auto" tile>
                            <v-img
                                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                                lazy-src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                                class="white--text align-end"
                                height="250px"
                                gradient="to bottom right, rgba(0,0,0,0), rgba(0,0,0,.9)"
                            >   
                                <div class="text-center pb-2">
                                    <h6>PREPARED FOR</h6>
                                    <h4>@CLIENTNAME</h4>
                                </div>
                            </v-img>
                            <v-card-title>{{website.title}}</v-card-title>
                            <v-card-subtitle>{{website.about}}</v-card-subtitle>

                            <v-row>
                                <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
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

                            <v-card-text>
                                <div class="text-h6">Map</div>
                                <!-- <iframe frameborder="0" style="width: 100%; height: 350px; border:0" v-bind:src="'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q='+ place" allowfullscreen></iframe> -->
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13732.675002414086!2d76.8249255!3d30.6292014!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcc8666ade84dad02!2sGBP%20Centrum!5e0!3m2!1sen!2sin!4v1640388129868!5m2!1sen!2sin" style="width: 100%; height: 350px; border:0" allowfullscreen="" loading="lazy"></iframe>
                            </v-card-text>
                            <v-card-text>
                                <div class="text-h6">Walkthrough</div>
                                <LazyVimeo  
                                    ref="vimeoLazyVideo"
                                    src="https://player.vimeo.com/video/64654583"
                                    max-width="720px"
                                    aspect-ratio="16:9"
                                    thumbnail-quality="standard"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-card>
                    <v-card-text class="text-center">
                        <h5>SHARED BY</h5>
                        <v-img max-width="150" :src="agent.brand_logo" class="mx-auto my-3"></v-img>
                        <h3>{{agent.name}}</h3>
                        <div class="caption">{{agent.contact}}</div>
                        <div class="caption">{{agent.brand_text}}</div>
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

            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import Website from '../../Apis/Website'
import User from '../../Apis/User'
import { LazyVimeo } from "vue-lazytube";

export default {
    components: {
        LazyVimeo
    },
    data: () => ({
        website: null,
        opened: null,
        unopened: null,
        total: null,
        dialog: false,
        agent: '',
        leadListSidebar: false,
        leads: []
    }),

    methods:{
        fetchData() {
            var website = this.$route.params.id;
            Website.SlugDetails(website).then((response) => {
                this.website = response.data.website
                this.opened = response.data.opened
                this.unopened = response.data.unopened
                this.total = response.data.total
                // console.log(response)
            });
        },
        fetchAgent(){
            User.auth().then(response => {
                this.agent = response.data.data;
                this.loggedIn = true
            });
        }
    },

    mounted(){
        this.fetchData();
        this.fetchAgent();
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
  padding: 0.3em 1em;
  font-size: 15px;
  max-width: 350px;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.m-search-input{
  background-color: #fff;
  border-radius: 6px;
  padding: 0.3em 1em;
  font-size: 15px;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>