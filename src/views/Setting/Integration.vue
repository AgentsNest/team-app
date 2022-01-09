<template>
  <div>
      <v-row>
            <v-col md="4" class="d-none d-md-flex">
                <Sidebar />
            </v-col>
            <v-col md="8">
                <v-card class="rounded-xl pa-5 mb-5" flat>
                    <div>
                        <div class="d-flex align-start">
                            <v-btn small fab depressed><v-icon color="blue darken-2" size="38">mdi-facebook</v-icon></v-btn>
                            <div class="ml-2">
                                <span class="font-weight-bold">Facebook</span> <br>
                                <p>Receive new leads from Facebook & Instagram Lead Ads in your Agentsnest account</p>
                            </div>
                        </div>
                    </div>
                    <v-card-actions>
                        <div>Not Connected</div>
                        <v-spacer></v-spacer>
                        <v-btn text outlined @click="connectFacebook()" v-text="buttonText"></v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="rounded-xl pa-5 mb-5" flat>
                    <div>
                        <div class="d-flex align-start">
                            <v-btn small fab depressed><v-icon color="grey darken-2" size="38">mdi-earth</v-icon></v-btn>
                            <div class="ml-2">
                                <span class="font-weight-bold">Website</span> <br>
                                <p>Receive new leads from Facebook & Instagram Lead Ads in your Agentsnest account</p>
                            </div>
                        </div>
                    </div>
                    <v-card-actions>
                        <div>Not Connected</div>
                        <v-spacer></v-spacer>
                        <v-btn text outlined>Configure</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="rounded-xl pa-5 mb-5" flat>
                    <div>
                        <div class="d-flex align-start">
                            <v-btn small fab depressed><v-icon color="red darken-2" size="38">mdi-google</v-icon></v-btn>
                            <div class="ml-2">
                                <span class="font-weight-bold">Google</span> <br>
                                <p>Receive new leads from Facebook & Instagram Lead Ads in your Agentsnest account</p>
                            </div>
                        </div>
                    </div>
                    <v-card-actions>
                        <div>Not Connected</div>
                        <v-spacer></v-spacer>
                        <v-btn text outlined>Configure</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

window.fbAsyncInit = function() { 
    FB.init({ // eslint-disable-line
        appId : '292569662790871', autoLogAppEvents : true, xfbml : true,
        version : 'v12.0'
    }); 
};

// Function to load the SDK from Facebook
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0]; if(d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js"; fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function subscribeApp(page_id, page_access_token){
    console.log('page' + page_id);

    FB.api(  // eslint-disable-line
        '/' + page_id + '/subscribed_apps',
        'POST',
        {access_token: page_access_token, subscribed_fields: ['leadgen','email','name']}, function(response){
        console.log('Successfully subscribed page', response);
    });
}

import Sidebar from '../../components/Account/Sidebar.vue'

export default {
    components:{ Sidebar },
    data(){
        return {
            buttonText: 'Connect Now'
        }
    },
    methods:{
        connectFacebook(){
            FB.login(function(response){ // eslint-disable-line
                console.log('Successfully logged in', response);
                this.buttonText = 'Already Connected'

                FB.api('/me/accounts' , function(response){ // eslint-disable-line
                    console.log('Successfully retrieved pages', response)
                });

                FB.api( // eslint-disable-line
                    '/me/adaccounts/', 'get' , {fields: 'campaigns{name,ads{id,name,leads{name}}}'},
                    function (response) {
                        if (response && !response.error) {
                            console.log("camp", response)
                        }
                        console.log("not camp", response)
                    }
                )
            }, {scope: ['pages_manage_ads', 'leads_retrieval', 'ads_management', 'pages_manage_metadata', 'pages_read_engagement', 'pages_read_user_content']});

        }
    }
}
</script>

<style>

</style>