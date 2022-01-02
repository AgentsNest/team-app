<template>
    <div>
        <v-row>
            <v-col md="4">
                <Sidebar />
            </v-col>
            <v-col md="8">
                <v-card height="88vh" flat class="content-card transparent">
                    <v-card class="mb-5 rounded-xl" flat>
                        <v-card-actions class="px-6 py-6">
                            <v-img
                                :src="preview ? preview : agent.brand_logo"
                                max-height="60px"
                                aspect-ratio="2"
                                contain
                            ></v-img>
                            <div class="ml-8">
                                <span>Upload new Photo</span> <br/>
                                <span class="caption grey--text">Allowed JPG, GIF or PNG. Max size of 800K</span>
                            </div>
                            <v-spacer></v-spacer>
                            <label for="brandLogo" class="brandLogoLabel">
                                Upload
                                <input type="file" id="brandLogo" hidden accept="image/*" @change="previewLogo"/>
                            </label>
                        </v-card-actions>
                    </v-card>

                <!-- Agent Avatar -->
                    <v-card class="rounded-xl mb-5 pa-5 content-card" flat>
                        <v-toolbar flat class="mt-8 mb-10">
                            <v-img 
                                :src="avatarPreview ? avatarPreview : agent.image"
                                max-width="120"
                                class="rounded-xl align-end text-right"
                            >
                                <v-btn fab depressed color="grey" small>
                                    <label for="brandAvatar">
                                        <v-icon class="cursor-pointer">mdi-camera</v-icon>
                                        <input type="file" id="brandAvatar" hidden accept="image/*" @change="previewAvatar"/>
                                    </label>
                                </v-btn>
                            </v-img>
                            <v-spacer></v-spacer>
                            <div class="title">Change Information here</div>
                            <v-spacer></v-spacer>
                            <v-btn 
                                class="white--text rounded-lg" 
                                @click="saveDetails()"
                                :class="success == true ? 'gradient' : 'grey darken-4'"
                            >{{submitBtn}}</v-btn>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col md="6">
                                    <label>Full Name</label>
                                    <input type="text" class="search-input" v-model="agent.name">
                                </v-col>
                                <v-col md="6">
                                    <label>Email</label>
                                    <input type="text" class="search-input" v-model="agent.email">
                                </v-col>
                                <v-col md="6">
                                    <label>Contact Number</label>
                                    <input type="text" class="search-input" v-model="agent.contact">
                                </v-col>
                                <v-col md="6">
                                    <label>Website</label>
                                    <input type="text" class="search-input" v-model="agent.website">
                                </v-col>
                                <v-col md="12">
                                    <label>Website</label>
                                    <input type="text" class="search-input" v-model="agent.website">
                                </v-col>
                            </v-row>
                        </v-card-text>
                        
                        <v-card-title>Basic Info</v-card-title>
                        <v-card-text>
                            <textarea rows="6" placeholder="About You" class="search-input mb-6"></textarea>
                            <v-row>
                                <v-col md="4">
                                    <label>City</label>
                                    <input type="text" class="search-input" v-model="agent.facebook" placeholder="City">
                                </v-col>
                                <v-col md="4">
                                    <label>State</label>
                                    <input type="text" class="search-input" v-model="agent.linkedin" placeholder="State">
                                </v-col>
                                <v-col md="4">
                                    <label>Country</label>
                                    <input type="text" class="search-input" v-model="agent.instagram" placeholder="Country">
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-title>Social Links</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col md="6">
                                    <label><v-icon size="20">mdi-facebook</v-icon> Facebook</label>
                                    <input type="text" class="search-input" v-model="agent.facebook" placeholder="Facebook">
                                </v-col>
                                <v-col md="6">
                                    <label><v-icon size="20">mdi-linkedin</v-icon> LinkedIn</label>
                                    <input type="text" class="search-input" v-model="agent.linkedin" placeholder="LinkedIn">
                                </v-col>
                                <v-col md="6">
                                    <label><v-icon size="20">mdi-instagram</v-icon> Instagram</label>
                                    <input type="text" class="search-input" v-model="agent.instagram" placeholder="Instagram">
                                </v-col>
                                <v-col md="6">
                                    <label><v-icon size="20">mdi-twitter</v-icon> Twitter</label>
                                    <input type="text" class="search-input" v-model="agent.twitter" placeholder="Twitter">
                                </v-col>
                            </v-row>
                        </v-card-text>

                    </v-card>

                    <!-- Business Details -->
                    <v-card class="rounded-xl mb-5 pa-5 content-card" flat>
                        
                        <v-card-title>Business Details</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col md="6">
                                    <label>Company Name</label>
                                    <input type="text" class="search-input" v-model="agent.brand_text">
                                </v-col>
                                <v-col md="6">
                                    <label>RERA
                                        <span v-if="verified" class="red--text ml-1 font-weight-bold caption">
                                        (not verified)</span> 
                                    </label>
                                    <input type="text" class="search-input" v-model="agent.rera" placeholder="RERA Number">
                                </v-col>
                            </v-row>
                        </v-card-text>

                    </v-card>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Sidebar from '../../components/Account/Sidebar.vue'
import User from '../../Apis/User'

export default {
    components:{ Sidebar },
    data(){
        return{
            agent:{
                email: '',
                contact: '',
                website: '',
                brand_logo: '',
                facebook: '',
                instagram: '',
                twitter: '',
                linkedin: '',
                rera: '',
            },
            preview: '',
            submitBtn: "Update",
            success: false,
            verified: true,
            avatarPreview: ''
        }
    },
    methods: {
        saveDetails() {
            User.update(this.agent.id, this.agent).then((response) => {
                this.success = true;
                this.submitBtn = "Profile Updated";
                console.log(response);
            });
        },
        previewLogo(e) {
            let file = e.target.files[0];

            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                this.preview = e.target.result;
                this.agent.brand_logo = e.target.result;
            };
        },
        previewAvatar(e) {
            let file = e.target.files[0];

            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                this.avatarPreview = e.target.result;
                this.agent.image = e.target.result;
            };
        },
    },
    beforeMount(){
        User.authForUpdate().then((response) => {
            this.agent = response.data.data;
            console.log(response)
        });
    }
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}
.search-input{
  background-color: #fefefe;
  border-radius: 6px;
  padding: 1em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.4),0 24px 20px -24px rgba(71,82,107,.3);
  margin-top: 5px;
}
.brandLogoLabel{
  border: 1px solid #999999;
  border-radius: 4px;
  padding: 5px 16px;
  cursor: pointer;
  font-size: 14px
}
.brandLogoLabel:hover{
    background: #efefef;
}
.gradient{
  background-image: linear-gradient(to right, #0ba360, #3cba92);
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
</style>    