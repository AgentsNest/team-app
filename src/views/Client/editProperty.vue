<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- Update Button -->
        <v-btn class="teal update-btn white--text text-capitalize" @click="updateProperty()">
            <v-icon left color="white">mdi-content-save</v-icon>
            Update
        </v-btn>

        <v-card class="rounded-xl pa-0 shadow content-card overflow-y-auto" height="88vh" elevation="0">

            <v-toolbar flat class="indigo px-2">
                <v-btn small dark icon @click="$router.
                go(-1)">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div class="white--text">Update Property</div>
                <v-spacer></v-spacer>
            </v-toolbar>

            <div class="pb-6">
                
                <v-row>
                    <v-col cols="12">
                        <v-card class="rounded-lg" elevation="0">
                            <v-card-text>

                                <v-text-field label="Name" v-model="property.title"></v-text-field>
                                <v-text-field label="Size" v-model="property.size"></v-text-field>
                                <v-text-field label="Unit" v-model="property.unit"></v-text-field>
                                <v-text-field label="Floor" v-model="property.floor"></v-text-field>
                                <v-text-field label="Location" v-model="property.location"></v-text-field>
                                <v-text-field label="Date of closing" v-model="property.date"></v-text-field>
                                <v-text-field label="Allotment Price" v-model="property.allotmentvalue"></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <!-- <v-col cols="12">
                        <v-card class="" flat>
                            <v-toolbar color="indigo" dark dense>
                                <div>Charges and Taxes</div>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-row class="mt-3">
                                <v-col cols="6" v-for="allotment in property.allotments" :key="allotment.id">
                                    <v-card class="pt-4">
                                        <v-text-field label="Charge" dense class="px-3 caption" v-model="allotment.title"></v-text-field>
                                        <v-text-field label="Amount" dense class="px-3 caption" v-model="allotment.amount"></v-text-field>
                                        <v-text-field label="GST(%)" dense class="px-3 caption" v-model="allotment.percentage"></v-text-field>
                                        <v-text-field label="Tax" dense class="px-3 caption" v-model="allotment.tax"></v-text-field>
                                        <div class="d-flex">
                                            <v-btn width="50%" class="red lighten-2" dark small depressed><v-icon size="16">mdi-trash-can</v-icon></v-btn>
                                            <v-btn width="50%" class="green lighten-1" depressed dark small @click="updateTaxCharges(allotment)">
                                                <v-icon size="16">mdi-content-save-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col> -->

                    <!-- All Applicant List -->
                    <!-- <v-col cols="12" v-if="applicantOneDetails.length">
                        <v-card class="mt-4 rounded-lg">
                            <v-toolbar flat>
                                <v-toolbar-title>Applicants</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-row>
                                    <v-col v-if="applicantOneDetails.name !== null">
                                        <v-card outlined>
                                            <v-card-subtitle>Applicant 2nd Details</v-card-subtitle>
                                            <v-simple-table dense>
                                                <tbody>
                                                    <tr><td><strong>Name:</strong></td><td>{{applicantOneDetails.name}}</td></tr>
                                                    <tr><td><strong>Email:</strong></td><td>{{applicantOneDetails.email}}</td></tr>
                                                    <tr><td><strong>DOB:</strong></td><td>{{applicantOneDetails.dob}}</td></tr>
                                                    <tr><td><strong>PAN No.:</strong></td><td>{{applicantOneDetails.pan}}</td></tr>
                                                    <tr><td><strong>Profession:</strong></td><td>{{applicantOneDetails.professsion}}</td></tr>
                                                    <tr><td><strong>Aadhar No.:</strong></td><td>{{applicantOneDetails.aadhar}}</td></tr>
                                                </tbody>
                                            </v-simple-table>
                                        </v-card>
                                    </v-col>
                                    <v-col v-if="applicantTwoDetails.name !== null">
                                        <v-card outlined>
                                            <v-card-subtitle>Applicant 3rd Details</v-card-subtitle>
                                            <v-simple-table dense>
                                                <tbody>
                                                    <tr><td><strong>Name:</strong></td><td>{{applicantTwoDetails.name}}</td></tr>
                                                    <tr><td><strong>Email:</strong></td><td>{{applicantTwoDetails.email}}</td></tr>
                                                    <tr><td><strong>DOB:</strong></td><td>{{applicantTwoDetails.dob}}</td></tr>
                                                    <tr><td><strong>PAN No.:</strong></td><td>{{applicantTwoDetails.pan}}</td></tr>
                                                    <tr><td><strong>Profession:</strong></td><td>{{applicantTwoDetails.professsion}}</td></tr>
                                                    <tr><td><strong>Aadhar No.:</strong></td><td>{{applicantTwoDetails.aadhar}}</td></tr>
                                                </tbody>
                                            </v-simple-table>
                                        </v-card>
                                    </v-col>
                                    <v-col v-if="applicantThreeDetails.name !== null ">
                                        <v-card outlined>
                                            <v-card-subtitle>Applicant 4th Details</v-card-subtitle>
                                            <v-simple-table dense>
                                                <tbody>
                                                    <tr><td><strong>Name:</strong></td><td>{{applicantThreeDetails.name}}</td></tr>
                                                    <tr><td><strong>Email:</strong></td><td>{{applicantThreeDetails.email}}</td></tr>
                                                    <tr><td><strong>DOB:</strong></td><td>{{applicantThreeDetails.dob}}</td></tr>
                                                    <tr><td><strong>PAN No.:</strong></td><td>{{applicantThreeDetails.pan}}</td></tr>
                                                    <tr><td><strong>Profession:</strong></td><td>{{applicantThreeDetails.professsion}}</td></tr>
                                                    <tr><td><strong>Aadhar No.:</strong></td><td>{{applicantThreeDetails.aadhar}}</td></tr>
                                                </tbody>
                                            </v-simple-table>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col> -->

                    <!-- Payment List and Add new -->
                    <v-col cols="12">
                        <v-card class="mt-2 rounded-lg">
                            <!-- <v-toolbar flat>
                                <v-toolbar-title>Payments</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn fab small class="white" elevation="2" @click="paymentDialog = !paymentDialog">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-simple-table max-height="190px">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Title</th>
                                            <th class="text-left">Amount</th>
                                            <th class="text-left">File</th>
                                            <th class="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="payment in property.payments" :key="payment.id">
                                            <td>{{payment.title}}</td>
                                            <td>{{payment.amount}}</td>
                                            <td>
                                                <v-btn small icon @click="downloadInvoice" v-if="payment.path">
                                                    <v-icon>mdi-download</v-icon>
                                                </v-btn>
                                                <div v-else>no file</div>
                                            </td>
                                            <td class="text-center">
                                                <v-btn small icon class="rounded-xl text-capitalize" @click="editPayment(payment.id)">
                                                    <v-icon size="16">mdi-pencil</v-icon>
                                                </v-btn>
                                                <v-btn small icon class="rounded-xl text-capitalize" @click="deletePropertyPayment(payment.id)">
                                                    <v-icon size="16">mdi-trash-can-outline</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table> -->

                        <!-- 
                            ==================
                                Edit Payment 
                        ======================= -->
                            <!-- <v-dialog v-model="editPaymentDialog" width="500">
                                <v-card>
                                    <div class="px-6 py-4 grey lighten-2">Edit Payment</div>

                                    <v-card-text class="pt-6">
                                        <v-text-field solo class="rounded-lg" label="Payment Title" v-model="singlePayment.title"></v-text-field>

                                        <v-text-field solo class="rounded-lg" label="Payment Amount" v-model="singlePayment.amount"></v-text-field>
                                            
                                        <v-btn outlined x-small class="grey darken-2 py-4" link dark block>
                                            <label for="invoice">
                                                Select File
                                                <input 
                                                    type="file" 
                                                    id="invoice" 
                                                    hidden 
                                                    ref="payment" 
                                                    accept="application/pdf, application/doc"
                                                >
                                            </label>
                                        </v-btn>
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="dark" block @click="updatePayment">Update</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog> -->

                        </v-card>

                        <!-- Add new payment -->
                        <!-- <v-dialog v-model="paymentDialog" width="500">
                            <v-card>
                                <div class="grey lighten-2 px-6 py-4">Add Payment</div>

                                <v-card-text class="pt-6">
                                    <v-text-field solo class="rounded-lg" label="Payment Title" v-model="payment.title"></v-text-field>

                                    <v-text-field solo class="rounded-lg" label="Payment Amount" v-model="payment.amount"></v-text-field>
                                        
                                    <input type="file" name="file" @change="onChange">
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="grey darken-3" dark block @click="addPayment">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog> -->
                    </v-col>
                </v-row>

            <!-- Document List -->
                <!-- <v-card class="rounded-lg mt-4">
                    <v-toolbar flat>
                        <span>Documents</span>
                        <v-spacer></v-spacer>
                        <v-btn outlined x-small class="grey darken-2" link dark>
                            <label for="docs" class="">
                                Upload
                                <input 
                                    type="file" 
                                    id="docs" 
                                    hidden multiple 
                                    ref="docs" 
                                    @change="onFileChange"
                                    accept="application/pdf, application/doc"
                                >
                            </label>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text class="px-2">
                        <v-row no-gutters>
                            <v-col v-for="pdf in property.documents" :key="pdf.id" cols="12" class="pa-1">
                                <v-btn class="pa-2 d-flex flex-row align-center" outlined text>
                                    <v-icon color="grey darken-2">mdi-file-document-outline</v-icon>
                                    <div class="caption text-capitalize">{{pdf.image}}</div>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card> -->

            <!-- Image gallery -->
                <!-- <v-card class="rounded-lg mt-4">
                    <v-card-subtitle class="py-2 font-weight-bold">Image Gallery</v-card-subtitle>

                    <v-card-text class="px-2 myGallery">
                        <div v-for="gallery in property.images" :key="gallery.id">
                            <img v-img:group :src="`https://d1o3gwiog9g3w3.cloudfront.net/Property/${gallery.image}`" class="singleImage">
                        </div>
                    </v-card-text>
                </v-card> -->
            </div>
    
        </v-card>
    </div>
</template>

<script>
import Client from '../../Apis/Client'
import axios from 'axios';

export default {
    data(){
        return {
            property: '',
            snackbar: false,
            snackbarText: '',
            dialog: false,
            payment:{
                title: '',
                amount: '',
                name: '',
                file: '',
            },
            values:[
                'Thousand',
                'Lacs',
                'Crore',
            ],
            amountType: '',
            paymentDialog: false,
            singlePayment: '',
            paymentFile: '',
            editPaymentDialog: false,
            applicantOneDetails: null,
            applicantTwoDetails: null,
            applicantThreeDetails: null,
        }
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            Client.singleClientPropertyForEdit(this.$route.params.id).then(response => {
                this.property = response.data
            })
        },
        onChange(e) {
            this.payment.file = e.target.files[0];
        },
        addPayment(){
            const config = {headers: {'content-type': 'multipart/form-data'}}

            let data = new FormData();
            data.append('title', this.payment.title)
            data.append('amount', this.payment.amount)
            data.append('file', this.payment.file)
            data.append('fileName', this.payment.fileName)
            data.append('property_id', this.property.id)
            
            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Client.addPropertyPayment(data, config)
            .then(() =>{
                this.payment = ''
                this.paymentDialog = false
                this.fetchData()
            })
        },
        onFileChange(){
            var fileData = this.$refs.docs.files;
            for (let i = 0; i < fileData.length; i++) {
                let pdf = {
                file: fileData[i],
                name: fileData[i].name,
                size: Math.round(fileData[i].size / 1024) + 'kb'
                }
                this.allPdf.push(pdf);
            }
            // for post data to server
            for (let index = 0; index < fileData.length; index++) {
                this.property.docs.push(fileData[index]);
                console.log(this.property.docs);
            }
        },
        clearPdf(index){
            this.allPdf.splice(index);
            this.property.docs.splice(index);
        },
        deletePropertyPayment(payment){
            Client.deletePropertyPayment(payment)
            .then(() => {
                this.snackbarText = 'Payment Deleted';
                this.snackbar = true;
                this.fetchData();
            })
        },
        updateProperty(){
            let form = new FormData();
            form.append('title', this.property.title)
            form.append('size', this.property.size)
            form.append('unit', this.property.unit)
            form.append('floor', this.property.floor)
            form.append('location', this.property.location)
            form.append('date', this.property.date)
            form.append('allotmentvalue', this.property.allotmentvalue)

            Client.updateProperty(this.property.id, form)
            .then((res)=> {
                // console.log(res)
                this.snackbarText = 'Property Updated'
                this.snackbar = true
            })
        },
        uploadInvoice(){
            var fileData = this.$refs.docs.files;
            for (let i = 0; i < fileData.length; i++) {
                let pdf = {
                    file: fileData[i],
                    name: fileData[i].name,
                    size: Math.round(fileData[i].size / 1024) + 'kb'
                }
                this.allPdf.push(pdf);
            }
            // for post data to server
            for (let index = 0; index < fileData.length; index++) {
                this.property.docs.push(fileData[index]);
                console.log(this.property.docs);
            }
        },
        downloadInvoice(){
            const path = 'https://d1o3gwiog9g3w3.cloudfront.net/Property/1640032657_registertaion+screen.jpg'
            axios({
                url: path, // File URL Goes Here
                method: 'GET',
                responseType: 'blob',
            }).then((res) => {
                    var FILE = window.URL.createObjectURL(new Blob([res.data]));
                    
                    var docUrl = document.createElement('x');
                    docUrl.href = FILE;
                    docUrl.setAttribute('download', 'file.*');
                    document.body.appendChild(docUrl);
                    docUrl.click();
            });
        },
        editPayment(payment){
            this.editPaymentDialog = true;
            Client.singlePropertyPayment(payment)
            .then((res) => {
                this.singlePayment = res.data
                // console.log(res.data)
            })
        },
        uploadPaymentFile(e){
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.singlePayment = e.target.result;
            };
        },
        updatePayment(){
            let form = new FormData();
            form.append('amount', this.payment.amount)

            Client.updateProperty(form)
            .then(()=> {

            })
        },
        updateTaxCharges(allotment){
            let data = new FormData();
            data.append('title', allotment.title)
            data.append('amount', allotment.amount)
            data.append('percentage', allotment.percentage)
            data.append('tax', allotment.tax)

            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Client.updateTaxCharges(allotment.id, data)
            .then((res) => {
                this.fetchData();
            })
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
.update-btn{
    position: fixed;
    right: 10px;
    bottom: 20px;
    z-index: 999;
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