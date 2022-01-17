<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-0 shadow content-card overflow-y-auto" height="88vh" elevation="0">

            <v-toolbar flat class="indigo px-2">
                <v-btn small dark icon @click="$router.
                go(-1)">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div class="white--text">{{property.title}}</div>
                <v-spacer></v-spacer>
            </v-toolbar>

            <div class="pb-6">
                
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
                                        <tr><td><strong>Balance:</strong></td><td>{{property.balance}}</td></tr>
                                        <tr><td><strong>Payment Received:</strong></td><td>{{property.paymentreceived}}</td></tr>
                                        <tr><td><strong>Allotment Price:</strong></td><td>{{property.allotmentvalue}}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <!-- All Charges and Taxes -->
                        <v-row>
                            <!-- <v-col>
                                <v-card>
                                    <v-toolbar color="indigo" dark dense>
                                        <div>Base Selling Price : </div>
                                        <v-spacer></v-spacer>
                                        ₹ {{property.bsp}}
                                    </v-toolbar>
                                    <v-simple-table>
                                        <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Charge</th>
                                                <th class="text-left">Amount</th>
                                                <th class="text-left">GST</th>
                                                <th class="text-left">Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="bsp in property.bsps" :key="bsp.id">
                                                <td>{{ bsp.title }}</td>
                                                <td>{{ bsp.amount }}</td>
                                                <td>{{ bsp.percentage }}%</td>
                                                <td>{{ bsp.tax }}</td>
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card>
                                    <v-toolbar color="indigo" dark dense>
                                        <div>Deal Price :</div>
                                        <v-spacer></v-spacer>
                                        ₹ {{property.dealprice}}
                                    </v-toolbar>
                                    <v-simple-table>
                                        <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Charge</th>
                                                <th class="text-left">Amount</th>
                                                <th class="text-left">GST</th>
                                                <th class="text-left">Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="deal in property.dealprices" :key="deal.id">
                                                <td>{{ deal.title }}</td>
                                                <td>{{ deal.amount }}</td>
                                                <td>{{ deal.percentage }}%</td>
                                                <td>{{ deal.tax }}</td>
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col> -->
                            <v-col>
                                <v-card>
                                    <v-toolbar class="indigo lighten-1" dense dark>
                                        <div>Allotment Price :</div>
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="allotmentDialog = true"><v-icon>mdi-plus</v-icon></v-btn>
                                    </v-toolbar>
                                    <v-simple-table>
                                        <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Charge</th>
                                                <th class="text-left">Amount</th>
                                                <th class="text-left">GST</th>
                                                <th class="text-left">Tax</th>
                                                <th class="text-left">Act</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="allotment in property.allotments" :key="allotment.id">
                                                <td>{{ allotment.title }}</td>
                                                <td>{{ allotment.amount }}</td>
                                                <td>{{ allotment.percentage }}%</td>
                                                <td>{{ allotment.tax }}</td>
                                                <td>
                                                    <v-btn small icon class="rounded-xl text-capitalize" @click="deleteAllotmentCharge(allotment.id)">
                                                        <v-icon size="16">mdi-trash-can-outline</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>

                            <!-- Add new Charge allotment -->
                            <v-dialog v-model="allotmentDialog" width="500">
                                <v-card>
                                    <div class="grey lighten-2 px-6 py-4">Add Charges</div>

                                    <v-card-text class="pt-6">
                                        <v-text-field solo class="rounded-lg" label="Title" v-model="allotment.title"></v-text-field>
                                        <v-text-field solo class="rounded-lg" label="Amount" v-model="allotment.amount"></v-text-field>
                                        <v-text-field solo class="rounded-lg" label="GST" v-model="allotment.percentage"></v-text-field>
                                        <v-text-field solo class="rounded-lg" label="Tax" v-model="allotment.tax"></v-text-field>
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="grey darken-3" dark block @click="addCharge">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                        </v-row>
                    </v-col>

                    <!-- All Applicant List -->
                    <v-col cols="12" v-if="applicantOneDetails.length">
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
                    </v-col>

                </v-row>

            <!-- Document List -->
                <v-card class="rounded-lg mt-4" v-if="property.documents.length">
                    <v-toolbar class="indigo lighten-1" dense dark>
                        <div>Documents</div>
                        <v-spacer></v-spacer>
                        <v-btn icon elevation="0">
                            <label for="docs" class="">
                                <v-icon>mdi-plus</v-icon>
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
                                <v-dialog
                                    v-model="dialog"
                                    fullscreen
                                    hide-overlay
                                    transition="dialog-bottom-transition"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <div class="d-flex">
                                            <v-btn class="pa-2 d-flex flex-row align-center" outlined v-bind="attrs" v-on="on" text>
                                                <v-icon color="grey darken-2">mdi-file-document-outline</v-icon>
                                                <div class="caption text-capitalize">{{pdf.image}}</div>
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="deleteDocumentInProperty(pdf.id)" icon><v-icon>mdi-trash-can</v-icon></v-btn>
                                        </div>
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

            <!-- Image gallery -->
                <v-card class="rounded-lg mt-4" flat>
                    <v-toolbar class="indigo lighten-1" dense dark>
                        <div>Image Gallery</div>
                        <v-spacer></v-spacer>
                        <v-btn icon elevation="0">
                            <label for="images" class="">
                                <v-icon>mdi-plus</v-icon>
                                <input 
                                    type="file" 
                                    id="images" 
                                    hidden 
                                    ref="images" 
                                    @change="onImageChange"
                                    accept="image/png, image/jpeg"
                                >
                            </label>
                        </v-btn>
                    </v-toolbar>
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
                            <v-btn block small @click="deleteImageInProperty(gallery.id)">
                                <v-icon left>mdi-trash-can</v-icon>
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>


                <!-- Payment List and Add new -->
                <v-row>
                    <v-col cols="12">
                        <v-card class="mt-2 rounded-lg">
                            <v-toolbar class="dark" dense dark>
                                <div>Payments</div>
                                <v-spacer></v-spacer>
                                <v-btn icon elevation="0" @click="paymentDialog = !paymentDialog">
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
                            </v-simple-table>

                        <!-- 
                            ==================
                                Edit Payment 
                        ======================= -->
                            <v-dialog v-model="editPaymentDialog" width="500">
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
                                                    @change="updatePayment"
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
                            </v-dialog>

                        </v-card>

                        <!-- Add new payment -->
                        <v-dialog v-model="paymentDialog" width="500">
                            <v-card>
                                <div class="grey lighten-2 px-6 py-4">Add Payment</div>

                                <v-card-text class="pt-6">
                                    <input type="text" class="input-field" v-model="payment.title" placeholder="Payment Title">

                                    <input type="text" class="input-field" v-model="payment.due_date" placeholder="Due Date">

                                    <input type="text" class="input-field" v-model="payment.amount" placeholder="Amount Received">

                                    <input type="text" class="input-field" v-model="payment.received_date" placeholder="Date Of Received">

                                    <input type="text" class="input-field" v-model="payment.notes" placeholder="Notes">
                                        
                                    <input type="file" name="file" @change="onChange" class="input-field">
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="grey darken-3" dark block @click="addPayment">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>


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
                received_date: '',
                notes: '',
                due_date: ''
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
            allotmentDialog: false,
            allotment: {
                title: '',
                amount: '',
                percentage: '',
                tax: ''
            },
            file:'',
            image: ''
        }
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            Client.singleClientProperty(this.$route.params.id).then(response => {
                this.property = response.data
                this.applicantOneDetails = JSON.parse(response.data.applicant_one)
                this.applicantTwoDetails = JSON.parse(response.data.applicant_two)
                this.applicantThreeDetails = JSON.parse(response.data.applicant_three)
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
            data.append('received_date', this.payment.received_date)
            data.append('notes', this.payment.notes)
            data.append('due_date', this.payment.due_date)
            data.append('file', this.payment.file)
            data.append('fileName', this.payment.fileName)
            data.append('property_id', this.property.id)
            
            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Client.addPropertyPayment(data, config)
            .then(() =>{
                this.payment = ''
                this.payment.file = ''
                this.paymentDialog = false
                this.fetchData()
            })
        },
        deleteAllotmentCharge(allotment){
            Client.deleteAllotmentCharge(allotment)
            .then(() => {
                this.snackbarText = 'Charge Deleted';
                this.snackbar = true;
                this.fetchData();
            })
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
            form.append('amount', this.payment.amount)

            Client.updateProperty(form)
            .then(()=> {

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
            const path = 'https://realtsafe-test.s3.ap-south-1.amazonaws.com/Property/1640032657_registertaion+screen.jpg'
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
            form.append('title', this.singlePayment.title)
            form.append('amount', this.singlePayment.amount)

            // console.log(this.singlePayment.title, this.singlePayment.amount)

            Client.updatePropertyPayment(this.singlePayment.id, form)
            .then((res)=> {
                this.snackbarText = "Payment Updated"
                this.snackbar = true
            }).catch((err) => {
                console.log(err);
            })
        },
        addCharge(){
            let data = new FormData();
            data.append('title', this.allotment.title)
            data.append('amount', this.allotment.amount)
            data.append('percentage', this.allotment.percentage)
            data.append('tax', this.allotment.tax)
            data.append('property_id', this.property.id)
            
            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Client.addAllotmentCharges(data)
            .then(() =>{
                this.allotment = ''
                this.allotmentDialog = false
                this.fetchData()
            })
        },
        // Upload & Delete Document
        onFileChange(e){
            this.file = e.target.files[0];
            this.uploadDocuement();
        },
        uploadDocuement(){
            let data = new FormData()
            data.append('file', this.file);
            data.append('property_id', this.property.id)

            Client.uploadDocument(data)
            .then((res) => {
                this.fetchData();
            })
        },
        deleteDocumentInProperty(document){
            Client.deleteDocumentInProperty(document)
            .then((res) => {
                this.fetchData();
            })
        },
        // Upload & Delete Image Gallery
        onImageChange(e){
            this.file = e.target.files[0];
            this.addImageInProperty();
        },
        addImageInProperty(){
            let data = new FormData()
            data.append('file', this.file);
            data.append('property_id', this.property.id)

            Client.addImageInProperty(data)
            .then((res) => {
                this.fetchData();
            })
        },
        deleteImageInProperty(gallery){
            Client.deleteImageInProperty(gallery)
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
  padding: 12px;
  font-size: 15px;
  width: 100%;
  /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.09);
  /* background: #f5f5f5; */
  background: #fdfdfd;
  outline: none;
  margin-bottom: 1em;
}
</style>