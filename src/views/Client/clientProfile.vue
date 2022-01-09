<template>
    <div>
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
        </v-toolbar>

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
                        <router-link :to="{name: 'singleProperty', params:{id: property.id}}">
                            <!-- <v-img
                                :src="property.images.length == 0 ? property.image : `https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${property.images[0].image}` "
                                height="150px"
                            ></v-img> -->

                            <v-row>
                                <v-col md="6" cols="12">
                                    <v-card-title class="grey--text text--darken-3">{{property.title}}</v-card-title>
                                    <v-card-subtitle class="grey--text text--darken-1">Closing Date: {{property.date}}</v-card-subtitle>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <tbody>
                                                <tr><td>Size:</td><td>{{property.size}}</td></tr>
                                                <tr><td>Unit No.:</td><td>{{property.unit}}</td></tr>
                                                <tr><td>Floor:</td><td>{{property.floor}}</td></tr>
                                                <tr><td>Location:</td><td>{{property.location}}</td></tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                                <v-col>
                                    <v-card flat>
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
                                            <!-- <v-progress-linear
                                                height="20"
                                                class="rounded-lg"
                                                :value="property.paymentreceived / property.allotmentvalue * 100" 
                                                :color="property.paymentreceived / property.allotmentvalue * 100 > 74 ? 'green' : 'red' "
                                                striped
                                            >
                                                <template v-slot:default="{ value }">
                                                    <strong>{{ Math.ceil(value) }}%</strong>
                                                </template>
                                            </v-progress-linear> -->
                                        </div>
                                        <v-simple-table dense>
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr><td>BSP:</td><td>{{property.bsp}}</td></tr>
                                                    <tr><td>DP:</td><td>{{property.dealprice}}</td></tr>
                                                    <tr><td>Allotment Price:</td><td>{{property.allotmentvalue}}</td></tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </router-link>
                    </v-card>
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
        received: ''
    }),

    mounted(){
        Client.clientProfile(this.$route.params.id).then(response => {
            this.client = response.data
            this.properties = response.data.properties
        })
    },
    computed:{
        filterLead: function(){
            return this.properties.filter((property) => {
                return property.title.toLowerCase().match(this.search.toLowerCase());
            })
        }
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