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
                    class="mr-2"
                    dense
                    bordered 
                    color="error" 
                    :content="unreadnotifications.length > 0 ? unreadnotifications.length : '0' " 
                    overlap
                >
                    <v-btn icon small color="grey darken-3" v-bind="attrs" v-on="on">
                        <v-icon size="22" color="dark">mdi-bell</v-icon>
                    </v-btn>
                </v-badge>
            </template>
            <v-card>
                <v-toolbar color="teal" dark dense>
                    <div>Notification ({{unreadnotifications.length}})</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="markAsRead()"><v-icon>mdi-checkbox-marked-circle</v-icon></v-btn>
                </v-toolbar>

                <v-list dense class="py-0 overflow-y-auto" two-line max-height="350">
                    <v-list-item v-for="notification in unreadnotifications" :key="notification.id">
                        <v-list-item-content>
                            <v-list-item-title>{{notification.data.event}}</v-list-item-title>
                            <v-list-item-subtitle>{{notification.data.description}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-list-item-action-text>{{notification.created_at | fromNow}}</v-list-item-action-text>
                        </v-list-item-action>
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