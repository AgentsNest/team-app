<template>
    <v-card class="overflow-hidden">
            
        <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7" class="px-md-16">
            <v-toolbar-title class="font-weight-bold headline">
                agnt. 
                <span class="caption">beta v.01</span>
                <!-- <v-chip class="" x-small color="blue darken-4" text-color="white">beta</v-chip> -->
            </v-toolbar-title>
            
            <v-spacer></v-spacer>

            <!-- <v-btn text class="text-capitalize">Case Studies</v-btn>
            <v-btn text class="text-capitalize">Pricing</v-btn>
            <v-btn text class="text-capitalize">Integration</v-btn> -->
            <v-btn text class="text-capitalize d-none d-md-flex">Resources</v-btn>
            <v-btn text class="text-capitalize d-none d-md-flex">About Us</v-btn>
            <v-btn color="teal darken-2" dark elevation="0" class="text-capitalize" link :to="{name: 'Login'}">Login</v-btn>
            <v-btn text elevation="0" class="text-capitalize d-none d-md-flex" link :to="{name: 'Register'}">Join Now</v-btn>

        </v-app-bar>

        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto pt-12" min-height="100vh">
            <v-container>
                <v-row class="py-16">
                    <v-col cols="12" class="px-4 px-md-0">
                        <div class="md-display-3 display-1 font-weight-bold">Grow your business faster with <span class="blue--text text--darken-3">AgentsNest</span></div>
                        <div class="my-8">One solution for all you digital, market, and personal business needs.</div>
                        <v-row>
                            <v-col cols="12" class="font-weight-bold"><v-icon color="red" size="14" class="mr-2">mdi-circle</v-icon> Build your Brand identity</v-col>
                            <v-col cols="12" class="font-weight-bold"><v-icon color="green" size="14" class="mr-2">mdi-circle</v-icon> Generate new leads each day</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="font-weight-bold"><v-icon color="yellow" size="14" class="mr-2">mdi-circle</v-icon> Keep a track of leads</v-col>
                            <v-col cols="12"  class="font-weight-bold"><v-icon color="purple" size="14" class="mr-2">mdi-circle</v-icon> Manage your team</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="font-weight-bold"><v-icon color="orange" size="14" class="mr-2">mdi-circle</v-icon> Share properties in one click</v-col>
                            <v-col cols="12" class="font-weight-bold"><v-icon color="green" size="14" class="mr-2">mdi-circle</v-icon> Never miss opportunities</v-col>
                        </v-row>
                        <v-alert text color="info" class="mt-8 rounded-xl">
                            <div class="text-capitalize">Your Own Solution | Join the AgentsNest community today!</div>
                        </v-alert>
                    </v-col>
                    <v-col cols="12">
                        <v-img src="../assets/Screens/main.png" contain width="100%"></v-img>
                    </v-col>
                </v-row>

                <v-card flat class="py-12">
                    <div>
                        <div class="text-center display-1">We bring to you, every Realtor’s companion.</div>
                        <div class="text-center headline">Save time and invest towards a better future.</div>
                        <div class="text-center font-weight-bold my-4">
                           <span class="blue--text text--darken-3 title">100+ realtors trust Agentsnest</span> 
                           to Sell & Engage better with their clients
                        </div>
                    </div>
                </v-card>
            </v-container>

            <v-card class="blue lighten-5" flat tile>
                <v-container>
            
                    <v-card-text class="text-center mt-16">
                        <div class="display-1">Say hello to an end-to-end</div>
                        <div class="display-1 blue--text text--darken-3 font-weight-bold">Realtor Business Solution</div>
                        <div class="title mt-6">All Digital tools, one platform</div>
                    </v-card-text>

                    <v-row class="my-12">
                        <v-col md="5" cols="12">
                            <div class="display-1 mb-4 fotn-weight-bold">SELF BRANDING</div>
                            <div class="mb-4">There’s a DESIGN for every occasion and purpose especially curated for you. Customise these unlimited templates, with a wide variety updated each day, and share with your clientele or on your social media, and never miss an opportunity.</div>
                            <ul>
                                <li class="mb-3">Customise these unlimited templates, with a wide variety.</li>
                                <li class="mb-3">Updated each day</li>
                                <li class="mb-3">Share with your clientele or on your social media.</li>
                            </ul>
                        </v-col>
                        <v-col md="7" cols="12">
                            <v-img src="../assets/Screens/design.jpg" width="100%"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <v-card flat tile>
                <v-container>
                    <!-- LEAD GENERATION -->
                    <v-row class="my-12">
                        <v-col md="7" cols="12">
                            <v-img src="../assets/Screens/existing.jpg" width="100%"></v-img>
                        </v-col>
                        <v-col md="5" cols="12">
                            <div class="display-1 mb-4 fotn-weight-bold">Existing Clients</div>
                            <div class="mb-4">Manage your all existing clients at one place. </div>
                            <div class="mb-4">Keep record of payments.</div>
                            <ul>
                                <li class="mb-3">Share property details with client</li>
                                <li class="mb-3">Notify client for next payment or updates.</li>
                            </ul>
                        </v-col>
                    </v-row>

                    <!-- CRM -->
                    <v-row class="my-12">
                        <v-col md="5" cols="12">
                            <div class="display-1 mb-4 fotn-weight-bold">CRM</div>
                            <div class="mb-4">Powered with our in-built tools, AgentsNest offers you the best ‘Customer Relationship Managemnet’ software in the market. It’s simple, yet useful in ways that it does everything at one place. </div>
                            <div class="mb-4">You can connect, share data, track payment, and keep a record of all your clients and their properties. </div>
                            <ul>
                                <li class="mb-3">Manage payments with all your clients, update clients for next demand letter, and keep a track of each transaction and never miss out on a payment paperwork and agreements. </li>
                                <li class="mb-3">Connect and assign leads to your team members and keep a track of their activity.</li>
                                <li class="mb-3">Categorise your clients into groups for easy accessibility.</li>
                                <li class="mb-3">Share property details via pre-existing websites, or create new ones and share directly with the clientele or leads via whatsapp, or mail.</li>
                                <li class="mb-3">Send out pre-available messages curated for every occasion and never miss an opportunity to stay connected with your clients, or build relationships with your leads.</li>
                            </ul>
                        </v-col>
                        <v-col md="7" cols="12">
                            <v-img contain src="../assets/Screens/crm.png" width="100%"></v-img>
                        </v-col>
                    </v-row>

                    <!-- TRACK ACTIVITY -->
                    <v-row class="my-12">
                        <v-col md="5" cols="12">
                            <v-img contain height="420" src="../assets/Screens/tracker.png" width="100%"></v-img>
                        </v-col>
                        <v-col md="7" cols="12">
                            <div class="display-1 mb-4 fotn-weight-bold">TRACK ACTIVITY</div>
                            <div class="mb-4">Now track the activity of each feature you operate. Follow up on leads, clients, and team members, open/unopnened timestamp and duration of the files shared with clients and leads so you can turn a hot lead into a potential buyer. </div>
                            <ul>
                                <li class="mb-3">Manage payments with all your clients, update clients for next demand letter, and keep a track of each transaction and never miss out on a payment paperwork and agreements. </li>
                                <li class="mb-3">Connect and assign leads to your team members and keep a track of their activity.</li>
                                <li class="mb-3">Categorise your clients into groups for easy accessibility.</li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

        <!-- Builders Logo -->
            <v-card tile class="py-6 d-none d-md-block">
                <v-container fluid>
                    <!-- <v-row>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/1.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/2.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/3.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/4.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/5.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/6.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/7.png" alt="nksharma" max-width="80"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/8.png" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/9.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/10.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/11.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/12.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/13.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/14.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/15.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/16.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/17.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card outlined class="d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/18.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-col>
                    </v-row> -->

                    <v-slide-group v-model="model" show-arrows>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/1.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/2.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/3.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/4.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/5.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/6.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/7.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/8.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/9.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined dark class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/10.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined dark class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/11.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined dark class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/12.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/13.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined dark class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/14.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/15.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/16.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined dark class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/17.jpg" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item>
                            <v-card outlined dark class="mx-4 d-flex align-center justify-center" height="120" width="120">
                                <v-img src="../assets/Logos/18.png" alt="motiagroup" max-width="100"></v-img>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </v-container>
            </v-card>

            <!-- Footer -->
            <v-card class="pt-md-12">
                <v-container class="d-none d-md-block">
                    <v-row>
                        <v-col cols="4">
                            <div class="title font-weight-bold">agnt.</div>
                            <div>Sign up to recieve the latest updates</div>
                            <div class="d-flex mt-6">
                                <v-text-field dense label="Outlined" outlined></v-text-field>
                                <v-btn class="ml-4">Submit</v-btn>
                            </div>
                        </v-col>
                        <v-col>
                            <div>Agentsnest</div>
                            <ul>
                                <li>Get a Live Demo</li>
                                <li>About Us</li>
                                <li>Partner with Us</li>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                            </ul>
                        </v-col>
                        <v-col>
                            <div>Quick Help Links</div>
                            <ul>
                                <li>Blogs</li>
                                <li>Pricing</li>
                                <li>FAQ's</li>
                                <li>Case Studies</li>
                                <li>Resource Center</li>
                            </ul>
                        </v-col>
                        <v-col>
                            <div>Connect with us</div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-text class="text-center mt-12">
                    Copyright © 2021 agentsnest. All rights reserved.
                </v-card-text>
            </v-card>

        </v-sheet>
    </v-card>
</template>

<script>
export default {
    data(){
        return{
            videoOne: false,
            model: null,
        }
    }
}
</script>

<style>

</style>