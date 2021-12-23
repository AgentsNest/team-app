<template>
  <div>

    <v-snackbar 
      v-model="snackbar" 
      transition="scroll-y-transition" 
      top
      timeout="5000"
    >
      Property Addedd Successfully
      <template v-slot:action="{ attrs }">
        <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-card class="rounded-xl pa-md-5 pb-10 shadow content-card" height="88vh" elevation="0">

        <v-toolbar color="grey lighten-3">
             <v-btn icon class="" @click="$router.go(-1)">
                <v-icon size="25" left color="grey darken-3">mdi-arrow-left</v-icon>
            </v-btn>
            <div class="text-capitalize font-weight-bold">back</div>
            <v-spacer></v-spacer>
        </v-toolbar>

        <!-- Mobile Screen -->
        <v-tabs class="pa-0" grow>
            <v-tabs-slider/>
            <v-tab class="text-capitalize">Details</v-tab>
            <v-tab class="text-capitalize">Payments</v-tab>
            <v-tab class="text-capitalize">Gallery</v-tab>

            <!-- Details Tab  -->
            <v-tab-item>
                <v-container>
                    <v-row >
                        <v-col cols="12" md="6">
                            <input type="text" class="input-field" placeholder="Property title" v-model="property.title">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Date of closing" v-model="property.date">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Size" v-model="property.size">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Unit No." v-model="property.unit">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Floor" v-model="property.floor">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Property Type" v-model="property.type">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Location" v-model="property.location">
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                                v-model="property.builder_id"
                                :items="builders"
                                item-text="name"
                                item-value="id"
                                deletable-chips
                                small-chips
                                outlined
                                dense
                                class="rounded-lg"
                                label="Select Builder"
                            ></v-autocomplete>
                        </v-col>

                        <v-card flat>
                            <v-alert border="left" colored-border color="mx-3 grey darken-1" elevation="0" dense>
                                <div class="pl-4 font-weight-bold body-2 text-uppercase">Additional Applicant</div>
                            </v-alert>
                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>2nd Applicant</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row>
                                            <v-col cols="6"> 
                                                <input type="text" class="input-field" placeholder="Name">
                                            </v-col>
                                            <v-col cols="6">
                                                <input type="text" class="input-field" placeholder="Email">
                                            </v-col>
                                            <v-col cols="6">
                                                <input type="text" class="input-field" placeholder="D/o, S/o">
                                            </v-col>
                                            <v-col cols="6">
                                                <input type="text" class="input-field" placeholder="PAN No.">
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>3rd Applicant</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row>
                                            <v-col cols="6">
                                                <input type="text" class="input-field" placeholder="Name">
                                            </v-col>
                                            <v-col cols="6">
                                                <input type="text" class="input-field" placeholder="Email">
                                            </v-col>
                                            <v-col cols="6">
                                                <input type="text" class="input-field" placeholder="D/o, S/o">
                                            </v-col>
                                            <v-col cols="6">
                                                <input type="text" class="input-field" placeholder="PAN No.">
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card>
                    </v-row>
                </v-container>
            </v-tab-item>
            <!-- Payments Tab  -->
            <v-tab-item>
                <v-container>
                    <v-card>
                        <input type="text" class="input-field" placeholder="Base selling price" v-model="baseprice">
                        <v-card-subtitle>Extra Charges</v-card-subtitle>
                        <v-card-text v-for="(input, index) in inputs" :key="index">
                            <v-text-field label="Charges" dense outlined v-model="input.title"></v-text-field>
                            <v-row>
                                <v-col><v-text-field outlined dense label="Amount" v-model="input.amount"></v-text-field></v-col>
                                <v-col><v-text-field outlined dense label="Tax" v-model="input.tax"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                        <input type="text" class="input-field" placeholder="Total BSP" v-model="property.bsp">
                        <v-btn block @click="add(index)"><v-icon>mdi-plus</v-icon></v-btn>
                    </v-card>
                    <!-- Deal Price -->
                    <v-card class="mt-4">
                        <input type="text" class="input-field" placeholder="Deal Price" v-model="property.dealprice">
                        <v-card-subtitle>Extra Charges</v-card-subtitle>
                        <v-card-text>
                            <v-text-field label="Charges" dense outlined></v-text-field>
                            <v-row>
                                <v-col><v-text-field outlined dense label="Amount"></v-text-field></v-col>
                                <v-col><v-text-field outlined dense label="Tax"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                        <v-btn block><v-icon>mdi-plus</v-icon></v-btn>
                    </v-card>
                    <!-- Allotment Value -->
                    <v-card class="mt-4">
                        <input type="text" class="input-field" placeholder="Allotment Value" v-model="property.allotmentvalue">
                        <v-card-subtitle>Extra Charges</v-card-subtitle>
                        <v-card-text>
                            <v-text-field label="Charges" dense outlined></v-text-field>
                            <v-row>
                                <v-col><v-text-field outlined dense label="Amount"></v-text-field></v-col>
                                <v-col><v-text-field outlined dense label="Tax"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                        <v-btn block><v-icon>mdi-plus</v-icon></v-btn>
                    </v-card>
                </v-container>
            </v-tab-item>
            <!-- Gallery Tab  -->
            <v-tab-item>
                <v-container>
                    <v-card class="rounded-lg mb-6" elevation="0" outlined min-height="160">
                        <v-alert text dense color="grey darken-1" border="left">
                            <v-row class="py-1" align="center">
                                <v-col class="grow body-2 grey--text text--darken-3">Documents</v-col>
                                <v-col class="shrink">
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
                                </v-col>
                            </v-row>
                        </v-alert>

                        <v-row class="px-4">
                            <v-col cols="12" v-for="(pdf, index) in allPdf" :key="index">
                                <v-card class="pa-2 d-flex">
                                    <v-icon size="30px">mdi-file-document-outline</v-icon>
                                    <div class="ml-2">
                                        <div class="body-2">{{pdf.name.substring(1, 28)}}..</div>
                                        <div class="caption">{{ pdf.size ? '' +  '(' + pdf.size + ')' : '' }}</div>
                                    </div>
                                    <v-btn x-small fab elevation="1" class="ml-auto" @click="clearPdf(index)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-row>

                    </v-card>

                    <v-card class="rounded-lg" elevation="1" min-height="160">
                        <v-alert text dense color="grey darken-3" border="left">
                            <v-row class="center py-1" align="center">
                                <v-col class="grow body-2 grey--text text--darken-3">Image Gallery</v-col>
                                <v-col class="shrink">
                                    <v-btn outlined x-small class="grey darken-2" dark>
                                        <label for="gallery">
                                            Upload
                                            <input 
                                                type="file" 
                                                id="gallery" 
                                                hidden multiple 
                                                ref="files" 
                                                @change="updateImageList"
                                                accept="image/png, image/jpeg, image/bmp"
                                            >
                                        </label>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-alert>

                        <v-row class="px-2">
                            <v-col md="4" sm="6" v-for="(preview, index) in previewImage" :key="index">
                                <v-img :src="preview.src" class="align-top rounded-lg" aspect-ratio="1.4">
                                    <v-btn class="blue-grey darken-4" dark fab x-small tile @click="clearImage(index)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-btn large block dark class="gradient rounded-lg mt-4" @click="SaveProperty">Save Property</v-btn>

                </v-container>
            </v-tab-item>
        </v-tabs>

        <!-- Desktop Screen -->
        <v-card class="rounded-xl white py-6 px-4 d-none d-md-block" flat>

            <v-row>
                <v-col md="6" cols="12">
                    <v-alert border="left" colored-border color="grey darken-1" elevation="0" dense>
                        <div class="pl-2 font-weight-bold body-2 text-uppercase">Property Details</div>
                    </v-alert>
                    <v-row>
                        <v-col cols="12" md="6">
                            <input type="text" class="input-field" placeholder="Property title" v-model="property.title">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Date of closing" v-model="property.date">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Size" v-model="property.size">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Unit No." v-model="property.unit">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Floor" v-model="property.floor">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Property Type" v-model="property.type">
                        </v-col>
                        <v-col cols="6">
                            <input type="text" class="input-field" placeholder="Location" v-model="property.location">
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                                v-model="property.builder_id"
                                :items="builders"
                                item-text="name"
                                item-value="id"
                                deletable-chips
                                small-chips
                                outlined
                                class="rounded-lg"
                                label="Select Builder"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-alert border="left" colored-border color="grey darken-1" elevation="0" dense>
                        <div class="pl-2 font-weight-bold body-2 text-uppercase">Payment Details</div>
                    </v-alert>
                    <!-- BSP Base Selling Price -->
                    <v-card>
                        <input type="text" class="input-field" placeholder="Base selling price" v-model="baseprice">
                        <v-card-subtitle>Extra Charges</v-card-subtitle>
                        <v-card-text v-for="(input, index) in inputs" :key="index">
                            <v-text-field label="Charges" dense outlined v-model="input.title"></v-text-field>
                            <v-row>
                                <v-col><v-text-field outlined dense label="Amount" v-model="input.amount"></v-text-field></v-col>
                                <v-col><v-text-field outlined dense label="Tax" v-model="input.tax"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                        <input type="text" class="input-field" placeholder="Total BSP" v-model="property.bsp">
                        <v-btn block @click="add(index)"><v-icon>mdi-plus</v-icon></v-btn>
                    </v-card>
                    <!-- Deal Price -->
                    <v-card class="mt-4">
                        <input type="text" class="input-field" placeholder="Deal Price" v-model="property.dealprice">
                        <v-card-subtitle>Extra Charges</v-card-subtitle>
                        <v-card-text>
                            <v-text-field label="Charges" dense outlined></v-text-field>
                            <v-row>
                                <v-col><v-text-field outlined dense label="Amount"></v-text-field></v-col>
                                <v-col><v-text-field outlined dense label="Tax"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                        <v-btn block><v-icon>mdi-plus</v-icon></v-btn>
                    </v-card>
                    <!-- Allotment Value -->
                    <v-card class="mt-4">
                        <input type="text" class="input-field" placeholder="Allotment Value" v-model="property.allotmentvalue">
                        <v-card-subtitle>Extra Charges</v-card-subtitle>
                        <v-card-text>
                            <v-text-field label="Charges" dense outlined></v-text-field>
                            <v-row>
                                <v-col><v-text-field outlined dense label="Amount"></v-text-field></v-col>
                                <v-col><v-text-field outlined dense label="Tax"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                        <v-btn block><v-icon>mdi-plus</v-icon></v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-card class="rounded-lg mb-6" elevation="0" outlined min-height="160">
                        <v-alert text dense color="grey darken-1" border="left">
                            <v-row class="py-1" align="center">
                                <v-col class="grow body-2 grey--text text--darken-3">Documents</v-col>
                                <v-col class="shrink">
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
                                </v-col>
                            </v-row>
                        </v-alert>

                        <v-row class="px-4">
                            <v-col cols="12" v-for="(pdf, index) in allPdf" :key="index">
                                <v-card class="pa-2 d-flex">
                                    <v-icon size="30px">mdi-file-document-outline</v-icon>
                                    <div class="ml-2">
                                        <div class="body-2">{{pdf.name.substring(1, 28)}}..</div>
                                        <div class="caption">{{ pdf.size ? '' +  '(' + pdf.size + ')' : '' }}</div>
                                    </div>
                                    <v-btn x-small fab elevation="1" class="ml-auto" @click="clearPdf(index)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-row>

                    </v-card>

                    <v-card class="rounded-lg" elevation="1" min-height="160">
                        <v-alert text dense color="grey darken-3" border="left">
                            <v-row class="center py-1" align="center">
                                <v-col class="grow body-2 grey--text text--darken-3">Image Gallery</v-col>
                                <v-col class="shrink">
                                    <v-btn outlined x-small class="grey darken-2" dark>
                                        <label for="gallery">
                                            Upload
                                            <input 
                                                type="file" 
                                                id="gallery" 
                                                hidden multiple 
                                                ref="files" 
                                                @change="updateImageList"
                                                accept="image/png, image/jpeg, image/bmp"
                                            >
                                        </label>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-alert>

                        <v-row class="px-2">
                            <v-col md="4" sm="6" v-for="(preview, index) in previewImage" :key="index">
                                <v-img :src="preview.src" class="align-top rounded-lg" aspect-ratio="1.4">
                                    <v-btn class="blue-grey darken-4" dark fab x-small tile @click="clearImage(index)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>       
            </v-row>

            <v-btn x-large block dark class="gradient mt-12 rounded-lg" @click="SaveProperty">Save Property</v-btn>

        </v-card>

    </v-card>

  </div>

</template>

<script>
import Client from '../../Apis/Client'
import { ToWords } from 'to-words';

export default {
    data () {
        return {
            showPassword: false,
            rules: [
                value => !value || value.size < 2000000 || 'File size should be less than 2 MB!',
            ],
            previewImage: [],
            fileName: '',
            fileSize: '',
            allPdf:[],
            builders:[],
            pdf: {},
            selectedFile:{},
            property: {
                image: 'https://realtsafe-test.s3.ap-south-1.amazonaws.com/Default/property.jpg',
                title: 'ATS Casa',
                date: '26 Jan 1991',
                size: '3500 Sq ft',
                unit: '12',
                type: 'Commercial',
                floor: '4',
                location: 'Chandigarh',
                builder_id: null,
                bsp: '',
                dealprice: '',
                allotmentvalue: '',
                images: [],
                docs: []
            },
            values:[
                'Thousand',
                'Lacs',
                'Crore',
            ],
            amountType: '',
            snackbar: false,
            baseprice: '',
            inputs: [
                { title: 'Bookin', amount: '3000', tax: '3000'}
            ],
            payments: []
        }
    },
    mounted(){
        this.fetchBuilder();
    },
    computed:{
    },
    methods:{
        updateImageList(){
            var selectedFiles = this.$refs.files.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                let img = {
                    src: URL.createObjectURL(selectedFiles[i]),
                    file: selectedFiles[i]
                }
                this.previewImage.push(img);
            }
            for (let index = 0; index < selectedFiles.length; index++) {
                this.property.images.push(selectedFiles[index]);
            }
        },
        fetchBuilder(){
            Client.allBuilder().then(response => {
                this.builders = response.data
            })
        },
        clearImage(index){
        this.previewImage.splice(index);
        this.property.images.splice(index);
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
        SaveProperty(){
        let data = new FormData();
        data.append('image', this.property.image)
        data.append('title', this.property.title)
        data.append('date', this.property.date)
        data.append('size', this.property.size)
        data.append('type', this.property.type)
        data.append('unit', this.property.unit)
        data.append('floor', this.property.floor)
        data.append('location', this.property.location)
        data.append('bsp', this.property.bsp)
        data.append('dealprice', this.property.dealprice)
        data.append('allotmentvalue', this.property.allotmentvalue)
        data.append('client_id', this.$route.params.id)
        data.append('builder_id', this.property.builder_id)

        for (let i = 0; i < this.property.images.length; i++) {
            let file = this.property.images[i];
            data.append('images[' + i + ']', file);
        }

        for (let i = 0; i < this.property.docs.length; i++) {
            let file = this.property.docs[i];
            data.append('files[' + i + ']', file);
        }

        for (let i = 0; i < this.inputs.length; i++) {
            let charge = this.inputs[i];
            // console.log(charge);
            data.append('inputs[' + i + ']', JSON.stringify(charge));
        }

        // for (var pair of data.entries()){
        //     console.log(pair[0]+ ', '+ pair[1]); 
        // }

          Client.addNewProperty(data)
          .then((response) => {
            this.snackbar = true
            this.property.image = '',
            this.property.title = '',
            this.property.date = '',
            this.property.size = '',
            this.property.unit = '',
            this.property.type = '',
            this.property.floor = '',
            this.property.location = '',
            this.property.bsp = '',
            this.property.dealprice = '',
            this.property.allotmentvalue = '',
            this.property.images = [],
            this.property.docs = []
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          });
        },
        add () {
        this.inputs.push({
            charge: '',
            amount: '',
            tax: ''
        })
        },

        remove (index) {
        this.inputs.splice(index, 1)
        },
    }
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}
.input-field{
  border-radius: 6px;
  padding: 0.7em;
  font-size: 15px;
  width: 100%;
  /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.09);
  /* background: #f5f5f5; */
  background: #fdfdfd;
  outline: none;
}
.gradient-bg{
    background: #16222A; 
    background: -webkit-linear-gradient(to right, #3A6073, #16222A);
    background: linear-gradient(to right, #3A6073, #16222A);
}
.gallery-label{
    border: 1px solid #efefef;
    padding: 2px;
    display: flex;
    border-radius: 8px;
    box-shadow: 0 0 2px #adadad;
    cursor: pointer;
}
.gradient{
  background-image: linear-gradient(to right, #283593, #3cabba);
  box-shadow: 0 4px 15px 0 rgba(23, 91, 168, 0.75);
  color: #fff;
}
</style>