<template>
    <div>

        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Notification Cleared
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-badge 
                    class="mr-2" dense bordered overlap color="error" 
                    :content="unreadnotifications.length > 0 ? unreadnotifications.length : '0' " 
                >
                    <v-btn icon small color="grey darken-3" v-bind="attrs" v-on="on">
                        <v-icon size="22" color="dark">mdi-bell</v-icon>
                    </v-btn>
                </v-badge>
            </template>
            <v-card tile>
                <v-toolbar dark color="pink" tile>
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <div class="title">Notifications</div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn @click="markAsRead()" text>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                            <span>Clear</span>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <div class="grey lighten-4 pa-2 ">
                    <div class="mb-2 py-3 px-3 box" v-for="notification in unreadnotifications" :key="notification.id">
                        <div>
                            <div class="body-2">
                                <span class="pink--text">{{notification.data.Project}}</span> 
                                <span class="grey--text text--darken-2 mx-1">Opened By</span> 
                                <span class="black--text">{{notification.data.description}}</span>
                            </div>
                            <div class="body-2 grey--text text--darken-2">Duration: {{notification.data.duration}}</div>
                            <div class="caption">{{notification.created_at | fromNow}}</div>
                        </div>
                    </div>
                </div>

            </v-card>
        </v-dialog>

    </div>

</template>

<script>
import Notification from '../Apis/Notification'

export default {
    data(){
        return {
            notificationList: false,
            snackbar: false,
            dialog: false,
            unreadnotifications: []
        }
    },
    computed:{
    },
    mounted(){ 
        this.fetchData(); 
    },
    methods:{
        fetchData(){
            Notification.unRead()
            .then((res) => {
                this.unreadnotifications = res.data
            })
        },
        markAsRead(){   
            Notification.markAsRead().then(() => {
                this.notificationList = false;
                this.snackbar = true
                this.fetchData();
            })
        }
    }

}
</script>

<style scoped>
.box{
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
    background: #fff;
    border-radius: 8px;
}
</style>