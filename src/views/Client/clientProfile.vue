<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            Deleted Successufully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-md-5 shadow content-card" height="88vh" elevation="0">

            <v-toolbar flat class="mt-3">
                <v-btn icon class="" @click="$router.go(-1)">
                    <v-icon size="28" color="grey darken-3">mdi-arrow-left</v-icon>
                </v-btn>
                <v-list-item two-line>
                    <v-list-item-avatar size="50" class="mr-4 white--text" color="teal" v-if="client.name"> 
                        {{client.name.slice(0,1)}}
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{client.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{client.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-spacer></v-spacer>
                <v-btn fab x-small class="white" elevation="1" @click="deleteClient = true">
                    <v-icon color="grey darken-2">mdi-trash-can</v-icon>
                </v-btn>
            </v-toolbar>

            <!-- Delete Client Dialog -->
            <v-dialog v-model="deleteClient" max-width="320" persistent>
                <v-card>
                    <div class="pa-6 text-center pink--text">
                        <v-icon color="pink">mdi-trash-can</v-icon>
                        <div class="mt-2">Delete Client</div>
                    </div>
                    <div class="grey lighten-4 pa-6">
                        <div class="caption mb-5 grey--text text--darken-2">Deleting a Client will permanently delete all property related to that client.</div>
                        <div class="d-flex">
                            <v-btn @click="deleteClient = false" class="text-capitalize white" elevation="1">
                                No, Keep
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text class="text-capitalize pink" dark @click="deleteClientProfile(client.id)">
                                Yes, Delete
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-dialog>


            <v-card-actions class="d-none d-md-flex mb-6" v-if="properties">
                <span>Total Property ({{properties.length}})</span>
                <v-spacer></v-spacer>
                <input type="text" placeholder="Search Property..." class="search-input py-2" v-model="search">
                <v-spacer></v-spacer>
                <router-link :to="{name: 'AddProperty'}">
                    <v-btn dark class="grey darken-3 text-capitalize" elevation="1"><v-icon size="22" left>mdi-plus</v-icon><span>Add Property</span> </v-btn>
                </router-link>
            </v-card-actions>

            <v-card-title class="flex justify-space-between align-center d-sm-none" v-if="properties">
                <div class="subtitle-1">Total Property ({{properties.length}})</div>            

                <router-link :to="{name: 'AddProperty'}">
                    <v-btn dark class="grey darken-3 text-capitalize rounded-lg" icon>
                        <v-icon size="22">mdi-plus</v-icon>
                    </v-btn>
                </router-link>
                <input type="text" placeholder="Search Property..." class="m-search-input mt-3" v-model="search">
            </v-card-title>

            <!-- Properties -->
            <v-container>
                <v-row v-if="properties.length">
                    <v-col md="6" cols="12" v-for="(property, index) in filterLead" :key="index">
                        <v-card class="mb-4 rounded-lg">

                            <v-row>
                                <v-col md="6" cols="12" class="pt-0">
                                    <v-progress-linear
                                        :value="property.paymentreceived / property.allotmentvalue * 100" 
                                        :color="property.paymentreceived / property.allotmentvalue * 100 > 74 ? 'green' : 'red' " 
                                        height="16"
                                        striped
                                        class="rounded-t-lg"
                                    >
                                        <span class="caption font-weight-bold">{{(property.paymentreceived / property.allotmentvalue * 100).toFixed(2)}}%</span>
                                    </v-progress-linear>
                                    <div class="title mt-4 px-4 grey--text text--darken-3">{{property.title}}</div>
                                    <div class="mb-4 px-4 grey--text text--darken-1">Closing Date: {{property.date}}</div>
                                    
                                    <v-divider></v-divider>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <tbody>
                                                <tr><td>Size:</td><td>{{property.size}}</td></tr>
                                                <tr><td>Unit No.:</td><td>{{property.unit}}</td></tr>
                                                <tr><td>Floor:</td><td>{{property.floor}}</td></tr>
                                                <tr><td>Location:</td><td>{{property.location}}</td></tr>
                                                <tr><td>Allotment Price:</td><td>{{property.allotmentvalue}}</td></tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                                <v-col>
                                    <!-- <v-card flat>
                                        <div class="text-center">
                                            <v-progress-circular 
                                                striped
                                                :rotate="-90" 
                                                :size="100" 
                                                :width="15" 
                                                :value="property.paymentreceived / property.allotmentvalue * 100" 
                                                :color="property.paymentreceived / property.allotmentvalue * 100 > 74 ? 'green' : 'red' " 
                                            >
                                                {{(property.paymentreceived / property.allotmentvalue * 100).toFixed(2)}}%
                                            </v-progress-circular>
                                            <div>Allotment Price</div>
                                        </div>
                                    </v-card> -->
                                </v-col>
                            </v-row>

                            <div class="d-flex">
                                <v-btn class="red lighten-1" width="15%" dark depressed @click.stop="deleteDialog = true">
                                    <v-icon>mdi-trash-can</v-icon>
                                </v-btn>
                                <v-btn class="blue lighten-1" width="15%" dark depressed link :to="{name: 'editProperty', params:{id: property.id}}">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn depressed width="70%" link class="text-capitalize" :to="{name: 'singleProperty', params:{id: property.id}}">View Property</v-btn>
                            </div>
                        </v-card>
                        <!-- Delete Dialog -->
                        <v-dialog v-model="deleteDialog" max-width="320" persistent>
                            <v-card>
                                <div class="pa-6 text-center pink--text">
                                    <v-icon color="pink">mdi-trash-can</v-icon>
                                    <div class="mt-2">Delete Property</div>
                                </div>

                                <div class="grey lighten-4 pa-6">
                                    <div class="caption mb-5 grey--text text--darken-2">Deleting a property will permanently remove it from you database.</div>
                                    <div class="d-flex">
                                        <v-btn @click="deleteDialog = false" class="text-capitalize white" elevation="1">
                                            No, Keep
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn text class="text-capitalize pink" dark @click="deleteClientProperty(property.id)">
                                            Yes, Delete
                                        </v-btn>
                                    </div>
                                </div>
                                
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-container>

        </v-card>
    </div>
</template>

<script>
import Client from '../../Apis/Client'

export default {
    data: () => ({
        client:'',
        properties: [],
        search: '',
        dp: '',
        received: '',
        deleteDialog: false,
        deleteClient: false,
        snackbar: false
    }),

    mounted(){
        this.fetchProperty();
    },
    computed:{
        filterLead: function(){
            return this.properties.filter((property) => {
                return property.title.toLowerCase().match(this.search.toLowerCase());
            })
        }
    },
    methods:{
        fetchProperty(){
            Client.clientProfile(this.$route.params.id).then(response => {
                this.client = response.data
                this.properties = response.data.properties
            })
        },
        deleteClientProperty(property){
            Client.deleteClientProperty(property)
            .then(() => {
                this.snackbar = true
                this.deleteDialog = false
                this.fetchProperty()
            })
        },
        deleteClientProfile(client){
            Client.deleteClientProfile(client)
            .then(() => {
                this.snackbar = true
                this.deleteClient = false
                this.$router.go(-1);
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