<template>
    <v-card class="overflow-hidden">
            
        <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7" class="px-16">
            <v-toolbar-title class="font-weight-bold headline">
                agnt. 
                <span class="caption">beta v.01</span>
                <!-- <v-chip class="" x-small color="blue darken-4" text-color="white">beta</v-chip> -->
            </v-toolbar-title>
            
            <v-spacer></v-spacer>

            <v-btn text class="text-capitalize">Case Studies</v-btn>
            <v-btn text class="text-capitalize">Pricing</v-btn>
            <v-btn text class="text-capitalize">Integration</v-btn>
            <v-btn text class="text-capitalize">Resources</v-btn>
            <v-btn text class="text-capitalize">About Us</v-btn>
            <v-btn color="yellow darken-2" elevation="0" class="text-capitalize">Login</v-btn>

        </v-app-bar>

        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto pt-12" min-height="100vh">
            <v-container>
                <v-row class="py-16">
                    <v-col>
                        <div class="display-3 font-weight-bold">Grow your business faster with <span class="blue--text text--darken-3">AgentsNest</span></div>
                        <div class="my-8">One solution for all you digital, market, and personal business needs.</div>
                        <v-row>
                            <v-col class="font-weight-bold"><v-icon color="red" size="14" class="mr-2">mdi-circle</v-icon> Build your Brand identity</v-col>
                            <v-col class="font-weight-bold"><v-icon color="green" size="14" class="mr-2">mdi-circle</v-icon> Generate new leads each day</v-col>
                        </v-row>
                        <v-row>
                            <v-col class="font-weight-bold"><v-icon color="yellow" size="14" class="mr-2">mdi-circle</v-icon> Keep a track of leads</v-col>
                            <v-col class="font-weight-bold"><v-icon color="purple" size="14" class="mr-2">mdi-circle</v-icon> Manage your team</v-col>
                        </v-row>
                        <v-row>
                            <v-col class="font-weight-bold"><v-icon color="orange" size="14" class="mr-2">mdi-circle</v-icon> Share properties in one click</v-col>
                            <v-col class="font-weight-bold"><v-icon color="green" size="14" class="mr-2">mdi-circle</v-icon> Never miss opportunities</v-col>
                        </v-row>
                        <v-alert text color="info" class="mt-8 rounded-xl">
                            <div class="text-capitalize">Your Own Solution | Join the AgentsNest community today!
</div>
                        </v-alert>
                    </v-col>
                    <v-col>
                        <v-img src="../assets/img/hero1.png" max-width="36vw" @click="videoOne = !videoOne" style="cursor: pointer"></v-img>
                        <v-dialog v-model="videoOne" width="500">
                            <v-card flat height="100%">
                                <!-- <iframe id="ytplayer" type="text/html" src="https://player.vimeo.com/video/122282652?h=104b3eccc2" width="100%" height="400" frameborder="0"></iframe> -->
                                <video src="../assets/img/vid.mp4" width="100%" height="400" autoplay loop></video>
                            </v-card>
                        </v-dialog>
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
                    <v-card-actions class="justify-space-around mb-16">
                        <v-img src="../assets/img/logo-sample.png" max-width="120" v-for="n in 5" :key="n"></v-img>
                    </v-card-actions>

                    <v-card-text class="text-center mt-16">
                        <div class="display-1">Say hello to an end-to-end</div>
                        <div class="display-1 blue--text text--darken-3 font-weight-bold">Realtor Business Solution</div>
                        <div class="title mt-6">All Digital tools, one platform</div>
                    </v-card-text>

                    <v-row class="my-12">
                        <v-col cols="5">
                            <div class="display-1 mb-4 fotn-weight-bold">SELF BRANDING</div>
                            <div class="mb-4">There’s a DESIGN for every occasion and purpose especially curated for you. Customise these unlimited templates, with a wide variety updated each day, and share with your clientele or on your social media, and never miss an opportunity.</div>
                            <ul>
                                <li class="mb-3">Customise these unlimited templates, with a wide variety.</li>
                                <li class="mb-3">Updated each day</li>
                                <li class="mb-3">Share with your clientele or on your social media.</li>
                            </ul>
                        </v-col>
                        <v-col cols="7">
                            <v-img src="../assets/img/hero2.png" width="100%"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <v-card flat tile>
                <v-container>
                    <!-- LEAD GENERATION -->
                    <v-row class="my-12">
                        <v-col cols="7">
                            <v-img src="../assets/img/hero2.png" width="100%"></v-img>
                        </v-col>
                        <v-col cols="5">
                            <div class="display-1 mb-4 fotn-weight-bold">LEAD GENERATION</div>
                            <div class="mb-4">Lead generation has never been this easy.</div>
                            <div class="mb-4">With AgentsNest, you have the ability to choose, track, and maintain your lead activity on a single platform. Select your perspective goals, and lead the way.</div>
                            <ul>
                                <li class="mb-3">All your leads automatically sync to the platform, and gives you instant access for connection.</li>
                                <li class="mb-3">Now, never miss another lead or a potential client.</li>
                            </ul>
                        </v-col>
                    </v-row>

                    <!-- CRM -->
                    <v-row class="my-12">
                        <v-col cols="5">
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
                        <v-col cols="7">
                            <v-img src="../assets/img/hero2.png" width="100%"></v-img>
                        </v-col>
                    </v-row>

                    <!-- TRACK ACTIVITY -->
                    <v-row class="my-12">
                        <v-col cols="7">
                            <v-img src="../assets/img/hero2.png" width="100%"></v-img>
                        </v-col>
                        <v-col cols="5">
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

            <!-- Footer -->
            <v-card class="pt-12">
                <v-container>
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
            videoOne: false
        }
    }
}
</script>

<style>

</style>