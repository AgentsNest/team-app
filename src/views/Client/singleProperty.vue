<template>
    <div>
        <v-card class="rounded-xl pa-5 shadow content-card" height="88vh" elevation="0">
            <v-img
                :src="property.images.length == 0 ? property.image : `https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${property.images[0].image}` "
                :lazy-src="property.images.length == 0 ? property.image : `https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${property.images[0].image}` "
                max-height="60vh"
            >
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>

                <v-toolbar flat>
                    <v-btn class="white rounded-lg" elevation="1" depressed icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <!-- <v-btn class="rounded-lg grey darken-3" dark elevation="1" depressed icon>
                        <v-icon>mdi-share-variant-outline</v-icon>
                    </v-btn> -->
                </v-toolbar>
            </v-img>

            <div class="pa-3">
                <v-card class="rounded-lg" elevation="1">
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                                <tr><td><strong>Size:</strong></td><td>{{property.size}}</td></tr>
                                <tr><td><strong>Unit No.:</strong></td><td>{{property.unit}}</td></tr>
                                <tr><td><strong>Floor:</strong></td><td>{{property.floor}}</td></tr>
                                <tr><td><strong>Location:</strong></td><td>{{property.location}}</td></tr>
                                <tr><td><strong>Price:</strong></td><td>{{property.price}}</td></tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>

                <v-card class="rounded-lg mt-4" outlined>
                    <v-card-subtitle class="py-2 font-weight-bold">Documents</v-card-subtitle>
                    <v-card-text class="px-2">
                        <v-row no-gutters>
                            <v-col v-for="pdf in property.documents" :key="pdf.id" cols="12" class="pa-1">
                                <v-dialog
                                    v-model="dialog"
                                    fullscreen
                                    hide-overlay
                                    transition="dialog-bottom-transition"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn class="pa-2 d-flex flex-row align-center" outlined v-bind="attrs" v-on="on" text>
                                            <v-icon color="grey darken-2">mdi-file-document-outline</v-icon>
                                            <div class="caption text-capitalize">{{pdf.image}}</div>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-toolbar dark color="primary">
                                            <v-btn icon dark @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                                            <v-spacer></v-spacer>
                                            <v-toolbar-items><v-btn dark text @click="dialog = false">Save</v-btn></v-toolbar-items>
                                        </v-toolbar>

                                        <iframe :src="`https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${pdf.image}`" frameborder="0" id="iframePdf" height="100%" width="100%"></iframe>
                                        
                                    </v-card>
                                </v-dialog>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <v-card class="rounded-lg mt-4" outlined>
                    <v-card-subtitle class="py-2 font-weight-bold">Image Gallery</v-card-subtitle>
                    <v-card-text class="px-2 myGallery">
                        <div v-for="gallery in property.images" :key="gallery.id">
                            <!-- <v-img
                                :src="`https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${gallery.image}`"
                                :lazy-src="`https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${gallery.image}`"
                                aspect-ratio="1.4"
                            >
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img> -->
                            <img v-img:group :src="`https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${gallery.image}`" class="singleImage">
                        </div>
                    </v-card-text>
                </v-card>
            </div>
    
        </v-card>
    </div>
</template>

<script>
import Client from '../../Apis/Client'

export default {
    data(){
        return {
            property: '',
            dialog: false,
        }
    },
    beforeMount(){
        Client.singleClientProperty(this.$route.params.id).then(response => {
            this.property = response.data
        })
    },
    methods:{
        previewScreen(){

        }
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.singleImage{
    width: 100%;
    border-radius: 12px;
    aspect-ratio: 1.4;
    object-fit:cover;
    box-shadow: 0px 2px 5px #dcdcdc;
}
.myGallery{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
}
#iframePdf{
    height: 100vh;
    width: 100vw;
}
</style>