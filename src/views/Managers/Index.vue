<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            Client Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-5 shadow content-card" height="88vh" elevation="0">

            <v-toolbar flat>
                <!-- <v-btn icon class="mr-4" @click="$router.go(-1)">
                    <v-icon size="28" color="grey darken-3">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer> -->
                <div class="text-uppercase font-weight-bold">Managers</div>
            </v-toolbar>

            <v-row>
                <v-col md="8">
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
                </v-col>
                <v-col md="4">
                    <v-card class="pa-5 rounded-lg">
                        <v-card-text>
                            <div class="text-h6 mb-4">Search Existing Client (UID)</div>
                            <div class="d-flex">
                                <input type="text" class="input-field" placeholder="Search by Client UID" v-model="searchClient">
                                <v-btn class="grey darken-4 py-5 ml-2" dark depressed @click="searchClientByUid">Search</v-btn>
                            </div>
                        </v-card-text>

                        <v-list v-if="result">
                            <v-list-item>
                                <v-list-item-avatar><v-btn fab>{{result.name[0]}}</v-btn></v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{result.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{result.uid}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn class="grey darken-3 text-capitalize white--text" :disabled="disabled" depressed @click="connectClient(result.id)">
                                        <v-icon left>mdi-account-plus</v-icon>
                                        {{connectBtnText}}
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>

        </v-card>
    </div>
</template>

<script>
import Client from '../../Apis/Client'

export default {
    data: () => ({
        client: {
            name: '',
            email: '',
            password: '',
        },
        searchClient: 'PVri3798',
        result: '',
        snackbar : false,
        connectBtnText: 'Connect',
        disabled: false
    }),
    methods:{
        SaveClient(){
            let data = new FormData();

            data.append('name', this.client.name)
            data.append('email', this.client.email)
            data.append('password', this.client.password)

            Client.addNewClient(data)
            .then((response) => {
                console.log(response)
                this.client.name = ''
                this.client.email =''
                this.client.password = ''
                this.snackbar = true
            })
            .catch(error => {
                console.log(error)
            });
        },
        searchClientByUid(){
            let data = new FormData();
            data.append('search', this.searchClient)

            Client.searchClientByUid(this.searchClient, data)
            .then((response) => {
                this.result = response.data
            })
        },
        connectClient(id){
            let data = new FormData();
            data.append('client_id', id)

            Client.connectWithClient(data)
            .then((response) => {
                if (response.data.message == 'Already connected') {
                    // console.log(response.data.message)
                    this.disabled = true
                    this.connectBtnText = 'Already Connected'
                } else {
                    this.snackbar = true
                    console.log(response)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}
.input-field{
  border-radius: 6px;
  padding: 0.7em 1em;
  font-size: 15px;
  width: 100%;
  /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  background: #f5f5f5;
  outline: none;
  margin-bottom: 1.5em;
}
</style>