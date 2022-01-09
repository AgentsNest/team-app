<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Profile Updated
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        <v-row>
            <v-col md="4" class="d-none d-md-block">
                <Sidebar />
            </v-col>
            <v-col md="8" cols="12">
                <v-card height="88vh" flat class="content-card transparent">

                    <!-- Update Button -->
                    <v-btn class="teal update-btn white--text text-capitalize" @click="saveDetails()">
                        <v-icon left color="white">mdi-content-save</v-icon>
                        Update
                    </v-btn>

                    <div>Your Token for zapier: {{token}}</div>

                    <!-- Agent Avatar -->
                    <v-card class="rounded-xl mb-5 content-card" flat>
                        <v-toolbar flat>
                            <v-spacer></v-spacer>
                            
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab small depressed class="grey lighten-4"  v-bind="attrs" v-on="on">
                                        <v-icon>mdi-share-variant-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list dense elevation="0" class="py-0">
                                    <v-list-item link ><v-list-item-title>
                                        Share via 
                                        <v-icon size="16">mdi-whatsapp</v-icon>
                                    </v-list-item-title></v-list-item>
                                    <v-list-item link><v-list-item-title>
                                        Share via 
                                        <v-icon size="16">mdi-message-text-outline</v-icon>
                                    </v-list-item-title></v-list-item>
                                    <v-list-item link><v-list-item-title>
                                        Share via 
                                        <v-icon size="16">mdi-email</v-icon>
                                    </v-list-item-title></v-list-item>
                                </v-list>
                                </v-menu>
                        </v-toolbar>

                        <!-- <v-toolbar flat class="d-none d-md-flex">
                            <v-img 
                                :src="avatarPreview ? avatarPreview : agent.image"
                                max-height="160px"
                                aspect-ratio="1"
                                contain
                                class="text-end mx-auto rounded-xl"
                            >
                                <v-btn fab depressed color="grey lighten-3" x-small>
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
                                class="white--text rounded-lg d-none d-md-block" 
                                @click="saveDetails()"
                                :class="success == true ? 'gradient' : 'grey darken-4'"
                            >{{submitBtn}}</v-btn>
                        </v-toolbar> -->
                        <div class="text-center">
                            <v-avatar size="130">
                                <img 
                                    :src="avatarPreview ? avatarPreview : agent.image"
                                    :lazy-src="avatarPreview ? avatarPreview : agent.image"
                                >
                                    <label for="brandAvatar" class="uploadAvatarBtn">
                                        <v-icon color="grey lighten-1">mdi-camera</v-icon>
                                        <!-- <span class="caption">change</span> -->
                                        <input type="file" id="brandAvatar" hidden accept="image/*" @change="previewAvatar"/>
                                    </label>
                            </v-avatar>
                        </div>

                        <v-card-text>
                            <v-row>
                                <v-col md="6" cols="12">
                                    <label>Full Name</label>
                                    <input type="text" class="search-input" v-model="agent.name">
                                </v-col>
                                <v-col md="6" cols="12">
                                    <label>Email</label>
                                    <input type="text" readonly class="search-input" v-model="agent.email">
                                </v-col>
                                <v-col md="6" cols="12">
                                    <label>Contact Number</label>
                                    <input type="text" class="search-input" v-model="agent.contact">
                                </v-col>
                                <v-col md="6" cols="12">
                                    <label>Website</label>
                                    <input type="text" class="search-input" v-model="agent.website">
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                        
                    <!-- Basic Info -->
                    <v-card class="rounded-xl mb-5 content-card" flat>        
                        <v-card-title>Basic Info</v-card-title>
                        <v-card-text>
                            <textarea rows="6" placeholder="About You" class="search-input mb-6" v-model="agent.bio"></textarea>
                            <v-row>
                                <v-col md="4" cols="12">
                                    <label>City</label>
                                    <input type="text" class="search-input" v-model="agent.city" placeholder="City">
                                </v-col>
                                <v-col md="4" cols="12">
                                    <label>State</label>
                                    <input type="text" class="search-input" v-model="agent.state" placeholder="State">
                                </v-col>
                                <v-col md="4" cols="12">
                                    <label>Country</label>
                                    <input type="text" class="search-input" v-model="agent.country" placeholder="Country">
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <!-- Business Details -->
                    <v-card class="rounded-xl mb-5 content-card" flat>
                        <v-card-title>Business Details</v-card-title>

                        <div>
                            <v-img
                                :src="preview ? preview : agent.brand_logo"
                                max-width="160px"
                                aspect-ratio="2"
                                contain
                                class="text-end mx-auto"
                            >
                                <v-btn fab depressed color="grey lighten-3" x-small>
                                    <label for="brandLogo">
                                        <v-icon class="cursor-pointer">mdi-camera</v-icon>
                                        <input type="file" id="brandLogo" hidden accept="image/*" @change="previewLogo"/>
                                    </label>
                                </v-btn>
                            </v-img>
                            <div class="text-center">
                                <span class="caption font-weight-bold">Company Logo</span> <br/>
                                <span class="caption grey--text">Allowed JPG, GIF or PNG. Max size of 800K</span>
                            </div>
                        </div>

                        <!-- <v-card-actions class="px-6 py-6">
                            <label for="brandLogo" class="brandLogoLabel">
                                Upload
                                <input type="file" id="brandLogo" hidden accept="image/*" @change="previewLogo"/>
                            </label>
                        </v-card-actions> -->
                        <v-card-text>
                            <v-row>
                                <v-col md="6" cols="12">
                                    <label>Company Name</label>
                                    <input type="text" class="search-input" v-model="agent.brand_text">
                                </v-col>
                                <v-col md="6" cols="12">
                                    <label>RERA
                                        <span v-if="verified" class="red--text ml-1 font-weight-bold caption">
                                        (not verified)</span> 
                                    </label>
                                    <input type="text" class="search-input" v-model="agent.rera" placeholder="RERA Number">
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <!-- Social Links -->
                    <v-card class="rounded-xl mb-5 content-card" flat>
                        <v-card-title>Social Links</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col md="6" cols="12">
                                    <label><v-icon size="20">mdi-facebook</v-icon> Facebook</label>
                                    <input type="text" class="search-input" v-model="agent.facebook" placeholder="Facebook">
                                </v-col>
                                <v-col md="6" cols="12">
                                    <label><v-icon size="20">mdi-linkedin</v-icon> LinkedIn</label>
                                    <input type="text" class="search-input" v-model="agent.linkedin" placeholder="LinkedIn">
                                </v-col>
                                <v-col md="6" cols="12">
                                    <label><v-icon size="20">mdi-instagram</v-icon> Instagram</label>
                                    <input type="text" class="search-input" v-model="agent.instagram" placeholder="Instagram">
                                </v-col>
                                <v-col md="6" cols="12">
                                    <label><v-icon size="20">mdi-twitter</v-icon> Twitter</label>
                                    <input type="text" class="search-input" v-model="agent.twitter" placeholder="Twitter">
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
                bio: '',
                city: '',
                state: '',
                country: '',
                facebook: '',
                linkedin: '',
                instagram: '',
                twitter: '',
                rera: '',
                brand_text: ''

            },
            snackbar: false,
            preview: '',
            submitBtn: "Update",
            success: false,
            verified: true,
            avatarPreview: '',
            token: ''
        }
    },
    methods: {
        saveDetails() {
            User.update(this.agent.id, this.agent)
            .then((response) => {
                this.snackbar = true
                // console.log(response);
                this.fetchUser();
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
        fetchUser(){
            User.authForUpdate().then((response) => {
                this.agent = response.data.data;
            });
        }
    },
    beforeMount(){
        this.fetchUser();
        this.token = localStorage.getItem('token');
    }
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}
#brandLogo{width: 100%;margin-top:2em}
.update-btn{
    position: fixed;
    right: 10px;
    bottom: 20px;
    z-index: 999;
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
.uploadAvatarBtn{
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.4);
    color: #ededed;
    width: 100%;
    padding: 5px;
    cursor: pointer;
}
</style>    