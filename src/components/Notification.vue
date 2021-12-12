<template>
    <div>

        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Notification Cleared
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-badge 
                    class="mr-4"
                    bordered 
                    color="error" 
                    :content="unreadnotifications.length" 
                    overlap
                    v-show="unreadnotifications.length > 0"
                >
                    <v-btn fab small color="grey darken-3" v-bind="attrs" v-on="on">
                        <v-icon size="20" color="white">mdi-bell</v-icon>
                    </v-btn>
                </v-badge>
            </template>
            <v-card>
                <v-btn class="text-capitalize" text @click="markAsRead()">clear all</v-btn>
                <v-list dense class="py-0" two-line>
                    <v-list-item v-for="notification in unreadnotifications" :key="notification.id">
                        <v-list-item-title>{{notification.data.event}}</v-list-item-title>
                        <v-list-item-subtitle>{{notification.data.description}}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card>    
        </v-menu>

    </div>

</template>

<script>
import Notification from '../Apis/Notification'

export default {
    mounted(){
        this.getNotifications();
    },
    data(){
        return {
            unreadnotifications: {},
            notificationList: false,
            snackbar: false
        }
    },
    methods:{
        getNotifications(){
            Notification.unRead().then(response => {
                this.unreadnotifications = response.data;
                // console.log(response.data)
            });
        },
        
        markAsRead(){   
            Notification.markAsRead().then(response => {
                this.notificationList = false;
                this.getNotifications();
                this.snackbar = true
            })
        }
    }

}
</script>

<style>

</style>