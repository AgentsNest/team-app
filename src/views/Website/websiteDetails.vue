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
                        <v-carousel v-model="projectGallery" height="220" hide-delimiters>
                            <v-carousel-item v-for="(image, i) in website.website_images" :key="i">
                                <v-img
                                    :src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                    :lazy-src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                    contain
                                    max-height="220"
                                ></v-img>
                            </v-carousel-item>
                        </v-carousel>
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

            </v-container>
        </v-card>

        <!-- Website Preview -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card tile>
                <v-toolbar dark color="primary">
                    <v-toolbar-title v-if="website">{{website.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>

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
                            <v-card-title>{{website.title}}</v-card-title>
                            <v-card-subtitle>{{website.about}}</v-card-subtitle>

                            <v-row class="px-4">
                                <v-col v-for="image in website.website_images" :key="image.id" class="d-flex child-flex" cols="12">
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

                            <v-card class="d-flex align-center pa-4 mt-5 justify-space-around">
                                <div class="font-weight-bold">PREPARED BY:</div>
                                <v-spacer></v-spacer>
                                <v-img max-width="80px" class="rounded-lg mr-3" :src="agent.image"></v-img>
                                <div>
                                    <div>{{agent.name}}</div>
                                    <div>{{agent.contact}}</div>
                                </div>
                            </v-card>

                            <v-card-text>
                                <div class="text-h6">Map</div>
                                <iframe :src="website.map" style="width: 100%; height: 350px; border:0" allowfullscreen="" loading="lazy"></iframe>
                            </v-card-text>
                            <v-card-text class="text-center">
                                <div class="text-h6">Walkthrough</div>
                                <LazyYoutube :src="website.walkthrough" />
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

            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import Website from '../../Apis/Website'
import User from '../../Apis/User'
import { LazyYoutube } from "vue-lazytube";

export default {
    components: {
        LazyYoutube
    },
    data: () => ({
        website: null,
        opened: null,
        unopened: null,
        total: null,
        dialog: false,
        agent: '',
        leadListSidebar: false,
        leads: [],
        ytUrl: 'https://www.youtube.com/embed/',
        projectGallery: 0
    }),

    methods:{
        fetchData() {
            var website = this.$route.params.id;
            Website.SlugDetails(website).then((response) => {
                this.website = response.data.website
                this.opened = response.data.opened
                this.unopened = response.data.unopened
                this.total = response.data.total
                // console.log(response.data)
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