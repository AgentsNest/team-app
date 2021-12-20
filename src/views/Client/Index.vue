<template>
  <div>
    <v-card class="rounded-xl pa-md-5 pa-1 shadow content-card" height="88vh" elevation="0">

      <v-toolbar flat>
          <div class="font-weight-bold text-md-h6">My Existing Clients <span v-if="clientsCount">({{clientsCount}})</span></div>
          <v-spacer></v-spacer>
          <v-btn large-md small depressed :to="{name: 'AddClient'}" class="text-capitalize rounded-lg blue-grey darken-3" dark>
            <v-icon>mdi-plus</v-icon>
            <span class="d-none d-md-block">Add Client</span>
          </v-btn>
      </v-toolbar>

      <v-card-text>

        <input type="text" placeholder="Search by name..." class="search-input" v-model="search">

        <v-row>
          <v-col md="4" v-for="(item, index) in filterLead" :key="index">
              <v-list-item class="shadow rounded-lg">
                  <v-list-item-avatar tile :color="randomColor(item.id)" class="white--text rounded-lg" size="48">{{item.name[0]}}</v-list-item-avatar>

                  <v-list-item-content>
                      <v-list-item-title v-html="item.name" class="font-weight-bold"></v-list-item-title>
                      <v-list-item-subtitle>
                        <span class="text--primary">Property:</span> 
                        <span v-if="item.properties">{{item.properties.length}}</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle><span class="text--primary">Added:</span> 23 June 2021</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-btn icon route :to="`clients/client-profile/${item.id}`">
                      <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
              </v-list-item>
          </v-col>
        </v-row>

      </v-card-text>

    </v-card>
  </div>
</template>

<script>
import Client from '../../Apis/Client'
import moment from 'moment';

export default {
  data: () => ({
    clients: [],
    page: 1,
    last_page: '',
    search: '',
    colorCache: {},
    clientsCount: ''
  }),
  mounted(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      Client.myClient(this.page).then((response) => {
        this.clients = response.data;
        this.clientsCount = response.data.length;
        console.log(response.data);
        this.last_page = response.data.last_page
      })
    },
    dateTime(value){
      return moment(value).format('D MMM YYYY');
    },
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random());
      return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`);
    }
  },
  computed:{
    filterLead: function(){
        return this.clients.filter((client) => {
            return client.name.toLowerCase().match(this.search.toLowerCase());
        })
    },
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
  padding: 1em;
  margin-bottom: 2em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.single-columns{
  box-shadow: 0px 0px 5px #efefef;
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>