<template>
  <div>
    <v-card class="rounded-xl pa-md-5 shadow content-card" height="88vh" elevation="0">

      <v-toolbar flat>
          <div class="font-weight-bold text-md-h6">My Existing Clients <span v-if="clientsCount">({{clientsCount}})</span></div>

          <v-spacer></v-spacer>

          <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
              </template>
              <v-list dense class="py-0">
                  <v-list-item :to="{name: 'AddClient'}" class="caption" link>
                    <v-icon left>mdi-plus</v-icon>
                    Add Client
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item :to="{name: 'sendUpdateToClient'}" class="caption" link>
                      <v-icon left>mdi-bullhorn-outline</v-icon>
                      Add Update
                  </v-list-item>
              </v-list>
          </v-menu>

      </v-toolbar>

      <v-card-text>
        <input type="text" placeholder="Search by name..." class="search-input" v-model="search">

        <v-row>
          <v-col md="4" cols="12" v-for="(item, index) in filterLead" :key="index">
              <v-list-item class="shadow rounded-lg">
                  <v-list-item-avatar tile :color="randomColor(item.id)" class="white--text rounded-lg" size="48">{{item.name[0]}}</v-list-item-avatar>

                  <v-list-item-content>
                      <v-list-item-title v-html="item.name" class="font-weight-bold"></v-list-item-title>
                      <v-list-item-subtitle>
                        <span class="text--primary mr-2">Property:</span> 
                        <span v-if="item.properties" class="">
                          {{item.properties.length}}
                        </span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <span class="text--primary mr-2">Added:</span>
                        <span class="">{{item.created_at | formatDate}}</span>
                      </v-list-item-subtitle>
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
      Client.myClient(this.page)
      .then((response) => {
        this.clients = response.data.data;
        this.clientsCount = response.data.data.length;
        // console.log(response);
        this.last_page = response.data.data.last_page
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