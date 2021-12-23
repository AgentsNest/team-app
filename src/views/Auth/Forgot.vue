<template>
    <v-card height="100%" class="">
        <v-toolbar flat>
            <v-btn icon><v-icon>mdi-arrow-left-thin</v-icon></v-btn>
        </v-toolbar>
        <v-img 
            src="../../assets/img/forgot.png"
            max-width="65vw"
            class="mx-auto"
        ></v-img>

        <v-card-text class="px-6">
            <div class="font-weight-bold">Forgot Password?</div>
            <div class="caption mb-5">No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</div>
            <v-text-field
                label="You Email Address"
                placeholder="You Email Address"
                solo
                class="rounded-lg"
                v-model="email"
            ></v-text-field>
            <v-btn @click="sendData" class="text-capitalize grey darken-4" dark large outlined block>Send Reset Link</v-btn>
        </v-card-text>
        <v-card-text class="text-center">
            Remember Password?
            <v-btn small class="rounded-lg" text :to="{name: 'Login'}">Login</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
import User from '../../Apis/User'

export default {
    data(){
        return {
            email: ''
        }
    },
    methods:{
        sendData(){
            let data = new FormData();
            data.append('email', this.email)

            User.forget(data)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>