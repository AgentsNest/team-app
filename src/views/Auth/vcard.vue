<template>
    <v-card flat>
        <v-img
            :aspect-ratio="16/9"
            height="12vh"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
        <v-img
            :src="user.image"
            :lazy-src="user.image"
            class="rounded-xl mx-auto mt-n12"
            max-width="30vw"
            aspect-ratio="1"
            center
        ></v-img>

        <v-card-text>
            <v-card-title>{{user.name}}</v-card-title>
            <v-card-subtitle>{{user.email}}</v-card-subtitle>
            <div>{{user.contact}}</div>
            <div>{{user.bio}}</div>
        </v-card-text>

        <v-card-actions class="justify-center mb-4">
            <v-btn fab><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn fab><v-icon>mdi-youtube</v-icon></v-btn>
            <v-btn fab><v-icon>mdi-twitter</v-icon></v-btn>
            <v-btn fab><v-icon>mdi-linkedin</v-icon></v-btn>
        </v-card-actions>

        <v-divider></v-divider>

        <div class="text-center py-3">
            <v-icon color="yellow darken-3">mdi-lightning-bolt</v-icon> Powered By <strong>agnt.</strong>
        </div>
    </v-card>
</template>

<script>
import User from '../../Apis/User'
export default {
    data(){
        return{
            user: ''
        }
    },
    mounted(){
        User.vcard(this.$route.params.uid)
        .then((res) => {
            this.user = res.data
        })
    }
}
</script>

<style>

</style>