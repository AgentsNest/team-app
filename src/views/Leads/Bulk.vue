<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            File Uploaded Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        <v-card class="rounded-xl pa-md-10 shadow content-card" height="88vh" elevation="0">
            <v-toolbar flat class="mb-6 d-none d-md-block">
                <v-btn class="white rounded-lg mr-6" elevation="1" depressed icon @click="$router.go(-1)">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="font-weight-bold text-h6">Add New Lead</div>
                <v-spacer></v-spacer>

                <a 
                    href="/sample.csv" 
                    download
                    class="text-capitalize blue-grey darken-3 body-2 white--text py-2 px-5 rounded">
                    <v-icon color="white" left>mdi-download</v-icon>
                    Download Sample Format
                </a>
            </v-toolbar>

            <v-toolbar flat>
                <v-btn icon @click="$router.go(-1)">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="">Bulk upload</div>
                <v-spacer></v-spacer>

                <a 
                    href="/sample.csv" 
                    download
                    class="text-capitalize blue-grey darken-3 body-2 white--text py-1 px-3 rounded">
                    Sample Format
                </a>
            </v-toolbar>

            <v-row>
                <v-col md="6" cols="12">
                    <v-card class="mx-auto mt-10 pa-6 rounded-xl" v-if="snackbar === false">
                        <v-card-text class="text-center">
                            <v-card-actions class="justify-center">
                                <v-btn icon large class="mx-2">
                                    <v-icon size="62" color="#283593">mdi-file-delimited-outline</v-icon>
                                </v-btn>
                                <v-btn icon large class="mx-2">
                                    <v-icon size="32" color="grey darken-1">mdi-share</v-icon>
                                </v-btn>
                                <v-btn icon large class="mx-2">
                                    <v-icon size="62" color="#3cabba">mdi-database-check-outline</v-icon>
                                </v-btn>
                            </v-card-actions>
                            <label for="mycsv">
                                <v-card-actions class="justify-center mt-5">
                                    <div class="selectFileText rounded-lg text-capitalize">Select file</div>
                                </v-card-actions>

                                <input id="mycsv" hidden class="mycsv" type="file" name="mycsv" ref="mycsv" accept=".csv" v-on:change="handleFileUpload()">
                            </label>
                            <div class="mt-2 mb-2">
                                (Supported format <strong>.CSV</strong> file)
                            </div>
                            <br>
                            <v-btn large class="gradient rounded-lg px-10" dark @click="uploadLead" :loading="loading">
                                <v-icon left>mdi-tray-arrow-up</v-icon>
                                Start Processing
                            </v-btn>
                        </v-card-text>
                    </v-card>
                    <v-card class="mx-auto mt-10 pa-12 rounded-xl gradient" v-if="snackbar === true">
                        <v-card-text class="text-center">
                            <v-btn icon large class="mb-6">
                                <v-icon size="72" color="white">mdi-checkbox-marked-circle-outline</v-icon>
                            </v-btn>
                            <div class="text-h6 text-center mb-4 white--text">File Successfully <span class="white--text">uploaded !</span></div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

        </v-card>
    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import Team from '../../Apis/Team'


export default {
    data () {
        return {
            snackbar: false,
            errors: [],
            mycsv:'',
            lead: {
                name:"", 
                contact:"",
                address:"",
                city: "",
                state:"",
                country:"",
                lead_source:"",
                email:"",
                pincode:"",
                label:"",
                followup_date:"",
                followup_time:"",
                status: '',
                property_type: '',
                team_id: null
            },
            loading: false
        }
    },
    methods:{
        handleFileUpload(){
            this.mycsv = this.$refs.mycsv.files[0];
        },
        uploadLead(){
            this.loading = true
            let formData = new FormData();
            formData.append('mycsv', this.mycsv);

            Lead.bulk(formData, {
                headers:{'Content-Type': 'multipart/form-data'},
            })
            .then(() => {
                this.snackbar = true;
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.errors;
            }); 
        },   
    },
    mounted(){
        Team.auth().then(response => {
            this.lead.team_id = response.data.data.id;
        });
    },
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
.gradient{
  background-image: linear-gradient(to right, #0ba360, #3cba92);
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.selectFileText{
    border: 1px solid #dcdcdc;
    padding: 6px 16px;
    cursor: pointer;
}
</style>