<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Message Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-2 shadow content-card" elevation="0" height="88vh">
            <v-toolbar flat>
                <div class="font-weight-bold text-h6">Messages</div>
                <v-spacer></v-spacer>
                <input type="text" placeholder="Search message..." class="search-input">
                <v-spacer></v-spacer>
                <v-btn class="text-capitalize mr-3 dark" dark depressed :to="{name: 'MyWebsite'}">All Message</v-btn>
                <v-btn class="text-capitalize" outlined :to="{name: 'Website'}">My Message</v-btn>
            
            </v-toolbar>
            
            <v-card-text>
                <v-row>
                    <v-col md="8">
                        <v-row>
                            <v-col md="6" v-for="message in messages" :key="message.id">
                                <v-card class="align-stretch" height="100%">
                                    <v-card-text>{{message.text}}</v-card-text>
                                    <v-card-actions>
                                        <v-btn text>Share</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col md="4">
                        <input type="text" placeholder="Add group name..." class="search-input" v-model="form.title">
                        <v-btn block class="mt-6" :color="form.color" large dark @click="newGroup">Create Message</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        

    </div>
</template>

<script>
import Group from '../../Apis/Other'
import User from '../../Apis/User'

export default {
    data () {
      return {
        loading: false,
        snackbar: false,
        messages:[],
        form:{
            title: '',
            agent_id: null,
            color: '',
        },
      }
    },
    methods: {
        authUser(){
            User.auth().then(response => {
                this.form.agent_id = response.data.id;
            });
        },
        fetchData(){
            Group.messageSample().then(response => {
                this.messages = response.data.data;
            });
        },
        newGroup(){
            let data = new FormData();

            data.append('title', this.form.title)
            data.append('agent_id', this.form.agent_id)
            data.append('color', this.form.color)

            Group.newGroup(data)
            .then((response) => {
                this.fetchData();
                this.snackbar = true
                this.form = ''
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });  
        },
    },
    mounted(){
      this.fetchData();
      this.authUser();
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.folder{
    border-radius: 3px;
    height: 100px;
    position: relative;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.folder-handle{
    position: absolute;
    top: -12px;
    left: 0;
    height: 12px;
    width:75px;
    border-radius: 10px 10px 0px 0px;
}
</style>