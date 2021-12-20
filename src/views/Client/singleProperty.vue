<template>
    <div>
        <v-card class="rounded-xl pa-md-5 pa-0 shadow content-card" height="88vh" elevation="0">
            <v-img
                :src="
                    property.images.length == 0 ? 
                    `https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${property.image}` :
                    `https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${property.images[0].image}` 
                "
                :lazy-src="
                    property.images.length == 0 ? 
                    `https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${property.image}` :
                    `https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/${property.images[0].image}` 
                "
                max-height="40vh"
                class="pa-2"
            >
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>

                <v-toolbar flat class="transparent">
                    <v-btn class="white rounded-lg" elevation="1" depressed icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </v-img>

            <div class="pa-md-3 pb-6">
                
                <v-row>
                    <v-col md="6" cols="12">
                        <v-card class="rounded-lg" elevation="0">
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr><td><strong>Size:</strong></td><td>{{property.size}}</td></tr>
                                        <tr><td><strong>Unit No.:</strong></td><td>{{property.unit}}</td></tr>
                                        <tr><td><strong>Floor:</strong></td><td>{{property.floor}}</td></tr>
                                        <tr><td><strong>Location:</strong></td><td>{{property.location}}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card>
                    </v-col>
                    <v-col md="6" cols="12">
                        <v-card class="rounded-lg" elevation="0">
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr><td><strong>BSP:</strong></td><td>{{property.bsp | toWords }}</td></tr>
                                        <tr><td><strong>Deal Price:</strong></td><td>{{property.dealprice | toWords}}</td></tr>
                                        <tr><td><strong>Allotment Price:</strong></td><td>{{property.allotmentvalue | toWords}}</td></tr>
                                        <tr><td><strong>Payment Received:</strong></td><td>{{property.paymentreceived | toWords}}</td></tr>
                                        <tr><td><strong>Balance:</strong></td><td>{{property.balance | toWords}}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card class="mt-4 rounded-lg">
                            <v-toolbar flat>
                                <v-toolbar-title>Payments</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn fab small class="white" elevation="2" @click="paymentDialog = !paymentDialog">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Title</th>
                                            <th class="text-left">Amount</th>
                                            <th class="text-left">File</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="payment in property.payments" :key="payment.id">
                                            <td>{{payment.title}}</td>
                                            <td>{{payment.amount}}</td>
                                            <td><v-btn icon><v-icon>mdi-download</v-icon></v-btn></td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card>
                        <v-dialog v-model="paymentDialog" width="500">
                            <v-card>
                                <v-card-title class="title grey lighten-2">Add Payment</v-card-title>

                                <v-card-text class="pt-6">
                                    <v-text-field outlined label="Payment Title" v-model="payment.title"></v-text-field>

                                    <v-text-field outlined label="Payment Amount" v-model="payment.amount"></v-text-field>
                                        
                                    <input type="file" name="file" @change="paymentFile" ref="files">
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="dark" block @click="addPayment">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>

                <v-card class="rounded-lg mt-4">
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

                <v-card class="rounded-lg mt-4">
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
            payment:{
                title: '',
                amount: '',
                file: '',
                fileName: '',
            },
            values:[
                'Thousand',
                'Lacs',
                'Crore',
            ],
            amountType: '',
            selectedFile:{},
            paymentDialog: false
        }
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            Client.singleClientProperty(this.$route.params.id).then(response => {
                this.property = response.data
            })
        },
        addPayment(){
            let data = new FormData();
            data.append('title', this.payment.title)
            data.append('amount', this.payment.amount)
            data.append('file', this.payment.file)
            data.append('fileName', this.payment.fileName)
            data.append('property_id', this.property.id)
            
            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Client.addPropertyPayment(data)
            .then(() =>{
                this.payment = ''
                this.paymentDialog = false
                 this.fetchData()
            })
        },
        updateProperty(){
            let form = new FormData();
            form.append('amount', this.payment.amount)

            Client.updateProperty(form)
            .then(()=> {

            })
        },
        paymentFile(e){
            var selectedFile = e.target.files[0];
            this.payment.fileName = selectedFile.name;
            this.payment.file = selectedFile;

        },
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
.input-field{
  border-radius: 6px;
  padding: 1em;
  font-size: 15px;
  width: 100%;
  /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.09);
  /* background: #f5f5f5; */
  background: #fdfdfd;
  outline: none;
}
</style>