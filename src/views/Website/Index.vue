<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl shadow" elevation="0">
            <v-toolbar flat>
                <!-- <div class="font-weight-bold text-h6">Websites</div>

                <input type="text" placeholder="Search by Project name..." class="search-input"> -->

                <!-- <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    cache-items
                    class="ml-6 rounded-lg"
                    flat
                    hide-no-data
                    hide-details
                    label="Filter by city"
                    solo-inverted
                ></v-autocomplete> -->


                <v-btn width="50%" class="rounded-l-xl text-capitalize" depressed :to="{name: 'MyWebsite'}">My Projects</v-btn>
                <v-spacer></v-spacer>
                <v-btn width="50%" class="rounded-r-xl text-capitalize dark" dark depressed :to="{name: 'Website'}">All Projects</v-btn>
            
            </v-toolbar>
        </v-card>

        <div class="d-flex align-center mt-3">
          <v-btn fab small elevation="0" class="grey rounded-lg" dark @click.prevent="clearSearch()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <input type="text" v-model="search" placeholder="Search Projects..." class="search-input mx-2">
          <v-btn fab small elevation="1" class="white rounded-lg" @click.prevent="searchWebsite()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>

        <v-card class="mt-4 pb-16 transparent content-card" elevation="0" height="75vh"> 
          <div v-if="showsearch">
            <v-row class="content-card">
                <v-col md="3" v-for="website in results" :key="website.id">
                    <v-card>
                      <v-img
                          v-if="website.website_images"
                          max-height="180px"
                          :src="website.website_images[0] ? `https://realtsafe-test.s3.ap-south-1.amazonaws.com/website/${website.website_images[0].url}` : 'https://realtsafe-test.s3.ap-south-1.amazonaws.com/Default/property.jpg'"
                          class="rounded-t"
                      ></v-img>
                      <v-card-title>{{website.title}}</v-card-title>

                      <div class="d-flex">
                          <v-btn @click="previeWebsite(website.id)" text link width="50%" class="text-capitalize" outlined small>
                            View
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="grey darken-3" width="50%" class="text-capitalize" dark small @click="cloneWebsite(website.id)">
                            <v-icon left>mdi-content-copy</v-icon>
                            Copy to my projects
                          </v-btn>
                      </div>
                    </v-card>
                </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row class="content-card">
              <v-col md="3" v-for="(website, index) in websites" :key="index">
                  <v-card>
                    <v-img
                        max-height="180px"
                        :src="website.website_images[0] ? `https://realtsafe-test.s3.ap-south-1.amazonaws.com/website/${website.website_images[0].url}` : 'https://realtsafe-test.s3.ap-south-1.amazonaws.com/Default/property.jpg'"
                        :lazy-src="website.website_images[0] ? `https://realtsafe-test.s3.ap-south-1.amazonaws.com/website/${website.website_images[0].url}` : 'https://realtsafe-test.s3.ap-south-1.amazonaws.com/Default/property.jpg'"
                        class="rounded-t"
                    ></v-img>
                    <v-card-title>{{website.title}}</v-card-title>

                    <div class="d-flex">
                        <v-btn @click="previeWebsite(website.id)" text link width="50%" class="text-capitalize" outlined small>
                          View
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="grey darken-3" width="50%" class="text-capitalize" dark small @click="cloneWebsite(website.id)">
                          <v-icon left>mdi-content-copy</v-icon>
                          Copy to my projects
                        </v-btn>
                    </div>
                  </v-card>
              </v-col>
            </v-row>
            <!-- <v-btn block class="mt-5 text-capitalize">
              <v-icon left>mdi-arrow-down</v-icon> more
            </v-btn> -->
          </div>
        </v-card>

        <!-- Website Preview -->
        <v-dialog v-model="preview" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card tile>
                <v-toolbar dark color="primary">
                    <v-toolbar-title v-if="website">{{website.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="preview = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>

                <v-row class="">
                    <v-col md="8" offset-md="2">
                        <v-card class="mx-auto" tile>
                            <v-card-title>{{website.title}}</v-card-title>
                            <v-card-subtitle>{{website.about}}</v-card-subtitle>

                            <v-row class="px-4" v-if="website.website_images">
                                <v-col v-for="image in website.website_images" :key="image.id" class="d-flex child-flex" cols="12">
                                    <v-img
                                        :src="`https://realtsafe-test.s3.ap-south-1.amazonaws.com/website/${image.url}`"
                                        :lazy-src="`https://realtsafe-test.s3.ap-south-1.amazonaws.com/website/${image.url}`"
                                        aspect-ratio="1"
                                        class="grey lighten-2 rounded-lg"
                                        max-height="200px"
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
                                <div>
                                    <div>@AGENTNAME</div>
                                    <div>@AGENTCONTACT</div>
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
                        <h3>@COMPANYNAME</h3>
                        <h4>@AGENTNAME</h4>
                        <div class="caption">@AGENTCONTACT</div>
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
                        <v-icon color="orange">mdi-lightning-bolt</v-icon>
                        Powered By AgentsNest
                    </v-card-text>
                </v-card>

            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import Website from '../../Apis/Website'
import { LazyYoutube } from "vue-lazytube";

export default {
    components: { LazyYoutube },
    data () {
      return {
        loading: false,
        items: [],
        search: '',
        showsearch: false,
        results: [],
        select: null,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
        ],
        websites:[],
        drawer: false,
        snackbar: false,
        snackbarText: '',
        website: '',
        projectGallery: 0,
        preview: false,
        page: 1,
      }
    },
    watch: {
      // search (val) {
      //   val && val !== this.select && this.querySelections(val)
      // },
    },
    computed:{
      filterWebsite: function(){
          return this.websites.filter((website) => {
              return website.title.toLowerCase().match(this.search.toLowerCase());
          })
      },
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
      fetchData(){
        Website.all().then(response => {
            this.websites = response.data.data;
            // console.log(response.data)
        });
      },
      cloneWebsite(website){
        Website.clone(website)
        .then(response => {
          if (response.data === 'Already Cloned') {
            this.snackbarText = 'Already Cloned'
            this.snackbar = true
            // console.log(response)
          } else {
            this.snackbarText = 'Website Cloned Successfully'
            this.snackbar = true
            // console.log(response)
          }
        })
        .catch();
      },
      previeWebsite(website) {
        this.preview = true;
        Website.websiteById(website).then((response) => {
            this.website = response.data.website
        });
      },
      searchWebsite(){
        Website.search(this.search)
        .then((res) => {
          // console.log(res.data)
          this.showsearch = true
          this.results = res.data;
        }).catch((err) => {
          console.log(err)
        })
      },
      clearSearch(){
        this.results = ''
        this.search = ''
        this.showsearch = false
      }
    },
    mounted(){
      this.fetchData();
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.6em 0.8em;
  width: 100%; 
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>