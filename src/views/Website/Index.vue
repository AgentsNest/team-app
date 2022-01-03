<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-2 shadow" elevation="0">
            <v-toolbar flat>
                <!-- <div class="font-weight-bold text-h6">Websites</div> -->

                <!-- <input type="text" placeholder="Search by Project name..." class="search-input"> -->

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


                <v-btn class="text-capitalize mr-3 dark" dark depressed :to="{name: 'MyWebsite'}">My Websites</v-btn>
                <v-btn class="text-capitalize" outlined :to="{name: 'Website'}">All Websites</v-btn>
            
            </v-toolbar>
        </v-card>

        <v-card class="transparent content-card" elevation="0" height="75vh"> 
          <v-row class="mt-4 content-card">
              <v-col md="3" v-for="(website, index) in websites" :key="index">
                  <v-card>
                      <v-img
                          height="160px"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      ></v-img>

                      <v-card-title>{{website.title}}</v-card-title>

                      <v-card-actions>
                          <router-link :to="{name: 'SingleWebsite', params:{id: website.id}}" target="_blank">
                            <v-btn color="orange" class="text-capitalize" text>View</v-btn>
                          </router-link>
                          <v-spacer></v-spacer>
                          <v-btn color="dark" class="text-capitalize" outlined small @click="cloneWebsite(website.id)">
                            <v-icon left>mdi-content-copy</v-icon>
                            Clone
                          </v-btn>
                      </v-card-actions>
                  </v-card>
              </v-col>
          </v-row>
        </v-card>

    </div>
</template>

<script>
import Website from '../../Apis/Website'

export default {
    data () {
      return {
        loading: false,
        items: [],
        search: null,
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
        website: ''
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
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
            // console.log(response)
        });
      },
      shareNow(website){
        this.drawer = true
        Website.details(website).then(response => {
            this.website = response.data.data;
        });
      },
      cloneWebsite(website){
        Website.clone(website)
        .then(response => {
          if (response.data === 'Already Cloned') {
            this.snackbarText = 'Already Cloned'
            this.snackbar = true
            console.log(response)
          } else {
            this.snackbarText = 'Website Cloned Successfully'
            this.snackbar = true
            console.log(response)
          }
        })
        .catch();
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
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>